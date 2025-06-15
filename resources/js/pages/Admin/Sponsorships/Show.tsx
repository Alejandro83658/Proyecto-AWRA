import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';

interface Sponsorship {
    id: number;
    user: { id: number; name: string; email: string } | null;
    animal: { id: number; name: string } | null;
    amount_eur: number;
    payment_method: string;
    status: string;
    notes?: string;
    start_date: string;
    created_at: string;
}

interface Props {
    sponsorship: Sponsorship;
}

export default function AdminSponsorshipsShow({ sponsorship }: Props) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;

    return (
        <AwraAdminPagesLayout
            title={`Solicitud #${sponsorship.id}`}
            subtitle="Detalle de apadrinamiento"
            sidebarItems={[{ title: 'Apadrinamientos', href: '/admin/sponsorships' }]}
        >
            {flash?.success && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {flash.success}
                </div>
            )}
            <div className="space-y-4 max-w-xl">
                <div>
                    <strong>Usuario:</strong> {sponsorship.user?.name} ({sponsorship.user?.email})
                </div>
                <div>
                    <strong>Animal:</strong> {sponsorship.animal?.name}
                </div>
                <div>
                    <strong>Importe:</strong> {sponsorship.amount_eur} €
                </div>
                <div>
                    <strong>Método de pago:</strong> {sponsorship.payment_method}
                </div>
                <div>
                    <strong>Estado:</strong> {sponsorship.status}
                </div>
                <div>
                    <strong>Notas:</strong> {sponsorship.notes || <span className="text-gray-400">Sin notas</span>}
                </div>
                <div>
                    <strong>Fecha de inicio:</strong> {new Date(sponsorship.start_date).toLocaleString('es-ES')}
                </div>
                <div>
                    <strong>Creado:</strong> {new Date(sponsorship.created_at).toLocaleString('es-ES')}
                </div>
                <div className="flex gap-2 mt-4">
                    <Link href={`/admin/sponsorships/${sponsorship.id}/edit`}>
                        <Button size="sm" variant="default">Gestionar</Button>
                    </Link>
                    <Link href="/admin/sponsorships">
                        <Button size="sm" variant="outline">Volver</Button>
                    </Link>
                </div>
            </div>
        </AwraAdminPagesLayout>
    );
}