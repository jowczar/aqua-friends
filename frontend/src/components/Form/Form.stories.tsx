import type { Meta } from "@storybook/react";

import StorybookFormProvider from "./StorybookFormProvider";

const meta: Meta = {
  title: "Form Fields/Other Inputs",
  decorators: [StorybookFormProvider(true)],
};

export default meta;

export const Text = {
  render: () => <div>remove me</div>,
};
