/** @format */

import { Button } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import IconComponent from "@/components/shared/IconComponent";
import type { IconButtonProps } from "./types";

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  const hoverBg = useColorModeValue("#EFF1F6", "gray.700");
  const iconColor = useColorModeValue("#56616B", "gray.400");

  return (
    <Button
      variant='outline'
      w='40px'
      h='40px'
      minW='40px'
      border='none'
      boxShadow='none'
      _hover={{ bg: hoverBg }}
      rounded='full'
      onClick={onClick}
      p={0}>
      <IconComponent icon={icon} color={iconColor} />
    </Button>
  );
};

export default IconButton;
