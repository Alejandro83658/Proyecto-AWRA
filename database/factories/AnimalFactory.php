<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $breeds = [
            'perro' => ['Pastor Alemán', 'Mestizo', 'Golden Retriever', 'Beagle'],
            'gato' => ['Europeo', 'Mestizo', 'Persa', 'Maine Coon']
        ];

        $species = $this->faker->randomElement(['perro', 'gato']);

        // Lista de nombres de mascotas
        $petNames = [
            'Luna',
            'Max',
            'Bella',
            'Charlie',
            'Lucy',
            'Cooper',
            'Daisy',
            'Rocky',
            'Milo',
            'Lola',
            'Simba',
            'Nala',
            'Buddy',
            'Chloe',
            'Toby',
            'Coco',
            'Leo',
            'Molly',
            'Oscar',
            'Lily',
            'Moro',
            'China',
            'Chico',
            'Rex',
            'Calcetines',
            'Bigotes',
        ];

        return [
            'name' => $this->faker->randomElement($petNames), // Nombre de mascota
            'species' => $species,
            'breed' => $this->faker->randomElement($breeds[$species]),
            'sex' => $this->faker->randomElement(['Macho', 'Hembra']),
            'birth_date' => $this->faker->date('Y-m-d', '-1 years'),
            'arrival_date' => $this->faker->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
            'size' => $this->faker->randomElement(['Pequeño', 'Mediano', 'Grande']),
            'weight_kg' => $this->faker->randomFloat(2, 2, 40),
            'chip_number' => $this->faker->optional()->numerify('###########'),
            'status' => 'Disponible',
            'description' => $this->faker->sentence(),
            'health_notes' => $this->faker->optional()->sentence(),
        ];
    }
}
