import { useState } from "react";

export default function AwraFooterNav() {
  const [modal, setModal] = useState<null | "privacidad" | "terminos">(null);

  return (
    <>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
        <li>
          <a href="/nosotros" className="hover:underline me-4 md:me-6">
            Nosotros
          </a>
        </li>
        <li>
          <button
            type="button"
            className="hover:underline me-4 md:me-6 bg-transparent border-none text-white cursor-pointer"
            onClick={() => setModal("privacidad")}
          >
            Política de privacidad
          </button>
        </li>
        <li>
          <button
            type="button"
            className="hover:underline me-4 md:me-6 bg-transparent border-none text-white cursor-pointer"
            onClick={() => setModal("terminos")}
          >
            Términos y condiciones
          </button>
        </li>
        <li>
          <a href="/contacto" className="hover:underline">
            Contacto
          </a>
        </li>
      </ul>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white text-black rounded-lg p-8 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setModal(null)}
              aria-label="Cerrar"
            >
              ×
            </button>
            {modal === "privacidad" && (
              <>
                <h2 className="text-lg font-bold mb-2">Política de privacidad</h2>
                <p>
                  Este sitio web no almacena datos personales sin tu consentimiento. Los datos enviados a través de formularios solo se usan para responder a tu consulta y no se comparten con terceros.
                </p>
              </>
            )}
            {modal === "terminos" && (
              <>
                <h2 className="text-lg font-bold mb-2">Términos y condiciones</h2>
                <p>
                  El uso de este sitio implica la aceptación de nuestras normas. No nos hacemos responsables del uso indebido de la información publicada. Consulta siempre fuentes oficiales para información legal.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}