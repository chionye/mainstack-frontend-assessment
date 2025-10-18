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
 * Formats a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: "USD")
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
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
 * Filters and sorts graph data
 * @param data - The data to filter and sort
 * @returns The filtered and sorted data
 */
export const filterAndSortGraphData = (data: any): any => {
  return data
    .filter((item: any) => item.amount > 0)
    .sort((a: any, b: any) => a.amount - b.amount);
};

/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
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