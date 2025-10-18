/** @format */

import { Icons } from "@/constants/icons";

// Navigation items for the header
export const NavItems = [
  {
    label: "Home",
    link: "/",
    icon: "home" as keyof typeof Icons,
  },
  {
    label: "Analytics",
    link: "/analytics",
    icon: "analytics" as keyof typeof Icons,
  },
  {
    label: "Revenue",
    link: "/revenue",
    icon: "revenue" as keyof typeof Icons,
  },
  {
    label: "CRM",
    link: "/crm",
    icon: "crm" as keyof typeof Icons,
  },
  {
    label: "Apps",
    link: "#",
    icon: "apps" as keyof typeof Icons,
  },
] as const;

// App items for the Apps dropdown
export const AppItems = [
  {
    title: "Link in Bio",
    subtitle: "Manage your custom link-in-bio page",
    link: "/apps/link-in-bio",
    image: "/images/link-in-bio.png",
  },
  {
    title: "Store",
    subtitle: "Manage your online store",
    link: "/apps/store",
    image: "/images/store.png",
  },
  {
    title: "Invoicing",
    subtitle: "Create and manage invoices",
    link: "/apps/invoicing",
    image: "/images/invoicing.png",
  },
];

// Menu items for the user dropdown
export const MenuItems = [
  {
    label: "Settings",
    link: "/settings",
    icon: "solar:settings-linear",
  },
  {
    label: "Purchase History",
    link: "/purchase-history",
    icon: "ph:clock-counter-clockwise",
  },
  {
    label: "Refer and Earn",
    link: "/refer",
    icon: "mingcute:gift-line",
  },
  {
    label: "Integrations",
    link: "/integrations",
    icon: "mingcute:plugin-2-line",
  },
  {
    label: "Help and Support",
    link: "/support",
    icon: "ph:question",
  },
  {
    label: "Logout",
    link: "/logout",
    icon: "solar:logout-2-linear",
  },
];

// Menu icons for the header
export const MenuIcon = [
  {
    icon: "bell" as keyof typeof Icons,
  },
  {
    icon: "message" as keyof typeof Icons,
  },
];
