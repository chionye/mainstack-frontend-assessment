/** @format */

import { Icon } from "@iconify-icon/react";

interface CaretIconProps {
  isOpen: boolean;
  size?: string;
}

export const CaretIcon = ({ isOpen, size = "10" }: CaretIconProps) => (
  <Icon
    icon={isOpen ? "ph:caret-up-bold" : "ph:caret-down-bold"}
    width={size}
    height={size}
  />
);
