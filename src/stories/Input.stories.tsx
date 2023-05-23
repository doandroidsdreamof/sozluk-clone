import type { StoryObj } from "@storybook/react";
import Input from "../components/elements/Input";

export default {
  component: Input,
  title: "Input",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  decorators: [(story: any) => <div>{story()}</div>],
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    name: "test",
    type: "email",
    style:
      "flex mx-auto mt-12  rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark",
  },
};
