/** @format */

import { NavLink as RouterNavLink } from "react-router-dom";
import { HStack, Text, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import IconComponent from "@/components/shared/IconComponent";
import type { NavLinkProps } from "./types";

const NavLink = ({ label, link, icon }: NavLinkProps) => {
  const textColor = useColorModeValue("#56616B", "gray.300");
  const hoverBg = useColorModeValue("#EFF1F6", "gray.700");
  const activeBg = useColorModeValue("#131316", "gray.900");
  const activeColor = useColorModeValue("white", "white");

  return (
    <RouterNavLink to={link} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box
          px={4}
          py={2}
          borderRadius='full'
          transition='all 0.2s'
          bg={isActive ? activeBg : "transparent"}
          color={isActive ? activeColor : textColor}
          _hover={{
            bg: isActive ? activeBg : hoverBg,
          }}
          cursor='pointer'>
          <HStack gap={1}>
            <IconComponent icon={icon} />
            <Text fontSize='16px' color={isActive ? activeColor : textColor}>
              {label}
            </Text>
          </HStack>
        </Box>
      )}
    </RouterNavLink>
  );
};

export default NavLink;
