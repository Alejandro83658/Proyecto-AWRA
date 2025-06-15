import { FaFacebookF, FaPinterestP, FaYoutube, FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function AwraFooterBottom() {
  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <a
        href="https://creativecommons.org/licenses/by/4.0/deed.es"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label="Licencia Creative Commons"
      >
        <img
          src="/img/varias/logoCreative.png"
          alt="Licencia Creative Commons"
          className="h-8"
        />
      </a>
      <div className="flex mt-4 sm:justify-center sm:mt-0 gap-5">
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" aria-label="Facebook">
          <FaFacebookF className="w-5 h-5" />
        </a>
        <a href="https://pinterest.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" aria-label="Pinterest">
          <FaPinterestP className="w-5 h-5" />
        </a>
        <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" aria-label="YouTube">
          <FaYoutube className="w-5 h-5" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" aria-label="X">
          <FaXTwitter className="w-5 h-5" />
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" aria-label="Instagram">
          <FaInstagram className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}