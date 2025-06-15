import AppLogoIcon from './app-logo-icon';
import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link href="/" className="flex items-center">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-12 items-center justify-center rounded-md">
                {/* Logo para modo claro */}
                <img
                    src="/img/logos/awraLogoBlanco.svg"
                    alt="Logo AWRA"
                    className="size-20 object-contain block dark:hidden"
                />
                {/* Logo para modo oscuro */}
                <img
                    src="/img/logos/awraLogoNegro.svg"
                    alt="Logo AWRA"
                    className="size-20 object-contain hidden dark:block"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">AWRA</span>
            </div>
        </Link>
    );
}