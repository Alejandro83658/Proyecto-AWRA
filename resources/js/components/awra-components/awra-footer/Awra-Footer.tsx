import AwraFooterLogo from "./Awra-FooterLogo";
import AwraFooterNav from "./Awra-FooterNav";
import AwraFooterBottom from "./Awra-FooterBottom";

export default function AwraFooter() {
  return (
    <footer className="bg-red-900 dark:bg-red-900 shadow-sm w-full">
      <div className="w-full p-4 md:py-8 text-white">
        <div className="max-w-screen-xl mx-auto sm:flex sm:items-center sm:justify-between">
          <AwraFooterLogo />
          <AwraFooterNav />
        </div>
        <hr className="my-6 border-white sm:mx-auto lg:my-8" />
        <div className="max-w-screen-xl mx-auto">
          <AwraFooterBottom />
        </div>
      </div>
    </footer>
  );
}