/** @format */

import { useState, useMemo } from "react";
import { Drawer, VStack, HStack, Text } from "@chakra-ui/react";
import PeriodButtonGroup from "./PeriodButtonGroup";
import DateRangeSelector from "./DateRangeSelector";
import TransactionTypeSelector from "./TransactionTypeSelector";
import TransactionStatusSelector from "./TransactionStatusSelector";
import { useColorModeValue } from "@/components/ui/color-mode";
import CustomButton from "@/components/shared/Button";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transactionPeriod: string;
  onPeriodChange: (period: string) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  selectedTypes: string[];
  selectedStatuses: string[];
  onTypeToggle: (type: string) => void;
  onStatusToggle: (status: string) => void;
  onApply: () => void;
  onClear: () => void;
  startDate?: string;
  endDate?: string;
}

const FilterDrawer = ({
  isOpen,
  onClose,
  transactionPeriod,
  onPeriodChange,
  onStartDateChange,
  onEndDateChange,
  selectedTypes,
  selectedStatuses,
  onTypeToggle,
  onStatusToggle,
  onApply,
  onClear,
  startDate,
  endDate,
}: FilterDrawerProps) => {
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("#131316", "white");

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    const hasCustomDates = startDate && endDate;
    const hasPeriod = transactionPeriod !== "all time";
    const hasTypes = selectedTypes.length > 0;
    const hasStatuses = selectedStatuses.length > 0;

    return hasCustomDates || hasPeriod || hasTypes || hasStatuses;
  }, [transactionPeriod, startDate, endDate, selectedTypes, selectedStatuses]);

  return (
    <Drawer.Root
      open={isOpen}
      placement='end'
      onOpenChange={(e) => !e.open && onClose()}
      size='md'>
      <Drawer.Backdrop />
      <Drawer.Positioner p={2}>
        <Drawer.Content bg={bgColor} rounded='xl'>
          <Drawer.Header>
            <Text fontSize='20px' fontWeight='semibold' color={titleColor}>
              Filter
            </Text>
            <Drawer.CloseTrigger />
          </Drawer.Header>

          <Drawer.Body
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            h='full'
            w='full'>
            <VStack gap={4} align='stretch' flex={1}>
              <PeriodButtonGroup
                selectedPeriod={transactionPeriod}
                onPeriodChange={onPeriodChange}
              />

              <DateRangeSelector
                label='Date range'
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={onStartDateChange}
                onEndDateChange={onEndDateChange}
              />

              <TransactionTypeSelector
                isOpen={typeMenuOpen}
                selectedItems={selectedTypes}
                onToggle={onTypeToggle}
                onOpenChange={() => setTypeMenuOpen(!typeMenuOpen)}
              />

              <TransactionStatusSelector
                isOpen={statusMenuOpen}
                selectedItems={selectedStatuses}
                onToggle={onStatusToggle}
                onOpenChange={() => setStatusMenuOpen(!statusMenuOpen)}
              />
            </VStack>

            <HStack gap={2} mt={6} pb={4}>
              <CustomButton
                variant='outline'
                width='1/2'
                bg={"transparent"}
                color={"#131316"}
                borderColor={"#EFF1F6"}
                fontWeight='semibold'
                fontSize='14px'
                _hover={{ bg: "gray.100" }}
                onClick={() => {
                  onClear();
                  onClose();
                }}>
                Clear
              </CustomButton>
              <CustomButton
                variant='solid'
                width='1/2'
                disabled={!hasActiveFilters}
                bg={!hasActiveFilters ? "#DBDEE5" : undefined}
                color={!hasActiveFilters ? "#9CA3AF" : undefined}
                cursor={!hasActiveFilters ? "not-allowed" : "pointer"}
                _hover={
                  !hasActiveFilters ? { bg: "#DBDEE5" } : { bg: "#131316" }
                }
                _active={!hasActiveFilters ? { bg: "#DBDEE5" } : undefined}
                onClick={() => {
                  if (hasActiveFilters) {
                    onApply();
                  }
                }}>
                Apply
              </CustomButton>
            </HStack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default FilterDrawer;
