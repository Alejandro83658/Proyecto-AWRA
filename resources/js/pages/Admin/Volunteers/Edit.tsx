import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Link, router } from '@inertiajs/react';
import type { Volunteer } from '@/types';

interface Props {
    volunteer: Volunteer;
    statusOptions: { [key: string]: string };
}

export default function AdminVolunteersEdit({ volunteer, statusOptions }: Props) {
    const [status, setStatus] = useState<Volunteer['status']>(volunteer.status);
    const [notes, setNotes] = useState(volunteer.notes || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/admin/volunteers/${volunteer.id}`, { status, notes });
    };

    return (
        <AwraAdminPagesLayout
            title={`Gestionar solicitud #${volunteer.id}`}
            subtitle="Aceptar o rechazar solicitud"
            sidebarItems={[
                { title: 'Voluntarios', href: '/admin/volunteers' },
            ]}
        >
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="block mb-1 font-semibold">Estado</label>
                    <Select value={status} onValueChange={v => setStatus(v as Volunteer['status'])}>
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
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Notas</label>
                    <textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                        rows={3}
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <Button type="submit" size="sm" variant="default">
                        Guardar cambios
                    </Button>
                    <Link href={`/admin/volunteers/${volunteer.id}`}>
                        <Button size="sm" variant="outline">Cancelar</Button>
                    </Link>
                </div>
            </form>
        </AwraAdminPagesLayout>
    );
}