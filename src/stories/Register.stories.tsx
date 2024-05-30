import type { Meta, StoryObj } from "@storybook/react";

import Register from "../components/forms/RegisterForm";

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
