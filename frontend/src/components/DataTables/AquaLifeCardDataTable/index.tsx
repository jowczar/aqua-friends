import React, { useState } from "react";

import Pagination from "../../Pagination";
import Image from "next/image";
import { paginationDataHandler } from "../helpers";

import Modal from "@/components/Modal";
import { Fish, FishRules } from "@/app/(authorized)/creator/AquaLifePage";
import { FishRuleSet } from "@/enums/FishRuleSet.enum";
import { AquariumData } from "@/app/(authorized)/creator/page";

export type AquaLifeCardDataTableProps = {
  columnTitle: string;
  allFishes: Fish[];
  userFishes: Fish[];
  setUserFishes: React.Dispatch<React.SetStateAction<Fish[]>>;
  itemsPerPage: number;
  fishRules: FishRules;
  aquariumData: AquariumData;
};

const AquaLifeCardDataTable = ({
  columnTitle,
  allFishes,
  userFishes,
  setUserFishes,
  itemsPerPage,
  fishRules,
  aquariumData,
}: AquaLifeCardDataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalCompatible, setShowModalCompatible] = useState(false);
  const [showModalNotCompatible, setShowModalNotCompatible] = useState(false);
  const [showModalCaution, setShowModalCaution] = useState(false);
  const [showModalWaterTypeMismatch, setShowModalWaterTypeMismatch] =
    useState(false);

  const [currentFish, setCurrentFish] = useState<Fish | null>(null);
  const [incompatibleFish, setIncompatibleFish] = useState<Fish | null>(null);

  const [showAddFishAmountModal, setShowAddFishAmountModal] = useState(false);
  const [fishAmountToAdd, setFishAmountToAdd] = useState(1);

  const paginationData = paginationDataHandler(
    allFishes,
    itemsPerPage,
    currentPage
  );

  const addAmountOfFishes = (item: Fish) => {
    setCurrentFish(item);
    setShowAddFishAmountModal(true);
  };

  const confirmFishAmount = () => {
    if (currentFish) {
      addButtonHandler(currentFish);
    }

    setShowAddFishAmountModal(false);
  };

  const addButtonHandler = (item: Fish) => {
    const isWaterTypeMismatch =
      aquariumData.plants[0]?.water !== item.requirements.water;

    if (isWaterTypeMismatch) {
      setShowModalWaterTypeMismatch(true);
      return;
    }

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
      setUserFishes([...userFishes, { ...item, amount: fishAmountToAdd }]);
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
                            <button onClick={() => addAmountOfFishes(item)}>
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
      {showAddFishAmountModal && (
        <Modal
          title="Add Fish"
          message={
            <>
              How many fish of{" "}
              <strong className="text-red-600">{currentFish?.name}</strong>{" "}
              would you like to add?
            </>
          }
          detailsButtonText="Add"
          cancelButtonText="Close"
          onDetailsClick={confirmFishAmount}
          onCancelClick={() => {
            setShowAddFishAmountModal(false);
            setFishAmountToAdd(1);
          }}
        >
          <input
            type="number"
            min="1"
            value={fishAmountToAdd}
            onChange={(e) => setFishAmountToAdd(parseInt(e.target.value))}
            className="mt-2 py-2 px-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm md:text-lg border-gray-300 text-center"
          />
        </Modal>
      )}
      {showModalNotCompatible && (
        <Modal
          title="Error"
          message={
            <>
              You cannot add{" "}
              <strong className="text-green-600">{currentFish?.name}</strong> of
              species{" "}
              <strong className="text-red-600">{currentFish?.species}</strong>,
              as it is incompatible with{" "}
              <strong className="text-green-600">
                {incompatibleFish?.name}
              </strong>{" "}
              of species{" "}
              <strong className="text-red-600">
                {incompatibleFish?.species}
              </strong>{" "}
              that is already in your aquarium.
            </>
          }
          detailsButtonText="Close"
          onDetailsClick={hideModal}
        />
      )}
      {showModalCaution && (
        <Modal
          title="Warning"
          message={
            <>
              Are you sure you want to add {fishAmountToAdd}
              <strong className="text-green-600">{currentFish?.name}</strong> of
              species{" "}
              <strong className="text-red-600">{currentFish?.species}</strong>?
              This might not be the best choice.
            </>
          }
          cancelButtonText="Cancel"
          detailsButtonText="Add Anyway"
          onCancelClick={() => {
            hideModal();
            setFishAmountToAdd(1);
          }}
          onDetailsClick={() => {
            addFishWithCaution();
            setFishAmountToAdd(1);
          }}
        />
      )}

      {showModalCompatible && (
        <Modal
          title="Success"
          message={
            <>
              {fishAmountToAdd}{" "}
              <strong className="text-green-600">{currentFish?.name}</strong>{" "}
              has been added to the aquarium.
            </>
          }
          detailsButtonText="Close"
          onDetailsClick={() => {
            hideModal();
            setFishAmountToAdd(1);
          }}
        />
      )}

      {showModalWaterTypeMismatch && (
        <Modal
          title="Error"
          message="The water type of the fish is not compatible with the water type of the aquarium. You cannot add this fish."
          detailsButtonText="Close"
          onDetailsClick={() => setShowModalWaterTypeMismatch(false)}
        />
      )}
    </div>
  );
};

export default AquaLifeCardDataTable;
