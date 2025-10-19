/** @format */

import { Flex, HStack, useBreakpointValue } from "@chakra-ui/react";
import type { TransactionHeaderProps } from "./types";
import FilterButton from "./FilterButton";
import ExportButton from "./ExportButton";
import TransactionCount from "./TransactionCount";

const TransactionHeader = ({
  count,
  period,
  onFilterApply,
  onExport,
  filterCount = 0,
}: TransactionHeaderProps) => {
  const padding = useBreakpointValue({ base: 2, md: 0 });

  return (
    <Flex
      justify='space-between'
      align='flex-start'
      mt={24}
      borderBottom='2px solid'
      borderColor='gray.200'
      pb={6}
      px={padding}
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: 4, md: 0 }}>
      <TransactionCount count={count} period={period} />

      <HStack gap={2}>
        <FilterButton onClick={onFilterApply} filterCount={filterCount} />
        <ExportButton onClick={onExport} />
      </HStack>
    </Flex>
  );
};

export default TransactionHeader;
