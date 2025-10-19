/** @format */

import { memo, useCallback } from "react";
import { HStack } from "@chakra-ui/react";
import { filterButtonItems } from "@/constants/data";
import CustomButton from "@/components/shared/Button";
import { useFilterStore } from "@/store/useFilterStore";

const PeriodButtonGroup = () => {
  const { transactionPeriod, setTransactionPeriod } = useFilterStore();

  const handlePeriodClick = useCallback(
    (label: string) => {
      setTransactionPeriod(label.toLowerCase());
    },
    [setTransactionPeriod]
  );

  return (
    <HStack
      justify='space-evenly'
      align='center'
      flexWrap={{ base: "wrap", lg: "nowrap" }}
      gap={{ base: 2, md: 3 }}>
      {filterButtonItems.map((item) => {
        const isSelected = transactionPeriod === item.label.toLowerCase();
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
