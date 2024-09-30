import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkBlue: "var(--dark-blue)",
      },
      fontFamily: {
        sans: ['Google Sans', 'var(--font-google-sa)', 'sans-serif'], // Updated to include Google Sans
        mono: ['var(--font-geist-mono)', 'monospace'],
        nike: ['var(--font-nike)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
