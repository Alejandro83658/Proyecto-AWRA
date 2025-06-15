import { Link } from '@inertiajs/react';
import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import type { Volunteer } from '@/types';
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
    volunteers: {
        data: Volunteer[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    statusFilter: string;
    statusOptions: { [key: string]: string };
}

export default function AdminVolunteersIndex({ volunteers, statusFilter, statusOptions }: Props) {
    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('status', value);
        window.location.search = params.toString();
    };

    return (
        <AwraAdminPagesLayout
            title="Voluntarios"
            subtitle="Gestión de solicitudes de voluntariado"
            sidebarItems={[
                { title: 'Voluntarios', href: '/admin/volunteers' },
            ]}
            paginationLinks={volunteers.links}
        >
            <h2 className="text-xl font-semibold mb-4">Panel administrativo de voluntarios</h2>

            {/* Filtro por estado */}
            <div className="mb-4">
                <label className="mr-2 font-semibold">Filtrar por estado:</label>
                <Select value={statusFilter || "todas"} onValueChange={handleFilterChange}>
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
                        <TableHead>ID Usuario</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(volunteers.data ?? []).length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                                No hay solicitudes de voluntariado.
                            </TableCell>
                        </TableRow>
                    ) : (
                        volunteers.data.map((volunteer: Volunteer) => (
                            <TableRow key={volunteer.id}>
                                <TableCell>{volunteer.id}</TableCell>
                                <TableCell>
                                    <span className="font-mono text-xs text-gray-500">#{volunteer.user_id}</span>
                                </TableCell>
                                <TableCell>
                                    {volunteer.user?.name}
                                </TableCell>
                                <TableCell>
                                    {volunteer.user?.email}
                                </TableCell>
                                <TableCell className="capitalize">{volunteer.status}</TableCell>
                                <TableCell className="text-xs text-gray-500">
                                    {new Date(volunteer.created_at).toLocaleString()}
                                </TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    <Link href={`/admin/volunteers/${volunteer.id}`}>
                                        <Button size="sm" variant="outline">Ver</Button>
                                    </Link>
                                    <Link href={`/admin/volunteers/${volunteer.id}/edit`}>
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