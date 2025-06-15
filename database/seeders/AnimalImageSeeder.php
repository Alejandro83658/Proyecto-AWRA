<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Animal;
use App\Models\AnimalImage;

class AnimalImageSeeder extends Seeder
{
    public function run()
    {
        // Imágenes de Moro (id = 1)
        $moroImages = [
            'storage/animals/labrador1.jpg',
            'storage/animals/labrador2.jpg',
            'storage/animals/labrador3.jpg',
            'storage/animals/labrador4.jpg',
        ];

        $moro = Animal::find(1);
        if ($moro) {
            foreach ($moroImages as $i => $img) {
                AnimalImage::create([
                    'animal_id' => $moro->id,
                    'path' => $img,
                    'is_cover' => $i === 0,
                ]);
            }
        }

        // Imágenes de Tai (id = 2)
        $taiImages = [
            'storage/animals/siames1.jpg',
            'storage/animals/siames2.jpg',
            'storage/animals/siames3.jpg',
            'storage/animals/siames4.jpg',
        ];

        $tai = Animal::find(2);
        if ($tai) {
            foreach ($taiImages as $i => $img) {
                AnimalImage::create([
                    'animal_id' => $tai->id,
                    'path' => $img,
                    'is_cover' => $i === 0,
                ]);
            }
        }

        // Para el resto de animales, imágenes aleatorias de perros o gatos
        $animals = Animal::whereNotIn('id', [1, 2])->get();

        foreach ($animals as $animal) {
            
            $species = strtolower($animal->species ?? $animal->especie ?? '');
            if ($species === 'perro' || $species === 'dog') {
                $isDog = true;
            } elseif ($species === 'gato' || $species === 'cat') {
                $isDog = false;
            } else {
                // Si no hay especie, asigna aleatoriamente
                $isDog = (rand(0, 1) === 0);
            }

            for ($i = 1; $i <= 5; $i++) {
                $width = 600 + $i;
                $height = 400 + $i;

                if ($isDog) {
                    $imageUrl = "https://placedog.net/{$width}/{$height}?random={$animal->id}_{$i}";
                } else {
                    $imageUrl = "https://cataas.com/cat?width={$width}&height={$height}&r=" . rand();
                }

                AnimalImage::create([
                    'animal_id' => $animal->id,
                    'path'      => $imageUrl,
                    'is_cover'  => $i === 1,
                ]);
            }
        }
    }
}