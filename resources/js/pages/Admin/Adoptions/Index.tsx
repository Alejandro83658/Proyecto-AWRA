import { Link } from '@inertiajs/react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import type { Adoption } from '@/types';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Props {
    adoptions: {
        data: Adoption[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    statusFilter: string;
    statusOptions: { [key: string]: string };
}

export default function AdminAdoptionsIndex({ adoptions, statusFilter, statusOptions }: Props) {
    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('status', value);
        window.location.search = params.toString();
    };

    return (
        <AwraAdminPagesLayout
            title="Adopciones"
            subtitle="Gestión de solicitudes de adopción"
            sidebarItems={[
                { title: 'Adopciones', href: '/admin/adoptions' },
            ]}
            paginationLinks={adoptions.links}
        >
            <h2 className="text-xl font-semibold mb-4">Panel administrativo de adopciones</h2>

            {/* Filtro por estado */}
            <div className="mb-4">
                <label className="mr-2 font-semibold">Filtrar por estado:</label>
                <Select value={statusFilter} onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(statusOptions).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Animal</TableHead>
                        <TableHead>Solicitante</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(adoptions.data ?? []).length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                                No hay solicitudes de adopción.
                            </TableCell>
                        </TableRow>
                    ) : (
                        adoptions.data.map((adoption: Adoption) => (
                            <TableRow key={adoption.id}>
                                <TableCell>{adoption.id}</TableCell>
                                <TableCell>
                                    <span className="font-mono text-xs text-gray-500">#{adoption.animal_id}</span>
                                    <br />
                                    {adoption.animal_name}
                                </TableCell>
                                <TableCell>
                                    <span className="font-mono text-xs text-gray-500">#{adoption.user_id}</span>
                                    <br />
                                    {adoption.user_name}
                                </TableCell>
                                <TableCell className="capitalize">{adoption.status}</TableCell>
                                <TableCell className="text-xs text-gray-500">
                                    {new Date(adoption.created_at).toLocaleString()}
                                </TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    <Link href={`/admin/adoptions/${adoption.id}`}>
                                        <Button size="sm" variant="outline">Ver</Button>
                                    </Link>
                                    <Link href={`/admin/adoptions/${adoption.id}/edit`}>
                                        <Button size="sm" variant="secondary">Gestionar</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </AwraAdminPagesLayout>
    );
}