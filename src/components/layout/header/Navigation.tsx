/** @format */

import { HStack } from "@chakra-ui/react";
import AppsDropdown from "./AppsDropdown";
import { NavItems } from "@/utils/page-props";
import NavLink from "./NavLink";
import type { NavItem } from "./types";

const Navigation = () => {
  return (
    <HStack
      gap={{ base: 2, md: 8 }}
      display={{ base: "none", md: "flex" }}
      align='center'>
      {NavItems.map((item: NavItem) =>
        item.label !== "Apps" ? (
          <NavLink
            key={item.label}
            label={item.label}
            link={item.link}
            icon={item.icon}
          />
        ) : (
          <AppsDropdown key={item.label} />
        )
      )}
    </HStack>
  );
};

export default Navigation;
