/** @format */

import { Box, HStack, Text } from "@chakra-ui/react";
import DatePicker from "@/components/ui/date-picker";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useFilterStore } from "@/store/useFilterStore";

const DateRangeSelector = ({ label = "Date range" }: { label?: string }) => {
  const { startDate, endDate, setStartDate, setEndDate } = useFilterStore();
  const textColor = useColorModeValue("#131316", "white");

  const startDateValue = startDate
    ? new Date(startDate + "T00:00:00")
    : undefined;
  const endDateValue = endDate ? new Date(endDate + "T00:00:00") : undefined;

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
          onChange={setStartDate}
        />
        <DatePicker
          label='End date'
          width='1/2'
          value={endDateValue}
          onChange={setEndDate}
        />
      </HStack>
    </Box>
  );
};

export default DateRangeSelector;
