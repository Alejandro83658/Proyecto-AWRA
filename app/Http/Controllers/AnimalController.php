<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;


class AnimalController extends Controller
{
    public function index(Request $request)
    {
        $query = Animal::where('status', 'Disponible')
            ->with(['images' => function ($q) {
                $q->where('is_cover', true);
            }]);

        if ($request->has('species')) {
            $query->where('species', $request->input('species'));
        }

        // Filtro para acogida
        if ($request->boolean('fosterable')) {
            $query->where('is_fosterable', true)
                ->whereDoesntHave('fosterings', function ($q) {
                    $q->where('status', 'pendiente');
                });
        }

        // Filtro para tipo especial
        if ($request->filled('special_type')) {
            $query->where('special_type', $request->input('special_type'));
        }

        $animals = $query->get();

        return inertia('Animals/Index', ['animals' => $animals]);
    }



    public function show(Animal $animal)
    {
        $animal->load('images');
        return inertia('Animals/Show', ['animal' => $animal]);
    }



    public function create()
    {
        // Retornar la vista para crear un nuevo animal
        return inertia('Admin/Animals/Create');
    }



    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'species' => 'required|string|max:255',
            'breed' => 'nullable|string|max:255',
            'sex' => 'required|string|max:10',
            'birth_date' => 'nullable|date',
            'arrival_date' => 'nullable|date',
            'size' => 'nullable|string|max:20',
            'weight_kg' => 'nullable|numeric',
            'chip_number' => 'nullable|string|max:255',
            'status' => 'required|string|max:20',
            'special_type' => 'nullable|string|max:20',
            'description' => 'nullable|string',
            'health_notes' => 'nullable|string',
            'is_fosterable' => 'boolean',
            'is_fostered' => 'boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'cover_index' => 'nullable|integer|min:0',
        ]);

        // Crear el animal
        $animal = Animal::create($request->except(['images', 'cover_index']));

        // Guardar imágenes si existen
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $idx => $image) {
                $path = $image->store('animals', 'public');
                $animal->images()->create([
                    'path' => $path,
                    'is_cover' => $request->input('cover_index', 0) == $idx,
                ]);
            }
        }
        return redirect()->route('admin.animals.index')->with('success', 'Animal creado correctamente.');
    }



    public function edit(Animal $animal)
    {
        $animal->load('images');

        // Normalizo fechas si vienen en formato d/m/Y o Y-m-d
        $birth_date = $animal->birth_date;
        if ($birth_date && preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $birth_date)) {
            $birth_date = \Carbon\Carbon::createFromFormat('d/m/Y', $birth_date)->format('Y-m-d');
        } elseif ($birth_date) {
            $birth_date = \Carbon\Carbon::parse($birth_date)->format('Y-m-d');
        }

        $arrival_date = $animal->arrival_date;
        if ($arrival_date && preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $arrival_date)) {
            $arrival_date = \Carbon\Carbon::createFromFormat('d/m/Y', $arrival_date)->format('Y-m-d');
        } elseif ($arrival_date) {
            $arrival_date = \Carbon\Carbon::parse($arrival_date)->format('Y-m-d');
        }

        $deceased_date = $animal->deceased_date;
        if ($deceased_date && preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $deceased_date)) {
            $deceased_date = \Carbon\Carbon::createFromFormat('d/m/Y', $deceased_date)->format('Y-m-d');
        } elseif ($deceased_date) {
            $deceased_date = \Carbon\Carbon::parse($deceased_date)->format('Y-m-d');
        }

        return inertia('Admin/Animals/Edit', [
            'animal' => [
                ...$animal->toArray(),
                'birth_date' => $birth_date,
                'arrival_date' => $arrival_date,
                'deceased_date' => $deceased_date,
            ]
        ]);
    }



    public function update(Request $request, Animal $animal)
    {
        // Convierte los campos booleanos a enteros antes de validar
        $request->merge([
            'is_fosterable' => $request->input('is_fosterable') == '1' ? 1 : 0,
            'is_fostered' => $request->input('is_fostered') == '1' ? 1 : 0,
        ]);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'species' => 'required|string|in:perro,gato',
            'breed' => 'nullable|string',
            'sex' => 'required|string|in:Macho,Hembra',
            'birth_date' => 'nullable|date',
            'arrival_date' => 'required|date',
            'size' => 'required|string|in:Pequeño,Mediano,Grande',
            'weight_kg' => 'nullable|numeric',
            'chip_number' => 'nullable|string',
            'status' => 'required|string|in:Disponible,Adoptado,Reservado,No disponible,Fallecido',
            'special_type' => 'required|string|in:Ninguno,Urgente,Invisible',
            'deceased_date' => 'nullable|date',
            'description' => 'nullable|string',
            'health_notes' => 'nullable|string',
            'is_fosterable' => 'required|in:0,1',
            'is_fostered' => 'nullable|in:0,1',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'cover_index' => 'nullable|integer|min:0',
            'existing_images' => 'nullable|array',
        ]);

        // Actualizar los datos del animal SOLO con los validados
        $animal->update(collect($validated)->except(['images', 'cover_index', 'existing_images'])->toArray());

        // Eliminar imágenes que el usuario haya quitado
        if ($request->has('existing_images')) {
            foreach ($animal->images()->whereNotIn('id', $request->input('existing_images'))->get() as $img) {
                \Storage::disk('public')->delete($img->path);
                $img->delete();
            }
        }

        // Subir nuevas imágenes si existen
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $idx => $image) {
                $path = $image->store('animals', 'public');
                $animal->images()->create([
                    'path' => $path,
                    'is_cover' => false, // Se ajusta después
                ]);
            }
        }

        // Actualizar la imagen de portada
        // Primero, poner todas las imágenes como no portada
        $animal->images()->update(['is_cover' => false]);

        // Luego, marcar la imagen seleccionada como portada
        // Si es una imagen existente
        if ($request->filled('cover_index')) {
            $coverIndex = $request->input('cover_index');
            $allImages = $animal->images()->get()->values(); // Todas las imágenes ordenadas
            if (isset($allImages[$coverIndex])) {
                $allImages[$coverIndex]->update(['is_cover' => true]);
            }
        }

        return redirect()->route('admin.animals.index')->with('success', 'Animal actualizado correctamente.');
    }


    public function destroy(Animal $animal)
    {
        if (!auth()->user()->hasRole(['admin', 'super_admin'])) {
            abort(403);
        }
        $animal->delete();
        return redirect()->route('admin.animals.index')->with('success', 'Animal eliminado correctamente.');
    }



    public function adminIndex(Request $request)
    {
        $status = $request->input('status');
        $species = $request->input('species');
        $sex = $request->input('sex');
        $isFosterable = $request->input('is_fosterable');
        $isFostered = $request->input('is_fostered');

        $query = Animal::with('images');

        if ($status) {
            $query->where('status', $status);
        }
        if ($species) {
            $query->where('species', $species);
        }
        if ($sex) {
            $query->where('sex', $sex);
        }
        if ($isFosterable !== null && $isFosterable !== '') {
            $query->where('is_fosterable', $isFosterable);
        }
        if ($isFostered !== null && $isFostered !== '') {
            $query->where('is_fostered', $isFostered);
        }

        $animals = $query->paginate(10);

        return inertia('Admin/Animals/Index', [
            'animals' => $animals,
            'statusFilter' => $status,
            'statusOptions' => ['Disponible', 'Adoptado', 'Reservado', 'No disponible', 'Fallecido'],
            'speciesFilter' => $species,
            'speciesOptions' => ['perro', 'gato'],
            'sexFilter' => $sex,
            'sexOptions' => ['Macho', 'Hembra'],
            'isFosterableFilter' => $isFosterable,
            'isFosterableOptions' => [
                '' => 'Todos',
                '1' => 'Sí',
                '0' => 'No',
            ],
            'isFosteredFilter' => $isFostered,
        ]);
    }



    public function showAdmin(Animal $animal)
    {
        $animal->load('images');
        return inertia('Admin/Animals/Show', ['animal' => $animal]);
    }
}
