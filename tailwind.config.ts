import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      fontFamily: {
        display: ["group-hover"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {

      },
      backgroundImage: {
      },

      borderColor: {

      },
      backgroundColor: {

      },
      minWidth: {
        onehundred: "100%",
        ninty: "90%",
        eighty: "80%",
        sixty: "60%",
        fifty: "50%",
        forty: "40%",
        thirtythree: ": 33.333333%",
      },
      maxWidth: {
        onehundred: "100%",
        ninty: "90%",
        sixty: "60%",
        forty: "40%",
        eighty: "80%",
        fifty: "50%",
        fortyFive: "45%",
        thirtythree: ": 33.333333%",
      },
      height: {
        onehundred: "100%",
        nintyFive: "95%",
        ninty: "90%",
        eighty: "80%",
        seventy: "70%",
        sixty: "60%",
        fifty: "50%",
        fortyFive: "45%",
        forty: "40%",
        thirty: "30%",
        twenty: "20%",
      },
      width: {
        onehundred: "100%",
        nintyfive: "94%",
        nintyfour: "94%",
        nintythree: "93%",
        ninty: "90%",
        eightyFive: "85%",
        eighty: "80%",
        seventy: "70%",
        sixty: "60%",
        fiftyFive: "55%",
        fifty: "50%",
        fortyFive: "45%",
        forty: "40%",
        thirty: "30%",
      },
      top: {
        ninty: "90%",
        forty: "40%",
        eighty: "80%",
        fifty: "50%",
      },
      maxHeight: {
        onehundred: "100%",
        ninty: "90%",
        sixty: "60%",
        forty: "40%",
        eighty: "80%",
        fifty: "50%",
        fortyFive: "45%",
        thirtythree: ": 33.333333%",
      },
      minHeight: {
        onehundred: "100%",
        ninty: "90%",
        sixty: "60%",
        forty: "40%",
        eighty: "80%",
        fifty: "50%",
        fortyFive: "45%",
        thirtythree: ": 33.333333%",
      },

    },
  },
  plugins: [],
} satisfies Config;
