import { useForm, usePage } from '@inertiajs/react';
import AwraFormLayout from '@/layouts/awra-form-layout';
import ApplicantFields from '@/components/awra-components/awra-forms/ApplicantFields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@inertiajs/react';
import type { Animal, User, UserProfile, ApplicantData } from '@/types';

interface FosteringPageProps extends Record<string, unknown> {
    animal: Animal;
    user: User;
    profile?: UserProfile | null;
}

export default function FosteringForm() {
    const { animal, user, profile } = usePage<FosteringPageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm<ApplicantData & {
        email: string;
        telefono: string;
        direccion: string;
        city: string;
        province: string;
        motivo: string;
        experiencia: string;
        notas: string;
    }>({
        nombre: profile?.first_name || '',
        apellidos: profile?.last_name || '',
        dni: profile?.dni || '',
        birth_date:
            profile?.birth_date && /^\d{4}-\d{2}-\d{2}$/.test(profile.birth_date)
                ? profile.birth_date
                : '',
        email: user.email || '',
        telefono: profile?.phone || '',
        direccion: profile?.address || '',
        city: profile?.city || '',
        province: profile?.province || '',
        motivo: '',
        experiencia: '',
        notas: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('fosterings.submit', animal.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AwraFormLayout
            title="Formulario de acogida"
            onSubmit={handleSubmit}
            actions={
                <>
                    <Button type="submit" className="w-full" disabled={processing}>
                        Enviar solicitud de acogida
                    </Button>
                    <Button asChild variant="secondary" className="w-full mt-2">
                        <Link href={route('fosterings.welcome', animal.id)}>
                            Cancelar
                        </Link>
                    </Button>
                </>
            }
        >
            {/* Campos mínimos comunes */}
            <ApplicantFields data={data} setData={setData} errors={errors} />

            {/* Campos personales adicionales */}
            <div>
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
            <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                    id="telefono"
                    value={data.telefono}
                    onChange={e => setData('telefono', e.target.value)}
                    className="w-full"
                />
                {errors.telefono && <div className="text-destructive text-sm">{errors.telefono}</div>}
            </div>
            <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                    id="direccion"
                    value={data.direccion}
                    onChange={e => setData('direccion', e.target.value)}
                    className="w-full"
                />
                {errors.direccion && <div className="text-destructive text-sm">{errors.direccion}</div>}
            </div>
            <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input
                    id="city"
                    value={data.city}
                    onChange={e => setData('city', e.target.value)}
                    className="w-full"
                />
                {errors.city && <div className="text-destructive text-sm">{errors.city}</div>}
            </div>
            <div>
                <Label htmlFor="province">Provincia</Label>
                <Input
                    id="province"
                    value={data.province}
                    onChange={e => setData('province', e.target.value)}
                    className="w-full"
                />
                {errors.province && <div className="text-destructive text-sm">{errors.province}</div>}
            </div>

            {/* Campos específicos de acogida */}
            <div>
                <Label htmlFor="motivo">Motivo para acoger</Label>
                <Input
                    id="motivo"
                    value={data.motivo}
                    onChange={e => setData('motivo', e.target.value)}
                    className="w-full"
                />
                {errors.motivo && <div className="text-destructive text-sm">{errors.motivo}</div>}
            </div>
            <div>
                <Label htmlFor="experiencia">Experiencia previa (opcional)</Label>
                <Input
                    id="experiencia"
                    value={data.experiencia}
                    onChange={e => setData('experiencia', e.target.value)}
                    className="w-full"
                />
                {errors.experiencia && <div className="text-destructive text-sm">{errors.experiencia}</div>}
            </div>
            <div>
                <Label htmlFor="notas">Notas o comentarios (opcional)</Label>
                <Textarea
                    id="notas"
                    value={data.notas}
                    onChange={e => setData('notas', e.target.value)}
                    className="w-full"
                />
                {errors.notas && <div className="text-destructive text-sm">{errors.notas}</div>}
            </div>
        </AwraFormLayout>
    );
}