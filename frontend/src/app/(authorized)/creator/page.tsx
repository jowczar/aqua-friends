"use client";

import { useState } from "react";
import CreatorSteps from "@/components/CreatorSteps";
import { TabEnum } from "@/enums/Tab.enum";
import AquaSizePage from "./AquaSizePage";
import AquaDecorPage from "./AquaDecorPage";
import AquaSummaryPage from "./AquaSummaryPage";
import AquaLifePage from "./AquaLifePage";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { AquaCreatorStep } from "@/enums/AquaCreatorStep.enum";

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
  pump: Equipment;
  heater: Equipment;
  light: Equipment;
  plants: Equipment[];
  decors: Equipment[];
  terrains: Equipment[];
};

export default function Creator() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepsCompleted, setStepsCompleted] = useState<number[]>([]);

  const [aquariumName, setAquariumName] = useState("✨Your new aquarium✨");

  const [openDialog, setOpenDialog] = useState(false);

  const [aquariumDimensions, setAquariumDimensions] =
    useState<AquariumDimensions>({
      length: 10,
      width: 10,
      height: 10,
    });

  const [aquariumData, setAquariumData] = useState<AquariumData>({
    pump: {
      image: "",
      name: "Pump 1",
      description: "some desc",
      value: "some",
    },
    heater: {
      image: "",
      name: "Heater 1",
      description: "some desc",
      value: "some",
    },
    light: {
      image: "",
      name: "Light 1",
      description: "some desc",
      value: "some",
    },
    plants: [
      { image: "", name: "Plant 1", description: "some desc", value: "some" },
      { image: "", name: "Plant 2", description: "some desc", value: "some" },
      { image: "", name: "Plant 3", description: "some desc", value: "some" },
    ],
    decors: [
      { image: "", name: "Decor 1", description: "some desc", value: "some" },
    ],
    terrains: [
      { image: "", name: "Terrain 1", description: "some desc", value: "some" },
    ],
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

  const handleSave = () => {
    if (currentStep !== 4) {
      setStepsCompleted([...stepsCompleted, currentStep]);
      setCurrentStep(4);
    }

    setOpenDialog(true);

    //TODO: implement saving logic and connect with api
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

  const buttons = (
    <>
      {currentStep > AquaCreatorStep.AQUA_SIZE_PAGE && (
        <button
          onClick={handlePrevious}
          className="w-full md:w-auto bg-primary inline-flex items-center justify-center rounded-md py-3 px-5 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mb-2 md:mb-0"
        >
          Previous Step
        </button>
      )}
      <div className="w-full md:w-auto">
        {currentStep < TOTAL_NUMBER_OF_STEPS - 1 && (
          <button
            onClick={handleNext}
            className="w-full bg-primary inline-flex items-center justify-center rounded-md py-3 px-5 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mb-2 md:mb-0"
          >
            Next Step
          </button>
        )}
        {stepsCompleted.length === TOTAL_NUMBER_OF_STEPS - 1 && (
          <button
            onClick={handleSave}
            className="w-full bg-green-600 inline-flex items-center justify-center rounded-md py-3 px-5 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Create your new world
          </button>
        )}
      </div>
    </>
  );

  return (
    <div>
      <div className="hidden w-full mb-5 mt-5 px-5 md:px-20 md:flex md:justify-between">
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
              />
            );

          case AquaCreatorStep.AQUA_LIFE_PAGE:
            return <AquaLifePage />;

          case AquaCreatorStep.AQUA_SUMMARY_PAGE:
            return (
              <AquaSummaryPage
                aquariumName={aquariumName}
                setAquariumName={setAquariumName}
                aquariumDimensions={aquariumDimensions}
                aquariumData={aquariumData}
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
                />
                {openDialog && (
                  <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Modal
                      title={"Aqua Friends"}
                      message={"Data saved successfully!"}
                      cancelButtonText={"Close"}
                      detailsButtonText={"I understand"}
                      onCancelClick={handleClose}
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
