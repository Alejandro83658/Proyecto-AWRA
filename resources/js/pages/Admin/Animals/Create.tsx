import AwraAdminAnimalLayout from '@/layouts/awra-adminAnimal-layout';
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
    const [data, setData] = useState({
        name: '',
        species: '',
        breed: '',
        sex: '',
        birth_date: '',
        arrival_date: '',
        size: '',
        weight_kg: '',
        chip_number: '',
        status: '',
        special_type: '',
        description: '',
        health_notes: '',
        is_fosterable: 0,
        is_fostered: 0,
    });

    const [images, setImages] = useState<File[]>([]);
    const [coverIndex, setCoverIndex] = useState<number>(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [processing, setProcessing] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
            setCoverIndex(0); // Por defecto la primera es portada
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as any);
        });
        images.forEach((img) => formData.append('images[]', img));
        formData.append('cover_index', coverIndex.toString());        

        router.post(route('admin.animals.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setImages([]);
                setCoverIndex(0);
                setErrors({});
                setProcessing(false);
            },
            onError: (err) => {
                setErrors(err);
                setProcessing(false);
            },
        });
    };

    return (
        <AwraAdminAnimalLayout>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <h2 className="text-xl font-semibold">Nuevo animal</h2>
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
                            <SelectItem value="Acogido">Acogido</SelectItem>
                            <SelectItem value="Reservado">Reservado</SelectItem>
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
                <div className="space-y-2">
                    <Label htmlFor="images">Imágenes</Label>
                    <Input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errors.images && <div className="text-red-600">{errors.images}</div>}
                    {images.length > 0 && (
                        <div className="flex gap-4 mt-2 flex-wrap">
                            {images.map((img, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`preview-${idx}`}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <label className="mt-1 text-sm">
                                        <input
                                            type="radio"
                                            name="cover"
                                            checked={coverIndex === idx}
                                            onChange={() => setCoverIndex(idx)}
                                        />{' '}
                                        Portada
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Button type="submit" disabled={processing}>
                    Guardar
                </Button>
            </form>
        </AwraAdminAnimalLayout>
    );
}