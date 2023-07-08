"use client";

import { useState } from "react";
import CreatorSteps from "@/components/CreatorSteps";
import { TabEnum } from "@/enums/Tab.enum";
import AquaSizePage from "./AquaSizePage";
import AquaDecorPage, {
  AquaItem,
  Decor,
  Heater,
  Light,
  Plant,
  Pump,
  Terrain,
} from "./AquaDecorPage";
import AquaSummaryPage from "./AquaSummaryPage";
import AquaLifePage, { Fish } from "./AquaLifePage";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { AquaCreatorStep } from "@/enums/AquaCreatorStep.enum";
import { Water } from "@/enums/Water.enum";
import useFirestore from "@/hooks/useFirestore";
import useUserWithRole from "@/hooks/useUserWithRole";
import { collection, doc, setDoc } from "firebase/firestore";

const TOTAL_NUMBER_OF_STEPS = 4;

export type AquariumDimensions = {
  length: number;
  width: number;
  height: number;
};

export type Equipment = {
  image: string;
  name: string;
  description: string;
  value: string;
};

export type AquariumData = {
  [key: string]: AquaItem | AquaItem[];
  pump: Pump;
  heater: Heater;
  light: Light;
  plants: Plant[];
  decors: Decor[];
  terrains: Terrain[];
};

export type TabElement = {
  tabName: TabEnum;
  numberOfElements: number;
  shouldShowSuccess: boolean;
  shouldShowWarning: boolean;
};

export type TabsElements = {
  pump: TabElement;
  heater: TabElement;
  light: TabElement;
  plants: TabElement;
  decors: TabElement;
  terrains: TabElement;
};

export default function Creator() {
  const router = useRouter();

  const firestore = useFirestore();

  const { user } = useUserWithRole();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepsCompleted, setStepsCompleted] = useState<number[]>([]);

  const [aquariumName, setAquariumName] = useState("✨Your new aquarium✨");

  const [openDialog, setOpenDialog] = useState(false);

  const [isFreshWater, setIsFreshWater] = useState(true);

  const [aquariumDimensions, setAquariumDimensions] =
    useState<AquariumDimensions>({
      length: 10,
      width: 10,
      height: 10,
    });

  const [aquariumData, setAquariumData] = useState<AquariumData>({
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
  });

  const handleNext = () => {
    if (currentStep < TOTAL_NUMBER_OF_STEPS - 1) {
      setStepsCompleted([...stepsCompleted, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      let newSteps = [...stepsCompleted];
      newSteps.pop();
      setStepsCompleted(newSteps);
    }
  };

  const handleSave = async () => {
    if (currentStep !== 4) {
      setStepsCompleted([...stepsCompleted, currentStep]);
      setCurrentStep(4);
    }

    await setDoc(doc(firestore, "aquariums", crypto.randomUUID()), {
      user_id: user?.uid,
      name: aquariumName,
      width: aquariumDimensions.width,
      height: aquariumDimensions.height,
      length: aquariumDimensions.length,
      pump: aquariumData.pump,
      heater: aquariumData.heater,
      light: aquariumData.light,
      plants: aquariumData.plants,
      decors: aquariumData.decors,
      terrains: aquariumData.terrains,
      fishes,
    });

    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);

    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  };

  const [currentTab, setCurrentTab] = useState({
    tabName: TabEnum.PUMP,
    numberOfElements: 0,
    shouldShowSuccess: false,
    shouldShowWarning: false,
  });

  const [tabs, setTabs] = useState<TabsElements>({
    pump: {
      tabName: TabEnum.PUMP,
      numberOfElements: 0,
      shouldShowSuccess: false,
      shouldShowWarning: true,
    },
    heater: {
      tabName: TabEnum.HEATER,
      numberOfElements: 0,
      shouldShowSuccess: false,
      shouldShowWarning: true,
    },
    light: {
      tabName: TabEnum.LIGHT,
      numberOfElements: 0,
      shouldShowSuccess: false,
      shouldShowWarning: true,
    },
    plants: {
      tabName: TabEnum.PLANTS,
      numberOfElements: 0,
      shouldShowSuccess: false,
      shouldShowWarning: false,
    },
    decors: {
      tabName: TabEnum.DECORS,
      numberOfElements: 0,
      shouldShowSuccess: false,
      shouldShowWarning: false,
    },
    terrains: {
      tabName: TabEnum.TERRAINS,
      numberOfElements: 0,
      shouldShowSuccess: false,
      shouldShowWarning: false,
    },
  });

  const updateTabsData = (newCurrentTab: TabElement) => {
    setCurrentTab(newCurrentTab);

    setTabs((prevTabs) => ({
      ...prevTabs,
      [newCurrentTab.tabName.toLowerCase()]: newCurrentTab,
    }));
  };

  const [fishes, setFishes] = useState<Fish[]>([]);

  const canCreateAquarium = () => {
    const { pump, heater, light, terrains } = aquariumData;
    return (
      pump.name !== "" &&
      heater.name !== "" &&
      light.name !== "" &&
      fishes.length > 0 &&
      terrains.length > 0
    );
  };

  const buttons = (
    <>
      {currentStep > AquaCreatorStep.AQUA_SIZE_PAGE && (
        <button
          onClick={handlePrevious}
          className="w-full md:w-auto bg-transparent border-blue-500 border-solid border-2 text-blue-500 inline-flex items-center justify-center rounded-md py-2 px-4 text-center text-base font-normal  hover:bg-opacity-90 mb-2 md:mb-0"
        >
          Previous Step
        </button>
      )}
      <div className="w-full md:w-auto">
        {currentStep < TOTAL_NUMBER_OF_STEPS - 1 && (
          <button
            onClick={handleNext}
            className="w-full bg-primary inline-flex items-center justify-center rounded-md py-2 px-4 text-center text-base font-normal text-white hover:bg-opacity-90  mb-2 md:mb-0"
          >
            Next Step
          </button>
        )}
        {stepsCompleted.length === TOTAL_NUMBER_OF_STEPS - 1 && (
          <button
            onClick={async () => await handleSave()}
            disabled={!canCreateAquarium()}
            className={`w-full inline-flex items-center justify-center rounded-md py-2 px-4 text-center text-base font-normal ${
              canCreateAquarium()
                ? "bg-green-600 text-white hover:bg-opacity-90"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            } `}
          >
            Create your new world
          </button>
        )}
      </div>
    </>
  );

  return (
    <div>
      <div
        className={`hidden w-full mb-5 mt-5 px-5 md:px-20 md:flex  ${
          currentStep === AquaCreatorStep.AQUA_SIZE_PAGE
            ? "md:flex-row-reverse"
            : "md:flex-row"
        } md:justify-between`}
      >
        {buttons}
      </div>

      <div className="mt-12 px-5 md:px-20">
        <CreatorSteps
          currentStep={currentStep}
          stepsCompleted={stepsCompleted}
        />
      </div>

      {(() => {
        switch (currentStep) {
          case AquaCreatorStep.AQUA_SIZE_PAGE:
            return (
              <AquaSizePage
                aquariumDimensions={aquariumDimensions}
                setAquariumDimensions={setAquariumDimensions}
              />
            );

          case AquaCreatorStep.AQUA_DECOR_PAGE:
            return (
              <AquaDecorPage
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                aquariumData={aquariumData}
                setAquariumData={setAquariumData}
                tabs={tabs}
                updateTabsData={updateTabsData}
                isFreshWater={isFreshWater}
                setIsFreshWater={setIsFreshWater}
              />
            );

          case AquaCreatorStep.AQUA_LIFE_PAGE:
            return (
              <AquaLifePage
                isFreshWater={isFreshWater}
                userFishes={fishes}
                setUserFishes={setFishes}
                aquariumData={aquariumData}
              />
            );

          case AquaCreatorStep.AQUA_SUMMARY_PAGE:
            return (
              <AquaSummaryPage
                aquariumName={aquariumName}
                setAquariumName={setAquariumName}
                aquariumDimensions={aquariumDimensions}
                aquariumData={aquariumData}
                fishes={fishes}
              />
            );
          case AquaCreatorStep.AQUA_MODAL:
            return (
              <>
                <AquaSummaryPage
                  aquariumName={aquariumName}
                  setAquariumName={setAquariumName}
                  aquariumDimensions={aquariumDimensions}
                  aquariumData={aquariumData}
                  fishes={fishes}
                />
                {openDialog && (
                  <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Modal
                      title={"Aqua Friends"}
                      message={"Data saved successfully!"}
                      detailsButtonText={"Close"}
                      onDetailsClick={handleClose}
                    />
                  </div>
                )}
              </>
            );

          default:
            return null;
        }
      })()}

      <div className="md:hidden w-full mb-5 mt-5 px-5 md:px-20 md:flex md:justify-between">
        {buttons}
      </div>
    </div>
  );
}
