import { usePage, Link } from '@inertiajs/react';
import AwraLayout from '../../layouts/awra-main-layout';
import AwraWelcomeLayout from '@/layouts/awra-welcome-layout';
import { Button } from '@/components/ui/button';
import type { User } from '../../types';

const Welcome = () => {
  const { auth, flash } = usePage<{ auth: { user?: User }; flash?: { success?: string; error?: string } }>().props;

  return (
    <AwraLayout title="Hazte socio/a">
      <AwraWelcomeLayout
        title="Hazte socio/a"
        subtitle="Tu apoyo mensual es fundamental para que podamos seguir rescatando, cuidando y buscando hogar a los animales que más lo necesitan."
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
              className="bg-red-900 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
            >
              <Link href="/socio/formulario">
                Completar formulario
              </Link>
            </Button>
          )
        }
      >
        <ul className="list-disc pl-6 mb-4 text-left">
          <li>Podrás deducir tu aportación en la declaración de la renta.</li>
          <li>Recibirás información periódica sobre el destino de tu ayuda.</li>
          <li>¡Formarás parte de la familia AWRA!</li>
        </ul>
        <p className="mb-8">
          ¿Tienes dudas? <a href="/contacto" className="text-red-900 underline hover:text-red-700">Contáctanos</a> y te informamos sin compromiso.
        </p>
      </AwraWelcomeLayout>
    </AwraLayout>
  );
};

export default Welcome;