/** @format */

import {
  Box,
  VStack,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";
import ErrorImage from "@/assets/Error.svg";
import NotFoundImage from "@/assets/not-found.svg";

interface ErrorBoundaryProps {
  error?: Error & { status?: number; statusText?: string };
  resetError?: () => void;
}

const ErrorBoundary = ({ error, resetError }: ErrorBoundaryProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (resetError) resetError();
    navigate(-1);
  };

  const handleReload = () => {
    if (resetError) resetError();
    window.location.reload();
  };

  const getErrorMessage = () => {
    if (error?.status === 404) {
      return {
        title: "Page Not Found",
        description:
          "The page you're looking for doesn't exist or has been moved.",
      };
    }

    if (error?.status === 403) {
      return {
        title: "Access Forbidden",
        description: "You don't have permission to access this resource.",
      };
    }

    if (error?.status === 500) {
      return {
        title: "Server Error",
        description: "Something went wrong on our end. Please try again later.",
      };
    }

    return {
      title: "Something Went Wrong",
      description:
        error?.message ||
        "An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.",
    };
  };

  const errorInfo = getErrorMessage();

  return (
    <Box
      minH='100vh'
      bg='gray.50'
      display='flex'
      alignItems='center'
      justifyContent='center'
      p={4}>
      <Box
        bg='white'
        border='none'
        borderRadius='lg'
        px={{ base: 6, md: 8 }}
        py={{ base: 10, md: 12 }}
        maxW='2xl'
        w='full'
        boxShadow='sm'>
        <VStack gap={6} textAlign='center'>
          {/* Error Visual */}
          <Box position='relative'>
            <Flex alignItems='center' justifyContent='center'>
              {error?.status === 404 && (
                <Image src={NotFoundImage} alt='Error' w={40} h={40} />
              )}
              {error?.status === 403 && (
                <Image src={ErrorImage} alt='Error' w={40} h={40} />
              )}
              {error?.status === 500 && (
                <Image src={ErrorImage} alt='Error' w={40} h={40} />
              )}
            </Flex>
          </Box>

          {/* Error Message */}
          <VStack gap={3}>
            <Heading
              as='h1'
              fontSize={{ base: "2xl", lg: "3xl" }}
              fontWeight='bold'
              color='gray.900'>
              {errorInfo.title}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color='#7D7E8E' maxW='md'>
              {errorInfo.description}
            </Text>
          </VStack>

          {/* Error Details - Only in Development */}
          {import.meta.env.DEV && error?.message && (
            <Box w='full' mt={4}>
              <details>
                <summary
                  style={{
                    fontSize: "14px",
                    color: "#7D7E8E",
                    cursor: "pointer",
                  }}>
                  Technical Details
                </summary>
                <Box
                  mt={3}
                  p={4}
                  bg='gray.100'
                  borderRadius='lg'
                  textAlign='left'>
                  <Text
                    as='pre'
                    fontSize='xs'
                    color='gray.700'
                    overflow='auto'
                    maxH='40'>
                    {error.message}
                    {error.stack && `\n\n${error.stack}`}
                  </Text>
                </Box>
              </details>
            </Box>
          )}

          <Stack
            direction={{ base: "column", sm: "row" }}
            align='center'
            gap={3}
            mt={4}
            w={{ base: "full", sm: "auto" }}>
            <CustomButton
              variant='outline'
              borderColor={"#EFF1F6"}
              fontWeight='semibold'
              fontSize='14px'
              _hover={{ bg: "gray.100" }}
              onClick={handleGoBack}>
              Go Back
            </CustomButton>
            <CustomButton variant='solid' onClick={handleReload}>
              Reload Page
            </CustomButton>
          </Stack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ErrorBoundary;
