import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-roboto)",
        alt: "var(--font-bai-jamjuree)",
      },
      colors: {
        gray: {
          50: "#eaeaea",
          100: "#bebebf",
          200: "#9e9ea0",
          300: "#727275",
          400: "#56565a",
          500: "#2c2c31",
          600: "#28282d",
          700: "#1f1f23",
          800: "#18181b",
          900: "#121215",
        },
        purple: {
          50: "#f3eefc",
          100: "#d8cbf7",
          200: "#c6b2f3",
          300: "#ab8eee",
          400: "#9b79ea",
          500: "#8257e5",
          600: "#764fd0",
          700: "#5c3ea3",
          800: "#48307e",
          900: "#372560",
        },
        orange: {
          50: "#ffefebff",
          100: "#ffccc2ff",
          200: "#ffb4a4ff",
          300: "#ff927bff",
          400: "#ff7d61ff",
          500: "#ff5c3aff",
          600: "#e85435ff",
          700: "#b54129ff",
          800: "#8c3320ff",
          900: "#6b2718ff",
        },
        green: {
          50: "#e6fbefff",
          100: "#b1f1ceff",
          200: "#8cebb6ff",
          300: "#57e295ff",
          400: "#36dc81ff",
          500: "#04d361ff",
          600: "#04c058ff",
          700: "#039645ff",
          800: "#027435ff",
          900: "#025929ff",
        },
        yellow: {
          50: "#fff9ecff",
          100: "#ffebc4ff",
          200: "#ffe2a7ff",
          300: "#ffd47fff",
          400: "#ffcc66ff",
          500: "#ffbf40ff",
          600: "#e8ae3aff",
          700: "#b5882dff",
          800: "#8c6923ff",
          900: "#6b501bff",
        },
      },
      blur: {
        full: "194px",
      },
      backgroundImage: {
        stripes:
          "linear-gradient(to bottom, rgba(255,255,255,.1), rgba(255,255,255,.1) 12.5%, transparent 12.5%, transparent)",
      },
      backgroundSize: {
        stripes: "100% 8px",
      },
      fontSize: {
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
}
export default config
