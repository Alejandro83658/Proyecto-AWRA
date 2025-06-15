import AwraAdminAnimalLayout from '@/layouts/awra-adminAnimal-layout';
import DeleteAnimal from '@/components/awra-components/awra-deleteAnimal';
import { router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Animal, AnimalImage } from '@/types';
import React, { useState } from 'react';

interface AdminAnimalEditProps {
    animal: Animal;
}

const getImageUrl = (path: string) => {
  if (!path) return '/default.jpg';
  if (path.startsWith('http')) return path;
  if (path.startsWith('storage/')) return `/${path}`;
  if (path.startsWith('animals/')) return `/storage/${path}`;
  return `/${path}`;
};

export default function AdminAnimalEdit({ animal }: AdminAnimalEditProps) {
    const [data, setData] = useState({
        name: animal.name || '',
        species: animal.species || '',
        breed: animal.breed || '',
        sex: animal.sex || '',
        birth_date: animal.birth_date || '',
        arrival_date: animal.arrival_date || '',
        size: animal.size || '',
        weight_kg: animal.weight_kg || '',
        chip_number: animal.chip_number || '',
        status: animal.status || '',
        special_type: animal.special_type || '',
        description: animal.description || '',
        health_notes: animal.health_notes || '',
        is_fosterable: animal.is_fosterable ? 1 : 0,
        is_fostered: animal.is_fostered ? 1 : 0,
    });

    // Imágenes actuales (del backend)
    const [currentImages, setCurrentImages] = useState<AnimalImage[]>(animal.images || []);
    // Nuevas imágenes seleccionadas
    const [newImages, setNewImages] = useState<File[]>([]);
    // Índice de portada (en la lista combinada)
    const initialCoverIndex = (() => {
        const idx = (animal.images || []).findIndex((img) => img.is_cover);
        return idx >= 0 ? idx : 0;
    })();
    const [coverIndex, setCoverIndex] = useState<number>(initialCoverIndex);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [processing, setProcessing] = useState(false);

    // Manejar nuevas imágenes
    const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewImages(Array.from(e.target.files));
            if (currentImages.length === 0) setCoverIndex(0);
        }
    };

    // Eliminar imagen actual (solo en frontend, hasta guardar)
    const handleRemoveCurrentImage = (id: number) => {
        const filtered = currentImages.filter((img) => img.id !== id);
        setCurrentImages(filtered);
        // Si la portada era esa, resetea la portada
        if (coverIndex >= filtered.length + newImages.length) setCoverIndex(0);
    };

    // Eliminar nueva imagen (antes de enviar)
    const handleRemoveNewImage = (idx: number) => {
        const filtered = newImages.filter((_, i) => i !== idx);
        setNewImages(filtered);
        if (coverIndex >= currentImages.length + filtered.length) setCoverIndex(0);
    };

    // Enviar formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'boolean' || key === 'is_fosterable' || key === 'is_fostered') {
                formData.append(key, value ? '1' : '0');
            } else if (value !== undefined && value !== null) {
                formData.append(key, value === '' ? '' : value.toString());
            } else {
                formData.append(key, '');
            }
        });
        currentImages.forEach((img) => formData.append('existing_images[]', img.id.toString()));
        newImages.forEach((img) => formData.append('images[]', img));
        formData.append('cover_index', coverIndex.toString());

        // Aquí el cambio importante:
        formData.append('_method', 'PUT');
        router.post(route('admin.animals.update', animal.id), formData, {
            forceFormData: true,
            onSuccess: () => { setProcessing(false); },
            onError: (err) => { setProcessing(false); setErrors(err); },
        });
    };
    // Renderizado de imágenes (actuales + nuevas)
    const allImages = [
        ...currentImages.map((img) => ({
            src: `/storage/${img.path}`,
            isNew: false as const,
        })),
        ...newImages.map((img) => ({
            src: URL.createObjectURL(img),
            isNew: true as const,
        })),
    ];


    return (
        <AwraAdminAnimalLayout>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <h2 className="text-xl font-semibold">Editar animal</h2>
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
                    {errors.name && <div className="text-red-600">{errors.name}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="species">Especie</Label>
                    <Select value={data.species} onValueChange={value => setData({ ...data, species: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="perro">Perro</SelectItem>
                            <SelectItem value="gato">Gato</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.species && <div className="text-red-600">{errors.species}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="breed">Raza</Label>
                    <Input id="breed" value={data.breed} onChange={e => setData({ ...data, breed: e.target.value })} />
                    {errors.breed && <div className="text-red-600">{errors.breed}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sex">Sexo</Label>
                    <Select value={data.sex} onValueChange={value => setData({ ...data, sex: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Macho">Macho</SelectItem>
                            <SelectItem value="Hembra">Hembra</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.sex && <div className="text-red-600">{errors.sex}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="birth_date">Fecha de nacimiento</Label>
                    <Input id="birth_date" type="date" value={data.birth_date} onChange={e => setData({ ...data, birth_date: e.target.value })} />
                    {errors.birth_date && <div className="text-red-600">{errors.birth_date}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="arrival_date">Fecha de llegada</Label>
                    <Input id="arrival_date" type="date" value={data.arrival_date} onChange={e => setData({ ...data, arrival_date: e.target.value })} />
                    {errors.arrival_date && <div className="text-red-600">{errors.arrival_date}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="size">Tamaño</Label>
                    <Select value={data.size} onValueChange={value => setData({ ...data, size: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pequeño">Pequeño</SelectItem>
                            <SelectItem value="Mediano">Mediano</SelectItem>
                            <SelectItem value="Grande">Grande</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.size && <div className="text-red-600">{errors.size}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="weight_kg">Peso (kg)</Label>
                    <Input id="weight_kg" type="number" value={data.weight_kg} onChange={e => setData({ ...data, weight_kg: e.target.value })} />
                    {errors.weight_kg && <div className="text-red-600">{errors.weight_kg}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="chip_number">Chip</Label>
                    <Input id="chip_number" value={data.chip_number} onChange={e => setData({ ...data, chip_number: e.target.value })} />
                    {errors.chip_number && <div className="text-red-600">{errors.chip_number}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select value={data.status} onValueChange={value => setData({ ...data, status: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Disponible">Disponible</SelectItem>
                            <SelectItem value="Adoptado">Adoptado</SelectItem>
                            <SelectItem value="Reservado">Reservado</SelectItem>
                            <SelectItem value="No disponible">No disponible</SelectItem>
                            <SelectItem value="Fallecido">Fallecido</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.status && <div className="text-red-600">{errors.status}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="special_type">Tipo especial</Label>
                    <Select value={data.special_type} onValueChange={value => setData({ ...data, special_type: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Ninguno">Ninguno</SelectItem>
                            <SelectItem value="Urgente">Urgente</SelectItem>
                            <SelectItem value="Invisible">Invisible</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.special_type && <div className="text-red-600">{errors.special_type}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" value={data.description} onChange={e => setData({ ...data, description: e.target.value })} />
                    {errors.description && <div className="text-red-600">{errors.description}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="health_notes">Notas de salud</Label>
                    <Textarea id="health_notes" value={data.health_notes} onChange={e => setData({ ...data, health_notes: e.target.value })} />
                    {errors.health_notes && <div className="text-red-600">{errors.health_notes}</div>}
                </div>
                <div className="flex items-center gap-2">
                    <input
                        id="is_fosterable"
                        type="checkbox"
                        checked={!!data.is_fosterable}
                        onChange={e => setData({ ...data, is_fosterable: e.target.checked ? 1 : 0 })}
                    />
                    <Label htmlFor="is_fosterable">Disponible para acogida</Label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        id="is_fostered"
                        type="checkbox"
                        checked={!!data.is_fostered}
                        onChange={e => setData({ ...data, is_fostered: e.target.checked ? 1 : 0 })}
                    />
                    <Label htmlFor="is_fostered">Actualmente en acogida</Label>
                </div>
                {/* Gestión de imágenes */}
                <div className="space-y-2">
                    <Label>Imágenes actuales</Label>
                    <div className="flex gap-4 flex-wrap">
                        {currentImages.length === 0 && <div className="text-gray-500 text-sm">No hay imágenes actuales</div>}
                        {currentImages.map((img, idx) => (
                            <div key={`old-${img.id}`} className="flex flex-col items-center">
                                <img
                                    src={getImageUrl(img.path)}
                                    alt=""
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <label className="mt-1 text-sm">
                                    <input
                                        type="radio"
                                        name="cover"
                                        checked={coverIndex === idx}
                                        onChange={() => setCoverIndex(idx)}
                                    /> Portada
                                </label>
                                <button
                                    type="button"
                                    className="text-xs text-red-600 mt-1"
                                    onClick={() => handleRemoveCurrentImage(img.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                    <Label className="mt-4">Nuevas imágenes</Label>
                    <div className="flex gap-4 flex-wrap">
                        {newImages.length === 0 && <div className="text-gray-500 text-sm">No hay nuevas imágenes</div>}
                        {newImages.map((img, idx) => (
                            <div key={`new-${idx}`} className="flex flex-col items-center">
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt=""
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <label className="mt-1 text-sm">
                                    <input
                                        type="radio"
                                        name="cover"
                                        checked={coverIndex === currentImages.length + idx}
                                        onChange={() => setCoverIndex(currentImages.length + idx)}
                                    /> Portada
                                </label>
                                <button
                                    type="button"
                                    className="text-xs text-red-600 mt-1"
                                    onClick={() => handleRemoveNewImage(idx)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                    <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleNewImageChange}
                    />
                    {errors.images && <div className="text-red-600">{errors.images}</div>}
                </div>
                <div className="flex gap-2 mt-4">
                    <Button type="submit" disabled={processing}>
                        Guardar cambios
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => router.visit(route('admin.animals.index'))}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
            <DeleteAnimal animalId={animal.id} animalName={animal.name} />
        </AwraAdminAnimalLayout>
    );
}