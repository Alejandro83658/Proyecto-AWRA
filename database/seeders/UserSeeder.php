<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProfile;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Crear 10 usuarios con sus perfiles
        User::factory(10)
            ->has(UserProfile::factory()) // Relacionamos el perfil con el usuario
            ->create();
    }
}
