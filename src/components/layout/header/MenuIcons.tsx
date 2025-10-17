/** @format */

import { IconButton, Flex } from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";

interface MenuIconItem {
  icon: string;
}

interface MenuIconsProps {
  icons: MenuIconItem[];
}

const MenuIcons = ({ icons }: MenuIconsProps) => {
  return (
    <Flex align="center" gap={2}>
      {icons.map((item, index) => (
        <IconButton
          key={index}
          aria-label={`Menu icon ${index + 1}`}
          variant="ghost"
          w="40px"
          h="40px"
          minW="40px"
          borderRadius="md"
          border="none"
          _hover={{
            bg: "#EFF1F6",
          }}
        >
          <Icon icon={item.icon} width="20" height="20" />
        </IconButton>
      ))}
    </Flex>
  );
};

export default MenuIcons;
