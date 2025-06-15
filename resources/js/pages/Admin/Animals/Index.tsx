import { Link, router } from '@inertiajs/react';
import AwraAdminAnimalLayout from '@/layouts/awra-adminAnimal-layout';
import type { Animal } from '@/types';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface AdminAnimalsIndexProps {
    animals: {
        data: Animal[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    statusFilter?: string;
    statusOptions: string[];
}

export default function AdminAnimalsIndex({
    animals,
    statusFilter,
    statusOptions,
    speciesFilter,
    speciesOptions,
    sexFilter,
    sexOptions,
    isFosterableFilter,
    isFosterableOptions,
    isFosteredFilter,
}: any) {
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const form = e.target.form as HTMLFormElement;
        router.get('/admin/animals', {
            status: form.status.value,
            species: form.species.value,
            sex: form.sex.value,
            is_fosterable: form.is_fosterable.value,
            is_fostered: form.is_fostered.value,
        });
    };

    return (
        <AwraAdminAnimalLayout paginationLinks={animals.links}>
            <h2 className="text-xl font-semibold mb-4">Panel administrativo de animales</h2>
            <form className="mb-4 flex flex-wrap gap-4 items-end">
                <div>
                    <label className="mr-2 font-semibold text-gray-700 dark:text-gray-200 text-sm">Estado:</label>
                    <select
                        name="status"
                        value={statusFilter || ''}
                        onChange={handleFilterChange}
                        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded px-2 py-1 text-sm"
                    >
                        <option value="">Todos</option>
                        {statusOptions.map((status: string) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mr-2 font-semibold text-gray-700 dark:text-gray-200 text-sm">Especie:</label>
                    <select
                        name="species"
                        value={speciesFilter || ''}
                        onChange={handleFilterChange}
                        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded px-2 py-1 text-sm"
                    >
                        <option value="">Todas</option>
                        {speciesOptions.map((sp: string) => (
                            <option key={sp} value={sp}>{sp.charAt(0).toUpperCase() + sp.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mr-2 font-semibold text-gray-700 dark:text-gray-200 text-sm">Sexo:</label>
                    <select
                        name="sex"
                        value={sexFilter || ''}
                        onChange={handleFilterChange}
                        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded px-2 py-1 text-sm"
                    >
                        <option value="">Ambos</option>
                        {sexOptions.map((sx: string) => (
                            <option key={sx} value={sx}>{sx}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mr-2 font-semibold text-gray-700 dark:text-gray-200 text-sm">¿Acogible?</label>
                    <select
                        name="is_fosterable"
                        value={isFosterableFilter ?? ''}
                        onChange={handleFilterChange}
                        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded px-2 py-1 text-sm"
                    >
                        <option value="">Todos</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div>
                    <label className="mr-2 font-semibold text-gray-700 dark:text-gray-200 text-sm">¿En acogida?</label>
                    <select
                        name="is_fostered"
                        value={isFosteredFilter ?? ''}
                        onChange={handleFilterChange}
                        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded px-2 py-1 text-sm"
                    >
                        <option value="">Todos</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </form>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Especie</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>¿Acogible?</TableHead>
                        <TableHead>¿En acogida?</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(animals.data ?? []).map((animal: Animal) => (
                        <TableRow key={animal.id}>
                            <TableCell>{animal.id}</TableCell>
                            <TableCell>{animal.name}</TableCell>
                            <TableCell>{animal.species}</TableCell>
                            <TableCell>{animal.status}</TableCell>
                            <TableCell>{animal.is_fosterable ? 'Sí' : 'No'}</TableCell>
                            <TableCell>{animal.is_fostered ? 'Sí' : 'No'}</TableCell>
                            <TableCell className="flex gap-2 justify-end">
                                <Link
                                    href={`/admin/animals/${animal.id}`}
                                    className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition"
                                >
                                    <Button size="sm" variant="outline">Ver</Button>
                                </Link>
                                <Link
                                    href={`/admin/animals/${animal.id}/edit`}
                                    className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition"
                                >
                                    <Button size="sm" variant="secondary">Editar</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AwraAdminAnimalLayout>
    );
}