/** @format */

import { Button } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { ButtonProps } from "./types";

const CustomButton = ({
  onClick,
  children,
  variant = "solid",
}: ButtonProps) => {
  const bgColor = useColorModeValue("#131316", "white");
  const textColor = useColorModeValue("white", "#131316");
  const hoverBg = useColorModeValue("#31373D", "gray.200");

  const buttonProps = {
    onClick,
    fontSize: "14px",
    py: "14px",
    px: "28px",
    borderRadius: "full",
    _hover: {
      bg: hoverBg,
    },
    _active: {
      bg: hoverBg,
    },
    fontWeight: "normal",
  };

  return (
    <Button
      bg={variant === "solid" ? bgColor : "transparent"}
      color={variant === "solid" ? textColor : bgColor}
      border={variant === "outline" ? `1px solid ${bgColor}` : "none"}
      {...buttonProps}>
      {children}
    </Button>
  );
};

export default CustomButton;
