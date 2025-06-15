import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import type { Volunteer } from '@/types';

interface Props {
    volunteer: Volunteer;
}

export default function AdminVolunteersShow({ volunteer }: Props) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;

    return (
        <AwraAdminPagesLayout
            title={`Solicitud de voluntariado #${volunteer.id}`}
            subtitle="Detalle de la solicitud"
            sidebarItems={[
                { title: 'Voluntarios', href: '/admin/volunteers' },
            ]}
        >
            {flash?.success && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {flash.success}
                </div>
            )}
            <div className="space-y-4 max-w-xl">
                <div>
                    <strong>ID Usuario:</strong> #{volunteer.user_id} - {volunteer.user?.name}
                </div>
                <div>
                    <strong>Email:</strong> {volunteer.user?.email}
                </div>
                <div>
                    <strong>Estado:</strong> {volunteer.status}
                </div>
                <div>
                    <strong>Fecha:</strong> {new Date(volunteer.created_at).toLocaleString()}
                </div>
                <div>
                    <strong>Notas:</strong> {volunteer.notes || <span className="text-gray-400">No hay notas</span>}
                </div>
                <div className="flex gap-2 mt-4">
                    <Link href={`/admin/volunteers/${volunteer.id}/edit`}>
                        <Button size="sm" variant="default">Gestionar</Button>
                    </Link>
                    <Link href="/admin/volunteers">
                        <Button size="sm" variant="outline">Volver</Button>
                    </Link>
                </div>
            </div>
        </AwraAdminPagesLayout>
    );
}