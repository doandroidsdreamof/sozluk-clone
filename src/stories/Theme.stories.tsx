import { Provider } from "react-redux";
import { Meta } from "@storybook/react";
import { DarkMode } from "~/components/common";
import {store} from "~/lib/store/store";

export default {
  component: DarkMode,
  title: "DarkMode",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ["autodocs"],
};


export const Default = {};