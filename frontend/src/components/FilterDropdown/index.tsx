import React from "react";
import { AquariumFilter, UserFilter } from "@/app/(authorized)/view/page";

type FilterDropdownProps = {
  currentFilter: UserFilter | AquariumFilter;
  filterOptions: any; //TODO: im not sure how to correctly this should be typed, lots of errors due to it
  setCurrentFilter:
    | React.Dispatch<React.SetStateAction<UserFilter>>
    | React.Dispatch<React.SetStateAction<AquariumFilter>>;
};

const FilterDropdown = ({
  filterOptions,
  currentFilter,
  setCurrentFilter,
}: FilterDropdownProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = filterOptions.find(
      (option: UserFilter | AquariumFilter) =>
        option.value === event.target.value
    );

    if (selectedFilter) {
      setCurrentFilter(selectedFilter);
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"></div>
      <select
        value={currentFilter.value}
        onChange={handleChange}
        className="text-xs md:text-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {filterOptions.map((filterOption: UserFilter | AquariumFilter) => (
          <option key={filterOption.value} value={filterOption.value}>
            {filterOption.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
