"use client";

import { useState } from "react";
import CreatorSteps from "@/components/CreatorSteps";
import ProgressBar from "@/components/ProgressBar";
import { Unit } from "@/enums/Unit.enum";
import AquaLifeDataTable from "@/components/DataTables/AquaLifeDataTable";
import Summary from "@/components/Summary";
import AquaDecorSummaryCard from "@/components/AquaDecorSummaryCard";
import Tabs from "@/components/DataTables/AquaDecorDataTable/Tabs";
import AquaDecorDataTable from "@/components/DataTables/AquaDecorDataTable";
import { TabEnum } from "@/enums/Tab.enum";

type AquariumDimensions = {
  length: number;
  width: number;
  height: number;
};

type ProgressBarPageProps = {
  aquariumDimensions: AquariumDimensions;
  setAquariumDimensions: React.Dispatch<
    React.SetStateAction<AquariumDimensions>
  >;
};

const ProgressBarsPage = ({
  aquariumDimensions,
  setAquariumDimensions,
}: ProgressBarPageProps) => {
  return (
    <>
      <div className="my-40 px-1 md:px-20">
        <ProgressBar
          title={"Aquarium Length"}
          min={10}
          max={200}
          unit={Unit.CENTIMETER}
          element={aquariumDimensions.length}
          setElement={(newValue: number) =>
            setAquariumDimensions((prev) => ({ ...prev, length: newValue }))
          }
        />
      </div>

      <div className="my-60 px-1 md:px-20">
        <ProgressBar
          title={"Aquarium Width"}
          min={10}
          max={200}
          unit={Unit.CENTIMETER}
          element={aquariumDimensions.width}
          setElement={(newValue: number) =>
            setAquariumDimensions((prev) => ({ ...prev, width: newValue }))
          }
        />
      </div>

      <div className="my-60 px-1 md:px-20">
        <ProgressBar
          title={"Aquarium Height"}
          min={10}
          max={200}
          unit={Unit.CENTIMETER}
          element={aquariumDimensions.height}
          setElement={(newValue: number) =>
            setAquariumDimensions((prev) => ({ ...prev, height: newValue }))
          }
        />
      </div>
    </>
  );
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

  const columnTitles = {
    firstColumn: "Product",
    secondColumn: "Size",
    thirdColumn: "Environment",
  };

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
      <div className="mt-20 px-1 md:px-20">
        <CreatorSteps
          currentStep={currentStep}
          stepsCompleted={stepsCompleted}
        />
      </div>

      {currentStep === 0 && (
        <ProgressBarsPage
          aquariumDimensions={aquariumDimensions}
          setAquariumDimensions={setAquariumDimensions}
        />
      )}

      {currentStep === 1 && (
        <div className="my-10 px-1 md:px-20 flex">
          <div className="w-1/3 pr-4">
            <AquaDecorSummaryCard
              pump={"[pump"}
              heater={"heater"}
              light={"light"}
              plants={[
                "some plant",
                "ok its plant",
                "does it return some hp?",
                "what if no?",
              ]}
              decors={[
                "some decor",
                "next decor",
                "test decor",
                "omg what a decor",
                "is this a decor?",
              ]}
              terrains={[
                "some terrain",
                "next terrain",
                "but this terrrrrain is kinda big",
                "as all things should be",
                "man what are you saying",
                "stop being so dumb",
                "its not a balenciaga anymore, its movie about harry squatter",
              ]}
            />
          </div>
          <div className="w-2/3 pl-4 pr-20">
            <AquaDecorDataTable
              columnTitles={{
                firstColumn: "Testowy",
                secondColumn: "Drugi",
                thirdColumn: "",
              }}
              isSingleAnswer={false}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="my-10 px-1 md:px-20">
          <AquaLifeDataTable columnTitles={columnTitles} />
        </div>
      )}

      {currentStep === 3 && (
        <div className="my-10 px-1 md:px-20 flex">
          <div className="w-1/3 pr-4">
            <AquaDecorSummaryCard
              pump={"[pump"}
              heater={"heater"}
              light={"light"}
              plants={[
                "some plant",
                "ok its plant",
                "does it return some hp?",
                "what if no?",
              ]}
              decors={[
                "some decor",
                "next decor",
                "test decor",
                "omg what a decor",
                "is this a decor?",
              ]}
              terrains={[
                "some terrain",
                "next terrain",
                "but this terrrrrain is kinda big",
                "as all things should be",
                "man what are you saying",
                "stop being so dumb",
                "its not a balenciaga anymore, its movie about harry squatter",
              ]}
            />
          </div>
          <div className="w-1/3 pr-4">
            <AquaDecorSummaryCard
              pump={"[pump"}
              heater={"heater"}
              light={"light"}
              plants={[
                "some plant",
                "ok its plant",
                "does it return some hp?",
                "what if no?",
              ]}
              decors={[
                "some decor",
                "next decor",
                "test decor",
                "omg what a decor",
                "is this a decor?",
              ]}
              terrains={[
                "some terrain",
                "next terrain",
                "but this terrrrrain is kinda big",
                "as all things should be",
                "man what are you saying",
                "stop being so dumb",
                "its not a balenciaga anymore, its movie about harry squatter",
              ]}
            />
          </div>
          <div className="w-1/3 pr-4">
            <AquaDecorSummaryCard
              pump={"[pump"}
              heater={"heater"}
              light={"light"}
              plants={[
                "some plant",
                "ok its plant",
                "does it return some hp?",
                "what if no?",
              ]}
              decors={[
                "some decor",
                "next decor",
                "test decor",
                "omg what a decor",
                "is this a decor?",
              ]}
              terrains={[
                "some terrain",
                "next terrain",
                "but this terrrrrain is kinda big",
                "as all things should be",
                "man what are you saying",
                "stop being so dumb",
                "its not a balenciaga anymore, its movie about harry squatter",
              ]}
            />
          </div>
        </div>
      )}

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
