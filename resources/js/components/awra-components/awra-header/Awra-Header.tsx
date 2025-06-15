import React, { useRef, useState } from "react";
import AwraHeaderLogo from "./Awra-HeaderLogo";
import AwraHeaderNav from "./Awra-HeaderNav";
import AwraDropdownMenu from "../Awra-DropdownMenu";
import { Button } from "@/components/ui/button";
import { usePage, Link } from "@inertiajs/react";
import AwraHeaderMobileMenu from "./AwraHeaderMobileMenu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaFacebookF, FaPinterestP, FaYoutube, FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function AwraHeader() {
  const page = usePage();
  const auth = (page.props as any).auth;
  const unreadNotificationsCount = (page.props as any).unreadNotificationsCount ?? 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  return (
   <header className=" bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.15)] dark:shadow-[0_4px_24px_0_rgba(0,0,0,0.7)] ">
      <div className="container mx-auto flex items-center justify-between py-2 px-2 min-h-[64px]">
        {/* Logo a la izquierda */}
        <div className="flex items-center min-w-[120px]">
          <AwraHeaderLogo />
        </div>
        {/* Navegación centrada */}
        <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <AwraHeaderNav />
        </nav>
        {/* Login/Avatar y notificaciones a la derecha */}
        <div className="hidden lg:flex items-center min-w-[120px] justify-end gap-4">
          {auth?.user && (
            <Link href="/admin/notificaciones" className="relative">
              <IoMdNotificationsOutline className="text-2xl text-gray-700 dark:text-gray-700" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                  {unreadNotificationsCount}
                </span>
              )}
            </Link>
          )}
          {!auth?.user ? (
            <a
              href="/login"
              className="font-bold bg-red-900 text-white border border-red-900 rounded px-4 py-2 hover:bg-white hover:text-red-900 transition"
            >
              Iniciar sesión
            </a>
          ) : (
            <AwraDropdownMenu />
          )}
        </div>
        {/* Mobile burger */}
        <div className="lg:hidden flex items-center justify-between w-full gap-2">
          <div className="flex-1 flex justify-center">
            <Button
              ref={burgerRef}
              variant="outline"
              className="bg-red-900 text-white border-red-900 hover:bg-red-800 hover:text-white"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">Abrir menú</span>
              ☰
            </Button>
          </div>
          {/* Login o avatar a la derecha */}
          <div className="flex items-center">
            {!auth?.user ? (
              <a
                href="/login"
                className="font-bold bg-red-900 text-white border border-red-900 rounded px-2 py-1 text-sm hover:bg-white hover:text-red-900 transition"
              >
                Iniciar sesión
              </a>
            ) : (
              <AwraDropdownMenu />
            )}
          </div>
        </div>
      </div>
      {menuOpen && (
        <AwraHeaderMobileMenu auth={auth} setMenuOpen={setMenuOpen} burgerRef={burgerRef} />
      )}
    </header>
  );
}