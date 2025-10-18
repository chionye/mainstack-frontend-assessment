/** @format */

import { Text, VStack } from "@chakra-ui/react";
import { formatAmount } from "@/services/helpers";
import type { AmountDisplayProps } from "./types";
import { useColorModeValue } from "@/components/ui/color-mode";

const AmountDisplay = ({
  amount,
  label,
  fontSize = "36px",
  currency = "USD",
  showLabel = false,
  labelColor,
  amountColor,
}: AmountDisplayProps) => {
  const defaultLabelColor = useColorModeValue("#56616B", "gray.400");
  const defaultAmountColor = useColorModeValue("#131316", "white");

  return (
    <VStack align='flex-start' gap={0}>
      {showLabel && label && (
        <Text color={labelColor || defaultLabelColor} fontSize='14px'>
          {label}
        </Text>
      )}
      <Text
        fontSize={fontSize}
        fontWeight='bold'
        color={amountColor || defaultAmountColor}
        lineHeight='1.2'>
        {currency} {formatAmount(amount)}
      </Text>
    </VStack>
  );
};

export default AmountDisplay;
