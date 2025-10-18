/** @format */

import { Icons } from "@/constants/icons";

const IconComponent = ({
  icon,
  size,
  color,
}: {
  icon: keyof typeof Icons;
  size?: string;
  color?: string;
}) => {
  const IconComponent = Icons[icon];
  return <IconComponent size={size} color={color} />;
};

export default IconComponent;
