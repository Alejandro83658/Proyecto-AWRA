import AwraAdminUserLayout from '@/layouts/awra-adminUser-layout';
import AwraAdminPagination from '@/components/awra-components/awra-adminPagination';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { router } from '@inertiajs/react';

const ROLES = [
    { key: 'super_admin', label: 'Super Admin', description: 'Acceso total a todo el sistema.' },
    { key: 'admin', label: 'Admin', description: 'Acceso a todo menos autogestionar su propio rol de admin.' },
    { key: 'staff', label: 'Staff', description: 'Acceso limitado a funcionalidades internas.' },
    { key: 'public', label: 'Público', description: 'Acceso solo a su propio perfil.' },
];

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface UsersPagination {
    data: User[];
    links: { url: string | null; label: string; active: boolean }[];
}

export default function AdminRoles({ users }: { users: UsersPagination }) {
    const [userRoles, setUserRoles] = useState(users.data);

    const handleRoleChange = (userId: number, newRole: string) => {
        setUserRoles(prev =>
            prev.map(u => u.id === userId ? { ...u, role: newRole } : u)
        );
    };

    const handleSave = () => {
        router.post('/admin/users/roles/update', { users: userRoles.map(u => ({ ...u })) }, {
            preserveScroll: true,
        });
    };

    return (
        <AwraAdminUserLayout>
            <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">Gestión de roles de usuario</h2>
                <p className="mb-8 text-muted-foreground">
                    Asigna el rol adecuado a cada usuario.
                </p>
                <table className="w-full border rounded">
                    <thead>
                        <tr className="bg-muted">
                            <th className="p-2 text-left">Usuario</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRoles.map(user => (
                            <tr key={user.id} className="border-t">
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">
                                    <div className="flex gap-2">
                                        {ROLES.map(role => (
                                            <label key={role.key} className="flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name={`role_${user.id}`}
                                                    value={role.key}
                                                    checked={user.role === role.key}
                                                    onChange={() => handleRoleChange(user.id, role.key)}
                                                    className="accent-red-900"
                                                />
                                                <span className="text-sm">{role.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <AwraAdminPagination links={users.links} />
                <div className="mt-8">
                    <h3 className="font-semibold mb-2">Descripción de roles</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        {ROLES.map(role => (
                            <li key={role.key}>
                                <span className="font-semibold">{role.label}:</span> {role.description}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-8 flex gap-2">
                    <Button onClick={handleSave}>Guardar cambios</Button>
                    <Button variant="outline" disabled>Cancelar</Button>
                </div>
            </div>
        </AwraAdminUserLayout>
    );
}