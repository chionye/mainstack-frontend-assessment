/** @format */

import { Button, HStack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Icons } from "@/constants/icons";
import type { ExportButtonProps } from "./types";

const ExportButton = ({ onClick }: ExportButtonProps) => {
  const bgColor = useColorModeValue("#EFF1F6", "gray.700");
  const textColor = useColorModeValue("#131316", "white");

  return (
    <Button
      onClick={onClick}
      variant='outline'
      bg={bgColor}
      color={textColor}
      py={3}
      px={6}
      border='none'
      boxShadow='none'
      borderRadius='full'
      _hover={{
        boxShadow: "none",
        bg: bgColor,
      }}
      _active={{
        boxShadow: "none",
      }}>
      <HStack gap={1}>
        <Text fontSize='14px'>Export list</Text>
        <Icons.download />
      </HStack>
    </Button>
  );
};

export default ExportButton;
