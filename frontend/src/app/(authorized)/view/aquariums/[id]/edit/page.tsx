"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

import useFirestore from "@/hooks/useFirestore";
import useUserWithRole from "@/hooks/useUserWithRole";
import { useUserWithDetails } from "@/hooks/useUserWithDetails";
import useAddLog from "@/hooks/useAddLog";
import { useAquariumData } from "../data.logic";
import AquaLifeSummaryCard from "@/components/AquaLifeSummaryCard";
import AquaDecorSummaryCard from "@/components/AquaDecorSummaryCard";
import Search from "@/components/Search";
import AquaLifeCardDataTable from "@/components/DataTables/AquaLifeCardDataTable";
import { Fish, FishRules } from "@/app/(authorized)/creator/AquaLifePage";
import { FishRuleSet } from "@/enums/FishRuleSet.enum";
import {
  getFishData,
  getFishRules,
} from "@/app/(authorized)/creator/aquaLife.logic";
import {
  Decor,
  Heater,
  Light,
  Plant,
  Pump,
  Terrain,
} from "@/app/(authorized)/creator/AquaDecorPage";
import CardDataTable from "@/components/DataTables/CardDataTable";
import { getDecorTableData } from "@/app/(authorized)/creator/aquaDecor.logic";
import { AquariumData } from "@/app/(authorized)/creator/page";
import { AquariumDataProps } from "../../../page";

interface AquariumEditPageProps {
  params: { id: string; isFreshWater: string };
}

export default function AquariumEditPage({ params }: AquariumEditPageProps) {
  const router = useRouter();
  const firestore = useFirestore();

  const { user } = useUserWithRole();

  const loggedInUserWithDetails = useUserWithDetails(firestore, user?.uid);

  const { addLog } = useAddLog(
    firestore,
    "Aquarium Edit Page",
    loggedInUserWithDetails.id
  );

  const [isFreshWater, setIsFreshWater] = useState(
    Boolean(params.isFreshWater)
  );

  const { aquariumData, getAquariumData, setAquariumData } = useAquariumData(
    params.id,
    loggedInUserWithDetails
  );

  const [aquariumName, setAquariumName] = useState("");
  const [searchText, setSearchText] = useState("");

  const [internalAquariumData, setInternalAquariumData] =
    useState<AquariumData>();

  const [allFishes, setAllFishes] = useState<Fish[]>([]);

  const [fishRules, setFishRules] = useState<FishRules>({
    fish: {
      fish: FishRuleSet.COMPATIBLE,
    },
  });

  const [pumps, setPumps] = useState<Pump[]>([]);
  const [heaters, setHeaters] = useState<Heater[]>([]);
  const [lights, setLights] = useState<Light[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [saltWaterPlants, setSaltWaterPlants] = useState<Plant[]>([]);
  const [freshWaterPlants, setFreshWaterPlants] = useState<Plant[]>([]);
  const [decors, setDecors] = useState<Decor[]>([]);
  const [terrains, setTerrains] = useState<Terrain[]>([]);

  useEffect(() => {
    if (!pumps.length) getDecorTableData<Pump>(firestore, setPumps, "pumps");
    if (!heaters.length)
      getDecorTableData<Heater>(firestore, setHeaters, "heaters");
    if (!lights.length)
      getDecorTableData<Light>(firestore, setLights, "lights");
    if (!saltWaterPlants.length)
      getDecorTableData<Plant>(
        firestore,
        setSaltWaterPlants,
        "saltwater_plants"
      );
    if (!freshWaterPlants.length) {
      getDecorTableData<Plant>(
        firestore,
        setFreshWaterPlants,
        "freshwater_plants"
      );
    }
    if (!decors.length)
      getDecorTableData<Decor>(firestore, setDecors, "decors");
    if (!terrains.length)
      getDecorTableData<Terrain>(firestore, setTerrains, "terrains");
  }, [
    decors,
    firestore,
    heaters,
    lights,
    saltWaterPlants,
    freshWaterPlants,
    pumps,
    terrains,
  ]);

  useEffect(() => {
    setPlants(isFreshWater ? freshWaterPlants : saltWaterPlants);
  }, [isFreshWater, freshWaterPlants, saltWaterPlants]);

  const [userFishes, setUserFishes] = useState<Fish[]>([]);

  const [showPumpModal, setShowPumpModal] = useState(false);
  const [showHeaterModal, setShowHeaterModal] = useState(false);
  const [showLightModal, setShowLightModal] = useState(false);
  const [showDecorsModal, setShowDecorsModal] = useState(false);
  const [showTerrainsModal, setShowTerrainsModal] = useState(false);
  const [showPlantsModal, setShowPlantsModal] = useState(false);
  const [showFishesModal, setShowFishesModal] = useState(false);

  const handleOpenPumpModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPumpModal(true);
  };

  const handleClosePumpModal = () => {
    setShowPumpModal(false);
  };

  const handleOpenHeaterModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowHeaterModal(true);
  };

  const handleCloseHeaterModal = () => {
    setShowHeaterModal(false);
  };

  const handleOpenLightModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowLightModal(true);
  };

  const handleCloseLightModal = () => {
    setShowLightModal(false);
  };

  const handleOpenDecorsModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDecorsModal(true);
  };

  const handleCloseDecorsModal = () => {
    setShowDecorsModal(false);
  };

  const handleOpenTerrainsModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowTerrainsModal(true);
  };

  const handleCloseTerrainsModal = () => {
    setShowTerrainsModal(false);
  };

  const handleOpenPlantsModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPlantsModal(true);
  };

  const handleClosePlantsModal = () => {
    setShowPlantsModal(false);
  };

  const handleOpenFishesModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowFishesModal(true);
  };

  const handleCloseFishesModal = () => {
    setShowFishesModal(false);
  };

  console.log("aquariumData", aquariumData);

  useEffect(() => {
    getAquariumData();
    getFishData(firestore, setAllFishes, isFreshWater);
    getFishRules(firestore, setFishRules, isFreshWater);
  }, [getAquariumData]);

  useEffect(() => {
    setAquariumName(aquariumData?.aquariumTitle);
    setInternalAquariumData(aquariumData?.aquariumData);
    setUserFishes(aquariumData?.aquariumData?.fishes);
  }, [aquariumData]);

  const handlePreviousButton = () => {
    router.push(`/view/aquariums/${params.id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredFishes = allFishes.filter((fish) =>
    fish.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSaveDataButton = () => {};

  const previousButton = (
    <>
      <button
        onClick={handlePreviousButton}
        className="w-full md:w-auto bg-transparent border-blue-500 border-solid border-2 text-blue-500 inline-flex items-center justify-center rounded-md py-2 px-4 text-center text-base font-normal  hover:bg-opacity-90 mb-2 md:mb-0"
      >
        Go back
      </button>
    </>
  );

  const saveDataButton = (
    <>
      <button
        onClick={handleSaveDataButton}
        className="w-full md:w-auto bg-green-600 text-white inline-flex items-center justify-center rounded-md py-2 px-4 text-center text-base font-normal  hover:bg-opacity-90 mb-2 md:mb-0"
      >
        Save Data
      </button>
    </>
  );

  interface AquariumCardProps {
    name: string;
    value: string;
    onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
    iconUrl?: string;
  }

  const AquariumCard: React.FC<AquariumCardProps> = ({
    name,
    value,
    onEdit,
    iconUrl,
  }) => {
    return (
      <div className="flex w-full text-center items-center justify-center text-sm text-primary font-light bg-gray-50 border border-gray-300 rounded-lg p-2.5">
        <div className="flex items-center justify-start text-left w-full">
          {iconUrl && (
            <Image
              src={iconUrl}
              alt="icon"
              className="flex"
              height={30}
              width={30}
              aria-hidden="true"
            />
          )}
          <div className="flex flex-col justify-center ml-2 w-full text-center">
            {name}:<div className="font-bold px-1 text-center">{value}</div>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="block py-2 px-6 rounded bg-blue-500 text-white text-base"
        >
          Edit
        </button>
      </div>
    );
  };

  return (
    <div className="my-10 px-4 md:px-20">
      <div className={`w-full mb-5 mt-5 justify-between md:flex gap-4`}>
        {previousButton}
        {saveDataButton}
      </div>

      <div className="my-20 flex flex-wrap justify-center gap-6">
        <AquariumCard
          name="Aquarium Name"
          value={aquariumName}
          onEdit={() => {}}
          iconUrl="/title.svg"
        />

        <AquariumCard
          name="Pump"
          value={internalAquariumData?.pump?.name as string}
          onEdit={handleOpenPumpModal}
          iconUrl="/pump.svg"
        />

        <AquariumCard
          name="Heater"
          value={internalAquariumData?.heater?.name as string}
          onEdit={handleOpenHeaterModal}
          iconUrl="/heater.svg"
        />

        <AquariumCard
          name="Light"
          value={internalAquariumData?.light?.name as string}
          onEdit={handleOpenLightModal}
          iconUrl="/light.svg"
        />

        <AquariumCard
          name="Plants"
          value={(internalAquariumData as AquariumData)?.plants
            .map((plants: Plant) => plants.name)
            .join(", ")}
          onEdit={handleOpenPlantsModal}
          iconUrl="/plants.svg"
        />

        <AquariumCard
          name="Decors"
          value={(internalAquariumData as AquariumData)?.decors
            .map((decor: Decor) => decor.name)
            .join(", ")}
          onEdit={handleOpenDecorsModal}
          iconUrl="/decors.svg"
        />

        <AquariumCard
          name="Terrains"
          value={(internalAquariumData as AquariumData)?.terrains
            .map((terrain: Terrain) => terrain.name)
            .join(", ")}
          onEdit={handleOpenTerrainsModal}
          iconUrl="/terrain.svg"
        />

        <AquariumCard
          name="Fishes"
          value={(internalAquariumData as any)?.fishes
            .map((fish: Fish) => `${fish.name} [${fish.amount}]`)
            .join(", ")}
          onEdit={handleOpenFishesModal}
          iconUrl="/fishes.svg"
        />
      </div>

      {showPumpModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <p>Pump: {internalAquariumData?.pump?.name}</p>

                <div className="w-full xl:pl-4">
                  <CardDataTable
                    columnTitle="Pump"
                    items={pumps}
                    aquariumData={internalAquariumData as AquariumData}
                    setAquariumData={
                      setInternalAquariumData as React.Dispatch<
                        React.SetStateAction<AquariumData>
                      >
                    }
                  />
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleClosePumpModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save changes
                </button>
                <button
                  onClick={handleClosePumpModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {showEditModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="w-full  xl:pr-4 mt-4 xl:mt-0">
                  <AquaLifeSummaryCard
                    fishes={aquariumData.aquariumData.fishes}
                  />
                </div>

                <div className="w-full xl:pl-4">
                  <div className="xl:flex xl:justify-between w-full xl:-flex-col mb-2">
                    <Search className="w-full" onChange={handleSearchChange} />
                  </div>
                  <AquaLifeCardDataTable
                    columnTitle="Fishes"
                    allFishes={filteredFishes}
                    userFishes={userFishes}
                    setUserFishes={setUserFishes}
                    itemsPerPage={5}
                    fishRules={fishRules}
                    aquariumData={aquariumData.aquariumData}
                  />
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCloseEditModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save changes
                </button>
                <button
                  onClick={handleCloseEditModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
