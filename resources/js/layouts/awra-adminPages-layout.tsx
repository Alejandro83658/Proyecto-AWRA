import AppLayout from '@/layouts/app-layout';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import AwraAdminPagination from '@/components/awra-components/awra-adminPagination';

interface SidebarItem {
    title: string;
    href: string;
}

interface AwraAdminPagesLayoutProps extends PropsWithChildren {
    title: string;
    subtitle?: string;
    sidebarItems: SidebarItem[];
    paginationLinks?: { url: string | null; label: string; active: boolean }[];
}

export default function AwraAdminPagesLayout({
    children,
    title,
    subtitle,
    sidebarItems,
    paginationLinks,
}: AwraAdminPagesLayoutProps) {
    if (typeof window === 'undefined') return null;
    const currentPath = window.location.pathname;

    return (
        <AppLayout>
            <div className="px-4 py-6">
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                {subtitle && <p className="text-muted-foreground text-sm mb-8">{subtitle}</p>}
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {sidebarItems.map((item) => (
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