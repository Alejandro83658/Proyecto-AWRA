import AwraLayout from '../layouts/awra-main-layout';

export default function Nosotros() {
    return (
        <AwraLayout title="Nosotros - AWRA">
            <h1 className="text-3xl font-bold mb-4"></h1>
            <div className="mt-8">
                <p className="mb-6 text-lg">
                    AWRA es una aplicación web dedicada a ayudar a refugios de animales a gestionar adopciones, voluntariado y colaboraciones.
                </p>
                <p className="mb-4">
                    Nuestro objetivo es facilitar la labor de los refugios y conectar a más personas con animales que buscan un hogar.
                </p>
                <p>
                    Si quieres saber más o colaborar con nosotros, no dudes en contactarnos.
                </p>
            </div>
        </AwraLayout>
    );
}