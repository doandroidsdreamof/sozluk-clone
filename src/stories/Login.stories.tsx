import type { Meta, StoryObj } from "@storybook/react";

import Login from "../components/forms/LoginForm";

const meta: Meta<typeof Login> = {
  title: "Login",
  component: Login,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Primary: Story = {
  args: {
    label: "Login",
  },
};
