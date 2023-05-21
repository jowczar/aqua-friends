"use client";

import { useState } from "react";
import CreatorSteps from "@/components/CreatorSteps";
import Navbar from "@/components/Navbar";
import { TabEnum } from "@/enums/Tab.enum";
import AquaSizePage from "./AquaSizePage";
import AquaDecorPage from "./AquaDecorPage";
import AquaSummaryPage from "./AquaSummaryPage";
import AquaLifePage from "./AquaLifePage";

export type AquariumDimensions = {
  length: number;
  width: number;
  height: number;
};

export default function Creator() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepsCompleted, setStepsCompleted] = useState<number[]>([]);

  const [aquariumName, setAquariumName] = useState("");

  const [aquariumDimensions, setAquariumDimensions] =
    useState<AquariumDimensions>({
      length: 10,
      width: 10,
      height: 10,
    });

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
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
    console.log("Saved");
  };

  const [currentTab, setCurrentTab] = useState({
    tabName: TabEnum.PUMP,
    numberOfElements: 0,
    shouldShowSuccess: false,
    shouldShowWarning: false,
  });

  return (
    <div>
      <Navbar />

      <div className="mt-20 px-1 md:px-20">
        <CreatorSteps
          currentStep={currentStep}
          stepsCompleted={stepsCompleted}
        />
      </div>

      {currentStep === 0 && (
        <AquaSizePage
          aquariumDimensions={aquariumDimensions}
          setAquariumDimensions={setAquariumDimensions}
        />
      )}

      {currentStep === 1 && (
        <AquaDecorPage currentTab={currentTab} setCurrentTab={setCurrentTab} />
      )}

      {currentStep === 2 && <AquaLifePage />}

      {currentStep === 3 && <AquaSummaryPage />}

      <div className="fixed bottom-2 w-full mb-5 md:px-20">
        <div className="absolute left-20 -top-20">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="bg-primary inline-flex items-center justify-center rounded-md py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Previous Step
            </button>
          )}
        </div>
        <div className="absolute right-20 -top-20">
          {currentStep < totalSteps - 1 && (
            <button
              onClick={handleNext}
              className="bg-primary inline-flex items-center justify-center rounded-md py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Next Step
            </button>
          )}
          {stepsCompleted.length === totalSteps - 1 && (
            <button
              onClick={handleSave}
              className="bg-green-600 inline-flex items-center justify-center rounded-md py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
