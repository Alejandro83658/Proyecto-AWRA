export default function AwraFooterLogo() {
  return (
    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 h-12 overflow-hidden">
      <img
        src="/img/logos/awraLogoBlanco.svg"
        className="h-14 max-h-14 w-20 object-contain"
        alt="AWRA Logo"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        AWRA
      </span>
    </a>
  );
}