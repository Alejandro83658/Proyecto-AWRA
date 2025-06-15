import { Head } from '@inertiajs/react';
import AwraHeader from '@/components/awra-components/awra-header/Awra-Header';
import AwraFooter from '@/components/awra-components/awra-footer/Awra-Footer';
import FloatingUpButton from '@/components/awra-components/FloatingUpButton';
import PageHeader from './awra-pageHeader-layout';

interface AwraLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export default function AwraLayout({ children, title, subtitle }: AwraLayoutProps) {
    return (
        <>
            <Head title={title || 'AWRA - Aplicación Web Refugios Animales'} />
            {/* Header fijo */}
            <div className="fixed top-0 left-0 w-full z-50">
                <AwraHeader />
            </div>
            {/* Espacio para que el contenido no quede debajo del header */}
            <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-neutral-900 dark:text-gray-100 pt-20">
                {(title || subtitle) && (
                    <PageHeader title={title || ''} subtitle={subtitle || ''} />
                )}
                <main className="flex-1 flex flex-col items-center text-center w-full max-w-7xl mx-auto px-4 pb-16">
                    {/* Añado pb-16 para separar del footer */}
                    {children}
                </main>
                <AwraFooter />
                <FloatingUpButton />
            </div>
        </>
    );
}