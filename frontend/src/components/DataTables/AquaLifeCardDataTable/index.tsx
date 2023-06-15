import React, { useState } from "react";

import Pagination from "../../Pagination";
import Image from "next/image";
import { paginationDataHandler } from "../helpers";
import { AquaItem } from "@/app/(authorized)/creator/AquaDecorPage";
import Modal from "@/components/Modal";
import { Fish } from "@/app/(authorized)/creator/AquaLifePage";

export type AquaLifeCardDataTableProps = {
  columnTitle: string;
  allFishes: Fish[];
  userFishes: Fish[];
  setUserFishes: React.Dispatch<React.SetStateAction<Fish[]>>;
  itemsPerPage: number;
};

const AquaLifeCardDataTable = ({
  columnTitle,
  allFishes,
  userFishes,
  setUserFishes,
  itemsPerPage,
}: AquaLifeCardDataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const paginationData = paginationDataHandler(
    allFishes,
    itemsPerPage,
    currentPage
  );

  console.log("co w userFishes");
  const addButtonHandler = (item: Fish) => {
    setUserFishes([...userFishes, item]);
  };

  const removeButtonHandler = (item: Fish) => {
    setUserFishes((prevFishes) =>
      prevFishes.filter((fish) => fish.name !== item.name)
    );
  };

  const isFishInAquarium = (item: Fish) =>
    userFishes?.find((fish) => fish?.name === item.name);

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
                    (item: Fish, index: number) => (
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
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {isFishInAquarium(item) ? (
                            <button onClick={() => removeButtonHandler(item)}>
                              Remove
                            </button>
                          ) : (
                            <button onClick={() => addButtonHandler(item)}>
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

export default AquaLifeCardDataTable;
