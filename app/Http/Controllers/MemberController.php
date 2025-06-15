<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Notifications\NuevaSolicitudSocioNotification;
use App\Notifications\ResguardoSocioNotification;

class MemberController extends Controller
{
    // Página de bienvenida al proceso de hacerse socio
    public function welcome()
    {
        return Inertia::render('Members/Welcome');
    }

    // Formulario de alta de socio
    public function form(Request $request)
    {
        $user = $request->user();
        $profile = $user->userProfile;
        $member = $user->member;

        return Inertia::render('Members/MemberForm', [
            'profile' => $profile,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'member' => $member,
        ]);
    }

    // Envío del formulario de alta de socio
    public function submit(Request $request)
    {
        $user = $request->user();

        // 1. Valida los datos del formulario
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'nullable|string|max:255',
            'dni' => 'required|string',
            'direccion' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:20',
            'birth_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'frequency' => 'required|in:mensual,trimestral,anual',
            'payment_method' => 'required|in:transferencia,tarjeta,bizum',
            'comments' => 'nullable|string',
            'city' => 'nullable|string',
            'province' => 'nullable|string',
        ]);

        // 2. Valida la edad usando el campo recibido
        if (!$data['birth_date'] || Carbon::parse($data['birth_date'])->age < 18) {
            return redirect()->route('members.welcome')
                ->with('error', 'Debes ser mayor de edad para hacerte socio/a.');
        }

        // 3. Comprueba si ya tiene una solicitud de socio pendiente o aceptada
        $solicitudAbierta = Member::where('user_id', $user->id)
            ->whereIn('status', ['pendiente', 'aceptado'])
            ->exists();

        if ($solicitudAbierta) {
            return redirect()->route('members.welcome')
                ->with('error', 'Ya tienes una solicitud de socio/a en curso.');
        }

        // 4. Actualiza o crea el perfil del usuario
        $user->userProfile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'dni' => $data['dni'],
                'phone' => $data['telefono'],
                'address' => $data['direccion'],
                'city' => $data['city'],
                'province' => $data['province'],
                'first_name' => $data['nombre'],
                'last_name' => $data['apellidos'],
                'email' => $data['email'],
                'birth_date' => $data['birth_date'],
            ]
        );

        // 5. Actualiza o crea la membresía
        $member = Member::updateOrCreate(
            ['user_id' => $user->id],
            [
                'name' => $data['nombre'],
                'email' => $data['email'],
                'phone' => $data['telefono'],
                'dni' => $data['dni'],
                'address' => $data['direccion'],
                'city' => $data['city'],
                'province' => $data['province'],
                'amount' => $data['amount'],
                'frequency' => $data['frequency'],
                'payment_method' => $data['payment_method'],
                'comments' => $data['comments'],
                'birth_date' => $data['birth_date'],
                'status' => 'pendiente',
            ]
        );

        // Notifica al usuario SOLO por mail
        $user->notify(new ResguardoSocioNotification($member));

        // Notifica a administradores y staff SOLO por notificación interna
        $admins = User::whereHas('roles', function ($q) {
            $q->whereIn('name', ['admin', 'super_admin', 'staff']);
        })->get();

        foreach ($admins as $admin) {
            $admin->notify(new NuevaSolicitudSocioNotification($member));
        }

        return redirect()->route('members.welcome')->with('success', '¡Solicitud de socio enviada correctamente!');
    }

    // Bloque de administración

    // Listado de socios con filtro por estado
    public function adminIndex(Request $request)
    {
        $status = $request->input('status', '');
        $statusOptions = [
            'all' => 'Todos',
            'pendiente' => 'Pendiente',
            'aceptado' => 'Aceptado',
            'rechazado' => 'Rechazado',
        ];

        $query = Member::orderBy('created_at', 'desc');

        if (in_array($status, array_keys($statusOptions)) && $status !== '') {
            $query->where('status', $status);
        }

        $members = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/Members/Index', [
            'members' => $members,
            'statusFilter' => $status,
            'statusOptions' => $statusOptions,
        ]);
    }

    // Muestra los detalles de un socio para el administrador
    public function showAdmin(Member $member)
    {
        return Inertia::render('Admin/Members/Show', ['member' => $member]);
    }

    // Muestra el formulario de edición de un socio para el administrador
    public function editAdmin(Member $member)
    {
        $statusOptions = [
            'pendiente' => 'Pendiente',
            'aceptado' => 'Aceptado',
            'rechazado' => 'Rechazado',
        ];
        return Inertia::render('Admin/Members/Edit', [
            'member' => $member,
            'statusOptions' => $statusOptions,
        ]);
    }

    // Actualiza el estado o comentarios de un socio desde el panel de administración
    public function updateAdmin(Request $request, Member $member)
    {
        $data = $request->validate([
            'status' => 'required|in:pendiente,aceptado,rechazado',
            'comments' => 'nullable|string',
        ]);

        $member->update($data);

        return redirect()->route('admin.members.show', $member)->with('success', 'Socio actualizado correctamente.');
    }
}
