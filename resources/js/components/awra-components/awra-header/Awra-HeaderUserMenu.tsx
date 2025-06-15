import { Button } from "@/components/ui/button";

export default function AwraHeaderUserMenu() {
  // Aquí puedes mostrar avatar, nombre, menú de usuario, etc.
  return (
    <Button variant="outline" asChild>
      <a href="/profile">Mi perfil</a>
    </Button>
  );
}