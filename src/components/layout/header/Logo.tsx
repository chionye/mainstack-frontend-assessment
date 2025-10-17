/** @format */

import { Image } from "@chakra-ui/react";
import logo from "@/assets/logo.svg";

const Logo = () => {
  return (
    <Image
      src={logo}
      alt="Mainstack Logo"
      h="auto"
      maxW="120px"
    />
  );
};

export default Logo;
