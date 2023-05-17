/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3056D3",
        background: "#F4F7FF",
      },
      transform: ["hover", "focus"],
      scale: ["hover", "focus"],
      width: {
        lastStep: "31.5%",
      },
      inset: {
        firstStep: "5%",
      },
    },
  },
  variants: {
    extend: {
      transform: ["hover", "focus"],
      scale: ["hover", "focus"],
    },
  },
  plugins: [],
};
