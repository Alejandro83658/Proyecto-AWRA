import AwraLayout from '../layouts/awra-main-layout';

export default function Dona() {
    return (
        <AwraLayout title="Dona - AWRA">
            <h1 className="text-3xl font-bold mb-4">Haz una donación</h1>
            <p className="mb-6 text-lg">
                Tu donación es fundamental para que podamos seguir rescatando, cuidando y buscando hogar a perros y gatos en situación de abandono.
            </p>
            <p className="mb-4">
                Puedes colaborar con una aportación puntual o periódica. Toda ayuda, por pequeña que sea, marca la diferencia.
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Alimentación y cuidados veterinarios.</li>
                <li>Material de limpieza y mantenimiento del refugio.</li>
                <li>Medicamentos, vacunas y esterilizaciones.</li>
            </ul>
            <p>
                ¿Quieres donar? <a href="/contacto" className="text-red-900 underline hover:text-red-700">Contáctanos</a> y te informamos de todas las opciones.
            </p>
        </AwraLayout>
    );
}