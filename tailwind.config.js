const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", ...fontFamily.sans],
      },
      keyframes: {
        "skeleton-loading": {
          "0%": { backgroundPosition: "-100% 0" },
          "100%": { backgroundPosition: "100% 0" },
        },
        "fully-button": {
          "0%": {
            backgroundColor: "red",
          },
          "100%": {
            backgroundColor: "black",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "skeleton-loading": "skeleton-loading 1s infinite reverse",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
    },
    screens: {
      movile: {
        min: "360px",
        // max: "767px",
      },

      tablet: {
        min: "768px",
        // max: "1023px",
      },

      laptop: {
        min: "1024px",
        // max: "1279px",
      },

      desktop: {
        min: "1280px",
      },

      monitor: {
        min: "1420px",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
