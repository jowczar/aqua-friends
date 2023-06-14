import React, { useEffect, useState } from "react";

import Pagination from "../../Pagination";
import Image from "next/image";
import { paginationDataHandler } from "../helpers";
import { AquariumData } from "@/app/(authorized)/creator/page";
import { AquaItem } from "@/app/(authorized)/creator/AquaDecorPage";
import Modal from "@/components/Modal";
import { Water } from "@/enums/Water.enum";

export type CardDataTableProps = {
  columnTitle: string;
  items: AquaItem[];
  aquariumData: AquariumData;
  setAquariumData: React.Dispatch<React.SetStateAction<AquariumData>>;
};

const CardDataTable = ({
  columnTitle,
  items,
  aquariumData,
  setAquariumData,
}: CardDataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: AquaItem;
  }>({
    pump: aquariumData.pump,
    heater: aquariumData.heater,
    light: aquariumData.light,
  });

  useEffect(() => {
    setSelectedItems({
      pump: aquariumData.pump,
      heater: aquariumData.heater,
      light: aquariumData.light,
    });
  }, [aquariumData]);

  const category = columnTitle.toLowerCase();

  const isSingleAnswer = ["pump", "heater", "light"].includes(category);

  const itemsPerPage = 6;

  const paginationData = paginationDataHandler(
    items,
    itemsPerPage,
    currentPage
  );

  const addButtonHandler = (item: AquaItem) => {
    const multipleCategories = ["plants", "decors", "terrains"];

    const isMultipleItemCategory = multipleCategories.includes(category);
    const categoryKey = category as keyof AquariumData;

    const otherTypeExists = Object.values(aquariumData).some((data) => {
      if (Array.isArray(data)) {
        return data.some((i) => {
          if (item.water === Water.BOTH) return false;
          return i.water !== item.water && i.water !== Water.BOTH;
        });
      }
      return data.water !== item.water && data.water !== Water.BOTH;
    });

    if (otherTypeExists) {
      setShowModal(true);
      return;
    }

    setAquariumData((prevState) => {
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

    if (!isMultipleItemCategory) {
      setSelectedItems((prevSelectedItems) => ({
        ...prevSelectedItems,
        [category]: item,
      }));
    }
  };

  const removeButtonHandler = (item: AquaItem) => {
    const multipleCategories = ["plants", "decors", "terrains"];

    if (multipleCategories.includes(category)) {
      setAquariumData((prevState) => {
        const categoryKey = category as keyof AquariumData;

        const field = prevState[categoryKey];

        if (Array.isArray(field)) {
          const filteredItems = field.filter(
            (i: AquaItem) => i.name !== item.name
          );
          return {
            ...prevState,
            [categoryKey]: filteredItems,
          };
        }
        return prevState;
      });
    }
  };

  const hideModal = () => {
    setShowModal(false);
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
                          ) : (aquariumData[category] as AquaItem[]).find(
                              (i: AquaItem) => i.name === item.name
                            ) ? (
                            <button
                              onClick={() =>
                                removeButtonHandler(item as AquaItem)
                              }
                            >
                              Remove
                            </button>
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
      {showModal && (
        <Modal
          title="Błąd"
          message="Nie możesz dodać elementu dla Fresh Water, ponieważ jest już element z Salt Water (i odwrotnie)"
          cancelButtonText="Anuluj"
          detailsButtonText="Zrozumiałem"
          onCancelClick={hideModal}
          onDetailsClick={hideModal}
        />
      )}
    </div>
  );
};

export default CardDataTable;
