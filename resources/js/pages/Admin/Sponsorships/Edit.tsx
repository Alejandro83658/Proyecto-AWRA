import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Button } from '@/components/ui/button';
import { Link, useForm } from '@inertiajs/react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

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
    statusOptions: { [key: string]: string };
}

export default function AdminSponsorshipsEdit({ sponsorship, statusOptions }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        status: sponsorship.status,
        notes: sponsorship.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/sponsorships/${sponsorship.id}`);
    };

    return (
        <AwraAdminPagesLayout
            title={`Gestionar solicitud #${sponsorship.id}`}
            subtitle="Editar estado o notas"
            sidebarItems={[{ title: 'Apadrinamientos', href: '/admin/sponsorships' }]}
        >
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="block font-semibold mb-1">Estado</label>
                    <Select
                        value={data.status}
                        onValueChange={value => setData('status', value)}
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
                    <label className="block font-semibold mb-1">Notas</label>
                    <textarea
                        className="border rounded px-2 py-1 w-full"
                        value={data.notes}
                        onChange={e => setData('notes', e.target.value)}
                        rows={4}
                    />
                    {errors.notes && <div className="text-red-600 text-xs">{errors.notes}</div>}
                </div>
                <div>
                    <strong>Creado:</strong> {new Date(sponsorship.created_at).toLocaleString('es-ES')}
                </div>
                <div className="flex gap-2 mt-4">
                    <Button type="submit" size="sm" variant="default" disabled={processing}>
                        Guardar cambios
                    </Button>
                    <Link href={`/admin/sponsorships/${sponsorship.id}`}>
                        <Button size="sm" variant="outline">Cancelar</Button>
                    </Link>
                </div>
            </form>
        </AwraAdminPagesLayout>
    );
}