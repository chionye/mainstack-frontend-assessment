/** @format */

import {
  Button,
  Flex,
  Image,
  Menu,
  Text,
  Box,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

interface AppItem {
  title: string;
  subtitle: string;
  link: string;
  image: string;
}

interface AppsDropdownProps {
  appItems: AppItem[];
}

const AppsDropdown = ({ appItems }: AppsDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Menu.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          color={isOpen ? "white" : "#56616B"}
          bg={isOpen ? "#131316" : "transparent"}
          borderColor="transparent"
          borderRadius="full"
          px={4}
          py={2}
          _hover={{
            bg: isOpen ? "#131316" : "#EFF1F6",
          }}
          _active={{
            bg: "#131316",
            color: "white",
          }}
          transition="all 0.2s"
        >
          <Flex align="center" gap={2}>
            <Icon icon="fluent:apps-32-regular" width="20" height="20" />
            <Text fontSize="16px">Apps</Text>
            {isOpen && (
              <>
                <Box
                  as="span"
                  w="1px"
                  h="20px"
                  bg="gray.400"
                  mx={2}
                />
                <Flex align="center" gap={2}>
                  <Text fontSize="16px">Link in Bio</Text>
                  <Icon icon="ph:caret-down-bold" width="20" height="20" />
                </Flex>
              </>
            )}
          </Flex>
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content maxW={{ base: "full", md: "26rem" }} p={0}>
          {appItems.map((item, index) => (
            <Menu.Item key={index} value={item.link} asChild>
              <NavLink
                to={item.link}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <Flex
                  align="center"
                  gap={3}
                  p={4}
                  w="full"
                  _hover={{
                    bg: "#F9FAFB",
                  }}
                  transition="background 0.2s"
                  cursor="pointer"
                >
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="md"
                    overflow="hidden"
                    flexShrink={0}
                  >
                    <Image src={item.image} alt={item.title} w="full" h="full" objectFit="cover" />
                  </Box>
                  <Flex flex={1} direction="column" gap={1}>
                    <Text fontSize="14px" fontWeight="semibold" color="#131316">
                      {item.title}
                    </Text>
                    <Text fontSize="13px" color="#56616B">
                      {item.subtitle}
                    </Text>
                  </Flex>
                  <Icon
                    icon="radix-icons:caret-right"
                    width="20"
                    height="20"
                    style={{ opacity: 0.5 }}
                  />
                </Flex>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default AppsDropdown;
