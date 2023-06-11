export const getHistoryColumns = () => {
  return [
    {
      Header: "Service name",
      accessor: "name",
      centerHeader: true,
    },
    {
      Header: "Log data",
      accessor: "message",
      centerHeader: true,
    },
    {
      Header: "Date",
      accessor: "date",
      centerHeader: true,
    },
  ];
};
