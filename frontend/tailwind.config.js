/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["danaFont", "sans-serif"], // Specifies 'danaFont' as the main font with 'sans-serif' as fallback
      },
      colors: {
        background: "var(--background)", // Uses custom CSS variables for dynamic theming
        foreground: "var(--foreground)",
      },
      keyframes: {
        // Adding keyframes for the animation you requested (slide down with opacity transition)
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        // Creates an animation utility class
        slideDown: 'slideDown 1.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
