<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run()
    {
        // Leer las variables del archivo .env
        $email = env('ADMIN_EMAIL', 'admin@mail.com');
        $password = env('ADMIN_PASSWORD', '12345678');

        // Crear o actualizar el usuario administrador
        User::updateOrCreate(
            ['email' => $email], // Identificar por correo
            [
                'name' => 'Administrador',
                'password' => bcrypt($password), // Encriptar la contraseña
            ]
        );

        echo "Administrador creado o actualizado con éxito.\n";
    }
}
