type Option = string;
type RuleKey = string;

export type Rule = {
  key: RuleKey;
  rules: Record<RuleKey, Option>;
};

export type RuleGridProps = {
  options: Option[];
  rules: Rule[];
  onChange: (rules: Rule[]) => void;
};

const RuleGrid = ({ rules, options, onChange }: RuleGridProps) => {
  const changeOption = (rule: Rule, key: RuleKey) => {
    const newRules = rules.map((r) => {
      if (r.key === rule.key) {
        return {
          ...r,
          rules: {
            ...r.rules,
            [key]:
              options[(options.indexOf(r.rules[key]) + 1) % options.length],
          },
        };
      }
      return r;
    });
    onChange(newRules);
  };

  return (
    <table className="border-collapse border border-slate-300">
      <thead>
        <tr>
          <th></th>
          {rules.map((rule) => (
            <th
              className="border border-slate-300 [writing-mode:vertical-lr] rotate-180 p-2"
              key={rule.key}
            >
              {rule.key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rules.map((rule) => (
          <tr key={rule.key}>
            <td className="border border-slate-300 font-bold p-2">
              {rule.key}
            </td>
            {rules.map((r) => (
              <td
                className="transition border border-slate-300 text-center cursor-pointer hover:bg-slate-300 select-none"
                key={r.key}
                onClick={() => changeOption(rule, r.key)}
              >
                {rule.rules[r.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RuleGrid;
