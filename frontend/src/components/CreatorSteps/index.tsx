import React from "react";

type StepsProps = {
  currentStep: number;
  stepsCompleted: number[];
};

const Steps = ({ currentStep, stepsCompleted }: StepsProps) => {
  const steps = ["Aqua Size", "Aqua Decor", "Aqua Life", "Summary"];

  const getLastStepClass = () => {
    if (currentStep === 3) return "bg-blue-500";
    if (currentStep === 4) return "bg-stepsGreen";
    return "bg-gray-300";
  };

  return (
    <>
      <div className="py-5 w-2/3 mx-auto relative">
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div
                className={`${
                  stepsCompleted.includes(index) || currentStep === 4
                    ? "bg-stepsGreen text-white"
                    : index === currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-500"
                } w-20 h-20 mx-auto rounded-full flex items-center justify-center z-10 text-2xl relative`}
              >
                {index + 1}
              </div>
              <div className="text-lg mt-2">{step}</div>
            </div>
          ))}
          <div
            className={`absolute top-14 left-firstStep w-1/3 h-1 ${
              currentStep > 0
                ? currentStep === 1
                  ? "bg-blue-500"
                  : "bg-stepsGreen"
                : "bg-gray-300"
            } z-0`}
          />
          <div
            className={`absolute top-14 left-1/3 w-1/3 h-1 ${
              currentStep > 1 || stepsCompleted.includes(1)
                ? currentStep === 2
                  ? "bg-blue-500"
                  : "bg-stepsGreen"
                : "bg-gray-300"
            } z-0`}
          />
          <div
            className={`absolute top-14 left-2/3 w-lastStep h-1 ${getLastStepClass()} z-0`}
          />
        </div>
      </div>

      <div className="border-t-2 border-gray-200 border-opacity-50"></div>
    </>
  );
};

export default Steps;
