import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { BookOpen, Folder, LayoutGrid, User } from 'lucide-react';
import AppLogo from './app-logo';
import { PawPrint, ListPlus, List, Bell } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export function AppSidebar() {
    const { userRole } = usePage().props as { userRole?: string };
    const allowedRoles = ['super_admin', 'admin', 'staff'];

    const mainNavItems: NavItem[] = allowedRoles.includes(userRole ?? '')
        ? [
            {
                title: 'Panel de control',
                href: '/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Notificaciones',
                href: '/admin/notificaciones',
                icon: Bell,
            },
            {
                title: 'Usuarios',
                href: '/admin/users',
                icon: User,
            },
            {
                title: 'Animales',
                href: '/admin/animals',
                icon: PawPrint,
            },
            {
                title: 'Adopciones',
                href: '/admin/adoptions',
                icon: BookOpen,
            },
            {
                title: 'Voluntarios',
                href: '/admin/volunteers',
                icon: ListPlus,
            },
            {
                title: 'Apadriamientos',
                href: '/admin/sponsorships',
                icon: List,
            },
            {
                title: 'Acogimientos',
                href: '/admin/fosterings',
                icon: Folder,
            },
            {
                title: 'Socios',
                href: '/admin/members',
                icon: Folder,
            },
        ]
        : [];

    const footerNavItems: NavItem[] = [
       
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <AppLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}