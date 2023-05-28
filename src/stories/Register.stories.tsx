import { DarkMode } from "~/components/common";
import type { Meta, StoryObj } from "@storybook/react";

import Register from "../components/form/Register";

const meta: Meta<typeof Register> = {
  title: "Register",
  component: Register,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Register>;

export const Primary: Story = {
  args: {
    label: "Register",
  },
};
