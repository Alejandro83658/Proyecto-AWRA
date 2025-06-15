<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(), // Relacionar con un usuario
            'first_name' => fn(array $attributes) => \App\Models\User::find($attributes['user_id'])->name, // Usar el name de users como first_name
            'last_name' => fake()->lastName(), // Generar un apellido
            'dni' => fake()->unique()->regexify('[0-9]{8}[A-Z]'),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'city' => fake()->city(),
            'province' => fake()->state(),
            'birth_date' => fake()->dateTimeBetween('-60 years', '-18 years')->format('Y-m-d'),
            'profile_picture' => fake()->imageUrl(640, 480, 'people', true), // Generar una URL de imagen
            'comments' => fake()->optional()->paragraph(),
        ];
    }
}
