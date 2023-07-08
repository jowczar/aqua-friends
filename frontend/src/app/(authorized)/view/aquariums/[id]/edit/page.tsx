"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

import useFirestore from "@/hooks/useFirestore";
import useUserWithRole from "@/hooks/useUserWithRole";
import { useUserWithDetails } from "@/hooks/useUserWithDetails";
import useAddLog from "@/hooks/useAddLog";
import { useAquariumData } from "../data.logic";
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
import AquaLifeCardDataTable from "@/components/DataTables/AquaLifeCardDataTable";
import { Water } from "@/enums/Water.enum";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "@/components/Modal";

interface AquariumEditPageProps {
  params: { id: string };
}

export default function AquariumEditPage({ params }: AquariumEditPageProps) {
  const router = useRouter();
  const firestore = useFirestore();

  const { user } = useUserWithRole();

  const searchParams = useSearchParams();
  const isFreshWaterFromQuery = searchParams.get("isFreshWater");

  const loggedInUserWithDetails = useUserWithDetails(firestore, user?.uid);

  const { addLog } = useAddLog(
    firestore,
    "Aquarium Edit Page",
    loggedInUserWithDetails.id
  );

  const isFreshWater = Boolean(isFreshWaterFromQuery);

  const { aquariumData, getAquariumData } = useAquariumData(
    params.id,
    loggedInUserWithDetails
  );

  const [aquariumName, setAquariumName] = useState("");
  const [searchText, setSearchText] = useState("");

  const [openDataSavedDialog, setOpenDataSavedDialog] = useState(false);

  const [internalAquariumData, setInternalAquariumData] =
    useState<AquariumData>({
      pump: {
        height: 0,
        image: "",
        length: 0,
        lph: 0,
        name: "",
        power: 0,
        water: Water.BOTH,
        width: 0,
      },
      heater: {
        height: 0,
        image: "",
        length: 0,
        maxTemperature: 0,
        minTemperature: 0,
        name: "",
        power: 0,
        water: Water.BOTH,
        width: 0,
      },
      light: {
        height: 0,
        image: "",
        length: 0,
        name: "",
        power: 0,
        water: Water.BOTH,
        width: 0,
      },
      plants: [],
      decors: [],
      terrains: [],
      fishes: [],
    });

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

  interface ModalData {
    type: string;
    data: any;
  }

  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [userFishes, setUserFishes] = useState<Fish[]>([]);

  const openModal = (modalName: string, modalData: any) => {
    setModalData({ type: modalName, data: modalData });
  };

  useEffect(() => {
    getAquariumData();
    getFishData(firestore, setAllFishes, isFreshWater);
    getFishRules(firestore, setFishRules, isFreshWater);
  }, [getAquariumData, isFreshWater, firestore]);

  useEffect(() => {
    setAquariumName(aquariumData?.aquariumTitle);
    setInternalAquariumData(aquariumData?.aquariumData);
    setUserFishes(aquariumData?.aquariumData?.fishes);
  }, [aquariumData]);

  const handlePreviousButton = () => {
    router.push(`/view/aquariums/${params.id}`);
  };

  const filteredFishes = allFishes.filter((fish) =>
    fish.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSaveDataButton = async () => {
    const aquariumsRef = doc(firestore, "aquariums", params.id);

    await updateDoc(aquariumsRef, {
      decors: internalAquariumData.decors,
      fishes: userFishes,
      heater: internalAquariumData.heater,
      light: internalAquariumData.light,
      plants: internalAquariumData.plants,
      pump: internalAquariumData.pump,
      terrains: internalAquariumData.terrains,
      name: aquariumName,
    });

    addLog(`Successfully updated ${aquariumName} data`);

    setOpenDataSavedDialog(true);
  };

  const handleClose = () => {
    setOpenDataSavedDialog(false);

    router.push(`/view/aquariums/${params.id}`);
  };

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
        onClick={async () => await handleSaveDataButton()}
        className="w-full md:w-auto bg-green-600 text-white inline-flex items-center justify-center rounded-md py-2 px-4 text-center text-base font-normal  hover:bg-opacity-90 mb-2 md:mb-0"
      >
        Save Data
      </button>
    </>
  );

  const getModalDataTitle = (type: string, data: any) => {
    switch (type) {
      case "pump":
      case "heater":
      case "light":
        return data[type]?.name;
      case "plants":
      case "decors":
      case "terrains":
        return data[type]?.map((item: any) => item.name).join(", ");
      case "fishes":
        return data[type]
          ?.map((fish: Fish) => `${fish.name} [${fish.amount}]`)
          .join(", ");
      default:
        return "";
    }
  };

  const [aquariumNameModal, setAquariumNameModal] = useState(false);

  const AquariumNameModal = () => {
    const [newAquariumName, setNewAquariumName] = useState(aquariumName);
    return (
      <Modal
        title="Aquarium Name"
        message="Change aquarium name"
        detailsButtonText="Save"
        onDetailsClick={() => {
          setAquariumNameModal(false), setAquariumName(newAquariumName);
        }}
      >
        <input
          type="text"
          value={newAquariumName}
          onChange={(e) => setNewAquariumName(e.target.value)}
          className="mt-2 py-2 px-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm md:text-lg border-gray-300 text-center"
        />
      </Modal>
    );
  };

  const ModalData = () => {
    if (!modalData || !internalAquariumData) return null;

    const { fishes, ...internalAquariumDataWithoutFishes } =
      internalAquariumData;

    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <p>
                {modalData.type}:{" "}
                {getModalDataTitle(
                  modalData.type.toLowerCase(),
                  internalAquariumData
                )}
              </p>

              <div className="w-full xl:pl-4">
                {modalData.type === "fishes" ? (
                  <AquaLifeCardDataTable
                    columnTitle="Fishes"
                    allFishes={filteredFishes}
                    userFishes={userFishes}
                    setUserFishes={setUserFishes}
                    itemsPerPage={5}
                    fishRules={fishRules}
                    aquariumData={internalAquariumData}
                  />
                ) : (
                  <CardDataTable
                    columnTitle={modalData.type}
                    items={modalData.data}
                    aquariumData={internalAquariumDataWithoutFishes}
                    setAquariumData={setInternalAquariumData}
                  />
                )}
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => setModalData(null)}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save changes
              </button>
              <button
                onClick={() => setModalData(null)}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          onEdit={() => setAquariumNameModal(true)}
          iconUrl="/title.svg"
        />

        <AquariumCard
          name="Pump"
          value={internalAquariumData?.pump?.name as string}
          onEdit={() => openModal("pump", pumps)}
          iconUrl="/pump.svg"
        />

        <AquariumCard
          name="Heater"
          value={internalAquariumData?.heater?.name as string}
          onEdit={() => openModal("heater", heaters)}
          iconUrl="/heater.svg"
        />

        <AquariumCard
          name="Light"
          value={internalAquariumData?.light?.name as string}
          onEdit={() => openModal("light", lights)}
          iconUrl="/light.svg"
        />

        <AquariumCard
          name="Plants"
          value={(internalAquariumData as AquariumData)?.plants
            .map((plants: Plant) => plants.name)
            .join(", ")}
          onEdit={() => openModal("plants", plants)}
          iconUrl="/plants.svg"
        />

        <AquariumCard
          name="Decors"
          value={(internalAquariumData as AquariumData)?.decors
            .map((decor: Decor) => decor.name)
            .join(", ")}
          onEdit={() => openModal("decors", decors)}
          iconUrl="/decors.svg"
        />

        <AquariumCard
          name="Terrains"
          value={(internalAquariumData as AquariumData)?.terrains
            .map((terrain: Terrain) => terrain.name)
            .join(", ")}
          onEdit={() => openModal("terrains", terrains)}
          iconUrl="/terrain.svg"
        />

        <AquariumCard
          name="Fishes"
          value={userFishes
            .map((fish: Fish) => `${fish.name} [${fish.amount}]`)
            .join(", ")}
          onEdit={() => openModal("fishes", allFishes)}
          iconUrl="/fishes.svg"
        />

        <AquariumCard
          name="Exceptional situations"
          value={"No exceptional or critical situations"}
          onEdit={() => openModal("critical", allFishes)}
          iconUrl="https://as2.ftcdn.net/v2/jpg/02/18/36/89/1000_F_218368902_uD1oGpUkOv0Oj2axcokoqIp1pfDwAawu.jpg"
        />

        <AquariumCard
          name="Measurements"
          value={"No measurements"}
          onEdit={() => openModal("measurement", allFishes)}
          iconUrl="https://static.vecteezy.com/system/resources/previews/007/388/543/original/speedometer-icon-speedometer-sign-performance-measurement-symbol-tachometer-sign-vector.jpg"
        />
      </div>

      {modalData && <ModalData />}

      {aquariumNameModal && <AquariumNameModal />}

      {openDataSavedDialog && (
        <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Modal
            title={"Aqua Friends"}
            message={"Data saved successfully!"}
            detailsButtonText={"Close"}
            onDetailsClick={handleClose}
          />
        </div>
      )}
    </div>
  );
}
