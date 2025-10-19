/** @format */

import type { Icons } from "@/constants/icons";


export interface UserAvatarProps {
  initials: string;
  size?: "sm" | "md";
}

export interface AppItem {
  title: string;
  subtitle: string;
  link: string;
  image: keyof typeof Icons;
}

export interface MenuItem {
  label: string;
  link: string;
  icon: string;
}

export interface MenuIconItem {
  icon: keyof typeof Icons;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface NavItem {
  label: string;
  link: string;
  icon: keyof typeof Icons;
}

export interface IconButtonProps {
  icon: keyof typeof Icons;
  onClick?: () => void;
}
