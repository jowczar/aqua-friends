import type { Meta, StoryObj } from "@storybook/react";
import RuleGrid from ".";

const meta: Meta<typeof RuleGrid> = {
  title: "RuleGrid",
  component: RuleGrid,
};

export default meta;

type Story = StoryObj<typeof RuleGrid>;

const rules = [
  {
    key: "Bass",
    rules: {
      Salmon: "Y",
      Trout: "N",
      Bass: "Y",
      Catkey: "N",
      Walleye: "N",
    },
  },
  {
    key: "Salmon",
    rules: {
      Salmon: "Y",
      Trout: "N",
      Bass: "N",
      Catkey: "N",
      Walleye: "N",
    },
  },
  {
    key: "Trout",
    rules: {
      Salmon: "N",
      Trout: "Y",
      Bass: "N",
      Catkey: "N",
      Walleye: "N",
    },
  },
  {
    key: "Catkey",
    rules: {
      Salmon: "N",
      Trout: "N",
      Bass: "N",
      Catkey: "Y",
      Walleye: "N",
    },
  },
  {
    key: "Walleye",
    rules: {
      Salmon: "N",
      Trout: "N",
      Bass: "N",
      Catkey: "N",
      Walleye: "Y",
    },
  },
];

const options = ["Y", "N", "C"];

export const Primary: Story = {
  name: "RuleGrid",
  render: () => <RuleGrid options={options} rules={rules} />,
};
