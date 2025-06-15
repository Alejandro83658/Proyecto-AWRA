<?php

namespace App\Http\Controllers;

use App\Models\Fostering;
use App\Models\Animal;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Notifications\NuevaSolicitudAcogimientoNotification;
use App\Notifications\ResguardoAcogimientoNotification;

class FosteringController extends Controller
{
    // Página de bienvenida al proceso de acogida
    public function welcome(Animal $animal = null)
    {
        return inertia('Fosterings/Welcome', [
            'animal' => $animal,
        ]);
    }

    // Formulario de acogida
    public function form(Animal $animal, Request $request)
    {
        $user = $request->user();
        $profile = $user->userProfile;

        return inertia('Fosterings/FosteringForm', [
            'animal' => $animal,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'profile' => $profile,
        ]);
    }

    // Envío del formulario de acogida    
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
            'motivo' => 'required|string|max:255',
            'experiencia' => 'nullable|string',
            'notas' => 'nullable|string',
        ]);

        $user = auth()->user();

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

        // bloque de validación
        $profile = $user->fresh()->userProfile;
        if (!$profile || !$profile->birth_date || \Carbon\Carbon::parse($profile->birth_date)->age < 18) {
            return redirect()->route('fosterings.welcome', $animal)
                ->with('error', 'Debes ser mayor de edad para enviar una solicitud de acogida.');
        }

        // Si ya tiene una solicitud abierta
        $solicitudAbierta = Fostering::where('user_id', $user->id)
            ->whereIn('status', ['pendiente', 'aceptado'])
            ->exists();

        if ($solicitudAbierta) {
            return redirect()->route('fosterings.welcome', $animal)
                ->with('error', 'Ya tienes una solicitud de acogida en curso.');
        }

        // Crea la solicitud de acogida
        $fostering = Fostering::create([
            'user_id' => $user->id,
            'animal_id' => $animal->id,
            'motivo' => $request->motivo,
            'experiencia' => $request->experiencia,
            'notas' => $request->notas,
            'start_date' => now(),
            'status' => 'pendiente',
        ]);

        // 1. Notifica al usuario SOLO por mail
        $user->notify(new ResguardoAcogimientoNotification($fostering));

        // 2. Notifica a administradores y staff SOLO por notificación interna
        $admins = \App\Models\User::whereHas('roles', function ($q) {
            $q->whereIn('name', ['admin', 'super_admin', 'staff']);
        })->get();

        foreach ($admins as $admin) {
            $admin->notify(new NuevaSolicitudAcogimientoNotification($fostering));
        }

        return redirect()->route('fosterings.welcome', $animal)
            ->with('success', '¡Solicitud de acogida enviada correctamente!');
    }

    // METODOS PARA ADMINISTRAR LAS SOLICITUDES DE ACOGIDA

    // Muestra la lista de solicitudes de acogida para el administrador    
    public function adminIndex(Request $request)
    {
        $status = $request->input('status', 'todas');
        $statusOptions = [
            'todas' => 'Todas',
            'pendiente' => 'Pendiente',
            'aceptado' => 'Aceptado',
            'rechazado' => 'Rechazado',
        ];

        $query = Fostering::with(['user', 'animal'])->orderBy('created_at', 'desc');

        if (in_array($status, array_keys($statusOptions)) && $status !== 'todas') {
            $query->where('status', $status);
        }

        $fosterings = $query->paginate(15);

        return inertia('Admin/Fosterings/Index', [
            'fosterings' => $fosterings,
            'statusFilter' => $status,
            'statusOptions' => $statusOptions,
        ]);
    }


    // Muestra los detalles de una solicitud de acogida específica para el administrador
    // Carga las relaciones de usuario y animal para mostrar información completa
    public function showAdmin(Fostering $fostering)
    {
        $fostering->load(['user', 'animal']);
        return inertia('Admin/Fosterings/Show', ['fostering' => $fostering]);
    }


    // Muestra el formulario de edición de una solicitud de acogida para el administrador
    public function editAdmin(Fostering $fostering)
    {
        $statusOptions = [
            'pendiente' => 'Pendiente',
            'aceptado' => 'Aceptado',
            'rechazado' => 'Rechazado',
        ];
        $fostering->load(['user', 'animal']);
        return inertia('Admin/Fosterings/Edit', [
            'fostering' => $fostering,
            'statusOptions' => $statusOptions,
        ]);
    }


    // Actualiza el estado de una solicitud de acogida desde el panel de administración
    public function updateAdmin(Request $request, Fostering $fostering)
    {
        $request->validate([
            'status' => 'required|in:pendiente,aceptado,rechazado',
            'notes' => 'nullable|string',
        ]);
        $fostering->update([
            'status' => $request->status,
            'notes' => $request->notes,
        ]);
        // Cambia el estado del animal si es aceptado/rechazado
        if ($request->status === 'aceptado') {
            $fostering->animal->update(['is_fostered' => true]);
        } elseif ($request->status === 'rechazado') {
            $fostering->animal->update(['is_fostered' => false]);
        }
        return redirect()->route('admin.fosterings.show', $fostering)->with('success', 'Solicitud actualizada correctamente.');
    }
}
