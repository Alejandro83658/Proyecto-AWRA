import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { usePage } from "@inertiajs/react";

type AuthUser = { name?: string; avatar?: string };
type AuthProps = { auth?: { user?: AuthUser } };

export default function AwraHeaderNav() {
  const { auth } = usePage().props as AuthProps;
  const url = window.location.pathname;

  // Helper para saber si el menú está activo
  const isActive = (path: string) => url.startsWith(path);

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-col md:flex-row items-center gap-4 md:gap-8">
        {/* ADOPTA con desplegable */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`font-bold no-underline
              ${isActive("/adopta") ? "text-red-900" : "text-gray-900 hover:text-red-900"}
            `}
          >
            ADOPTA
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[320px]">
            <ul className="grid gap-1 grid-cols-2">
              <li className="col-span-2 mb-2">
                <NavigationMenuLink
                  href="/adopta"
                  className={`flex flex-col items-center gap-1 p-3 rounded no-underline font-bold w-full
                  ${url === "/adopta" ? "text-red-900" : "text-gray-900 hover:text-red-900"} 
                  `}
                  style={{ textDecoration: "none" }}
                >
                  {/* "Nuestros Peludos" mantiene su propio tamaño */}
                  <img src="/img/varias/animalsTodos.jpg" alt="Nuestros Peludos" className="w-full h-30 object-cover rounded" />
                  <span className="mt-2 text-lg">Nuestros Peludos</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  href="/adopta?species=Perro"
                  className={`flex flex-col items-center gap-1 p-3 rounded no-underline font-bold w-full
                      ${url.startsWith("/adopta") && new URLSearchParams(window.location.search).get('species') === 'Perro'
                      ? "text-red-900"
                      : "text-gray-900 hover:text-red-900"}
                  `}
                  style={{ textDecoration: "none" }}
                >
                  <img src="/img/perros/labrador-7378080_1280.jpg" alt="Perros" className="w-full h-20 object-cover rounded" />
                  <span>Perros</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  href="/adopta?species=Gato"
                  className={`flex flex-col items-center gap-1 p-3 rounded no-underline font-bold w-full
                      ${url.startsWith("/adopta") && new URLSearchParams(window.location.search).get('species') === 'Gato'
                      ? "text-red-900"
                      : "text-gray-900 hover:text-red-900"}
                  `}
                  style={{ textDecoration: "none" }}
                >
                  <img src="/img/gatos/cat-1.jpg" alt="Gatos" className="w-full h-20 object-cover rounded" />
                  <span>Gatos</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  href="/adopta?special_type=Invisible"
                  className={`flex flex-col items-center gap-1 p-3 rounded no-underline font-bold w-full
                    ${url.includes("special_type=Invisible") ? "text-red-900" : "text-gray-900 hover:text-red-900"}
                  `}
                  style={{ textDecoration: "none" }}
                >
                  <img src="/img/perros/dog-invisible.jpg" alt="Invisibles" className="w-full h-20 object-cover rounded" />
                  <span>Invisibles</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  href="/adopta?special_type=Urgente"
                  className={`flex flex-col items-center gap-1 p-3 rounded no-underline font-bold w-full
                    ${url.includes("special_type=Urgente") ? "text-red-900" : "text-gray-900 hover:text-red-900"}
                  `}
                  style={{ textDecoration: "none" }}
                >
                  <img src="/img/gatos/cat-2.jpg" alt="Urgentes" className="w-full h-20 object-cover rounded" />
                  <span>Urgentes</span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* COLABORA con desplegable */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`font-bold no-underline
              ${isActive("/colabora") ? "text-red-900" : "text-gray-900 hover:text-red-900"}
            `}
          >
            COLABORA
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[320px]">
            <ul className="grid grid-cols-2 gap-4">
              <li>
                <NavigationMenuLink
                  href="/apadrina/bienvenida"
                  className={`flex flex-col items-center gap-1 p-2 rounded no-underline font-bold w-full
                  ${url === "/apadrina/bienvenida" ? "text-red-900" : "text-gray-900 hover:text-red-900"}
            `}
                  style={{ textDecoration: "none" }}
                >
                  <img src="/img/varias/apadrinaPeq.jpg" alt="Apadrina" className="w-full h-20 object-cover rounded" />
                  <span className="mt-2 text-base">Apadrina</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  href="/acoge/bienvenida"
                  className={`flex flex-col items-center gap-1 p-2 rounded no-underline font-bold w-full
                    ${url === "/acoge/bienvenida" ? "text-red-900" : "text-gray-900 hover:text-red-900"}
                  `}
                  style={{ textDecoration: "none" }}
                >
                  <img src="/img/varias/acogePeq2.jpg" alt="Acoge" className="w-full h-20 object-cover rounded" />
                  <span className="mt-2 text-base">Acoge</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  href="/dona"
                  className={`flex flex-col items-center gap-1 p-2 rounded no-underline font-bold w-full
                    ${url === "/dona" ? "text-red-900" : "text-gray-900 hover:text-red-900"}
                  `}
                  style={{ textDecoration: "none" }}
                >
                  <img src="/img/varias/donaPeq.jpg" alt="Dona" className="w-full h-20 object-cover rounded" />
                  <span className="mt-2 text-base">Dona</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  href="/voluntario/bienvenida"
                  className={`flex flex-col items-center gap-1 p-2 rounded no-underline font-bold w-full
                    ${url === "/voluntario/bienvenida" ? "text-red-900" : "text-gray-900 hover:text-red-900"}
                  `}
                  style={{ textDecoration: "none" }}
                >
                  <img src="/img/varias/voluntarioPeq.jpg" alt="Voluntariado" className="w-full h-20 object-cover rounded" />
                  <span className="mt-2 text-base">Voluntariado</span>
                </NavigationMenuLink>
              </li>

              <li className="col-span-2 flex justify-center">
                <NavigationMenuLink
                  href="/socio/bienvenida"
                  className={`flex flex-col items-center gap-1 p-2 rounded no-underline font-bold max-w-xs
                  ${url === "/socio/bienvenida" ? "text-red-900" : "text-gray-900 hover:text-red-900"}
           `}
                  style={{ textDecoration: "none" }}
                >
                  <img src="/img/varias/socioPeq.jpg" alt="Hazte socio" className="w-full h-20 object-cover rounded" />
                  <span className="mt-2 text-base">Hazte socio</span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* NOSOTROS */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/nosotros"
            className={`font-bold no-underline
              ${url === "/nosotros" ? "text-red-900" : "text-gray-900 hover:text-red-900"}
            `}
            style={{ textDecoration: "none" }}
          >
            NOSOTROS
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* CONTACTO */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contacto"
            className={`font-bold no-underline
              ${url === "/contacto" ? "text-red-900" : "text-gray-900 hover:text-red-900"}
            `}
            style={{ textDecoration: "none" }}
          >
            CONTACTO
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}