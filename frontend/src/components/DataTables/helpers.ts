export const paginationDataHandler = (
  items: Record<string, any>[],
  itemsPerPage: number,
  currentPage: number
) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return {
    currentItems: items.slice(indexOfFirstItem, indexOfLastItem),
    totalPages: Math.ceil(items.length / itemsPerPage),
  };
};
