import { Link } from '@inertiajs/react';
import AwraAdminUserLayout from '@/layouts/awra-adminUser-layout';
import { useForm } from '@inertiajs/react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import type { UsersPagination } from '@/types';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import React from 'react';

interface AdminUsersIndexProps {
    users: UsersPagination;
    filters?: any;
}

const ROLES = [
    { value: 'all', label: 'Todos los roles' },
    { value: 'super_admin', label: 'Super Admin' },
    { value: 'admin', label: 'Admin' },
    { value: 'staff', label: 'Staff' },
    { value: 'user', label: 'Usuario' },
];

export default function AdminUsersIndex({ users, filters = {} }: AdminUsersIndexProps) {
    const { get } = useForm();

    const handleRoleChange = (role: string) => {
        get(route('admin.users.index', { role: role === 'all' ? undefined : role }), { preserveState: true });
    };

    return (
        <AwraAdminUserLayout paginationLinks={users.links}>
            <h2 className="text-xl font-semibold mb-4">Panel administrativo de usuarios</h2>
            <div className="mb-4 flex items-center gap-4">
                <label htmlFor="role-filter" className="font-medium">Filtrar por rol:</label>
                <Select value={filters.role || 'all'} onValueChange={handleRoleChange}>
                    <SelectTrigger id="role-filter" className="w-48">
                        <SelectValue placeholder="Todos los roles" />
                    </SelectTrigger>
                    <SelectContent>
                        {ROLES.map(role => (
                            <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
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
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(users.data && users.data.length > 0) ? (
                        users.data.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    <Link href={`/admin/users/${user.id}`}><Button size="sm" variant="outline">Ver</Button></Link>
                                    <Link href={`/admin/users/${user.id}/edit`}><Button size="sm" variant="secondary">Editar</Button></Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                                No hay usuarios para mostrar.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </AwraAdminUserLayout>
    );
}