<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use App\Models\Animal;
use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\NuevaAdopcionNotification;
use App\Notifications\ResguardoAdopcionNotification;

class AdoptionController extends Controller
{
    // Listar todas las adopciones
    public function index()
    {
        $adoptions = Adoption::with(['user', 'animal'])->get();
        return inertia('Adoptions/Index', ['adoptions' => $adoptions]);
    }

    // Mostrar formulario de creación
    public function create()
    {
        $animals = Animal::all();
        $users = User::all();
        return inertia('Adoptions/Create', [
            'animals' => $animals,
            'users' => $users,
        ]);
    }

    // Guardar una nueva adopción
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'animal_id' => 'required|exists:animals,id',
            'adoption_date' => 'required|date',
            'returned' => 'boolean',
            'return_date' => 'nullable|date',
            'reason' => 'nullable|string',
            'status' => 'required|in:pendiente,en_estudio,aceptado,rechazado',
            'notes' => 'nullable|string',
        ]);

        // Validar que el usuario no tenga otra solicitud abierta
        $existeSolicitud = Adoption::where('user_id', $request->user_id)
            ->whereIn('status', ['pendiente', 'en_estudio'])
            ->exists();

        if ($existeSolicitud) {
            return back()->withErrors(['user_id' => 'Ya tienes una solicitud de adopción pendiente o en estudio.'])->withInput();
        }

        Adoption::create($request->all());

        return redirect()->route('adoptions.index')->with('success', 'Adopción registrada correctamente.');
    }

    // Mostrar detalles de una adopción
    public function show(Adoption $adoption)
    {
        $adoption->load(['user', 'animal']);
        return inertia('Adoptions/Show', ['adoption' => $adoption]);
    }


    // Mostrar formulario de edición en el panel de administración
    public function edit(Adoption $adoption)
    {
        $adoption->load(['user', 'animal']);
        $animals = Animal::all();
        $users = User::all();

        $statusOptions = [
            'pendiente' => 'Pendiente',
            'en_estudio' => 'En estudio',
            'aceptado' => 'Aceptada',
            'rechazado' => 'Rechazada',
        ];

        return inertia('Admin/Adoptions/Edit', [
            'adoption' => [
                'id' => $adoption->id,
                'animal_id' => $adoption->animal_id,
                'animal_name' => $adoption->animal->name ?? '',
                'user_id' => $adoption->user_id,
                'user_name' => $adoption->user->name ?? '',
                'status' => $adoption->status,
                'created_at' => $adoption->created_at,
                'notes' => $adoption->notes,
                'adoption_date' => $adoption->adoption_date,
                'returned' => $adoption->returned,
                'return_date' => $adoption->return_date,
                'reason' => $adoption->reason,
            ],
            'animals' => $animals,
            'users' => $users,
            'statusOptions' => $statusOptions,
        ]);
    }


    // Eliminar una adopción
    public function destroy(Adoption $adoption)
    {
        $adoption->delete();
        return redirect()->route('adoptions.index')->with('success', 'Adopción eliminada correctamente.');
    }


    public function welcome(Animal $animal)
    {
        return inertia('Adoptions/Welcome', [
            'animal' => $animal,
        ]);
    }

    public function form(Animal $animal, Request $request)
    {
        $user = $request->user();
        $profile = $user->userProfile;

        return inertia('Adoptions/AdoptionForm', [
            'animal' => $animal,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'profile' => $profile,
        ]);
    }



    // Envío del formulario de adopción
    public function submit(Request $request, Animal $animal)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'dni' => 'required|string|max:20',
            'direccion' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:20',
            'birth_date' => 'required|date',
        ]);

        $user = auth()->user();

        // Validar edad mínima
        $edad = \Carbon\Carbon::parse($request->birth_date)->age;
        if ($edad < 18) {
            return redirect()
                ->route('adoptions.welcome', $animal)
                ->with('error', 'Debes ser mayor de 18 años para realizar una solicitud de adopción.');
        }

        // Validar que el usuario no tenga otra solicitud abierta
        $existeSolicitud = \App\Models\Adoption::where('user_id', $user->id)
            ->whereIn('status', ['pendiente', 'en_estudio'])
            ->exists();

        if ($existeSolicitud) {
            return redirect()
                ->route('adoptions.welcome', $animal)
                ->with('error', 'Ya tienes una solicitud de adopción pendiente o en estudio.');
        }

        // Actualiza o crea el perfil del usuario
        $user->userProfile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'dni' => $request->dni,
                'phone' => $request->telefono,
                'address' => $request->direccion,
                'city' => $request->city,
                'province' => $request->province,
                'first_name' => $request->nombre,
                'last_name' => $request->apellidos,
                'birth_date' => $request->birth_date,
            ]
        );

        // Crea la solicitud de adopción
        $adoption = \App\Models\Adoption::create([
            'user_id' => $user->id,
            'animal_id' => $animal->id,
            'adoption_date' => now(),
            'status' => 'pendiente',
        ]);

        // 1. Notifica al usuario SOLO por mail
        $user->notify(new ResguardoAdopcionNotification($adoption));

        // 2. Notifica a administradores y staff SOLO por notificación interna
        $admins = \App\Models\User::whereHas('roles', function ($q) {
            $q->whereIn('name', ['admin', 'super_admin', 'staff']);
        })->get();

        foreach ($admins as $admin) {
            $admin->notify(new NuevaAdopcionNotification($adoption));
        }

        return redirect()->route('adoptions.welcome', $animal)->with('success', '¡Solicitud enviada correctamente!');
    }

    // Cambiar el estado de una solicitud de adopción     
    public function changeStatus(Request $request, Adoption $adoption)
    {
        $request->validate([
            'status' => 'required|in:pendiente,en_estudio,aceptado,rechazado',
            'notes' => 'nullable|string',
        ]);

        $adoption->status = $request->status;
        $adoption->notes = $request->notes;
        $adoption->save();

        // me aseguro de tener la relación cargada
        $adoption->load('animal');

        // Cambia el estado del animal SOLO si la solicitud es aceptada o rechazada
        if ($adoption->animal) {
            if ($request->status === 'aceptado') {
                $adoption->animal->update(['status' => 'Adoptado']);
            } elseif ($request->status === 'rechazado') {
                $adoption->animal->update(['status' => 'Disponible']);
            }
        }

        return redirect()->route('adoptions.index')->with('success', 'Estado de la solicitud actualizado correctamente.');
    }

    // METODOS PARA LA SECCIÓN DE ADMINISTRACIÓN

    // Página de administración para listar adopciones
    public function adminIndex(Request $request)
    {
        $status = $request->input('status', 'pendiente'); // Por defecto 'pendiente'

        $adoptions = \App\Models\Adoption::with(['user', 'animal'])
            ->when($status !== 'todas', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->orderByRaw("FIELD(status, 'pendiente', 'en_estudio', 'aceptado', 'rechazado')")
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        $statusOptions = [
            'todas' => 'Todas',
            'pendiente' => 'Pendientes',
            'en_estudio' => 'En estudio',
            'aceptado' => 'Aceptadas',
            'rechazado' => 'Rechazadas',
        ];

        return inertia('Admin/Adoptions/Index', [
            'adoptions' => $adoptions,
            'statusFilter' => $status,
            'statusOptions' => $statusOptions,
        ]);
    }


    // Mostrar detalles de una adopción en la sección de administración
    public function showAdmin(\App\Models\Adoption $adoption)
    {
        $adoption->load(['user', 'animal']);
        return inertia('Admin/Adoptions/Show', [
            'adoption' => [
                'id' => $adoption->id,
                'animal_id' => $adoption->animal_id,
                'animal_name' => $adoption->animal->name ?? '',
                'user_id' => $adoption->user_id,
                'user_name' => $adoption->user->name ?? '',
                'status' => $adoption->status,
                'created_at' => $adoption->created_at,
                'notes' => $adoption->notes,
                'adoption_date' => $adoption->adoption_date,
                'returned' => $adoption->returned,
                'return_date' => $adoption->return_date,
                'reason' => $adoption->reason,

                //mas campos según sea necesario

            ],
        ]);
    }

    // Actualizar el estado de una solicitud de adopción
    public function update(Request $request, Adoption $adoption)
    {
        $request->validate([
            'status' => 'required|in:pendiente,en_estudio,aceptado,rechazado',
            'notes' => 'nullable|string',
        ]);

        $adoption->status = $request->status;
        $adoption->notes = $request->notes;
        $adoption->save();

        // Me aseguro de tener la relación cargada
        $adoption->load('animal');

        // Cambia el estado del animal SOLO si la solicitud es aceptada o rechazada
        if ($adoption->animal) {
            if ($request->status === 'aceptado') {
                $adoption->animal->update(['status' => 'Adoptado']);
            } elseif ($request->status === 'rechazado') {
                $adoption->animal->update(['status' => 'Disponible']);
            }
        }

        return redirect()->route('admin.adoptions.show', $adoption)->with('success', 'Solicitud actualizada correctamente.');
    }
}
