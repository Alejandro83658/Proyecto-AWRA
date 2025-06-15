import { useForm, usePage, Link } from '@inertiajs/react';
import ApplicantFields from '@/components/awra-components/awra-forms/ApplicantFields';
import AwraFormLayout from '@/layouts/awra-form-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import type { User, UserProfile, Member } from '@/types';

interface MemberPageProps extends Record<string, unknown> {
    user: User;
    profile?: UserProfile | null;
    member?: Member | null;
}

export default function MemberForm() {
    const { user, profile, member } = usePage<MemberPageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: member?.name || profile?.first_name || '',
        apellidos: profile?.last_name || '',
        dni: profile?.dni || '',
        direccion: member?.address || profile?.address || '',
        city: member?.city || profile?.city || '',
        province: member?.province || profile?.province || '',
        email: member?.email || user.email || '',
        telefono: member?.phone || profile?.phone || '',
        birth_date:
            profile?.birth_date && /^\d{4}-\d{2}-\d{2}$/.test(profile.birth_date)
                ? profile.birth_date
                : '',
        amount: member?.amount || '',
        frequency: member?.frequency || '',
        payment_method: member?.payment_method || '',
        comments: member?.comments || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('members.submit'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AwraFormLayout
            title="Formulario de alta de socio/a"
            onSubmit={handleSubmit}
            actions={
                <>
                    <Button type="submit" className="w-full" disabled={processing}>
                        Enviar solicitud de socio/a
                    </Button>
                    <Button
                        asChild
                        variant="secondary"
                        className="w-full mt-2"
                    >
                        <Link href={route('members.welcome')}>
                            Cancelar
                        </Link>
                    </Button>
                </>
            }
            errors={errors}
        >
            <ApplicantFields data={data} setData={setData} errors={errors} />

            <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                    id="telefono"
                    name="telefono"
                    value={data.telefono}
                    onChange={e => setData('telefono', e.target.value)}
                    className="w-full"
                />
                {errors.telefono && <div className="text-destructive text-sm">{errors.telefono}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                    id="direccion"
                    name="direccion"
                    value={data.direccion}
                    onChange={e => setData('direccion', e.target.value)}
                    className="w-full"
                />
                {errors.direccion && <div className="text-destructive text-sm">{errors.direccion}</div>}
            </div>
            <div className="mb-4">
                <Label htmlFor="amount">Cantidad a aportar (€)</Label>
                <Input
                    id="amount"
                    type="number"
                    min={1}
                    value={data.amount}
                    onChange={e => setData('amount', e.target.value)}
                    className="w-full"
                />
                {errors.amount && <div className="text-destructive text-sm">{errors.amount}</div>}
            </div>
            <div className="mb-4">
                <Label htmlFor="frequency">Frecuencia</Label>
                <Select
                    value={data.frequency}
                    onValueChange={value => setData('frequency', value)}
                    name="frequency"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mensual">Mensual</SelectItem>
                        <SelectItem value="trimestral">Trimestral</SelectItem>
                        <SelectItem value="anual">Anual</SelectItem>
                    </SelectContent>
                </Select>
                {errors.frequency && <div className="text-destructive text-sm">{errors.frequency}</div>}
            </div>
            <div className="mb-4">
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
                {errors.payment_method && <div className="text-destructive text-sm">{errors.payment_method}</div>}
            </div>
            <div className="mb-4">
                <Label htmlFor="comments">Comentarios (opcional)</Label>
                <textarea
                    id="comments"
                    value={data.comments}
                    onChange={e => setData('comments', e.target.value)}
                    className="w-full border rounded px-3 py-2 min-h-[80px] text-sm"
                />
                {errors.comments && <div className="text-destructive text-sm">{errors.comments}</div>}
            </div>
        </AwraFormLayout>
    );
}