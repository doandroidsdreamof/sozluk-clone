import { Provider } from "react-redux";
import { Meta, StoryObj, StoryContext, type StoryFn} from "@storybook/react";
import { DarkMode } from "~/components/common";
import { store } from "~/lib/store/store";
import { ReactNode } from "react";


type Story = StoryFn<typeof DarkMode>;

export default {
  component: DarkMode,
  title: "DarkMode",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  decorators: [(story: any) => <Provider store={store}>{story()}</Provider>],
  tags: ["autodocs"],
};

export const Default = {};
