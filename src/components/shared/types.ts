/** @format */

import type { Icons } from "@/constants/icons";

export interface SidebarItemData {
  label: string;
  image: keyof typeof Icons;
  link: string;
}

export interface MultiSelectItem {
  id: string;
  label: string;
}

export interface MultiSelectCheckboxProps {
  label: string;
  items?: MultiSelectItem[];
  selectedItems?: string[];
  onToggle: (label: string) => void;
  isOpen: boolean;
  onOpenChange: () => void;
}

export interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange: (date: string) => void;
}