const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", ...fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.green.700"),
              "text-decoration": "none",
            },
          },
        },
        dark: {
          css: {
            a: {
              color: theme("colors.green.400"),
            },
            color: theme("colors.gray.300"),
            h1: {
              color: theme("colors.gray.100"),
            },
            h2: {
              color: theme("colors.gray.100"),
            },
            li: {
              "&::before": {
                color: theme("colors.gray.300"),
              },
            },
            strong: {
              color: theme("colors.gray.300"),
            },
          },
        },
      }),
    },
  },
};
