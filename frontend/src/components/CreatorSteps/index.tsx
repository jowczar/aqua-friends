"use client";
import { AquaCreatorStep } from "@/enums/AquaCreatorStep.enum";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type StepsProps = {
  currentStep: number;
  stepsCompleted: number[];
};

const Steps = ({ currentStep, stepsCompleted }: StepsProps) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [selectedStep, setSelectedStep] = useState(currentStep);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentStep !== selectedStep) {
      setTimeout(() => {
        setSelectedStep(currentStep);
      }, 200);
    }
  }, [currentStep]);

  const steps = ["Aqua Size", "Aqua Decor", "Aqua Life", "Summary"];

  const getLastStepClass = () => {
    if (currentStep === AquaCreatorStep.AQUA_SUMMARY_PAGE) return "bg-blue-500";
    if (currentStep === AquaCreatorStep.AQUA_MODAL) return "bg-stepsGreen";
    return "bg-gray-300";
  };

  const MobileViewCreatorSteps = () => {
    return (
      <>
        <div className="py-2 w-full mx-auto">
          <Carousel
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            selectedItem={selectedStep}
            swipeable={false}
          >
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-28 h-28 mx-auto rounded-full ${
                    stepsCompleted.includes(index) ||
                    currentStep === AquaCreatorStep.AQUA_MODAL
                      ? "bg-stepsGreen text-white"
                      : index === currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  } flex items-center justify-center text-2xl`}
                >
                  {index + 1}
                </div>
                <div className="text-lg mt-4">{step}</div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="border-t-2 mt-2 border-gray-200 border-opacity-50"></div>
      </>
    );
  };

  const FullScreenCreatorSteps = () => {
    return (
      <>
        <div className="py-5 w-2/3 mx-auto relative">
          <div className="flex justify-between items-center mb-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className={`${
                    stepsCompleted.includes(index) ||
                    currentStep === AquaCreatorStep.AQUA_MODAL
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
              className={`absolute top-14 left-[5%] w-1/3 h-1 ${
                currentStep > AquaCreatorStep.AQUA_SIZE_PAGE
                  ? currentStep === AquaCreatorStep.AQUA_DECOR_PAGE
                    ? "bg-blue-500"
                    : "bg-stepsGreen"
                  : "bg-gray-300"
              } z-0`}
            />
            <div
              className={`absolute top-14 left-1/3 w-1/3 h-1 ${
                currentStep > AquaCreatorStep.AQUA_DECOR_PAGE ||
                stepsCompleted.includes(AquaCreatorStep.AQUA_DECOR_PAGE)
                  ? currentStep === AquaCreatorStep.AQUA_LIFE_PAGE
                    ? "bg-blue-500"
                    : "bg-stepsGreen"
                  : "bg-gray-300"
              } z-0`}
            />
            <div
              className={`absolute top-14 left-2/3 w-[31.5%] h-1 ${getLastStepClass()} z-0`}
            />
          </div>
        </div>

        <div className="border-t-2 border-gray-200 border-opacity-50"></div>
      </>
    );
  };

  if (windowWidth < 768) return <MobileViewCreatorSteps />;

  return <FullScreenCreatorSteps />;
};

export default Steps;
