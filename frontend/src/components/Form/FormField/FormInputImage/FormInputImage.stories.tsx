import type { Meta, StoryObj } from "@storybook/react";
import { FC } from "react";

import FormInputImage from "./FormInputImage";
import StorybookFormProvider from "../../StorybookFormProvider";
import FileUploaderProvider from "@/context/FileUploaderProvider";

const meta: Meta<typeof FormInputImage> = {
  title: "Form Fields/Image Input",
  component: FormInputImage,
  decorators: [StorybookFormProvider(true)],
};

export default meta;

type Story = StoryObj<typeof FormInputImage>;

const FileUploaderDecorator = (Story: FC) => {
  return (
    <FileUploaderProvider defaultImage="man.png">
      <Story />
    </FileUploaderProvider>
  );
};

export const Image: Story = {
  args: {
    name: "avatar",
  },
  decorators: [FileUploaderDecorator],
};
