import { useForm, usePage, Link } from '@inertiajs/react';
import ApplicantFields from '@/components/awra-components/awra-forms/ApplicantFields';
import AwraFormLayout from '@/layouts/awra-form-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User, UserProfile } from '@/types';

interface VolunteersPageProps extends Record<string, unknown> {
    user: User;
    profile?: UserProfile | null;
}

export default function VolunteersForm() {
    const { user, profile } = usePage<VolunteersPageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: profile?.first_name || '',
        apellidos: profile?.last_name || '',
        dni: profile?.dni || '',
        direccion: profile?.address || '',
        city: profile?.city || '',
        province: profile?.province || '',
        email: user.email || '',
        telefono: profile?.phone || '',
        birth_date:
            profile?.birth_date && /^\d{4}-\d{2}-\d{2}$/.test(profile.birth_date)
                ? profile.birth_date
                : '', // unica forma que encontre para validar la fecha y que no de error en php
        area: '',
        availability: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('volunteers.submit'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AwraFormLayout
            title="Formulario de voluntariado"
            onSubmit={handleSubmit}
            actions={
                <>
                    <Button type="submit" className="w-full" disabled={processing}>
                        Enviar solicitud de voluntariado
                    </Button>
                    <Button asChild variant="secondary" className="w-full mt-2">
                        <Link href={route('volunteers.welcome')}>
                            Cancelar
                        </Link>
                    </Button>
                </>
            }
        >
            <ApplicantFields data={data} setData={setData} errors={errors} />

            <div className="mb-4">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className="w-full"
                />
                {errors.email && <div className="text-destructive text-sm">{errors.email}</div>}
            </div>
            <div className="mb-4">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                    id="telefono"
                    value={data.telefono}
                    onChange={e => setData('telefono', e.target.value)}
                    className="w-full"
                />
                {errors.telefono && <div className="text-destructive text-sm">{errors.telefono}</div>}
            </div>
            <div className="mb-4">
                <Label htmlFor="direccion">Domicilio</Label>
                <Input
                    id="direccion"
                    value={data.direccion}
                    onChange={e => setData('direccion', e.target.value)}
                    className="w-full"
                />
                {errors.direccion && <div className="text-destructive text-sm">{errors.direccion}</div>}
            </div>
            <div className="mb-4">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                    id="city"
                    value={data.city}
                    onChange={e => setData('city', e.target.value)}
                    className="w-full"
                />
                {errors.city && <div className="text-destructive text-sm">{errors.city}</div>}
            </div>
            <div className="mb-4">
                <Label htmlFor="province">Provincia</Label>
                <Input
                    id="province"
                    value={data.province}
                    onChange={e => setData('province', e.target.value)}
                    className="w-full"
                />
                {errors.province && <div className="text-destructive text-sm">{errors.province}</div>}
            </div>
            <div className="mb-4">
                <Label htmlFor="area">Área de interés</Label>
                <Input
                    id="area"
                    value={data.area}
                    onChange={e => setData('area', e.target.value)}
                    className="w-full"
                />
                {errors.area && <div className="text-destructive text-sm">{errors.area}</div>}
            </div>
            <div className="mb-4">
                <Label htmlFor="availability">Disponibilidad</Label>
                <Input
                    id="availability"
                    value={data.availability}
                    onChange={e => setData('availability', e.target.value)}
                    className="w-full"
                />
                {errors.availability && <div className="text-destructive text-sm">{errors.availability}</div>}
            </div>
            <div className="mb-4">
                <Label htmlFor="notes">Notas o comentarios (opcional)</Label>
                <Input
                    id="notes"
                    value={data.notes}
                    onChange={e => setData('notes', e.target.value)}
                    className="w-full"
                />
                {errors.notes && <div className="text-destructive text-sm">{errors.notes}</div>}
            </div>
        </AwraFormLayout>
    );
}