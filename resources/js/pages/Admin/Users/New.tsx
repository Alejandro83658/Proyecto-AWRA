import AwraAdminUserLayout from '@/layouts/awra-adminUser-layout';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function AdminUserNew() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        dni: '',
        address: '',
        city: '',
        province: '',
        birth_date: '',
        comments: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AwraAdminUserLayout>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <h2 className="text-xl font-semibold">Nuevo usuario</h2>
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <div className="text-red-600">{errors.name}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <div className="text-red-600">{errors.email}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <div className="text-red-600">{errors.password}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                    <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dni">DNI</Label>
                    <Input id="dni" value={data.dni} onChange={e => setData('dni', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" value={data.address} onChange={e => setData('address', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" value={data.city} onChange={e => setData('city', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="province">Provincia</Label>
                    <Input id="province" value={data.province} onChange={e => setData('province', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="birth_date">Fecha de nacimiento</Label>
                    <Input id="birth_date" type="date" value={data.birth_date} onChange={e => setData('birth_date', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="comments">Comentarios</Label>
                    <Textarea id="comments" value={data.comments} onChange={e => setData('comments', e.target.value)} />
                </div>
                <Button type="submit" disabled={processing}>Guardar</Button>
            </form>
        </AwraAdminUserLayout>
    );
}