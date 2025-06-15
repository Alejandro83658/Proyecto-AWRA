import AwraAdminUserLayout from '@/layouts/awra-adminUser-layout';
import type { User, UserProfile } from '@/types';

interface AdminUserShowProps {
    user: User;
    userProfile?: UserProfile;
}

export default function AdminUserShow({ user, userProfile }: AdminUserShowProps) {
    return (
        <AwraAdminUserLayout>
            <div className="max-w-xl space-y-4">
                <h2 className="text-xl font-semibold">Detalle de usuario</h2>
                <div><strong>ID:</strong> {user.id}</div>
                <div><strong>Alias:</strong> {user.name}</div>
                <div><strong>Nombre:</strong> {userProfile?.first_name}</div>
                <div><strong>Apellidos:</strong> {userProfile?.last_name}</div>
                <div><strong>Email:</strong> {user.email}</div>
                <div><strong>DNI:</strong> {userProfile?.dni}</div>
                <div><strong>Teléfono:</strong> {userProfile?.phone}</div>
                <div><strong>Dirección:</strong> {userProfile?.address}</div>
                <div><strong>Ciudad:</strong> {userProfile?.city}</div>
                <div><strong>Provincia:</strong> {userProfile?.province}</div>
                <div><strong>Fecha de nacimiento:</strong> {userProfile?.birth_date}</div>
                <div><strong>Comentarios:</strong> {userProfile?.comments}</div>
                {userProfile?.profile_picture && (
                    <div>
                        <strong>Foto de perfil:</strong><br />
                        <img src={userProfile.profile_picture} alt="Foto de perfil" className="max-w-[120px] rounded" />
                    </div>
                )}
            </div>
        </AwraAdminUserLayout>
    );
}