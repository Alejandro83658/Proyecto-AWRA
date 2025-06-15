import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Link } from '@inertiajs/react';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Fostering {
    id: number;
    user: { id: number; name: string; email: string } | null;
    animal: { id: number; name: string } | null;
    status: string;
    start_date: string;
    created_at: string;
}

interface Props {
    fosterings: {
        data: Fostering[];
        links: any;
    };
    statusFilter: string;
    statusOptions: { [key: string]: string };
}

export default function AdminFosteringsIndex({ fosterings, statusFilter, statusOptions }: Props) {
    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('status', value);
        window.location.search = params.toString();
    };

    return (
        <AwraAdminPagesLayout
            title="Acogidas"
            subtitle="Gestión de solicitudes de acogida"
            sidebarItems={[{ title: 'Acogidas', href: '/admin/fosterings' }]}
            paginationLinks={fosterings.links}
        >
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
                        <TableHead>Usuario</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Animal</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fosterings.data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                                No hay solicitudes de acogida.
                            </TableCell>
                        </TableRow>
                    ) : (
                        fosterings.data.map((f) => (
                            <TableRow key={f.id}>
                                <TableCell>{f.id}</TableCell>
                                <TableCell>{f.user?.name}</TableCell>
                                <TableCell>{f.user?.email}</TableCell>
                                <TableCell>{f.animal?.name}</TableCell>
                                <TableCell className="capitalize">{f.status}</TableCell>
                                <TableCell className="text-xs text-gray-500">
                                    {new Date(f.created_at).toLocaleString('es-ES')}
                                </TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    <Link href={`/admin/fosterings/${f.id}`}>
                                        <Button size="sm" variant="outline">Ver</Button>
                                    </Link>
                                    <Link href={`/admin/fosterings/${f.id}/edit`}>
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