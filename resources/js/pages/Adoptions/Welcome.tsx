import { usePage, Link } from '@inertiajs/react';
import AwraLayout from '../../layouts/awra-main-layout';
import AwraWelcomeLayout from '@/layouts/awra-welcome-layout';
import AwraLoginLink from '../../components/awra-components/awra-loginLink';
import { Button } from '@/components/ui/button';
import type { Animal, User } from '../../types';

const Welcome = () => {
  const { animal, auth, flash } = usePage<{
    animal: Animal;
    auth: { user?: User };
    flash?: { success?: string; error?: string };
  }>().props;

  return (
    <AwraLayout title={`Adopta a ${animal.name}`} subtitle="¡Gracias por querer adoptar!">
      <AwraWelcomeLayout
        title={`¡Gracias por tu interés en ${animal.name}!`}
        subtitle="Estás a un paso de darle un hogar a este peludo. Por favor, lee la información y pulsa el botón para completar el formulario de adopción."
        actions={
          !auth?.user ? (
            <>
              <Button asChild className="mr-2">
                <AwraLoginLink>Inicia sesión</AwraLoginLink>
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
            <Button
              asChild
              className="bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition"
            >
              <Link href={`/adopta/${animal.id}/formulario`}>
                Completar formulario
              </Link>
            </Button>
          )
        }
      />
    </AwraLayout>
  );
};

export default Welcome;