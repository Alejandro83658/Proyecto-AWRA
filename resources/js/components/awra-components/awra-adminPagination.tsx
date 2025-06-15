import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface AwraAdminPaginationProps {
    links: PaginationLink[];
}

export default function AwraAdminPagination({ links }: AwraAdminPaginationProps) {
    return (
        <nav className="flex justify-center mt-6 gap-1">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url ?? '#'}
                    className={`
                        px-3 py-1 rounded text-sm transition
                        ${link.active ? 'bg-red-900 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-300'}
                        ${!link.url ? 'pointer-events-none opacity-50' : ''}
                    `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    aria-current={link.active ? 'page' : undefined}
                />
            ))}
        </nav>
    );
}