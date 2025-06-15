import AppLayout from '@/layouts/app-layout';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import AwraAdminPagination from '@/components/awra-components/awra-adminPagination';

const userSidebarItems = [
    { title: 'Nuevo usuario', href: '/admin/users/create' },
    { title: 'Gestionar roles', href: '/admin/users/roles' },
];

interface AwraAdminUserLayoutProps extends PropsWithChildren {
    paginationLinks?: { url: string | null; label: string; active: boolean }[];
}

export default function AwraAdminUserLayout({ children, paginationLinks }: AwraAdminUserLayoutProps) {
    if (typeof window === 'undefined') return null;
    const currentPath = window.location.pathname;
    const { flash } = usePage().props as any;

    return (
        <AppLayout>
            <div className="px-4 py-6">
                {flash?.success && (
                    <div className="mb-4 rounded bg-green-100 p-2 text-green-800">
                        {flash.success}
                    </div>
                )}
                <h2 className="text-xl font-semibold tracking-tight">Panel de Usuarios</h2>
                <p className="text-muted-foreground text-sm mb-8">Gestiona los usuarios del sistema</p>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {userSidebarItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-3 py-2 rounded hover:bg-muted transition ${currentPath === item.href ? 'bg-muted font-semibold' : ''}`}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                    <Separator className="my-6 md:hidden" />
                    <div className="flex-1 md:max-w-2xl">
                        <section className="max-w-xl space-y-12">
                            {children}
                            {paginationLinks && <AwraAdminPagination links={paginationLinks} />}
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}