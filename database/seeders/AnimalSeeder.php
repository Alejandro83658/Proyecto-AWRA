<?php


namespace Database\Seeders;

use App\Models\Animal;
use Illuminate\Database\Seeder;

class AnimalSeeder extends Seeder
{
    public function run(): void
    {
        // Max está disponible para acoger
        Animal::create([
            'name' => 'Moro',
            'species' => 'perro',
            'breed' => 'Labrador Retriever',
            'sex' => 'Macho',
            'birth_date' => '2019-05-15',
            'arrival_date' => now()->subDays(100),
            'size' => 'Grande',
            'weight_kg' => 30.5,
            'chip_number' => '123456789012345',
            'status' => 'Disponible',
            'special_type' => 'Ninguno', // <--- Tipo especial
            'description' => 'Max es un perro noble, juguetón y muy cariñoso. Tiene una energía contagiosa y siempre está listo para salir a pasear o jugar a la pelota en el parque. Le encanta correr y explorar nuevos lugares, pero también disfruta de los momentos tranquilos en casa, donde se acurruca junto a sus personas favoritas. Max es muy sociable, se lleva bien con otros perros y también con niños, por lo que es perfecto para familias activas que buscan un compañero leal y divertido. Además de su carácter alegre, Max es muy inteligente y aprende rápido nuevas órdenes y trucos. Siempre está atento y dispuesto a complacer, lo que hace que la convivencia con él sea muy fácil y agradable. Le gusta recibir caricias y mimos, y responde con mucho afecto y gratitud. Max está esperando encontrar un hogar donde pueda dar y recibir todo el amor que tiene para ofrecer. Si buscas un amigo fiel, juguetón y lleno de vida, Max es el perro ideal para ti.',
            'health_notes' => 'Vacunado y desparasitado.',
            'is_fosterable' => true, // <--- Disponible para acoger
        ]);

        // Luna está disponible para acoger
        Animal::create([
            'name' => 'Tai',
            'species' => 'gato',
            'breed' => 'Siames',
            'sex' => 'Hembra',
            'birth_date' => '2020-07-20',
            'arrival_date' => now()->subDays(50),
            'size' => 'Pequeño',
            'weight_kg' => 4.2,
            'chip_number' => '987654321098765',
            'status' => 'Disponible',
            'special_type' => 'Ninguno', // <--- Tipo especial
            'description' => 'Luna es una gata elegante y serena, con un pelaje suave y unos ojos azules que    reflejan su curiosidad y dulzura. Le encanta buscar los rincones soleados de la casa para descansar y observar todo lo que ocurre a su alrededor. Aunque al principio puede mostrarse algo reservada, en cuanto toma confianza se convierte en una compañera muy cariñosa, que disfruta de las caricias y el contacto humano. Luna es muy sociable con otros gatos y se adapta fácilmente a ambientes tranquilos, por lo que es ideal para familias o personas que buscan una amiga fiel y tranquila. Es una gata inteligente, aprende rápido las rutinas del hogar y sabe pedir mimos de la forma más tierna. Le gusta jugar con pelotas y cuerdas, pero también sabe disfrutar de los momentos de calma y relax. Luna está esperando un hogar donde pueda recibir el cariño y la atención que merece, y donde pueda compartir su ternura y serenidad. Si buscas una gata dulce, equilibrada y llena de amor, Luna es la compañera perfecta para ti.',
            'health_notes' => 'Esterilizada.',
            'is_fosterable' => true, // <--- Disponible para acoger
        ]);

        // Crear 10 animales generados automáticamente (is_fosterable en false por defecto)
        Animal::factory()->count(10)->create();

        // Selecciona aleatoriamente un animal y márcalo como Urgente
        $urgente = Animal::inRandomOrder()->first();
        if ($urgente) {
            $urgente->special_type = 'Urgente';
            $urgente->save();
        }

        // Selecciona aleatoriamente otro animal distinto y márcalo como Invisible
        $invisible = Animal::where('id', '!=', $urgente?->id)->inRandomOrder()->first();
        if ($invisible) {
            $invisible->special_type = 'Invisible';
            $invisible->save();
        }
    }
}
