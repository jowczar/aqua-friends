import type { Meta, StoryObj } from "@storybook/react";
import ProgressBar, { ProgressBarProps } from ".";
import { Unit } from "../../enums/Unit.enum";
import { useState } from "react";

const meta: Meta<typeof ProgressBar> = {
  title: "ProgressBar",
  component: ProgressBar,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

const Test = (args: ProgressBarProps) => {
  const [internalElement, setInternalElement] = useState(50);

  return (
    <ProgressBar
      {...args}
      element={internalElement}
      setElement={setInternalElement}
    />
  );
};

// eslint-disable-next-line react/display-name
const Template = (args: ProgressBarProps) => Test(args);

export const One: Story = {
  name: "ProgressBar",
  render: Template.bind({}),
  args: {
    title: "",
    min: 50,
    max: 60,
    unit: Unit.CENTIMETER,
    element: 52,
    setElement: () => {},
  },
};
