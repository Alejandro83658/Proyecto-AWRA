import { usePage, Link } from '@inertiajs/react';
import AwraLayout from '../../layouts/awra-main-layout';
import AwraWelcomeLayout from '@/layouts/awra-welcome-layout';
import { Button } from '@/components/ui/button';
import type { User, Animal } from '../../types';

const Welcome = () => {
    const { animal, auth, flash } = usePage<{ animal?: Animal; auth: { user?: User }; flash?: { success?: string; error?: string } }>().props;
    const hasAnimal = !!animal && !!animal.name;

    return (
        <AwraLayout
            title={hasAnimal ? `Acoge a ${animal.name}` : 'Acoge - AWRA'}
            subtitle={hasAnimal ? '¡Gracias por querer acoger!' : undefined}
        >
            <AwraWelcomeLayout
                title={hasAnimal ? `¡Gracias por tu interés en acoger a ${animal.name}!` : 'Programa de Acogida'}
                subtitle={hasAnimal
                    ? `Estás a un paso de ayudar a ${animal.name}. Por favor, lee la información y pulsa el botón para completar el formulario de acogida.`
                    : 'Acoger temporalmente a un animal es una de las formas más valiosas de ayudar. Gracias a las casas de acogida, muchos perros y gatos pueden recuperarse, socializar y prepararse para encontrar un hogar definitivo.'}
                actions={
                    !auth?.user ? (
                        <>
                            <Button asChild className="mr-2">
                                <Link href="/login">Inicia sesión</Link>
                            </Button>
                            <Button asChild variant="secondary">
                                <Link href="/register">Regístrate</Link>
                            </Button>
                        </>
                    ) : hasAnimal ? (
                        flash?.error ? (
                            <div className="w-full p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive font-semibold">
                                {flash.error}
                            </div>
                        ) : flash?.success ? (
                            <div className="w-full p-4 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg border border-green-400 dark:border-green-700">
                                {flash.success}
                            </div>
                        ) : (
                            <Button
                                asChild
                                className="bg-red-900 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
                            >
                                <Link href={`/acoge/${animal.id}/formulario`}>
                                    Completar formulario
                                </Link>
                            </Button>
                        )
                    ) : null
                
                }
            >
            {!hasAnimal && (
                <>
                    <ul className="list-disc pl-6 mb-4 text-left">
                        <li>Nosotros cubrimos los gastos veterinarios y alimentación.</li>
                        <li>Te acompañamos y asesoramos durante todo el proceso.</li>
                        <li>La acogida puede ser por días, semanas o meses, según tu disponibilidad.</li>
                    </ul>
                    <p className="mb-8">
                        ¿Te animas a acoger? <a href="/contacto" className="text-red-900 underline hover:text-red-700">Contáctanos</a> para más información o completa el formulario y nos pondremos en contacto contigo.
                    </p>
                    <Button asChild className="mb-6 bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition">
                        <Link href="/adopta?fosterable=1">
                            Ver peludos que puedes acoger
                        </Link>
                    </Button>
                </>
            )}
        </AwraWelcomeLayout>
        </AwraLayout >
    );
};

export default Welcome;