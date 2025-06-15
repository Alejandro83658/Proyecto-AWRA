<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // Obtener todos los roles disponibles (para el filtro)
        $roles = \Spatie\Permission\Models\Role::pluck('name')->toArray();

        // Consulta base
        $query = User::with('userProfile', 'roles');

        // Si hay filtro de rol, aplicarlo
        if ($request->filled('role')) {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('name', $request->role);
            });
        }

        $users = $query->paginate(10);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'filters' => [
                'role' => $request->role,
            ],
        ]);
    }

    public function create()
    {
        // Obtener todos los roles disponibles
        $roles = Role::all();

        // Retornar la vista para crear un nuevo usuario
        return Inertia::render('Admin/Users/New', [
            'roles' => $roles,
        ]);
    }



    public function store(Request $request)
    {
        // Validar los datos del formulario
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            // Agregar validaciones para el perfil si es necesario
        ]);

        // Crear el usuario
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Crear el perfil asociado 
        if ($request->has('userProfile')) {
            $user->userProfile()->create($request->input('userProfile'));
        }

        // Redirigir a la lista de usuarios con un mensaje de éxito
        return redirect()->route('admin.users.index')->with('success', 'Usuario creado correctamente.');
    }




    public function show(User $user)
    {
        $user->load('userProfile');
        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'userProfile' => $user->userProfile,
        ]);
    }


    public function edit(User $user)
    {
        $user->load('userProfile');
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'userProfile' => $user->userProfile,
        ]);
    }



    public function update(Request $request, User $user)
    {
        // Validar los datos del formulario
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            // se pueden agregar aquí validaciones para los campos del perfil 
            'userProfile.phone' => 'nullable|string|max:255',
            'userProfile.dni' => 'nullable|string|max:255',
            'userProfile.address' => 'nullable|string|max:255',
            'userProfile.city' => 'nullable|string|max:255',
            'userProfile.province' => 'nullable|string|max:255',
            'userProfile.birth_date' => 'nullable|date',
            'userProfile.comments' => 'nullable|string',
        ]);

        // Actualizar los datos del usuario
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'] ? \Hash::make($validated['password']) : $user->password,
        ]);

        // Actualizar o crear el perfil asociado
        $profileData = $request->input('userProfile', []);
        if (!empty($profileData)) {
            $user->userProfile()->updateOrCreate([], $profileData);
        }

        // Redirigir a la lista de usuarios con un mensaje de éxito
        return redirect()->route('admin.users.index')->with('success', 'Usuario actualizado correctamente.');
    }



    public function destroy(User $user)
    {
        if (!auth()->user()->hasRole(['admin', 'super_admin'])) {
            abort(403);
        }
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'Usuario eliminado correctamente.');
    }



    public function rolesIndex()
    {
        if (!auth()->user()->hasRole(['admin', 'super_admin'])) {
            abort(403);
        }
        $users = User::with('roles')
            ->paginate(10)
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->roles->pluck('name')->first() ?? 'public',
                ];
            });

        return Inertia::render('Admin/Users/Roles', [
            'users' => $users,
        ]);
    }

    public function updateRoles(Request $request)
    {
        foreach ($request->input('users', []) as $userData) {
            $user = User::find($userData['id']);
            if ($user) {
                $user->syncRoles([$userData['role']]);
            }
        }
        return redirect()->back()->with('success', 'Roles actualizados correctamente.');
    }
}
