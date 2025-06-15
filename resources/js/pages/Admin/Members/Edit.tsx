import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Link, useForm } from '@inertiajs/react';
import type { Member } from '@/types';

interface Props {
    member: Member;
    statusOptions: { [key: string]: string };
}

export default function AdminMembersEdit({ member, statusOptions }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: member.name || '',
        email: member.email || '',
        phone: member.phone || '',
        dni: member.dni || '',
        address: member.address || '',
        city: member.city || '',
        province: member.province || '',
        amount: member.amount || '',
        frequency: member.frequency || 'mensual',
        payment_method: member.payment_method || 'transferencia',
        comments: member.comments || '',
        status: member.status || 'pendiente',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/members/${member.id}`);
    };

    return (
        <AwraAdminPagesLayout
            title={`Gestionar socio/a #${member.id}`}
            subtitle="Editar estado o datos"
            sidebarItems={[{ title: 'Socios/as', href: '/admin/members' }]}
        >
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="block font-semibold mb-1">Estado</label>
                    <Select
                        value={data.status}
                        onValueChange={value => setData('status', value as 'pendiente' | 'aceptado' | 'rechazado')}
                    >
                        <SelectTrigger className="w-full">
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
                    {errors.status && <div className="text-red-600 text-xs">{errors.status}</div>}
                </div>
                <div>
                    <label className="block font-semibold mb-1">Comentarios</label>
                    <textarea
                        className="border rounded px-2 py-1 w-full"
                        value={data.comments}
                        onChange={e => setData('comments', e.target.value)}
                        rows={4}
                    />
                    {errors.comments && <div className="text-red-600 text-xs">{errors.comments}</div>}
                </div>
                <div className="flex gap-2 mt-4">
                    <Button type="submit" size="sm" variant="default" disabled={processing}>
                        Guardar cambios
                    </Button>
                    <Link href={`/admin/members/${member.id}`}>
                        <Button size="sm" variant="outline">Cancelar</Button>
                    </Link>
                </div>
            </form>
        </AwraAdminPagesLayout>
    );
}