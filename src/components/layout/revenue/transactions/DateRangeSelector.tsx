/** @format */

import { Box, HStack, Text } from "@chakra-ui/react";
import DatePicker from "@/components/ui/date-picker";
import type { DateRangeSelectorProps } from "./types";
import { useColorModeValue } from "@/components/ui/color-mode";

const DateRangeSelector = ({
  label,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeSelectorProps) => {
  const textColor = useColorModeValue("#131316", "white");

  // Convert string dates to Date objects
  const startDateValue = startDate ? new Date(startDate) : undefined;
  const endDateValue = endDate ? new Date(endDate) : undefined;

  return (
    <Box>
      <Text color={textColor} fontSize='14px' fontWeight='semibold' mb={2}>
        {label}
      </Text>
      <HStack gap={2}>
        <DatePicker
          label='Start date'
          width='1/2'
          value={startDateValue}
          onChange={onStartDateChange || (() => {})}
        />
        <DatePicker
          label='End date'
          width='1/2'
          value={endDateValue}
          onChange={onEndDateChange || (() => {})}
        />
      </HStack>
    </Box>
  );
};

export default DateRangeSelector;
