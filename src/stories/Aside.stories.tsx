import Aside from '~/components/module/Aside';
import type { Meta, StoryObj } from "@storybook/react";

import Login from "../components/form/Login";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Login> = {
  title: "Aside",
  component: Aside,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Primary: Story = {
  args: {
    label: "Aside",

  },
};
