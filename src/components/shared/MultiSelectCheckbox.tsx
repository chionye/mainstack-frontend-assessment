/** @format */

import { VStack, Text, Menu, Button, Checkbox, HStack } from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { MultiSelectCheckboxProps } from "./types";

const MultiSelectCheckbox = ({
  label,
  items = [],
  selectedItems = [],
  onToggle,
  isOpen,
  onOpenChange,
}: MultiSelectCheckboxProps) => {
  const labelColor = useColorModeValue("#131316", "white");
  const bgColor = useColorModeValue("#EFF1F6", "gray.700");
  const borderColor = useColorModeValue("#EFF1F6", "gray.600");
  const textColor = useColorModeValue("#131316", "white");
  const iconColor = useColorModeValue("#31373D", "gray.300");
  const menuBg = useColorModeValue("white", "gray.800");

  const displayValue =
    selectedItems?.length > 0
      ? selectedItems.join(", ")
      : items[0]?.label || "Select";

  return (
    <VStack align='stretch' gap={2}>
      <Text color={labelColor} fontSize='14px' fontWeight='semibold'>
        {label}
      </Text>

      <Menu.Root
        open={isOpen}
        onOpenChange={(e) => !e.open && onOpenChange()}
        closeOnSelect={false}>
        <Menu.Trigger asChild>
          <Button
            onClick={onOpenChange}
            w='full'
            h='44px'
            bg={bgColor}
            borderRadius='xl'
            border='1px solid'
            borderColor={borderColor}
            color={textColor}
            fontSize='14px'
            fontWeight='normal'
            textAlign='left'
            justifyContent='space-between'
            _hover={{ bg: bgColor }}
            _active={{ bg: bgColor }}
            px={4}>
            <Text
              truncate
              fontSize='14px'
              fontWeight='medium'
              color={textColor}>
              {displayValue}
            </Text>
            <Icon
              icon={isOpen ? "ph:caret-up-bold" : "ph:caret-down-bold"}
              width='10'
              height='10'
              color={iconColor}
            />
          </Button>
        </Menu.Trigger>

        <Menu.Positioner w='11/12'>
          <Menu.Content
            bg={menuBg}
            borderRadius='xl'
            border='none'
            boxShadow='lg'
            p={1}
            maxH='300px'
            overflowY='auto'>
            {items.map((item) => (
              <Menu.Item
                key={item.id}
                value={item.label}
                onClick={() => onToggle(item.label)}
                bg='transparent'
                _hover={{ bg: bgColor }}
                borderRadius='md'
                py={3}>
                <HStack gap={2} w='full'>
                  <Checkbox.Root
                    checked={selectedItems.includes(item.label)}
                    colorPalette='gray'
                    onCheckedChange={() => {}}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                  <Text fontSize='16px' fontWeight='semibold' color={textColor}>
                    {item.label}
                  </Text>
                </HStack>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </VStack>
  );
};

export default MultiSelectCheckbox;
