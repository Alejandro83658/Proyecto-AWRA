import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    last_name?: string;
    email: string;
    avatar?: string;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
    user_profile?: UserProfile | null;
    unread_notifications_count?: number;
    [key: string]: unknown;
}

export interface Animal {
    id: number;
    name: string;
    species: string;
    breed?: string;
    sex: string;
    age: number | null; // Puede ser null si no se especifica
    birth_date?: string;
    arrival_date: string;
    size: string;
    weight_kg?: number;
    chip_number?: string;
    status: string;
    special_type?: string;
    deceased_date?: string;
    health_notes?: string;
    description?: string;
    image_url?: string;
    images?: AnimalImage[];
    is_fosterable?: boolean;
    is_fostered?: boolean;

}

export interface UserProfile {
    dni: string;
    first_name?: string;
    last_name?: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    birth_date: string;
    comments: string;
    profile_picture?: string;
}



export interface UsersPagination {
    data: User[];
    links: { url: string | null; label: string; active: boolean }[];
}

export interface AnimalImage {
    id: number;
    animal_id: number;
    path: string;
    is_cover: boolean;
    created_at: string;
    updated_at: string;
}

export type ApplicantData = {
    nombre: string;
    apellidos: string;
    dni: string;
    direccion: string;
    city: string;
    province: string;
    email: string;
    telefono: string;
    birth_date: string;
};

export interface Adoption {
    id: number;
    animal_id: number;
    animal_name: string;
    user_id: number;
    user_name: string;
    status: string;
    created_at: string;
    reason?: string;
    notes?: string;
};

export interface Volunteer {
    id: number;
    user_id: number;
    user: User;
    status: 'pendiente' | 'aceptado' | 'rechazado';
    notes?: string;
    created_at: string;
}

export interface Member {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone?: string;
    dni?: string;
    address?: string;
    city?: string;
    province?: string;
    amount: number;
    frequency: 'mensual' | 'trimestral' | 'anual';
    payment_method: 'transferencia' | 'tarjeta' | 'bizum';
    comments?: string;
    status: 'pendiente' | 'aceptado' | 'rechazado';
    created_at: string;
    updated_at: string;
    birth_date?: string;
}

