import AwraAdminUserLayout from '@/layouts/awra-adminUser-layout';
import DeleteUser from '@/components/awra-components/awra-deleteUser';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { User, UserProfile } from '@/types';

interface AdminUserEditProps {
    user: User;
    userProfile?: UserProfile;
}

export default function AdminUserEdit({ user, userProfile }: AdminUserEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: typeof user.name === 'string' || typeof user.name === 'number' ? user.name : '',
        email: typeof user.email === 'string' || typeof user.email === 'number' ? user.email : '',
        password: '',
        password_confirmation: '',
        phone: typeof userProfile?.phone === 'string' || typeof userProfile?.phone === 'number' ? userProfile?.phone : '',
        dni: typeof userProfile?.dni === 'string' || typeof userProfile?.dni === 'number' ? userProfile?.dni : '',
        address: typeof userProfile?.address === 'string' ? userProfile?.address : '',
        city: typeof userProfile?.city === 'string' ? userProfile?.city : '',
        province: typeof userProfile?.province === 'string' ? userProfile?.province : '',
        birth_date: typeof userProfile?.birth_date === 'string' ? userProfile?.birth_date : '',
        comments: typeof userProfile?.comments === 'string' ? userProfile?.comments : '',
        profile_picture: userProfile?.profile_picture ?? '' as string | File,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('profile_picture', e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    return (
        <AwraAdminUserLayout>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <h2 className="text-xl font-semibold">Editar usuario</h2>
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" value={typeof data.name === 'string' || typeof data.name === 'number' ? data.name : ''} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <div className="text-red-600">{errors.name}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={typeof data.email === 'string' || typeof data.email === 'number' ? data.email : ''} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <div className="text-red-600">{errors.email}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Contraseña (dejar en blanco para no cambiar)</Label>
                    <Input id="password" type="password" value={typeof data.password === 'string' ? data.password : ''} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <div className="text-red-600">{errors.password}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                    <Input id="password_confirmation" type="password" value={typeof data.password_confirmation === 'string' ? data.password_confirmation : ''} onChange={e => setData('password_confirmation', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" value={typeof data.phone === 'string' || typeof data.phone === 'number' ? data.phone : ''} onChange={e => setData('phone', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dni">DNI</Label>
                    <Input id="dni" value={typeof data.dni === 'string' || typeof data.dni === 'number' ? data.dni : ''} onChange={e => setData('dni', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" value={typeof data.address === 'string' ? data.address : ''} onChange={e => setData('address', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" value={typeof data.city === 'string' ? data.city : ''} onChange={e => setData('city', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="province">Provincia</Label>
                    <Input id="province" value={typeof data.province === 'string' ? data.province : ''} onChange={e => setData('province', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="birth_date">Fecha de nacimiento</Label>
                    <Input id="birth_date" type="date" value={typeof data.birth_date === 'string' ? data.birth_date : ''} onChange={e => setData('birth_date', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="comments">Comentarios</Label>
                    <Textarea id="comments" value={typeof data.comments === 'string' ? data.comments : ''} onChange={e => setData('comments', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="profile_picture">Foto de perfil</Label>
                    <Input id="profile_picture" type="file" accept="image/*" onChange={handleFileChange} />
                    {userProfile?.profile_picture && (
                        <img src={userProfile.profile_picture} alt="Foto de perfil" className="max-w-[120px] rounded mt-2" />
                    )}
                </div>
                <div className="flex gap-4 mt-6">
                    <Button type="submit" disabled={processing}>
                        Guardar cambios
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-800"
                        onClick={() => window.location.href = route('admin.users.index')}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
            <DeleteUser userId={user.id} userName={typeof user.name === 'string' ? user.name : ''} />
        </AwraAdminUserLayout>
    );
}