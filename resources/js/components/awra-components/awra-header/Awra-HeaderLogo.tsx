export default function AwraHeaderLogo() {
  return (
    <a href="/" className="flex items-center gap-2 font-bold text-lg">
      <img
        src="/img/logos/logo horizontal 1 negro.svg"
        alt="AWRA"
        className="h-16 w-auto object-contain" // Cambio max-h-18 por h-18
        style={{ maxHeight: '80px' }} // Limito la altura máxima si es necesario
      />
      
    </a>
  );
}