import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function DeleteAnimal({ animalId, animalName }: { animalId: number, animalName: string }) {
    const { delete: destroy, processing } = useForm();
    const [confirming, setConfirming] = useState(false);

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(route('admin.animals.destroy', animalId));
    };

    return (
        <section className="mt-12 border-t pt-8">
            <h2 className="text-lg font-semibold text-red-900 mb-2">Eliminar animal</h2>
            <p className="text-sm text-muted-foreground mb-2">
                Elimina este animal y todos sus datos del sistema.
            </p>
            <div className="bg-gray-300 border border-gray-700 rounded p-4 mb-4">
                <strong className="block text-red-900 mb-1">¡Atención!</strong>
                <span className="text-red-900">
                    Por favor, procede con precaución. Esta acción no se puede deshacer.
                </span>
            </div>
            {confirming ? (
                <form onSubmit={handleDelete}>
                    <p className="mb-2 text-sm text-red-900">
                        ¿Estás seguro de que quieres eliminar <b>{animalName}</b>? Esta acción es irreversible.
                    </p>
                    <div className="flex gap-2">
                        <Button type="submit" variant="destructive" disabled={processing}>
                            Eliminar animal
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setConfirming(false)}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            ) : (
                <Button variant="destructive" onClick={() => setConfirming(true)}>
                    Eliminar animal
                </Button>
            )}
        </section>
    );
}