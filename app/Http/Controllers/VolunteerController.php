<?php

namespace App\Http\Controllers;

use App\Models\Volunteer;
use Illuminate\Http\Request;
use App\Notifications\NuevaSolicitudVoluntariadoNotification;
use App\Notifications\ResguardoVoluntariadoNotification;
use Inertia\Inertia;


class VolunteerController extends Controller
{
    // Página de bienvenida al proceso de voluntariado
    public function welcome()
    {
        return inertia('Volunteers/Welcome');
    }

    // Formulario de voluntariado
    public function form(Request $request)
    {
        $user = $request->user();
        $profile = $user->userProfile;

        return inertia('Volunteers/VolunteersForm', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'profile' => $profile,
        ]);
    }

    // Envío del formulario de voluntariado


    public function submit(Request $request)
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
            'area' => 'required|string|max:255',
            'availability' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $user = auth()->user();

        // 1. Actualiza o crea el perfil del usuario ANTES de validar la edad
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

        // 2. Recarga el perfil actualizado
        $profile = $user->fresh()->userProfile;

        // 3. Ahora sí, valida la edad
        if (!$profile || !$profile->birth_date || \Carbon\Carbon::parse($profile->birth_date)->age < 18) {
            return redirect()->route('volunteers.welcome')->with('error', 'Debes ser mayor de edad para enviar una solicitud.');
        }

        // 4. Si ya tiene una solicitud abierta
        $solicitudAbierta = \App\Models\Volunteer::where('user_id', $user->id)
            ->whereIn('status', ['pendiente', 'aceptado'])
            ->exists();

        if ($solicitudAbierta) {
            return redirect()->route('volunteers.welcome')->with('error', 'Ya tienes una solicitud de voluntariado en curso.');
        }

        // 5. Crea la solicitud de voluntariado
        $volunteer = Volunteer::create([
            'user_id' => $user->id,
            'area' => $request->area,
            'availability' => $request->availability,
            'notes' => $request->notes,
            'start_date' => now(),
            'status' => 'pendiente',
        ]);

        // 1. Notifica al usuario SOLO por mail
        $user->notify(new ResguardoVoluntariadoNotification($volunteer));

        // 2. Notifica a administradores y staff SOLO por notificación interna
        $admins = \App\Models\User::whereHas('roles', function ($q) {
            $q->whereIn('name', ['admin', 'super_admin', 'staff']);
        })->get();

        foreach ($admins as $admin) {
            $admin->notify(new NuevaSolicitudVoluntariadoNotification($volunteer));
        }

        return redirect()->route('volunteers.welcome')
            ->with('success', '¡Solicitud de voluntariado enviada correctamente!');
    }
    // METODOS PARA ADMINISTRADORES

    // Listado de solicitudes de voluntariado (admin)
    public function adminIndex(Request $request)
    {
        $status = $request->input('status', 'todas');
        $statusOptions = [
            'todas' => 'Todas',
            'pendiente' => 'Pendiente',
            'aceptado' => 'Aceptado',
            'rechazado' => 'Rechazado',
        ];

        $query = \App\Models\Volunteer::with('user')
            ->orderBy('created_at', 'desc');

        if (in_array($status, array_keys($statusOptions)) && $status !== 'todas') {
            $query->where('status', $status);
        }

        $volunteers = $query->paginate(10);

        return inertia('Admin/Volunteers/Index', [
            'volunteers' => $volunteers,
            'statusFilter' => $status,
            'statusOptions' => $statusOptions,
        ]);
    }

    // Mostrar detalles de una solicitud
    public function showAdmin(\App\Models\Volunteer $volunteer)
    {
        $volunteer->load('user');
        return inertia('Admin/Volunteers/Show', [
            'volunteer' => $volunteer,
        ]);
    }

    // Editar solicitud
    public function edit(\App\Models\Volunteer $volunteer)
    {
        $volunteer->load('user');
        $statusOptions = [
            'pendiente' => 'Pendiente',
            'aceptado' => 'Aceptado',
            'rechazado' => 'Rechazado',
        ];
        return inertia('Admin/Volunteers/Edit', [
            'volunteer' => $volunteer,
            'statusOptions' => $statusOptions,
        ]);
    }

    // Actualizar estado (aceptar/rechazar)
    public function update(Request $request, \App\Models\Volunteer $volunteer)
    {
        $request->validate([
            'status' => 'required|in:pendiente,aceptado,rechazado',
            'notes' => 'nullable|string',
        ]);

        $volunteer->status = $request->status;
        $volunteer->notes = $request->notes;
        $volunteer->save();

        return redirect()->route('admin.volunteers.show', $volunteer)->with('success', 'Solicitud actualizada correctamente.');
    }
}
