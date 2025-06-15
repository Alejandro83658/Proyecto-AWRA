<?php

namespace App\Http\Controllers;

use App\Models\Sponsorship;
use App\Models\Animal;
use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\NuevaSolicitudApadrinamientoNotification;
use App\Notifications\ResguardoApadrinamientoNotification;


class SponsorshipController extends Controller
{
    // Listado público 
    public function index()
    {
        $sponsorships = Sponsorship::with(['user', 'animal'])->get();
        return inertia('Sponsorships/Index', ['sponsorships' => $sponsorships]);
    }

    public function create()
    {
        $animals = Animal::all();
        $users = User::all();
        return inertia('Sponsorships/Create', compact('animals', 'users'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'animal_id' => 'required|exists:animals,id',
            'start_date' => 'required|date',
            'amount_eur' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
            'status' => 'required|in:pendiente,aceptado,rechazado',
        ]);
        Sponsorship::create($request->all());
        return redirect()->route('sponsorships.index')->with('success', 'Apadrinamiento registrado correctamente.');
    }

    public function show(Sponsorship $sponsorship)
    {
        $sponsorship->load(['user', 'animal']);
        return inertia('Sponsorships/Show', ['sponsorship' => $sponsorship]);
    }

    public function edit(Sponsorship $sponsorship)
    {
        $animals = Animal::all();
        $users = User::all();
        return inertia('Sponsorships/Edit', compact('sponsorship', 'animals', 'users'));
    }

    public function update(Request $request, Sponsorship $sponsorship)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'animal_id' => 'required|exists:animals,id',
            'start_date' => 'required|date',
            'amount_eur' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
            'status' => 'required|in:pendiente,aceptado,rechazado',
        ]);
        $sponsorship->update($request->all());
        return redirect()->route('sponsorships.index')->with('success', 'Apadrinamiento actualizado correctamente.');
    }

    public function destroy(Sponsorship $sponsorship)
    {
        $sponsorship->delete();
        return redirect()->route('sponsorships.index')->with('success', 'Apadrinamiento eliminado correctamente.');
    }

    // Pantalla de bienvenida tras apadrinar
    public function welcome(Animal $animal = null)
    {
        return inertia('Sponsorships/Welcome', ['animal' => $animal]);
    }

    // Formulario de apadrinamiento para un animal concreto
    public function form(Animal $animal, Request $request)
    {
        $user = $request->user();
        $profile = $user->userProfile;

        return inertia('Sponsorships/SponsorshipForm', [
            'animal' => $animal,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'profile' => $profile,
        ]);
    }

    // Envío del formulario de apadrinamiento (usuario)
    public function submit(Request $request, Animal $animal)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'dni' => 'required|string|max:20',
            'direccion' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:20',
            'birth_date' => 'required|date',
            'amount_eur' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $user = auth()->user();

        // Actualiza o crea el perfil del usuario
        $user->userProfile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'dni' => $request->dni,
                'phone' => $request->telefono,
                'address' => $request->direccion,
                'first_name' => $request->nombre,
                'last_name' => $request->apellidos,
                'birth_date' => $request->birth_date,
            ]
        );

        // Recarga el perfil actualizado
        $profile = $user->fresh()->userProfile;

        // Valida la edad
        if (!$profile || !$profile->birth_date || \Carbon\Carbon::parse($profile->birth_date)->age < 18) {
            return redirect()->route('sponsorships.welcome', $animal)
                ->with('error', 'Debes ser mayor de edad para enviar una solicitud de apadrinamiento.');
        }

        // Si ya tiene una solicitud abierta (opcional, si lo quieres igual que voluntariado)
        $solicitudAbierta = Sponsorship::where('user_id', $user->id)
            ->whereIn('status', ['pendiente', 'aceptado'])
            ->exists();

        if ($solicitudAbierta) {
            return redirect()->route('sponsorships.welcome', $animal)
                ->with('error', 'Ya tienes una solicitud de apadrinamiento en curso.');
        }

        // Crea la solicitud de apadrinamiento
        $sponsorship = Sponsorship::create([
            'user_id' => $user->id,
            'animal_id' => $animal->id,
            'amount_eur' => $request->amount_eur,
            'payment_method' => $request->payment_method,
            'notes' => $request->notes,
            'start_date' => now(),
            'status' => 'pendiente',
        ]);

        // 1. Notifica al usuario SOLO por mail
        $user->notify(new ResguardoApadrinamientoNotification($sponsorship));

        // 2. Notifica a administradores y staff SOLO por notificación interna
        $admins = User::whereHas('roles', function ($q) {
            $q->whereIn('name', ['admin', 'super_admin', 'staff']);
        })->get();

        foreach ($admins as $admin) {
            $admin->notify(new NuevaSolicitudApadrinamientoNotification($sponsorship));
        }

        return redirect()->route('sponsorships.welcome', $animal)
            ->with('success', '¡Solicitud de apadrinamiento enviada correctamente!');
    }



    // MÉTODOS DE ADMINISTRACIÓN (panel admin)

    public function adminIndex(Request $request)
    {
        $status = $request->input('status', 'todas');
        $statusOptions = [
            'todas' => 'Todas',
            'pendiente' => 'Pendiente',
            'aceptado' => 'Aceptado',
            'rechazado' => 'Rechazado',
        ];

        $query = Sponsorship::with(['user', 'animal'])->orderBy('created_at', 'desc');

        if (in_array($status, array_keys($statusOptions)) && $status !== 'todas') {
            $query->where('status', $status);
        }

        $sponsorships = $query->paginate(10);

        return inertia('Admin/Sponsorships/Index', [
            'sponsorships' => $sponsorships,
            'statusFilter' => $status,
            'statusOptions' => $statusOptions,
        ]);
    }

    // Mostrar detalles de una solicitud de apadrinamiento (admin)
    public function showAdmin(Sponsorship $sponsorship)
    {
        $sponsorship->load(['user', 'animal']);
        return inertia('Admin/Sponsorships/Show', ['sponsorship' => $sponsorship]);
    }

    // Editar una solicitud de apadrinamiento (admin)
    public function editAdmin(Sponsorship $sponsorship)
    {
        $statusOptions = [
            'pendiente' => 'Pendiente',
            'aceptado' => 'Aceptado',
            'rechazado' => 'Rechazado',
        ];
        $sponsorship->load(['user', 'animal']);
        return inertia('Admin/Sponsorships/Edit', [
            'sponsorship' => $sponsorship,
            'statusOptions' => $statusOptions,
        ]);
    }

    // Actualizar el estado de una solicitud de apadrinamiento (admin)
    public function updateAdmin(Request $request, Sponsorship $sponsorship)
    {
        $request->validate([
            'status' => 'required|in:pendiente,aceptado,rechazado',
            'notes' => 'nullable|string',
        ]);
        $sponsorship->update([
            'status' => $request->status,
            'notes' => $request->notes,
        ]);
        return redirect()->route('admin.sponsorships.show', $sponsorship)->with('success', 'Solicitud actualizada correctamente.');
    }
}
