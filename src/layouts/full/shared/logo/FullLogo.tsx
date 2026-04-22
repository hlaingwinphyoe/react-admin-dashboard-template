import Logo from "@/assets/images/logos/dark-logo.png";
import Logowhite from "@/assets/images/logos/light-logo.png";

const FullLogo = () => {
  return (
    <>
      {/* Dark Logo   */}
      <img
        src={Logo}
        alt="logo"
        className="block h-10 w-auto max-w-full object-contain dark:hidden"
      />
      {/* Light Logo  */}
      <img
        src={Logowhite}
        alt="logo"
        className="hidden h-10 w-auto max-w-full object-contain dark:block"
      />
    </>
  );
};

export default FullLogo;
