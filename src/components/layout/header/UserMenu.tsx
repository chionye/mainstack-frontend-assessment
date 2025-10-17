/** @format */

import {
  Button,
  Flex,
  Menu,
  Text,
  Box,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { generateUserInitials } from "@/services/helpers";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface MenuItemType {
  label: string;
  link: string;
  icon: string;
}

interface UserMenuProps {
  user: User;
  menuItems: MenuItemType[];
}

const UserMenu = ({ user, menuItems }: UserMenuProps) => {
  const fullName = `${user.first_name} ${user.last_name}`;
  const initials = generateUserInitials(fullName);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          bg="#EFF1F6"
          borderRadius="full"
          p={1}
          h="auto"
          minW="auto"
          _hover={{
            bg: "#E0E4E9",
          }}
          _active={{
            bg: "#E0E4E9",
          }}
        >
          <Flex align="center" gap={2}>
            <Flex
              align="center"
              justify="center"
              w="32px"
              h="32px"
              borderRadius="full"
              bg="#FF5403"
              color="white"
              fontSize="12px"
              fontWeight="bold"
            >
              {initials}
            </Flex>
            <Flex align="center" justify="center" w="28px" h="28px">
              <Icon icon="material-symbols-light:menu" width="20" height="20" />
            </Flex>
          </Flex>
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content maxW={{ base: "full", md: "23.125rem" }} p={0}>
          {/* User Info Section */}
          <Box px={4} py={3} borderBottom="1px" borderColor="gray.200">
            <Flex align="center" gap={3}>
              <Flex
                align="center"
                justify="center"
                w="40px"
                h="40px"
                borderRadius="full"
                bg="#FF5403"
                color="white"
                fontSize="14px"
                fontWeight="bold"
                flexShrink={0}
              >
                {initials}
              </Flex>
              <Flex direction="column" gap={1}>
                <Text fontSize="14px" fontWeight="semibold" color="#131316">
                  {fullName}
                </Text>
                <Text fontSize="13px" color="#56616B">
                  {user.email}
                </Text>
              </Flex>
            </Flex>
          </Box>

          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <Menu.Item key={index} value={item.link} asChild>
              <NavLink
                to={item.link}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <Flex
                  align="center"
                  gap={3}
                  px={4}
                  py={3}
                  w="full"
                  _hover={{
                    bg: "#F9FAFB",
                  }}
                  transition="background 0.2s"
                  cursor="pointer"
                >
                  <Icon icon={item.icon} width="20" height="20" />
                  <Text fontSize="14px" color="#131316">
                    {item.label}
                  </Text>
                </Flex>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default UserMenu;
