import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Perfil',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string; // alias
    email: string;
    first_name: string;
    last_name: string;
    dni: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    profile_picture: string;
    birth_date: string;
    comments: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth, user_profile } = usePage<SharedData & { user_profile: any }>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        name: auth.user.name || '',
        email: auth.user.email || '',
        first_name: user_profile?.first_name || '',
        last_name: user_profile?.last_name || '',
        dni: user_profile?.dni || '',
        phone: user_profile?.phone || '',
        address: user_profile?.address || '',
        city: user_profile?.city || '',
        province: user_profile?.province || '',
        profile_picture: user_profile?.profile_picture || '',
        birth_date: user_profile?.birth_date || '',
        comments: user_profile?.comments || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuración de perfil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Información de perfil" description="Actualiza tus datos personales" />

                    <form onSubmit={submit} className="space-y-6">
                        {/* Alias */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Alias (nombre de usuario)</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                                autoComplete="nickname"
                                placeholder="Alias público"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Correo electrónico"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {/* Nombre real */}
                        <div className="grid gap-2">
                            <Label htmlFor="first_name">Nombre</Label>
                            <Input
                                id="first_name"
                                className="mt-1 block w-full"
                                value={data.first_name}
                                onChange={e => setData('first_name', e.target.value)}
                                autoComplete="given-name"
                                placeholder="Nombre real"
                            />
                            <InputError className="mt-2" message={errors.first_name} />
                        </div>

                        {/* Apellidos */}
                        <div className="grid gap-2">
                            <Label htmlFor="last_name">Apellidos</Label>
                            <Input
                                id="last_name"
                                className="mt-1 block w-full"
                                value={data.last_name}
                                onChange={e => setData('last_name', e.target.value)}
                                autoComplete="family-name"
                                placeholder="Apellidos"
                            />
                            <InputError className="mt-2" message={errors.last_name} />
                        </div>

                        {/* DNI */}
                        <div className="grid gap-2">
                            <Label htmlFor="dni">DNI</Label>
                            <Input
                                id="dni"
                                className="mt-1 block w-full"
                                value={data.dni}
                                onChange={e => setData('dni', e.target.value)}
                                autoComplete="off"
                                placeholder="DNI"
                            />
                            <InputError className="mt-2" message={errors.dni} />
                        </div>

                        {/* Teléfono */}
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                autoComplete="tel"
                                placeholder="Teléfono"
                            />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        {/* Dirección */}
                        <div className="grid gap-2">
                            <Label htmlFor="address">Dirección</Label>
                            <Input
                                id="address"
                                className="mt-1 block w-full"
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                autoComplete="street-address"
                                placeholder="Dirección"
                            />
                            <InputError className="mt-2" message={errors.address} />
                        </div>

                        {/* Ciudad */}
                        <div className="grid gap-2">
                            <Label htmlFor="city">Ciudad</Label>
                            <Input
                                id="city"
                                className="mt-1 block w-full"
                                value={data.city}
                                onChange={e => setData('city', e.target.value)}
                                autoComplete="address-level2"
                                placeholder="Ciudad"
                            />
                            <InputError className="mt-2" message={errors.city} />
                        </div>

                        {/* Provincia */}
                        <div className="grid gap-2">
                            <Label htmlFor="province">Provincia</Label>
                            <Input
                                id="province"
                                className="mt-1 block w-full"
                                value={data.province}
                                onChange={e => setData('province', e.target.value)}
                                autoComplete="address-level1"
                                placeholder="Provincia"
                            />
                            <InputError className="mt-2" message={errors.province} />
                        </div>

                        {/* Foto de perfil */}
                        <div className="grid gap-2">
                            <Label htmlFor="profile_picture">Foto de perfil (URL)</Label>
                            <Input
                                id="profile_picture"
                                className="mt-1 block w-full"
                                value={data.profile_picture}
                                onChange={e => setData('profile_picture', e.target.value)}
                                autoComplete="off"
                                placeholder="URL de la foto de perfil"
                            />
                            <InputError className="mt-2" message={errors.profile_picture} />
                        </div>

                        {/* Fecha de nacimiento */}
                        <div className="grid gap-2">
                            <Label htmlFor="birth_date">Fecha de nacimiento</Label>
                            <Input
                                id="birth_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.birth_date}
                                onChange={e => setData('birth_date', e.target.value)}
                                autoComplete="bday"
                                placeholder="Fecha de nacimiento"
                            />
                            <InputError className="mt-2" message={errors.birth_date} />
                        </div>

                        {/* Comentarios */}
                        <div className="grid gap-2">
                            <Label htmlFor="comments">Comentarios</Label>
                            <Input
                                id="comments"
                                className="mt-1 block w-full"
                                value={data.comments}
                                onChange={e => setData('comments', e.target.value)}
                                autoComplete="off"
                                placeholder="Comentarios"
                            />
                            <InputError className="mt-2" message={errors.comments} />
                        </div>

                        {/* Verificación de email */}
                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Tu correo electrónico no está verificado.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Haz clic aquí para reenviar el correo de verificación.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Se ha enviado un nuevo enlace de verificación a tu correo electrónico.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Guardar</Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Guardado</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}