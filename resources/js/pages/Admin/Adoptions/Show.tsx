import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import type { Adoption } from '@/types';

interface Props {
    adoption: Adoption;
}

export default function AdminAdoptionsShow({ adoption }: Props) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;

    return (
        <AwraAdminPagesLayout
            title={`Adopción #${adoption.id}`}
            subtitle="Detalle de solicitud de adopción"
            sidebarItems={[{ title: 'Adopciones', href: '/admin/adoptions' }]}
        >
            {flash?.success && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {flash.success}
                </div>
            )}
            <div className="space-y-4 max-w-xl">
                <div>
                    <strong>Animal:</strong> {adoption.animal_name}
                </div>
                <div>
                    <strong>Solicitante:</strong> {adoption.user_name}
                </div>
                <div>
                    <strong>Estado:</strong> {adoption.status}
                </div>
                <div>
                    <strong>Fecha:</strong> {new Date(adoption.created_at).toLocaleString()}
                </div>
                <div>
                    <strong>Notas:</strong> {adoption.notes || <span className="text-gray-400">Sin notas</span>}
                </div>
                {/* ...otros campos que necesite mostrar mostrar... */}
                <div className="flex gap-2 mt-4">
                    <Link href={`/admin/adoptions/${adoption.id}/edit`}>
                        <Button size="sm" variant="default">Gestionar</Button>
                    </Link>
                    <Link href="/admin/adoptions">
                        <Button size="sm" variant="outline">Volver</Button>
                    </Link>
                </div>
            </div>
        </AwraAdminPagesLayout>
    );
}