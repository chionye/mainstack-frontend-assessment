/** @format */

import { useState } from "react";
import {
  Button,
  Popover,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useColorModeValue } from "@/components/ui/color-mode";

interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange: (date: string) => void;
}

const DatePicker = ({
  label = "Pick a date",
  value,
  onChange,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = useState(false);

  const bgColor = useColorModeValue("#EFF1F6", "gray.700");
  const textColor = useColorModeValue("#131316", "white");
  const iconColor = useColorModeValue("#31373D", "gray.300");
  const mutedColor = useColorModeValue("gray.400", "gray.500");

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange(selectedDate.toISOString().split("T")[0]);
      setIsOpen(false);
    }
  };

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      positioning={{ placement: 'bottom-start' }}>
      <Popover.Trigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          h='44px'
          w='280px'
          bg={bgColor}
          color={date ? textColor : mutedColor}
          border='none'
          borderRadius='xl'
          fontWeight='normal'
          justifyContent='flex-start'
          textAlign='left'
          px={4}
          _hover={{ bg: bgColor }}
          _active={{ bg: bgColor }}>
          <Text fontSize='14px' truncate>
            {date ? format(date, "d MMM yyyy") : label}
          </Text>
          <Icon
            icon={isOpen ? "ph:caret-up-bold" : "ph:caret-down-bold"}
            width='10'
            height='10'
            color={iconColor}
          />
        </Button>
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content w='390px' border='none' boxShadow='lg' borderRadius='xl'>
          <Popover.Body p={4}>
            <ReactDatePicker
              selected={date}
              onChange={handleDateChange}
              inline
              calendarClassName='chakra-datepicker'
            />
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default DatePicker;
