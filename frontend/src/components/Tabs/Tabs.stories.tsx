import type { Meta, StoryObj } from "@storybook/react";

import Tabs, { TabsProps } from ".";
import { useState } from "react";
import { TabEnum } from "../../enums/Tab.enum";

const meta: Meta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const ParentalComponentMock = (args: TabsProps) => {
  const [currentTab, setCurrentTab] = useState({
    tabName: TabEnum.PUMP,
    numberOfElements: 4,
    shouldShowSuccess: false,
    shouldShowWarning: true,
  });

  return (
    <Tabs {...args} currentTab={currentTab} setCurrentTab={setCurrentTab} />
  );
};

const Template = (args: TabsProps) => ParentalComponentMock(args);

export const One: Story = {
  name: "Tabs",
  render: Template.bind({}),
  args: {
    currentTab: {
      tabName: TabEnum.PUMP,
      numberOfElements: 2,
      shouldShowSuccess: false,
      shouldShowWarning: false,
    },
    setCurrentTab: () => {},
  },
};
