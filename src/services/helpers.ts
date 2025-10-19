/**
 * Generates user initials from full name
 *
 * @format
 * @param fullName - The full name of the user
 * @returns The initials (e.g., "John Doe" -> "JD")
 */

export const generateUserInitials = (fullName: string): string => {
  if (!fullName) return "";

  const names = fullName.trim().split(" ");

  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  const firstInitial = names[0].charAt(0).toUpperCase();
  const lastInitial = names[names.length - 1].charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
};

/**
 * Formats a number as currency with optional currency symbol
 * @param amount - The amount to format
 * @param options - Formatting options
 * @param options.currency - The currency code (default: "USD")
 * @param options.showSymbol - Whether to show currency symbol (default: true)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  options: { currency?: string; showSymbol?: boolean } = {}
): string => {
  const { currency = "USD", showSymbol = true } = options;

  return new Intl.NumberFormat("en-US", {
    style: showSymbol ? "currency" : "decimal",
    currency: showSymbol ? currency : undefined,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a date to a readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(dateObj);
};

/**
 * Filters and sorts graph data by amount
 * @param data - The transaction data to filter and sort
 * @returns The filtered and sorted transaction data
 */
export const filterAndSortGraphData = <T extends { amount: number }>(
  data: T[]
): T[] => {
  return data
    .filter((item) => item.amount > 0)
    .sort((a, b) => a.amount - b.amount);
};

/**
 * Formats a number as currency without currency symbol
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "1,234.56")
 * @deprecated Use formatCurrency with showSymbol: false instead
 */
export const formatAmount = (amount: number): string => {
  return formatCurrency(amount, { showSymbol: false });
};

/**
 * Generates a PascalCase string from a snake_case string
 * @param str - The string to convert
 * @returns The PascalCase string
 */
export const generatePascalCase = (word: string) => {
  if (!word) {
    return "";
  }
  return word
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Converts a string to sentence case (first letter capitalized, rest lowercase)
 * @param str - The string to convert
 * @returns The sentence case string
 */
export const sentenceCase = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};