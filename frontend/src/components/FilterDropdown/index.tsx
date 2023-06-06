import { TabEnum } from "../../enums/Tab.enum";
import React from "react";

type FilterDropdownProps = {
  currentFilter: string;
  filterOptions: string[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
};

const FilterDropdown = ({
  filterOptions,
  currentFilter,
  setCurrentFilter,
}: FilterDropdownProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilter(event.target.value);
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"></div>
      <select
        value={currentFilter}
        onChange={handleChange}
        className="text-xs md:text-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {filterOptions.map((filterOption) => (
          <option key={filterOption} value={filterOption}>
            {filterOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
