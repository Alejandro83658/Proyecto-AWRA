import { useForm } from "react-hook-form";
import { router } from '@inertiajs/react';
import AwraLayout from '../layouts/awra-main-layout';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaPinterestP, FaYoutube, FaXTwitter, FaInstagram } from "react-icons/fa6";

type ContactForm = {
    nombre: string;
    email: string;
    asunto: string;
    otroAsunto?: string;
    mensaje: string;
};

export default function Contacto() {
    const form = useForm<ContactForm>({
        defaultValues: {
            nombre: '',
            email: '',
            asunto: '',
            otroAsunto: '',
            mensaje: '',
        }
    });
    const [showOtro, setShowOtro] = useState(false);

    const onSubmit = (data: ContactForm) => {
        const asuntoFinal = data.asunto === "otros" ? data.otroAsunto : data.asunto;
        router.post('/contacto', { ...data, asunto: asuntoFinal }, {
            onSuccess: () => {
                alert('¡Mensaje enviado correctamente!');
                form.reset();
            },
            onError: () => {
                alert('Hubo un error al enviar el mensaje.');
            }
        });
    };

    return (
        <AwraLayout title="Contacto">
            <div className="mt-10" /> {/* Espacio para el header */}
            <h1 className="text-3xl font-bold mb-4"></h1>
            <p className="mb-6 text-lg">
                ¿Tienes dudas, sugerencias o quieres colaborar con nosotros? ¡Contáctanos!
            </p>
            <ul className="mb-4 text-left">
                <li><strong>Email:</strong> contacto@awra.com</li>
                <li><strong>Teléfono:</strong> +34 600 000 000</li>
                <li><strong>Dirección:</strong> Calle Refugio, 123, Ciudad, País</li>
            </ul>
            <p className="mb-2">
                También puedes encontrarnos en nuestras redes sociales.
            </p>
            <div className="flex justify-center gap-5 mb-8">
                <a href="#" className="text-red-900 hover:text-gray-700" aria-label="Facebook">
                    <FaFacebookF className="w-7 h-7" />
                </a>
                <a href="#" className="text-red-900 hover:text-gray-700" aria-label="Pinterest">
                    <FaPinterestP className="w-7 h-7" />
                </a>
                <a href="#" className="text-red-900 hover:text-gray-700" aria-label="YouTube">
                    <FaYoutube className="w-7 h-7" />
                </a>
                <a href="#" className="text-red-900 hover:text-gray-700" aria-label="X">
                    <FaXTwitter className="w-7 h-7" />
                </a>
                <a href="#" className="text-red-900 hover:text-gray-700" aria-label="Instagram">
                    <FaInstagram className="w-7 h-7" />
                </a>
            </div>
            <p className="mb-6 text-lg">
                Si prefieres, completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
            </p>
            <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 p-12 rounded shadow space-y-4 mb-20">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="nombre"
                            rules={{ required: "El nombre es obligatorio" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="text-black dark:text-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            rules={{
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                                    message: "Email no válido",
                                },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} className="text-black dark:text-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="asunto"
                            rules={{ required: "El asunto es obligatorio" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Asunto</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={value => {
                                                field.onChange(value);
                                                setShowOtro(value === "otros");
                                                if (value !== "otros") {
                                                    form.setValue("otroAsunto", "");
                                                }
                                            }}
                                        >
                                            <SelectTrigger className="text-black dark:text-white">
                                                <SelectValue placeholder="Selecciona un asunto" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="adopcion">Adopción</SelectItem>
                                                <SelectItem value="apadrinar">Apadrinar</SelectItem>
                                                <SelectItem value="acoger">Acoger</SelectItem>
                                                <SelectItem value="donaciones">Donaciones</SelectItem>
                                                <SelectItem value="socios">Socios</SelectItem>
                                                <SelectItem value="voluntariado">Voluntariado</SelectItem>
                                                <SelectItem value="otros">Otros</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {showOtro && (
                            <FormField
                                control={form.control}
                                name="otroAsunto"
                                rules={{ required: "Por favor, indica el asunto" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Especifica el asunto</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="text-black dark:text-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="mensaje"
                            rules={{ required: "El mensaje es obligatorio" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mensaje</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={8} className="text-black dark:text-white min-h-[160px]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className="bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-8 rounded transition min-w-[160px] max-w-xs w-full"
                                style={{ maxWidth: 220 }}
                            >
                                Enviar
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </AwraLayout>
    );
}