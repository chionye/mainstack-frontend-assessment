/** @format */

import { VStack, Heading, Text, Button, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { ErrorStateProps } from "./types";
import { Icons } from "@/constants/icons";

const ErrorState = ({
  handleRetry,
  walletError,
  transactionsError,
}: ErrorStateProps) => {
  const headingColor = useColorModeValue("#131316", "white");
  const textColor = useColorModeValue("#56616B", "gray.400");
  const badgeBg = useColorModeValue("#DBDEE5", "gray.700");
  const buttonBg = useColorModeValue("#EFF1F6", "gray.700");

  return (
    <VStack justify='center' align='center' mt={16} gap={4} pb={16}>
      <Box maxW={{ base: "full", md: "96" }}>
        <Box
          bg={badgeBg}
          borderRadius='16px'
          p={4}
          display='inline-flex'
          alignItems='center'
          justifyContent='center'
          mb={3}>
          <Icons.scroll />
        </Box>

        <Heading
          as='h2'
          fontSize='28px'
          fontWeight='bold'
          lineHeight='40px'
          color={headingColor}>
          Failed to load revenue data
        </Heading>

        <Text color={textColor} fontSize='16px'>
          {(walletError as Error)?.message ||
            (transactionsError as Error)?.message ||
            "An error occurred while fetching your revenue information"}
        </Text>
        <Button
          variant='outline'
          onClick={handleRetry}
          py={3}
          px={6}
          border='none'
          boxShadow='none'
          bg={buttonBg}
          borderRadius='full'
          mt={4}
          _hover={{ boxShadow: "none" }}>
          Retry
        </Button>
      </Box>
    </VStack>
  );
};

export default ErrorState;
