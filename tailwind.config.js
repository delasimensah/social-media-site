module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#151a23",
        darklight: "#283143",
      },
      backgroundImage: () => ({
        friends: "url('/friends-md.jpg')",
        "friends-sm": "url('/friends-sm.png')",
        "friends-lg": "url('/friends-lg.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
