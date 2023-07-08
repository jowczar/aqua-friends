import React, { useState } from "react";

import Pagination from "../../Pagination";
import Image from "next/image";
import { paginationDataHandler } from "../helpers";

import Modal from "@/components/Modal";
import { Fish, FishRules } from "@/app/(authorized)/creator/AquaLifePage";
import { FishRuleSet } from "@/enums/FishRuleSet.enum";

export type AquaLifeCardDataTableProps = {
  columnTitle: string;
  allFishes: Fish[];
  userFishes: Fish[];
  setUserFishes: React.Dispatch<React.SetStateAction<Fish[]>>;
  itemsPerPage: number;
  fishRules: FishRules;
};

const AquaLifeCardDataTable = ({
  columnTitle,
  allFishes,
  userFishes,
  setUserFishes,
  itemsPerPage,
  fishRules,
}: AquaLifeCardDataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalCompatible, setShowModalCompatible] = useState(false);
  const [showModalNotCompatible, setShowModalNotCompatible] = useState(false);
  const [showModalCaution, setShowModalCaution] = useState(false);

  const [currentFish, setCurrentFish] = useState<Fish | null>(null);
  const [incompatibleFish, setIncompatibleFish] = useState<Fish | null>(null);

  const paginationData = paginationDataHandler(
    allFishes,
    itemsPerPage,
    currentPage
  );

  const addButtonHandler = (item: Fish) => {
    setCurrentFish(item);

    const incompatibilityDetected = userFishes.some((userFish) => {
      const compatibility = fishRules[item.species][userFish.species];
      switch (compatibility) {
        case FishRuleSet.NOT_COMPATIBLE:
          setIncompatibleFish(userFish);
          setShowModalNotCompatible(true);
          return true;
        case FishRuleSet.CAUTION_REQUIRED:
          setShowModalCaution(true);
          return true;
        default:
          return false;
      }
    });

    if (!incompatibilityDetected) {
      setUserFishes([...userFishes, item]);
      setShowModalCompatible(true);
    }
  };

  const removeButtonHandler = (item: Fish) => {
    setUserFishes((prevFishes) =>
      prevFishes.filter((fish) => fish.name !== item.name)
    );
  };

  const addFishWithCaution = () => {
    if (currentFish) {
      setUserFishes([...userFishes, currentFish]);
    }
    setShowModalCaution(false);
  };

  const isFishInAquarium = (item: Fish) =>
    userFishes?.find((fish) => fish?.name === item.name);

  const hideModal = () => {
    setShowModalCompatible(false);
    setShowModalNotCompatible(false);
    setShowModalCaution(false);
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
                              <div className="text-sm text-gray-500 whitespace-normal break-all">
                                {item.species}
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
      {showModalNotCompatible && (
        <Modal
          title="Błąd"
          message={
            <>
              Nie możesz dodać rybki gatunku{" "}
              <strong className="text-red-600">{currentFish?.species}</strong>,
              ponieważ jest niekompatybilna z rybką gatunku{" "}
              <strong className="text-red-600">
                {incompatibleFish?.species}
              </strong>
              , która jest już w twoim akwarium.
            </>
          }
          detailsButtonText="Zamknij"
          onDetailsClick={hideModal}
        />
      )}
      {showModalCaution && (
        <Modal
          title="Ostrzeżenie"
          message={
            <>
              Czy na pewno chcesz dodać rybkę gatunku{" "}
              <strong className="text-red-600">{currentFish?.species}</strong>?
              Może nie być to najlepsza opcja.
            </>
          }
          cancelButtonText="Anuluj"
          detailsButtonText="Dodaj mimo wszystko"
          onCancelClick={hideModal}
          onDetailsClick={addFishWithCaution}
        />
      )}

      {showModalCompatible && (
        <Modal
          title="Sukces"
          message="Rybka została dodana do akwarium."
          detailsButtonText="Zamknij"
          onDetailsClick={hideModal}
        />
      )}
    </div>
  );
};

export default AquaLifeCardDataTable;
