const RuleGrid = () => {
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

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {rules.map((rule) => (
            <th key={rule.key}>{rule.key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rules.map((rule) => (
          <tr key={rule.key}>
            <td>{rule.key}</td>
            {rules.map((r) => (
              <td key={r.key}>{rule.rules[r.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RuleGrid;
