import { ReactNode } from "react";

interface AwraFormLayoutProps {
  title: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  actions?: ReactNode;
  errors?: Record<string, string>; 
}

export default function AwraFormLayout({ title, children, onSubmit, actions, errors }: AwraFormLayoutProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 max-w-lg mx-auto bg-background p-8 rounded shadow"
      autoComplete="off"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      {errors && Object.keys(errors).length > 0 && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {Object.values(errors).map((err, i) => (
            <div key={i}>{err}</div>
          ))}
        </div>
      )}
      {children}
      <div className="flex flex-col gap-2 mt-6">{actions}</div>
    </form>
  );
}