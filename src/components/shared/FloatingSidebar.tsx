/** @format */

import { Link as RouterLink } from "react-router-dom";
import { VStack, Box, Link, Tooltip } from "@chakra-ui/react";
import { SidebarItems } from "@/utils/page-props";
import { useColorModeValue } from "../ui/color-mode";
import type { SidebarItemData } from "./types";
import IconComponent from "./IconComponent";

const FloatingSidebar = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const shadowColor = useColorModeValue("md", "dark-lg");
  const hoverBg = useColorModeValue("#EFF1F6", "gray.700");
  const tooltipBg = useColorModeValue("#131316", "gray.900");

  return (
    <Box
      position='fixed'
      left={{ base: "auto", md: "20px" }}
      right={{ base: "auto", md: "auto" }}
      top='300px'
      zIndex={50}
      bg={bgColor}
      boxShadow={shadowColor}
      borderRadius='full'
      px={1}
      py={2}>
      <VStack gap={1}>
        {SidebarItems.map((item: SidebarItemData) => (
          <Tooltip.Root
            key={item.label}
            positioning={{ placement: "right" }}
            openDelay={50}
            closeDelay={0}>
            <Tooltip.Trigger asChild>
              <Link
                as={RouterLink}
                href={item.link}
                display='flex'
                alignItems='center'
                justifyContent='center'
                p={2}
                my={1}
                borderRadius='full'
                _hover={{
                  bg: hoverBg,
                  textDecoration: "none",
                  "& > span": {
                    filter: "grayscale(0%)",
                  },
                }}
                role='group'>
                <Box
                  as='span'
                  display='inline-block'
                  transition='filter 0.2s'
                  filter='grayscale(100%)'>
                  <IconComponent icon={item.image} />
                </Box>
              </Link> 
            </Tooltip.Trigger>
            <Tooltip.Positioner>
              <Tooltip.Content
                bg={tooltipBg}
                color='white'
                py={3}
                px={3}
                borderRadius='md'
                fontSize='14px'>
                <Tooltip.Arrow bg={tooltipBg} />
                {item.label}
              </Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip.Root>
        ))}
      </VStack>
    </Box>
  );
};

export default FloatingSidebar;
