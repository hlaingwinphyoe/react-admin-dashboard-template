import { Link } from "react-router";
import LogoImage from "@/assets/images/logos/dark-logo.png";

const Logo = () => {
  return (
    <Link to={"/"}>
      <img src={LogoImage} alt="logo" className="h-8 w-auto" />
    </Link>
  );
};

export default Logo;
