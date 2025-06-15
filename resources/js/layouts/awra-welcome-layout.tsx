import { ReactNode } from "react";

interface AwraWelcomeLayoutProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  actions?: ReactNode;
}

export default function AwraWelcomeLayout({ title, subtitle, children, actions }: AwraWelcomeLayoutProps) {
  return (
    <div className="max-w-xl mx-auto mt-12 bg-background rounded-lg shadow p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="mb-6">{subtitle}</p>}
      {children}
      {actions && <div className="mt-6 flex flex-col items-center gap-3">{actions}</div>}
    </div>
  );
}