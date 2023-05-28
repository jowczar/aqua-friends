import type { Meta, StoryObj } from "@storybook/react";

import FormInputSubmit from "./FormInputSubmit";
import StorybookFormProvider from "../../StorybookFormProvider";

const meta: Meta<typeof FormInputSubmit> = {
  title: "Form Fields/Submit",
  component: FormInputSubmit,
  decorators: [StorybookFormProvider(false)],
};

export default meta;

type Story = StoryObj<typeof FormInputSubmit>;

export const Submit: Story = {
  args: {
    name: "submit",
    children: <>Submit</>,
    onClick: () => new Promise((res) => setTimeout(() => res(), 2000)),
  },
};
