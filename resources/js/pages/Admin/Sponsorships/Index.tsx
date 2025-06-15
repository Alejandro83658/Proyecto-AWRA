import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
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

interface Sponsorship {
    id: number;
    user: { id: number; name: string; email: string } | null;
    animal: { id: number; name: string } | null;
    amount_eur: number;
    payment_method: string;
    status: string;
    start_date: string;
    created_at: string;
}

interface Props {
    sponsorships: {
        data: Sponsorship[];
        links: any;
    };
    statusFilter: string;
    statusOptions: { [key: string]: string };
}

export default function AdminSponsorshipsIndex({ sponsorships, statusFilter, statusOptions }: Props) {
    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('status', value);
        window.location.search = params.toString();
    };

    return (
        <AwraAdminPagesLayout
            title="Apadrinamientos"
            subtitle="Gestión de solicitudes de apadrinamiento"
            sidebarItems={[{ title: 'Apadrinamientos', href: '/admin/sponsorships' }]}
            paginationLinks={sponsorships.links}
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
                        <TableHead>Importe</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sponsorships.data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center text-gray-500 py-4">
                                No hay solicitudes de apadrinamiento.
                            </TableCell>
                        </TableRow>
                    ) : (
                        sponsorships.data.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell>{s.id}</TableCell>
                                <TableCell>{s.user?.name}</TableCell>
                                <TableCell>{s.user?.email}</TableCell>
                                <TableCell>{s.animal?.name}</TableCell>
                                <TableCell>{s.amount_eur} €</TableCell>
                                <TableCell>{s.payment_method}</TableCell>
                                <TableCell className="capitalize">{s.status}</TableCell>
                                <TableCell className="text-xs text-gray-500">
                                    {new Date(s.created_at).toLocaleString('es-ES')}
                                </TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    <Link href={`/admin/sponsorships/${s.id}`}>
                                        <Button size="sm" variant="outline">Ver</Button>
                                    </Link>
                                    <Link href={`/admin/sponsorships/${s.id}/edit`}>
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