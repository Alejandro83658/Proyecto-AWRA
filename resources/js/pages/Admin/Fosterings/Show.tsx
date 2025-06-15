import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';

interface Fostering {
    id: number;
    user: { id: number; name: string; email: string } | null;
    animal: { id: number; name: string } | null;
    status: string;
    notes?: string;
    start_date: string;
    end_date?: string;
    created_at: string;
}

interface Props {
    fostering: Fostering;
}

export default function AdminFosteringsShow({ fostering }: Props) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;

    return (
        <AwraAdminPagesLayout
            title={`Solicitud #${fostering.id}`}
            subtitle="Detalle de acogida"
            sidebarItems={[{ title: 'Acogidas', href: '/admin/fosterings' }]}
        >
            {flash?.success && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {flash.success}
                </div>
            )}
            <div className="space-y-4 max-w-xl">
                <div>
                    <strong>Usuario:</strong> {fostering.user?.name} ({fostering.user?.email})
                </div>
                <div>
                    <strong>Animal:</strong> {fostering.animal?.name}
                </div>
                <div>
                    <strong>Estado:</strong> {fostering.status}
                </div>
                <div>
                    <strong>Notas:</strong> {fostering.notes || <span className="text-gray-400">Sin notas</span>}
                </div>
                <div>
                    <strong>Fecha de inicio:</strong> {fostering.start_date}
                </div>
                <div>
                    <strong>Fecha de fin:</strong> {fostering.end_date || <span className="text-gray-400">Sin finalizar</span>}
                </div>
                <div>
                    <strong>Creado:</strong> {new Date(fostering.created_at).toLocaleString('es-ES')}
                </div>
                <div className="flex gap-2 mt-4">
                    <Link href={`/admin/fosterings/${fostering.id}/edit`}>
                        <Button size="sm" variant="default">Gestionar</Button>
                    </Link>
                    <Link href="/admin/fosterings">
                        <Button size="sm" variant="outline">Volver</Button>
                    </Link>
                </div>
            </div>
        </AwraAdminPagesLayout>
    );
}