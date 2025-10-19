/** @format */

import { useState } from "react";
import { Menu, Button, HStack, Text, Separator, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Icon } from "@iconify-icon/react";
import { AppItems } from "@/utils/page-props";
import AppMenuItem from "./AppMenuItem";

const AppsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const textColor = useColorModeValue("#56616B", "gray.300");
  const hoverBg = useColorModeValue("#EFF1F6", "gray.700");
  const activeBg = useColorModeValue("#131316", "gray.900");
  const activeColor = useColorModeValue("white", "white");
  const menuBg = useColorModeValue("white", "gray.800");

  return (
    <Menu.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Menu.Trigger asChild>
        <Button
          variant='outline'
          border='none'
          bg={isOpen ? activeBg : "transparent"}
          color={isOpen ? activeColor : textColor}
          _hover={{
            bg: isOpen ? activeBg : hoverBg,
          }}
          _active={{
            bg: activeBg,
          }}
          px={4}
          py={2}
          borderRadius='full'
          transition='all 0.2s'
          boxShadow='none'>
          <HStack gap={1}>
            <Icon icon='fluent:apps-32-regular' width='20' height='20' />
            <Text fontSize='16px' fontWeight='normal' color={isOpen ? activeColor : textColor}>
              Apps
            </Text>
            {isOpen && (
              <>
                <Separator orientation='vertical' h='20px' mx={4} />
                <HStack gap={2}>
                  <Text fontSize='16px' fontWeight='normal' color={isOpen ? activeColor : textColor}>
                    Link in Bio
                  </Text>
                  <Icon icon='ph:caret-down-bold' width='20' height='20' />
                </HStack>
              </>
            )}
          </HStack>
        </Button>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content
          bg={menuBg}
          borderRadius='xl'
          boxShadow='lg'
          p={2}
          minW={{ base: "90vw", md: "26rem" }}
          border='none'>
          {AppItems.map((item, index) => (
            <Box key={index}>
              <AppMenuItem
                title={item.title}
                subtitle={item.subtitle}
                link={item.link}
                image={item.image}
              />
            </Box>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default AppsDropdown;
