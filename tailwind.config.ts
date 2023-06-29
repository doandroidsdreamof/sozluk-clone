import { type Config } from "tailwindcss";

const gray = {
  100: "#eeeeee",
  200: "#e0e0e0",
  300: "#bbbbbb",
  400: "#666666",
  500: "#444444",
  650: "#333",
  600: "#2a2a2a",
  700: "#1f1f1f",
  800: "#181818",
  900: "#0f0f0f",
};
const brand = {
  100: "#c5f1dd",
  200: "#c5f1dd",
  300: "#9fe7c7",
  400: "#65d9a5",
  500: "#24b47e",
  600: "#38bc81",
  700: "#1c8656",
  800: "#10633e",
  900: "#10633e",
};

const blueGray = {
  50: "#F8FAFC",
  100: "#F1F5F9",
  200: "#E2E8F0",
  300: "#CBD5E1",
  400: "#94A3B8",
  500: "#64748B",
  600: "#475569",
  700: "#334155",
  800: "#1E293B",
  900: "#0F172A",
};

const coolGray = {
  50: "#F9FAFB",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
};

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  important: true,
  theme: {
    extend: {
      fontFamily: {
        display: ["group-hover"],
        roboto: ["Roboto", "sans-serif"],
        helvetica: ["Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "avatar-placeholder": "url('/static/images/default-avatar.png')",
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        logo: "#81C14B",
        editorHead: "#0d0d0d",

        dark: {
          100: "#eeeeee",
          200: "#e0e0e0",
          300: "#bbbbbb",
          400: "#666666",
          500: "#444444",
          600: "#2a2a2a",
          700: "#1f1f1f",
          800: "#181818",
          900: "#0f0f0f",
        },
        brandSozluk: {
          50: "#FAFCF5",
          100: "#F5FAEB",
          200: "#E3F0CC",
          300: "#D0E6AE",
          400: "#A9D479",
          500: "#81C14B",
          600: "#6EAD3D",
          700: "#53912A",
          800: "#3C751B",
          900: "#275710",
          950: "#143806",
        },
        "secondary-text": {
          light: "#71767F",
          dark: "#878787",
        },

        brandGreen: {
          50: "#82dab0",
          100: "#82dab0",
          200: "#69d3a0",
          300: "#50cb90",
          400: "#C5F1DD",
          500: "#9FE7C7",
          600: "#65D9A5",
          700: "#3ECF8E",
          800: "#24b47e",
          900: "#2c9c6a",
        },

        "typography-body": {
          light: coolGray[600],
          dark: gray[100],
        },
        "typography-body-secondary": {
          light: coolGray[500],
          dark: gray[300],
        },
        "typography-body-strong": {
          light: coolGray[100],
          dark: "white",
        },
        "typography-body-faded": {
          light: coolGray[400],
          dark: gray[400],
        },

        "bg-primary": {
          light: "#F8F9FA",
          dark: "#1C1C1C",
        },
        "bg-secondary": {
          light: "#F1F5F9",
          dark: "#1f1f1f",
        },
        "bg-alt": {
          light: blueGray[50],
          dark: gray[600],
        },
        "input-value": {
          light: coolGray[600],
          dark: gray[200],
        },
        "input-placeholder": {
          light: coolGray[300],
          dark: gray[400],
        },
        "input-border": {
          light: coolGray[300],
          dark: gray[500],
        },
        "input-label": {
          light: coolGray[600],
          dark: gray[200],
        },
        "input-border-hover": {
          light: coolGray[400],
          dark: gray[400],
        },
        "input-border-focus": {
          light: brand[300],
          dark: brand[300],
        },
      },

      transitionProperty: {
        "max-height": "max-height",
      },
      minWidth: {
        onehundred: "100%",
        ninty: "90%",
        eighty: "80%",
        sixty: "60%",
        fifty: "50%",
        forty: "40%",
        thirtythree: ": 33.333333%",
      },
      maxWidth: {
        onehundred: "100%",
        ninty: "90%",
        sixty: "60%",
        forty: "40%",
        eighty: "80%",
        fifty: "50%",
        fortyFive: "45%",
        thirtythree: ": 33.333333%",
      },
      height: {
        onehundred: "100%",
        nintyFive: "95%",
        ninty: "90%",
        eighty: "80%",
        seventy: "70%",
        sixty: "60%",
        fifty: "50%",
        fortyFive: "45%",
        forty: "40%",
        thirty: "30%",
        twenty: "20%",
      },
      width: {
        onehundred: "100%",
        nintyEight: "98%",
        nintyfive: "94%",
        nintyfour: "94%",
        nintythree: "93%",
        ninty: "90%",
        eightyFive: "85%",
        eighty: "80%",
        seventy: "70%",
        sixty: "60%",
        fiftyFive: "55%",
        fifty: "50%",
        fortyFive: "45%",
        forty: "40%",
        thirty: "30%",
      },
      top: {
        ninty: "90%",
        forty: "40%",
        eighty: "80%",
        fifty: "50%",
      },
      maxHeight: {
        onehundred: "100%",
        ninty: "90%",
        sixty: "60%",
        forty: "40%",
        eighty: "80%",
        fifty: "50%",
        fortyFive: "45%",
        thirtythree: ": 33.333333%",
      },
      minHeight: {
        onehundred: "100%",
        ninty: "90%",
        sixty: "60%",
        forty: "40%",
        eighty: "80%",
        fifty: "50%",
        fortyFive: "45%",
        thirtythree: ": 33.333333%",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
} satisfies Config;
