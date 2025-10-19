/** @format */

import {
  HStack,
  Menu,
  Button,
  Box,
  VStack,
  Text,
  Separator,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { MenuItems, MenuIcon } from "@/utils/page-props";
import { useUser } from "@/api/hooks/useUser";
import { generateUserInitials } from "@/services/helpers";
import IconButton from "./IconButton";
import UserAvatar from "./UserAvatar";
import type { MenuItem } from "./types";
import type { Icons } from "@/constants/icons";

const UserMenu = () => {
  const { data: user } = useUser();
  const menuBg = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("#131316", "white");
  const subtitleColor = useColorModeValue("#56616B", "gray.400");
  const hoverBg = useColorModeValue("#EFF1F6", "gray.700");

  const userInitials = user
    ? generateUserInitials(`${user.first_name} ${user.last_name}`)
    : "OJ";
  const userName = user ? `${user.first_name} ${user.last_name}` : "";
  const userEmail = user?.email || "";

  return (
    <HStack gap={3} color={subtitleColor}>
      {/* Icon Buttons */}
      {MenuIcon.map((item: { icon: keyof typeof Icons }) => (
        <IconButton key={item.icon} icon={item.icon} />
      ))}

      {/* User Menu Dropdown */}
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            variant='ghost'
            bg={hoverBg}
            p={1}
            borderRadius='full'
            _hover={{ bg: hoverBg }}
            _active={{ bg: hoverBg }}
            minW='auto'>
            <HStack gap={2}>
              <UserAvatar initials={userInitials} size='sm' />
              <Box w='28px' h='28px' display='flex' alignItems='center'>
                <Icon icon='material-symbols-light:menu' width='20' height='20' />
              </Box>
            </HStack>
          </Button>
        </Menu.Trigger>

        <Menu.Positioner>
          <Menu.Content
            bg={menuBg}
            borderRadius='xl'
            boxShadow='lg'
            p={3}
            minW={{ base: "90vw", md: "23.125rem" }}
            border='none'>
            {/* User Info */}
            <Box py={3} px={2}>
              <HStack gap={3}>
                <UserAvatar initials={userInitials} size='md' />
                <VStack align='flex-start' gap={2}>
                  <Text color={titleColor} fontSize='16px'>
                    {userName}
                  </Text>
                  <Text color={subtitleColor} fontSize='14px'>
                    {userEmail}
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Separator my={2} />

            {/* Menu Items */}
            {MenuItems.map((item: MenuItem) => (
              <Menu.Item key={item.link} value={item.link} asChild>
                <RouterLink to={item.link}>
                  <Box
                    py={3}
                    px={2}
                    borderRadius='md'
                    _hover={{ bg: hoverBg }}
                    bg='transparent'
                    cursor='pointer'>
                    <HStack gap={3} py={1}>
                      <Icon icon={item.icon} width='20' height='20' />
                      <Text color={titleColor} fontWeight='600' fontSize='16px'>
                        {item.label}
                      </Text>
                    </HStack>
                  </Box>
                </RouterLink>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </HStack>
  );
};

export default UserMenu;
