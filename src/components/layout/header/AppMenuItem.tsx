/** @format */

import { Link as RouterLink } from "react-router-dom";
import { Link, HStack, VStack, Text, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Icon } from "@iconify-icon/react";
import type { AppItem } from "./types";
import IconComponent from "@/components/shared/IconComponent";

const AppMenuItem = ({ title, subtitle, link, image }: AppItem) => {
  const titleColor = useColorModeValue("#131316", "white");
  const subtitleColor = useColorModeValue("#56616B", "gray.400");
  const iconColor = useColorModeValue("#56616B", "gray.400");

  return (
    <Link
      asChild
      _hover={{
        textDecoration: "none",
        boxShadow: "md",
      }}
      display='flex'
      p={4}
      borderRadius='xl'
      transition='all 0.2s'
      role='group'
      tabIndex={-1}>
      <RouterLink to={link} tabIndex={0}>
        <HStack gap={3} w='full' align='flex-start'>
          <Flex w={"48px"} h={"48px"} justifyContent='center' alignItems='center' borderRadius='xl' borderColor="#EFF1F6" borderWidth="1px">
            <IconComponent icon={image} />
          </Flex>

          <HStack justify='space-between' align='center' w='full' mt={1}>
            <VStack align='flex-start' gap={2}>
              <Text color={titleColor} fontSize='16px' fontWeight='normal'>
                {title}
              </Text>
              <Text color={subtitleColor} fontSize='14px'>
                {subtitle}
              </Text>
            </VStack>

            <Icon
              icon='radix-icons:caret-right'
              width='20'
              height='20'
              color={iconColor}
              style={{
                opacity: 0,
                transition: "opacity 0.2s",
              }}
              className='group-hover-icon'
            />
          </HStack>
        </HStack>

        <style>{`
          a[role="group"]:hover .group-hover-icon {
            opacity: 1;
          }
        `}</style>
      </RouterLink>
    </Link>
  );
};

export default AppMenuItem;
