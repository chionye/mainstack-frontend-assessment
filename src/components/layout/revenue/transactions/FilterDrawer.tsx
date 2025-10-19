/** @format */

import { useState, useMemo } from "react";
import { Drawer, VStack, HStack, Text } from "@chakra-ui/react";
import PeriodButtonGroup from "./PeriodButtonGroup";
import DateRangeSelector from "./DateRangeSelector";
import TransactionTypeSelector from "./TransactionTypeSelector";
import TransactionStatusSelector from "./TransactionStatusSelector";
import { useColorModeValue } from "@/components/ui/color-mode";
import CustomButton from "@/components/shared/Button";
import { Icons } from "@/constants/icons";
import { useFilterStore } from "@/store/useFilterStore";
import { useUIStore } from "@/store/useUIStore";

const FilterDrawer = () => {
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("#131316", "white");

  const {
    transactionPeriod,
    selectedItems,
    startDate,
    endDate,
    toggleSelection,
    applyFilter,
    clearFilter,
  } = useFilterStore();

  const { isFilterDrawerOpen, closeFilterDrawer } = useUIStore();

  const hasActiveFilters = useMemo(() => {
    const hasCustomDates = startDate && endDate;
    const hasPeriod = transactionPeriod !== "all time";
    const hasTypes = selectedItems.trans_type.length > 0;
    const hasStatuses = selectedItems.trans_status.length > 0;

    return hasCustomDates || hasPeriod || hasTypes || hasStatuses;
  }, [transactionPeriod, startDate, endDate, selectedItems]);

  const handleApply = () => {
    applyFilter();
    closeFilterDrawer();
  };

  const handleClear = () => {
    clearFilter();
    closeFilterDrawer();
  };

  return (
    <Drawer.Root
      open={isFilterDrawerOpen}
      placement='end'
      onOpenChange={(e) => !e.open && closeFilterDrawer()}
      size='md'>
      <Drawer.Backdrop />
      <Drawer.Positioner p={2}>
        <Drawer.Content bg={bgColor} rounded='xl'>
          <Drawer.Header>
            <Text fontSize='20px' fontWeight='bold' color={titleColor}>
              Filter
            </Text>
            <Drawer.CloseTrigger>
              <Icons.close />
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            h='full'
            w='full'>
            <VStack gap={4} align='stretch' flex={1}>
              <PeriodButtonGroup />

              <DateRangeSelector />

              <TransactionTypeSelector
                isOpen={typeMenuOpen}
                selectedItems={selectedItems.trans_type}
                onToggle={(type) => toggleSelection(type, "trans_type")}
                onOpenChange={() => setTypeMenuOpen(!typeMenuOpen)}
              />

              <TransactionStatusSelector
                isOpen={statusMenuOpen}
                selectedItems={selectedItems.trans_status}
                onToggle={(status) => toggleSelection(status, "trans_status")}
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
                onClick={handleClear}>
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
                onClick={handleApply}>
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
