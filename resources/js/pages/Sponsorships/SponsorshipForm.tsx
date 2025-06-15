import { useForm, usePage } from '@inertiajs/react';
import ApplicantFields from '@/components/awra-components/awra-forms/ApplicantFields';
import AwraFormLayout from '@/layouts/awra-form-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import type { Animal, User, UserProfile, ApplicantData } from '@/types';

interface SponsorshipPageProps extends Record<string, unknown> {
    animal: Animal;
    user: User;
    profile?: UserProfile | null;
}

export default function SponsorshipForm() {
    const { animal, user, profile } = usePage<SponsorshipPageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm<ApplicantData & {
        amount_eur: string;
        payment_method: string;
        notes: string;
    }>({
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
                : '',
        amount_eur: '',
        payment_method: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('sponsorships.submit', animal.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AwraFormLayout
            title="Formulario de apadrinamiento"
            onSubmit={handleSubmit}
            actions={
                <>
                    <Button type="submit" className="w-full" disabled={processing}>
                        Enviar solicitud de apadrinamiento
                    </Button>
                    <Button asChild variant="secondary" className="w-full mt-2">
                        <Link href={route('sponsorships.welcome', animal.id)}>
                            Cancelar
                        </Link>
                    </Button>
                </>
            }
            errors={errors}
        >
            <ApplicantFields data={data} setData={setData} errors={errors} />
            <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                    id="direccion"
                    value={data.direccion}
                    onChange={e => setData('direccion', e.target.value)}
                    required
                    className="w-full"
                />
                {errors.direccion && <div className="text-destructive text-sm">{errors.direccion}</div>}
            </div>
            <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                    id="telefono"
                    value={data.telefono}
                    onChange={e => setData('telefono', e.target.value)}
                    required
                    className="w-full"
                />
                {errors.telefono && <div className="text-destructive text-sm">{errors.telefono}</div>}
            </div>
            <div>
                <Label htmlFor="amount_eur">Cantidad mensual (€)</Label>
                <Input
                    id="amount_eur"
                    type="number"
                    min={1}
                    step={1}
                    value={data.amount_eur}
                    onChange={e => setData('amount_eur', e.target.value)}
                    className="w-full"
                />
                {errors.amount_eur && <div className="text-destructive text-sm">{errors.amount_eur}</div>}
            </div>
            <div>
                <Label htmlFor="payment_method">Método de pago</Label>
                <Select
                    value={data.payment_method}
                    onValueChange={value => setData('payment_method', value)}
                    name="payment_method"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="transferencia">Transferencia</SelectItem>
                        <SelectItem value="tarjeta">Tarjeta</SelectItem>
                        <SelectItem value="bizum">Bizum</SelectItem>
                    </SelectContent>
                </Select>
                {errors.payment_method && (
                    <div className="text-destructive text-sm">{errors.payment_method}</div>
                )}
            </div>
            <div>
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