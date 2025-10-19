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
 * Formats a number as currency without currency symbol
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "1,234.56")
 */
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
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
    .filter((w) => w.length > 0) // Filter out empty strings from multiple underscores
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