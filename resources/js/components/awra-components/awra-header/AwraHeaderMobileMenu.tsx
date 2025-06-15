import React, { useRef, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  FaFacebookF,
  FaPinterestP,
  FaYoutube,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
import AwraDropdownMenu from "../Awra-DropdownMenu";

type AuthUser = { name?: string; avatar?: string };
type AuthProps = { user?: AuthUser } | undefined;

interface AwraHeaderMobileMenuProps {
  auth: AuthProps;
  setMenuOpen: (open: boolean) => void;
  burgerRef: React.RefObject<HTMLButtonElement | null>;
}

export default function AwraHeaderMobileMenu({ auth, setMenuOpen, burgerRef }: AwraHeaderMobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(burgerRef.current && burgerRef.current.contains(event.target as Node))
      ) {
        setMenuOpen(false);
        setOpenAccordion(undefined);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setMenuOpen, burgerRef]);
  return (
    <div
      ref={menuRef}
      className="lg:hidden absolute left-0 top-full w-full bg-white shadow-lg border-b z-40 animate-fade-in flex flex-col"
    >
      <Accordion
        type="single"
        collapsible
        value={openAccordion}
        onValueChange={setOpenAccordion}
      >
        {/* ADOPTA */}
        <AccordionItem value="adopta">
          <AccordionTrigger
            className="flex items-center justify-between w-full font-bold text-red-900 text-base py-3 px-4 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] no-underline hover:no-underline focus:no-underline"
          >
            ADOPTA
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-2">
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="/adopta"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2 font-bold text-gray-900"
                >
                  <img src="/img/varias/animalsTodos.jpg" alt="Nuestros Peludos" className="w-16 h-16 object-cover rounded" />
                  <span>Nuestros Peludos</span>
                </a>
              </li>
              <li>
                <a
                  href="/adopta?species=Perro"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2 font-bold text-gray-900"
                >
                  <img src="/img/perros/labrador-7378080_1280.jpg" alt="Perros" className="w-16 h-16 object-contain rounded" />
                  <span>Perros</span>
                </a>
              </li>
              <li>
                <a
                  href="/adopta?species=Gato"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2 font-bold text-gray-900"
                >
                  <img src="/img/gatos/cat-1.jpg" alt="Gatos" className="w-16 h-16 object-contain rounded" />
                  <span>Gatos</span>
                </a>
              </li>
              <li>
                <a
                  href="/adopta?special_type=Invisible"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2 font-bold text-gray-900"
                >
                  <img src="/img/perros/dog-invisible.jpg" alt="Invisibles" className="w-16 h-16 object-contain rounded" />
                  <span>Invisibles</span>
                </a>
              </li>
              <li>
                <a
                  href="/adopta?special_type=Urgente"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2 font-bold text-gray-900"
                >
                  <img src="/img/gatos/cat-2.jpg" alt="Urgentes" className="w-16 h-16 object-contain rounded" />
                  <span>Urgentes</span>
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* COLABORA */}
        <AccordionItem value="colabora">
          <AccordionTrigger
            className="flex items-center justify-between w-full font-bold text-red-900 text-base py-3 px-4 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] no-underline hover:no-underline focus:no-underline"
          >
            COLABORA
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-2">
            {/* Enlace principal a COLABORA */}
            <a
              href="/colabora"
              onClick={() => setMenuOpen(false)}
              className="block font-bold text-gray-900 mb-2 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2"
            >
            </a>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="/apadrina/bienvenida"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2"
                >
                  <img src="/img/varias/apadrinaPeq.jpg" alt="Apadrina" className="w-16 h-16 object-cover rounded" />
                  <span className="font-bold text-gray-900">Apadrina</span>
                </a>
              </li>
              <li>
                <a
                  href="/acoge/bienvenida"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2"
                >
                  <img src="/img/varias/acogePeq2.jpg" alt="Acoge" className="w-16 h-16 object-cover rounded" />
                  <span className="font-bold text-gray-900">Acoge</span>
                </a>
              </li>
              <li>
                <a href="/dona" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2">
                  <img src="/img/varias/donaPeq.jpg" alt="Dona" className="w-16 h-16 object-cover rounded" />
                  <span className="font-bold text-gray-900">Dona</span>
                </a>
              </li>
              <li>
                <a href="/voluntario/bienvenida" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2">
                  <img src="/img/varias/voluntarioPeq.jpg" alt="Se voluntario" className="w-16 h-16 object-cover rounded" />
                  <span className="font-bold text-gray-900">Se voluntario</span>
                </a>
              </li>
              <li>
                <a href="/hazte socio/bienvenida" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03] p-2">
                  <img src="/img/varias/socioPeq.jpg" alt="Hazte socio" className="w-16 h-16 object-cover rounded" />
                  <span className="font-bold text-gray-900">Hazte socio</span>
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* NOSOTROS y CONTACTO */}
      <a
        href="/nosotros"
        className="block font-bold text-red-900 text-base py-3 px-4 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03]"
        onClick={() => setMenuOpen(false)}
      >
        NOSOTROS
      </a>
      <a
        href="/contacto"
        className="block font-bold text-red-900 text-base py-3 px-4 rounded transition duration-300 hover:bg-gray-300 hover:scale-[1.03]"
        onClick={() => setMenuOpen(false)}
      >
        CONTACTO
      </a>

      <hr className="my-2" />

      {/* Redes sociales */}
      <div className="flex justify-center gap-4 pb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener" className="text-red-900 hover:text-red-700" aria-label="Facebook">
          <FaFacebookF className="w-5 h-5" />
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noopener" className="text-red-900 hover:text-red-700" aria-label="Pinterest">
          <FaPinterestP className="w-5 h-5" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener" className="text-red-900 hover:text-red-700" aria-label="YouTube">
          <FaYoutube className="w-5 h-5" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener" className="text-red-900 hover:text-red-700" aria-label="X">
          <FaXTwitter className="w-5 h-5" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener" className="text-red-900 hover:text-red-700" aria-label="Instagram">
          <FaInstagram className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}