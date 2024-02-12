import type { Config } from "tailwindcss"
const defaultTheme = require("tailwindcss/defaultTheme")
//constants
import colors from "./src/common/constants/colors"
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true
    },
    fontFamily: {
      sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
    },
    colors,
    fontSize: {
      //Title
      title1: [
        "72px",
        {
          lineHeight: "80px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      title2: [
        "56px",
        {
          lineHeight: "64px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      title3: [
        "44px",
        {
          lineHeight: "64px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      //Header
      "h1-bold": [
        "36px",
        {
          lineHeight: "40px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      "h1-medium": [
        "36px",
        {
          lineHeight: "40px",
          letterSpacing: "0px",
          fontWeight: "500"
        }
      ],
      "h2-bold": [
        "32px",
        {
          lineHeight: "36px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      "h2-medium": [
        "32px",
        {
          lineHeight: "36px",
          letterSpacing: "0px",
          fontWeight: "500"
        }
      ],
      "h3-bold": [
        "24px",
        {
          lineHeight: "28px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      "h3-medium": [
        "24px",
        {
          lineHeight: "28px",
          letterSpacing: "0px",
          fontWeight: "500"
        }
      ],
      "h4-bold": [
        "20px",
        {
          lineHeight: "24px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      "h4-medium": [
        "20px",
        {
          lineHeight: "24px",
          letterSpacing: "0px",
          fontWeight: "500"
        }
      ],
      "h5-bold": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      "h6-bold": [
        "12px",
        {
          lineHeight: "24px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      //Paragraph
      "p1-bold": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      "p1-medium": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0px",
          fontWeight: "500"
        }
      ],
      "p1-regular": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0px",
          fontWeight: "400"
        }
      ],
      "p2-bold": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      "p2-medium": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0px",
          fontWeight: "500"
        }
      ],
      "p2-regular": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0px",
          fontWeight: "400"
        }
      ],
      //Caption
      "c1-bold": [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: "0px",
          fontWeight: "700"
        }
      ],
      "c1-medium": [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: "0px",
          fontWeight: "500"
        }
      ],
      "c1-regular": [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: "0px",
          fontWeight: "400"
        }
      ],
      "c2-bold": [
        "10px",
        {
          lineHeight: "12px",
          letterSpacing: "5%",
          fontWeight: "700"
        }
      ]
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  variants: {
    extend: {
      display: ["group-hover"]
    }
  },
  plugins: []
}
export default config
