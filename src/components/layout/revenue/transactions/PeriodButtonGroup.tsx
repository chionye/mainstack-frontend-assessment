/** @format */

import { memo, useCallback } from "react";
import { HStack } from "@chakra-ui/react";
import { filterButtonItems } from "@/constants/data";
import CustomButton from "@/components/shared/Button";

interface PeriodButtonGroupProps {
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
}

const PeriodButtonGroup = ({
  selectedPeriod = "all time",
  onPeriodChange,
}: PeriodButtonGroupProps) => {
  const handlePeriodClick = useCallback(
    (label: string) => {
      onPeriodChange?.(label.toLowerCase());
    },
    [onPeriodChange]
  );

  return (
    <HStack justify='space-evenly' align='center'>
      {filterButtonItems.map((item) => {
        const isSelected = selectedPeriod === item.label.toLowerCase();
        return (
          <CustomButton
            key={item.label}
            py={"10px"}
            px={"18px"}
            variant='outline'
            onClick={() => handlePeriodClick(item.label)}
            width={`fit`}
            bg={isSelected ? "#131316" : "transparent"}
            color={isSelected ? "white" : "#131316"}
            borderColor={"#EFF1F6"}
            fontWeight='semibold'
            fontSize='14px'
            _hover={{ bg: "gray.100" }}>
            {item.label}
          </CustomButton>
        );
      })}
    </HStack>
  );
};

export default memo(PeriodButtonGroup);
