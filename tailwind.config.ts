import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "red-light": "#FF7E77",
        red: "#E3342A",
        "red-dark": "#CA180D",
        "blue-light": "#6AC0FF",
        blue: "#46A4E9",
        "blue-dark": "#2588D2",
        "orange-light": "#FFB794",
        orange: "#FF8549",
        "orange-dark": "#E95D1B",
        "green-light": "##6AEDE2",
        green: "#10C8B8",
        "green-dark": "#036566",
        "yellow-light": "#FFDB62",
        yellow: "#FFC501",
        "yellow-dark": "#E8B711",
        "purple-light": "#D0A0FF",
        purple: "#A946E9",
        "purple-dark": "#8828D2",
        "pink-light": "#FF90D0",
        pink: "#E946A4",
        "pink-dark": "#D22888",
        "gray-light": "#F6F6F6",
        gray: "#E0E0E0",
        "gray-dark": "#C8C3C3",
      },
    },
  },
  plugins: [],
};
export default config;
