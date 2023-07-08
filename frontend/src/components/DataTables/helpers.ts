import { usersMock } from "./data-mock";

export const paginationDataHandler = <T extends Record<string, any>>(
  items: T[],
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

export const getUserDataMockById = (id: number) => {
  return usersMock.find((user) => user.id === id);
};
