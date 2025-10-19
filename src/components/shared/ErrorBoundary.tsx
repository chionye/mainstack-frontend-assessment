/** @format */

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, VStack, Text, Button, Heading } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
          bg="gray.50"
          px={4}>
          <VStack gap={6} maxW="md" textAlign="center">
            <Heading size="lg" color="red.600">
              Oops! Something went wrong
            </Heading>
            <Text color="gray.600" fontSize="md">
              {this.state.error?.message || "An unexpected error occurred"}
            </Text>
            <Button
              onClick={this.handleReset}
              colorScheme="blue"
              size="lg">
              Try Again
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
