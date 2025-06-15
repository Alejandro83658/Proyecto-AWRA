import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ApplicantData } from "@/types";

interface ApplicantFieldsProps {
  data: ApplicantData;
  setData: (field: keyof ApplicantData, value: string) => void;
  errors: Partial<Record<keyof ApplicantData, string>>;
}

export default function ApplicantFields({ data, setData, errors }: ApplicantFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          value={data.nombre}
          onChange={e => setData('nombre', e.target.value)}
          className="w-full"
        />
        {errors.nombre && <div className="text-destructive text-sm mt-1">{errors.nombre}</div>}
      </div>
      <div>
        <Label htmlFor="apellidos">Apellidos</Label>
        <Input
          id="apellidos"
          value={data.apellidos}
          onChange={e => setData('apellidos', e.target.value)}
          className="w-full"
        />
        {errors.apellidos && <div className="text-destructive text-sm mt-1">{errors.apellidos}</div>}
      </div>
      <div>
        <Label htmlFor="dni">DNI</Label>
        <Input
          id="dni"
          value={data.dni}
          onChange={e => setData('dni', e.target.value)}
          className="w-full"
        />
        {errors.dni && <div className="text-destructive text-sm mt-1">{errors.dni}</div>}
      </div>
      <div>
        <Label htmlFor="birth_date">Fecha de nacimiento</Label>
        <Input
          id="birth_date"
          type="date"
          value={data.birth_date || ''}
          onChange={e => setData('birth_date', e.target.value)}
          className="w-full"
        />
        {errors.birth_date && <div className="text-destructive text-sm mt-1">{errors.birth_date}</div>}
      </div>
    </div>
  );
}