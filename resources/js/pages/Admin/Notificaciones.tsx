import { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import AwraAdminPagesLayout from '@/layouts/awra-adminPages-layout';
import { Button } from '@/components/ui/button';

interface Notification {
    id: string;
    read_at: string | null;
    data: {
        message: string;
        adoption_id?: number;
        volunteer_id?: number;
        sponsorship_id?: number;
        fostering_id?: number;
        member_id?: number;
        animal_name?: string;
        user_name?: string;
    };
    created_at: string;
}

interface Props {
    notifications: {
        data: Notification[];
        links: any;
    };
}

const sidebarItems = [
    { title: 'Notificaciones', href: '/admin/notificaciones' },
];

const filtros = [
    { label: 'Todas', value: 'todas' },
    { label: 'No leídas', value: 'no-leidas' },
    { label: 'Leídas', value: 'leidas' },
];

export default function Notificaciones({ notifications }: Props) {
    const [filtro, setFiltro] = useState<'todas' | 'leidas' | 'no-leidas'>('no-leidas');

    const handleViewSolicitud = (notificationId: string) => {
        router.post(`/admin/notificaciones/${notificationId}/leer`);
    };

    const handleMarkAsRead = (notificationId: string) => {
        router.post(`/admin/notificaciones/${notificationId}/leer`, {}, { preserveScroll: true });
    };

    const handleMarkAsUnread = (notificationId: string) => {
        router.post(`/admin/notificaciones/${notificationId}/no-leida`, {}, { preserveScroll: true });
    };

    const handleDelete = (notificationId: string) => {
        if (confirm('¿Seguro que quieres eliminar esta notificación?')) {
            router.delete(`/admin/notificaciones/${notificationId}`, { preserveScroll: true });
        }
    };

    const filteredNotifications = (notifications.data ?? []).filter(n => {
        if (filtro === 'todas') return true;
        if (filtro === 'leidas') return !!n.read_at;
        if (filtro === 'no-leidas') return !n.read_at;
        return true;
    });

    return (
        <AwraAdminPagesLayout
            title="Notificaciones"
            subtitle="Mensajes internos del sistema"
            sidebarItems={sidebarItems}
            paginationLinks={notifications.links}
        >
            <div className="mb-4 flex gap-2">
                {filtros.map(f => (
                    <Button
                        key={f.value}
                        variant={filtro === f.value ? 'default' : 'outline'}
                        onClick={() => setFiltro(f.value as any)}
                        className="capitalize"
                    >
                        {f.label}
                    </Button>
                ))}
            </div>
            <div className="space-y-3 max-w-2xl">
                {filteredNotifications.length === 0 && (
                    <div className="text-gray-500 bg-muted rounded px-4 py-3">
                        No hay notificaciones.
                    </div>
                )}
                {filteredNotifications.map((n) => (
                    <div
                        key={n.id}
                        className={`rounded px-4 py-3 shadow text-sm flex flex-col gap-1 border
                            ${n.read_at
                                ? 'bg-muted/70 border-muted-foreground/10 opacity-70'
                                : 'bg-background border-primary/10'
                            }
                        `}
                    >
                        <span>{n.data.message}</span>
                        <span className="text-xs text-muted-foreground">
                            {new Date(n.created_at).toLocaleString()}
                        </span>
                        <div className="flex gap-2 mt-1 flex-wrap">
                            {(n.data.adoption_id ||
                                n.data.volunteer_id ||
                                n.data.sponsorship_id ||
                                n.data.fostering_id ||
                                n.data.member_id) && (
                                    <Link href={`/admin/notificaciones/ver/${n.id}`}>
                                        <Button size="sm" variant="outline">
                                            Ver solicitud
                                        </Button>
                                    </Link>
                                )}
                            {!n.read_at && (
                                <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => handleMarkAsRead(n.id)}
                                >
                                    Marcar como leída
                                </Button>
                            )}
                            {n.read_at && (
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleMarkAsUnread(n.id)}
                                >
                                    Marcar como no leída
                                </Button>
                            )}
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(n.id)}
                            >
                                Eliminar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </AwraAdminPagesLayout>
    );
}