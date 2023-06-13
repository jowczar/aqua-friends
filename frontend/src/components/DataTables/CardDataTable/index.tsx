import React, { useEffect, useState } from "react";

import Pagination from "../../Pagination";
import Image from "next/image";
import { paginationDataHandler } from "../helpers";
import { AquariumData } from "@/app/(authorized)/creator/page";
import { AquaItem } from "@/app/(authorized)/creator/AquaDecorPage";

export type CardDataTableProps = {
  columnTitle: string;
  isSingleAnswer: boolean;
  items: AquaItem[];
  aquariumData: AquariumData;
  setAquariumData: React.Dispatch<React.SetStateAction<AquariumData>>;
};

const CardDataTable = ({
  columnTitle,
  isSingleAnswer,
  items,
  aquariumData,
  setAquariumData,
}: CardDataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: AquaItem;
  }>({
    pump: aquariumData.pump,
    heater: aquariumData.heater,
    light: aquariumData.light,
    plants: aquariumData.plants[0],
    decors: aquariumData.decors[0],
    terrains: aquariumData.terrains[0],
  });

  useEffect(() => {
    setSelectedItems({
      pump: aquariumData.pump,
      heater: aquariumData.heater,
      light: aquariumData.light,
      plants: aquariumData.plants[0],
      decors: aquariumData.decors[0],
      terrains: aquariumData.terrains[0],
    });
  }, [aquariumData]);

  const category = columnTitle.toLowerCase();

  const itemsPerPage = 6;

  const paginationData = paginationDataHandler(
    items,
    itemsPerPage,
    currentPage
  );

  const addButtonHandler = (item: AquaItem) => {
    setAquariumData((prevState) => {
      const multipleCategories = ["plants", "decors", "terrains"];

      const isMultipleItemCategory = multipleCategories.includes(category);
      const categoryKey = category as keyof AquariumData;

      if (isMultipleItemCategory) {
        const field = prevState[categoryKey];

        if (Array.isArray(field)) {
          return {
            ...prevState,
            [categoryKey]: [...field, item],
          };
        }
      }

      return {
        ...prevState,
        [categoryKey]: item,
      };
    });

    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [category]: item,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto">
      <div className="bg-white rounded-xl shadow-sm mt-4 pb-2 w-full">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-gray-200">
                <thead className="mt-3">
                  <tr>
                    <th
                      scope="col"
                      className="px-8 pt-6 pb-3 text-left text-lg font-medium text-gray-600"
                    >
                      {columnTitle}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginationData.currentItems.map(
                    (item: Record<string, any>, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-15 w-15 hidden md:block">
                              <Image
                                className="rounded-full"
                                src={
                                  item.image ? item.image : "default-fish.png"
                                }
                                alt="Default image"
                                height={70}
                                width={80}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500 whitespace-normal break-all">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {isSingleAnswer ? (
                            <input
                              type="radio"
                              name="item"
                              checked={
                                selectedItems[category] &&
                                selectedItems[category].name === item.name
                              }
                              onClick={() => addButtonHandler(item as AquaItem)}
                            />
                          ) : (
                            <button
                              onClick={() => addButtonHandler(item as AquaItem)}
                            >
                              Add
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <Pagination
            totalPages={paginationData.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CardDataTable;
