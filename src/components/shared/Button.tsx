/** @format */

import { Button, type ButtonProps } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const CustomButton = ({
  onClick,
  children,
  variant = "solid",
  width,
  bg,
  py = "14px",
  px = "28px",
  color,
  _hover,
  _active,
  ...rest
}: ButtonProps) => {
  const defaultBgColor = useColorModeValue("#131316", "white");
  const defaultTextColor = useColorModeValue("white", "#131316");
  const defaultHoverBg = useColorModeValue("#31373D", "gray.200");

  const buttonProps = {
    onClick,
    fontSize: "14px",
    py,
    px,
    borderRadius: "full",
    fontWeight: "normal",
    _hover: _hover || {
      bg: defaultHoverBg,
    },
    _active: _active || {
      bg: defaultHoverBg,
    },
    ...rest,
  };

  return (
    <Button
      bg={bg || (variant === "solid" ? defaultBgColor : "transparent")}
      color={color || (variant === "solid" ? defaultTextColor : defaultBgColor)}
      border={variant === "outline" ? `1px solid ${defaultBgColor}` : "none"}
      width={width || "auto"}
      {...buttonProps}>
      {children}
    </Button>
  );
};

export default CustomButton;
