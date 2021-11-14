module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx}", "./src/**/*.html", "./index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.green.700"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            h1: {
              color: theme("colors.gray.100"),
            },
            h2: {
              color: theme("colors.gray.100"),
            },
            strong: {
              color: theme("colors.gray.300"),
            },
            a: {
              color: theme("colors.green.400"),
            },
            li: {
              "&::before": {
                color: theme("colors.gray.300"),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
