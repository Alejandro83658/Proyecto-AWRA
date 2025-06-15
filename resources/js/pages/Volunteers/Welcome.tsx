import { usePage, Link } from '@inertiajs/react';
import AwraLayout from '../../layouts/awra-main-layout';
import AwraWelcomeLayout from '@/layouts/awra-welcome-layout';
import { Button } from '@/components/ui/button';
import type { User } from '../../types';

const Welcome = () => {
  const { auth, flash } = usePage<{ auth: { user?: User }; flash?: { success?: string; error?: string } }>().props;

  return (
    <AwraLayout title="Voluntariado">
      <AwraWelcomeLayout
        title="Hazte voluntario/a"
        subtitle="El voluntariado es el corazón de nuestra asociación. Gracias a personas como tú, podemos cuidar y dar una segunda oportunidad a muchos animales."
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
              <Link href="/voluntario/formulario">
                Completar formulario
              </Link>
            </Button>
          )
        }
      >
        <ul className="list-disc pl-6 mb-4 text-left">
          <li>No necesitas experiencia previa, solo ganas de ayudar.</li>
          <li>Te formamos y acompañamos desde el primer día.</li>
          <li>Puedes dedicar el tiempo que tengas disponible, ¡toda ayuda suma!</li>
        </ul>
        <p className="mb-8">
          ¿Quieres ser voluntario/a? <a href="/contacto" className="text-red-900 underline hover:text-red-700">Contáctanos</a> o completa el formulario y nosotros nos comunicaremos contigo.
        </p>
      </AwraWelcomeLayout>
    </AwraLayout>
  );
};

export default Welcome;