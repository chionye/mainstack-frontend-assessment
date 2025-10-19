/** @format */

import { memo, useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { formatAmount } from "@/services/helpers";
import type { StatItemProps } from "./types";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Icons } from "@/constants/icons";

const StatItem = ({
  label,
  amount,
  showInfo = true,
  fontSize = "24px",
}: StatItemProps) => {
  const labelColor = useColorModeValue("#56616B", "white");
  const amountColor = useColorModeValue("#131316", "white");

  const formattedAmount = useMemo(() => formatAmount(amount), [amount]);

  return (
    <Box>
      {/* Label with Info Icon */}
      <Flex justify='space-between' align='center'>
        <Text color={labelColor} fontSize='14px'>
          {label}
        </Text>
        {showInfo && <Icons.info />}
      </Flex>

      {/* Amount */}
      <Text
        fontSize={fontSize}
        fontWeight='bold'
        color={amountColor}
        lineHeight='1.2'>
        USD {formattedAmount}
      </Text>
    </Box>
  );
};

export default memo(StatItem);
