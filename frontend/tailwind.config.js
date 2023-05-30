/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",

      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#3056D3",
        background: "#F4F7FF",
        stepsGreen: "#26C196",
      },
      width: {
        lastStep: "31.5%",
      },
      inset: {
        firstStep: "5%",
      },
    },
  },
  plugins: [],
};
