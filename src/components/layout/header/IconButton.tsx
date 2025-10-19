/** @format */

import { Button } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Icons } from "@/constants/icons";
import IconComponent from "@/components/shared/IconComponent";

interface IconButtonProps {
  icon: keyof typeof Icons;
  onClick?: () => void;
}

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
      onClick={onClick}
      p={0}>
      <IconComponent icon={icon} color={iconColor} />
    </Button>
  );
};

export default IconButton;
