/** @format */

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

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

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

export const sentenceCase = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
