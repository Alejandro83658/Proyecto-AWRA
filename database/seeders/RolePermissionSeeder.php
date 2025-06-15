<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear el rol super_admin si no existe
        $role = Role::firstOrCreate(['name' => 'super_admin']);

        // Asignar el rol al usuario con ID 1
        $user = User::find(1);
        if ($user) {
            $user->assignRole($role);
        }
    }
}
