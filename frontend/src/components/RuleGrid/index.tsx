type Option = string;
type RuleKey = string;

type Rule = {
  key: RuleKey;
  rules: Record<RuleKey, Option>;
};

type RuleGridProps = {
  options: Option[];
  rules: Rule[];
};

const RuleGrid = ({ rules, options }: RuleGridProps) => {
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
                className="transition border border-slate-300 text-center cursor-pointer hover:bg-slate-300"
                key={r.key}
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
