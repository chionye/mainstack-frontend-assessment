/** @format */

import type { Icons } from "@/constants/icons";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline";
  width?: string;
  bg?: string;
  px?: string;
  py?: string;
  color?: string;
  _hover?: Record<string, any>;
  _active?: Record<string, any>;
  [key: string]: any; // Allow any other Chakra UI Button props
}

export interface SidebarItemData {
  label: string;
  image: keyof typeof Icons;
  link: string;
}