/** @format */

import { memo } from "react";
import IconComponent from "@/components/shared/IconComponent";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Center } from "@chakra-ui/react";

interface TransactionIconProps {
  type: "deposit" | "withdrawal";
  size?: string;
}

const TransactionIcon = ({ type, size = "48px" }: TransactionIconProps) => {
  const isDeposit = type === "deposit";

  const bgColor = useColorModeValue(
    isDeposit ? "#E3FCF2" : "#F9E3E0",
    isDeposit ? "green.900" : "red.900"
  );

  const iconColor = useColorModeValue(
    isDeposit ? "#075132" : "#961100",
    isDeposit ? "green.300" : "red.300"
  );

  return (
    <Center w={size} h={size} bg={bgColor} borderRadius='full'>
      <IconComponent
        icon={isDeposit ? "arrowLeftDown" : "arrowRightUp"}
        color={iconColor}
      />
    </Center>
  );
};

export default memo(TransactionIcon);
