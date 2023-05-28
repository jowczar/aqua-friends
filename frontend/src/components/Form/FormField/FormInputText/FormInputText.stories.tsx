import type { Meta, StoryObj } from "@storybook/react";

import FormInputText from "./FormInputText";
import StorybookFormProvider from "../../StorybookFormProvider";

const meta: Meta<typeof FormInputText> = {
  title: "Form Fields/Text Input",
  component: FormInputText,
  decorators: [StorybookFormProvider(true)],
};

export default meta;

type Story = StoryObj<typeof FormInputText>;

export const Text: Story = {
  args: {
    name: "name",
    label: "Your name",
    rules: {
      required: "Field name is required!",
      minLength: { value: 3, message: "Please enter at least 3 characters!" },
    },
  },
};

export const Email: Story = {
  args: {
    name: "email",
    type: "email",
    label: "Your e-mail",
    rules: {
      required: "Field e-mail is required!",
      minLength: { value: 3, message: "Please enter at least 3 characters!" },
    },
  },
};

export const Password: Story = {
  args: {
    name: "password",
    type: "password",
    label: "Your password",
    rules: {
      required: "Field password is required!",
      minLength: { value: 3, message: "Please enter at least 3 characters!" },
    },
  },
};
