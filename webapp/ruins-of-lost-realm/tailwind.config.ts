import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        darkBlue: "#0b132b",
        gold: "#ffd700",
        lava: "#ff4500",
      },
      fontFamily: {
        runes: ["Cinzel Decorative", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
