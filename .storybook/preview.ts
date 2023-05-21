import type { Preview } from "@storybook/react";
import "../src/styles/globals.css"
import { store } from "../src/lib/store/store";
import { Provider } from "react-redux";


const preview: Preview = {

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {

      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#181818',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,

      },
    },

  },

};


export default preview;


