/** @format */

import { Box, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import UserMenu from "./UserMenu";
import Navigation from "./Navigation";
import { Icons } from "@/constants/icons";

const Header = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const shadowColor = useColorModeValue("md", "dark-lg");

  return (
    <Box position='fixed' left={0} top={0} zIndex={100} p={2} w='full'>
      <Flex
        bg={bgColor}
        boxShadow={shadowColor}
        borderRadius='full'
        px={3}
        py={2}
        align='center'
        justify='space-between'>
        <Flex align='center'>
          <Icons.logo />
        </Flex>
        <Navigation />
        <UserMenu />
      </Flex>
    </Box>
  );
};

export default Header;
