import type { Meta } from "@storybook/react";
import RuleGrid, { Rule } from ".";
import { useState } from "react";

const meta: Meta<typeof RuleGrid> = {
  title: "RuleGrid",
  component: RuleGrid,
};

export default meta;

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

type RuleGridStoryProps = {
  initialRules: Rule[];
  options: typeof options;
};

const RuleGridStory = ({ initialRules, options }: RuleGridStoryProps) => {
  const [rules, setRules] = useState(initialRules);

  return (
    <RuleGrid
      options={options}
      onChange={(rules) => setRules(rules)}
      rules={rules}
    />
  );
};

export const Primary = {
  name: "RuleGrid",
  render: () => <RuleGridStory initialRules={rules} options={options} />,
};
