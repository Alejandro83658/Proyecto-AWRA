import { usePage, Link } from '@inertiajs/react';
import AwraLayout from '../../layouts/awra-main-layout';
import AwraWelcomeLayout from '@/layouts/awra-welcome-layout';
import { Button } from '@/components/ui/button';
import type { Animal, User } from '../../types';

const Welcome = () => {
  const { animal, auth, flash } = usePage<{ animal?: Animal; auth: { user?: User }; flash?: { success?: string; error?: string } }>().props;
  const hasAnimal = !!animal && !!animal.name;

  return (
    <AwraLayout
      title={hasAnimal ? `Apadrina a ${animal.name}` : 'Apadrina - AWRA'}
      subtitle={hasAnimal ? '¡Gracias por querer apadrinar!' : undefined}
    >
      <AwraWelcomeLayout
        title={hasAnimal ? `¡Gracias por tu interés en apadrinar a ${animal.name}!` : 'Programa de Apadrinamiento'}
        subtitle={hasAnimal
          ? `Estás a un paso de ayudar a ${animal.name}. Por favor, lee la información y pulsa el botón para completar el formulario de apadrinamiento.`
          : 'El apadrinamiento es una forma especial de ayudar a nuestros animales. Con tu aportación mensual, contribuyes directamente a su bienestar, alimentación y cuidados veterinarios.'}
        actions={
          !hasAnimal ? (
            <Button asChild>
              <Link href="/adopta">Ver animales para apadrinar</Link>
            </Button>
          ) : !auth?.user ? (
            <>
              <Button asChild className="mr-2">
                <Link href="/login">Inicia sesión</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/register">Regístrate</Link>
              </Button>
            </>
          ) : flash?.error ? (
            <div className="w-full p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive font-semibold">
              {flash.error}
            </div>
          ) : flash?.success ? (
            <div className="w-full p-4 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg border border-green-400 dark:border-green-700">
              {flash.success}
            </div>
          ) : (
            <Button asChild className="bg-red-900 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition">
              <Link href={`/apadrina/${animal.id}/formulario`}>
                Completar formulario
              </Link>
            </Button>
          )
        }
      >
        {!hasAnimal && (
          <>
            <ul className="list-disc pl-6 mb-4 text-left">
              <li>Recibirás información y fotos periódicas de tu ahijado/a.</li>
              <li>Puedes venir a visitarlo/a y compartir tiempo juntos.</li>
              <li>Tu ayuda es fundamental para seguir salvando vidas.</li>
            </ul>
            <p className="mb-8">
              ¿Quieres apadrinar? <a href="/contacto" className="text-red-900 underline hover:text-red-700">Contáctanos</a> y te explicamos cómo hacerlo.
            </p>
          </>
        )}
      </AwraWelcomeLayout>
    </AwraLayout>
  );
};

export default Welcome;