/** @format */

import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#EFF1F6" },
          100: { value: "#DBDEE5" },
          200: { value: "#C7CCD8" },
          300: { value: "#B3BACB" },
          400: { value: "#9FA8BE" },
          500: { value: "#8B96B1" },
          600: { value: "#56616B" },
          700: { value: "#31373D" },
          800: { value: "#131316" },
          900: { value: "#000000" },
        },
      },
      fonts: {
        heading: { value: "'Degular', sans-serif" },
        body: { value: "'Degular', sans-serif" },
      },
    },
  },
  globalCss: {
    body: {
      bg: "white",
      color: "#131316",
    },
  },
});
