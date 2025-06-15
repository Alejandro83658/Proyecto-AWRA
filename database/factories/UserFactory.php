<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $usedNames = [];

        do {
            $name = fake()->firstName();
            // Eliminar tildes y caracteres especiales
            $cleanName = iconv('UTF-8', 'ASCII//TRANSLIT', $name);
            $cleanName = preg_replace('/[^a-zA-Z0-9]/', '', $cleanName); // Permite letras y números
            $cleanName = strtolower($cleanName);
        } while (in_array($cleanName, $usedNames));

        $usedNames[] = $cleanName;
        $email = $cleanName . '@example.com';

        return [
            'name' => $name,
            'email' => $email,
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }
}
