import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Button } from '@/components/ui/button';
import { Link, useForm } from '@inertiajs/react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface Fostering {
    id: number;
    user: { id: number; name: string; email: string } | null;
    animal: { id: number; name: string } | null;
    status: string;
    notes?: string;
}

interface Props {
    fostering: Fostering;
    statusOptions: { [key: string]: string };
}

export default function AdminFosteringsEdit({ fostering, statusOptions }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        status: fostering.status,
        notes: fostering.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/fosterings/${fostering.id}`);
    };

    return (
        <AwraAdminPagesLayout
            title={`Gestionar solicitud #${fostering.id}`}
            subtitle="Editar estado o notas"
            sidebarItems={[{ title: 'Acogidas', href: '/admin/fosterings' }]}
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
                <div className="flex gap-2 mt-4">
                    <Button type="submit" size="sm" variant="default" disabled={processing}>
                        Guardar cambios
                    </Button>
                    <Link href={`/admin/fosterings/${fostering.id}`}>
                        <Button size="sm" variant="outline">Cancelar</Button>
                    </Link>
                </div>
            </form>
        </AwraAdminPagesLayout>
    );
}