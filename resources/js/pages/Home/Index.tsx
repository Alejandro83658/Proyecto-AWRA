import AwraLayout from '../../layouts/awra-main-layout';
import HomeCarousel from '@/components/awra-components/HomeCarousel';
import { usePage } from '@inertiajs/react';

export default function Home() {
    const { carouselImages } = usePage<{ carouselImages: string[] }>().props;
    return (
        <AwraLayout title="Bienvenido a AWRA">
            <HomeCarousel images={carouselImages} />
            <p className="mb-6 text-lg">
                Estamos construyendo esta aplicación web gratuita para vuestro refugio.<br />
                Lo que veis es solo una vista de desarrollo.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
                {/* Aquí se pueden poner enlaces o botones */}
            </div>
        </AwraLayout>
    );
}