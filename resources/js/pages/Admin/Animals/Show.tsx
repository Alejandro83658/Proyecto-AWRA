import AwraAdminAnimalLayout from '@/layouts/awra-adminAnimal-layout';
import type { Animal } from '@/types';

interface AdminAnimalShowProps {
    animal: Animal;
}

export default function AdminAnimalShow({ animal }: AdminAnimalShowProps) {
    return (
        <AwraAdminAnimalLayout>
            <h2 className="text-xl font-semibold mb-4">Ficha de {animal.name}</h2>
            <div className="space-y-2">
                <div><strong>ID:</strong> {animal.id}</div>
                <div><strong>Nombre:</strong> {animal.name}</div>
                <div><strong>Especie:</strong> {animal.species}</div>
                <div><strong>Estado:</strong> {animal.status}</div>
                <div><strong>Raza:</strong> {animal.breed}</div>
                <div><strong>Sexo:</strong> {animal.sex}</div>
                <div><strong>Fecha de nacimiento:</strong> {animal.birth_date}</div>
                <div><strong>Fecha de llegada:</strong> {animal.arrival_date}</div>
                <div><strong>Peso:</strong> {animal.weight_kg}</div>
                <div><strong>Nº chip:</strong> {animal.chip_number}</div>
                <div><strong>Tipo especial:</strong> {animal.special_type}</div>
                <div><strong>Descripción:</strong> {animal.description}</div>
                <div><strong>Notas de salud:</strong> {animal.health_notes}</div>
                <div><strong>Acogible:</strong> {animal.is_fosterable ? 'Sí' : 'No'}</div>
                <div><strong>Actualmente en acogida:</strong> {animal.is_fostered ? 'Sí' : 'No'}</div>
            </div>
        </AwraAdminAnimalLayout>
    );
}