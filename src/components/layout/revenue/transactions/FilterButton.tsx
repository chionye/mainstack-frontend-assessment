/** @format */

import { memo } from "react";
import { Button, HStack, Text, Badge } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { FilterButtonProps } from "./types";
import { Icons } from "@/constants/icons";

const FilterButton = ({ onClick, filterCount = 0 }: FilterButtonProps) => {
  const bgColor = useColorModeValue("#EFF1F6", "gray.700");
  const textColor = useColorModeValue("#131316", "white");
  const badgeBg = useColorModeValue("#131316", "gray.700");

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
      <HStack gap={2}>
        <Text fontSize='14px'>Filter</Text>
        {filterCount > 0 && (
          <Badge
            bg={badgeBg}
            color='white'
            borderRadius='full'
            px={1.5}
            py={0.5}
            fontSize='12px'
            fontWeight='bold'>
            {filterCount}
          </Badge>
        )}
        <Icons.chevronDown />
      </HStack>
    </Button>
  );
};

export default memo(FilterButton);
