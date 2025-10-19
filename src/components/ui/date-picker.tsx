/** @format */

import { useState, useEffect } from "react";
import {
  Button,
  Popover,
  Grid,
  GridItem,
  Text,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  setYear,
} from "date-fns";
import { useColorModeValue } from "./color-mode";

interface DatePickerProps {
  label?: string;
  value?: Date;
  width?: string;
  onChange: (date: string) => void;
}

const DatePicker = ({
  label = "Pick a date",
  value,
  width,
  onChange,
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Sync internal state with value prop
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const bgColor = useColorModeValue("#EFF1F6", "gray.700");
  const textColor = useColorModeValue("#131316", "white");
  const iconColor = useColorModeValue("#31373D", "gray.300");
  const mutedColor = useColorModeValue("gray.400", "gray.500");
  const selectedBg = useColorModeValue("#131316", "white");
  const selectedColor = useColorModeValue("white", "#131316");
  const hoverBg = useColorModeValue("#EFF1F6", "gray.700");
  const dayColor = useColorModeValue("#131316", "white");
  const outsideMonthColor = useColorModeValue("#DBDEE5", "gray.600");

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = monthStart.getDay();
  const emptyDays = Array(startDayOfWeek).fill(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(date.toISOString().split("T")[0]);
    setIsOpen(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentMonth(setYear(currentMonth, year));
    setShowYearPicker(false);
  };

  // Generate years array (current year ± 50 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      positioning={{ placement: "bottom-start" }}>
      <Popover.Trigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          h='44px'
          w={width || "280px"}
          bg={bgColor}
          color={selectedDate ? textColor : mutedColor}
          border='none'
          borderRadius='xl'
          fontWeight='normal'
          justifyContent='space-between'
          textAlign='left'
          px={4}
          _hover={{ bg: bgColor }}
          _active={{ bg: bgColor }}>
          <Text fontSize='14px' truncate>
            {selectedDate ? format(selectedDate, "d MMM yyyy") : label}
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
        <Popover.Content
          w={{ base: "calc(100vw - 32px)", sm: "390px" }}
          maxW='390px'
          border='none'
          boxShadow='lg'
          borderRadius='xl'>
          <Popover.Body p={{ base: 3, sm: 4 }}>
            <VStack gap={4}>
              {/* Month/Year Navigation */}
              <HStack justify='space-between' w='full'>
                <IconButton
                  aria-label='Previous month'
                  variant='ghost'
                  size='sm'
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                  <Icon icon='ph:caret-left-bold' width='16' height='16' />
                </IconButton>
                <Button
                  variant='ghost'
                  onClick={() => setShowYearPicker(!showYearPicker)}
                  fontWeight='600'
                  fontSize='16px'
                  color={textColor}
                  _hover={{ bg: hoverBg }}>
                  {format(currentMonth, "MMMM yyyy")}
                  <Icon
                    icon={
                      showYearPicker
                        ? "ph:caret-up-bold"
                        : "ph:caret-down-bold"
                    }
                    width='12'
                    height='12'
                    style={{ marginLeft: "8px" }}
                  />
                </Button>
                <IconButton
                  aria-label='Next month'
                  variant='ghost'
                  size='sm'
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                  <Icon icon='ph:caret-right-bold' width='16' height='16' />
                </IconButton>
              </HStack>

              {showYearPicker ? (
                /* Year Picker */
                <VStack gap={2} w='full' maxH='300px' overflowY='auto'>
                  <Grid templateColumns='repeat(4, 1fr)' gap={2} w='full'>
                    {years.map((year) => {
                      const isSelectedYear =
                        year === currentMonth.getFullYear();
                      return (
                        <GridItem key={year}>
                          <Button
                            onClick={() => handleYearSelect(year)}
                            size='sm'
                            w='full'
                            bg={isSelectedYear ? selectedBg : "transparent"}
                            color={isSelectedYear ? selectedColor : dayColor}
                            fontWeight={isSelectedYear ? "600" : "normal"}
                            borderRadius='md'
                            _hover={{
                              bg: isSelectedYear ? selectedBg : hoverBg,
                            }}>
                            {year}
                          </Button>
                        </GridItem>
                      );
                    })}
                  </Grid>
                </VStack>
              ) : (
                <>
                  {/* Week Days */}
                  <Grid templateColumns='repeat(7, 1fr)' gap={1} w='full'>
                    {weekDays.map((day) => (
                      <GridItem key={day} textAlign='center'>
                        <Text
                          fontSize='14px'
                          fontWeight='500'
                          color={mutedColor}>
                          {day}
                        </Text>
                      </GridItem>
                    ))}
                  </Grid>

                  {/* Calendar Days */}
                  <Grid templateColumns='repeat(7, 1fr)' gap={1} w='full'>
                    {emptyDays.map((_, index) => (
                      <GridItem key={`empty-${index}`} />
                    ))}
                    {days.map((day) => {
                      const isSelected =
                        selectedDate && isSameDay(day, selectedDate);
                      const isCurrentMonth = isSameMonth(day, currentMonth);

                      return (
                        <GridItem key={day.toString()} textAlign='center'>
                          <Button
                            onClick={() => handleDateSelect(day)}
                            size='sm'
                            w={{ base: "36px", sm: "40px" }}
                            h={{ base: "36px", sm: "40px" }}
                            bg={isSelected ? selectedBg : "transparent"}
                            color={
                              isSelected
                                ? selectedColor
                                : isCurrentMonth
                                ? dayColor
                                : outsideMonthColor
                            }
                            fontWeight={isSelected ? "600" : "normal"}
                            fontSize={{ base: "12px", sm: "14px" }}
                            borderRadius='md'
                            _hover={{
                              bg: isSelected ? selectedBg : hoverBg,
                            }}>
                            {format(day, "d")}
                          </Button>
                        </GridItem>
                      );
                    })}
                  </Grid>
                </>
              )}
            </VStack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default DatePicker;
export { DatePicker };
