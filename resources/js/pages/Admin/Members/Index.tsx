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
import type { Member } from '@/types';

interface Props {
    members: {
        data: Member[];
        links: any;
    };
    statusFilter: string;
    statusOptions: { [key: string]: string };
}

export default function AdminMembersIndex({ members, statusFilter, statusOptions }: Props) {
    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('status', value);
        window.location.search = params.toString();
    };

    return (
        <AwraAdminPagesLayout
            title="Socios/as"
            subtitle="Gestión de socios/as"
            sidebarItems={[{ title: 'Socios/as', href: '/admin/members' }]}
            paginationLinks={members.links}
        >
            <div className="mb-4">
                <label className="mr-2 font-semibold">Filtrar por estado:</label>
                <Select value={statusFilter || "all"} onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(statusOptions ?? {}).map(([value, label]) => (
                            <SelectItem key={value || "all"} value={value || "all"}>
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
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                                No hay socios/as.
                            </TableCell>
                        </TableRow>
                    ) : (
                        members.data.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell>{member.id}</TableCell>
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>{member.phone}</TableCell>
                                <TableCell className="capitalize">{member.status}</TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    <Link href={`/admin/members/${member.id}`}>
                                        <Button size="sm" variant="outline">Ver</Button>
                                    </Link>
                                    <Link href={`/admin/members/${member.id}/edit`}>
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