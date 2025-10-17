/** @format */

import { Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

interface NavItemProps {
  label: string;
  link: string;
  icon: string;
}

const NavItem = ({ label, link, icon }: NavItemProps) => {
  return (
    <NavLink to={link} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Flex
          align="center"
          gap={2}
          px={4}
          py={2}
          borderRadius="full"
          color="#56616B"
          bg={isActive ? "#EFF1F6" : "transparent"}
          _hover={{
            bg: "#EFF1F6",
          }}
          transition="all 0.2s"
        >
          <Icon icon={icon} width="20" height="20" />
          <Text fontSize="16px" fontWeight="medium">
            {label}
          </Text>
        </Flex>
      )}
    </NavLink>
  );
};

export default NavItem;
