/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mona: ['"Mona Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          primary: "#af002b",
          "base-100": "#f6f8fa",
          "base-200": "#fcfaed",
          // secondary, accent, etc. চাইলে এখানে add করতে পারো
        },
      },
    ],
    defaultTheme: "light",
  },
};
