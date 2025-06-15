import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import type { Member } from '@/types';

interface Props {
    member: Member;
}

export default function AdminMembersShow({ member }: Props) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;

    return (
        <AwraAdminPagesLayout
            title={`Socio/a #${member.id}`}
            subtitle="Detalle de socio/a"
            sidebarItems={[{ title: 'Socios/as', href: '/admin/members' }]}
        >
            {flash?.success && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {flash.success}
                </div>
            )}
            <div className="space-y-4 max-w-xl">
                <div>
                    <strong>Nombre:</strong> {member.name}
                </div>
                <div>
                    <strong>Email:</strong> {member.email}
                </div>
                <div>
                    <strong>Teléfono:</strong> {member.phone}
                </div>
                <div>
                    <strong>DNI:</strong> {member.dni}
                </div>
                <div>
                    <strong>Dirección:</strong> {member.address}
                </div>
                <div>
                    <strong>Ciudad:</strong> {member.city}
                </div>
                <div>
                    <strong>Provincia:</strong> {member.province}
                </div>
                <div>
                    <strong>Cuota:</strong> {member.amount} €
                </div>
                <div>
                    <strong>Frecuencia:</strong> {member.frequency}
                </div>
                <div>
                    <strong>Método de pago:</strong> {member.payment_method}
                </div>
                <div>
                    <strong>Comentarios:</strong> {member.comments || <span className="text-gray-400">Sin comentarios</span>}
                </div>
                <div>
                    <strong>Estado:</strong> {member.status}
                </div>
                <div className="flex gap-2 mt-4">
                    <Link href={`/admin/members/${member.id}/edit`}>
                        <Button size="sm" variant="default">Gestionar</Button>
                    </Link>
                    <Link href="/admin/members">
                        <Button size="sm" variant="outline">Volver</Button>
                    </Link>
                </div>
            </div>
        </AwraAdminPagesLayout>
    );
}