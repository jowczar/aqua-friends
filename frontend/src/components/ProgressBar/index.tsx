import { Unit } from "@/enums/Unit.enum";
import Image from "next/image";
import React, { useRef, useState } from "react";

export type ProgressBarProps = {
  title: string;
  min: number;
  max: number;
  unit: Unit;
  element: number;
  setElement: (newValue: number) => void;
};

const ProgressBar = ({
  title,
  min,
  max,
  unit,
  element,
  setElement,
}: ProgressBarProps) => {
  const GEHProgressBarRef = useRef<HTMLDivElement | null>(null);
  const blueProgressBarRef = useRef<HTMLDivElement | null>(null);

  const changePercentageOfBlueProgressBar = (value: number) => {
    const progressPercentage = ((value - min) / (max - min)) * 100;

    if (!blueProgressBarRef.current) return;

    blueProgressBarRef.current.style.width = progressPercentage + "%";
  };

  const handleIncrement = () => {
    if (element < max) {
      const newValue = element + 1;
      setElement(newValue);
      changePercentageOfBlueProgressBar(newValue);
    }
  };

  const handleDecrement = () => {
    if (element > min) {
      const newValue = element - 1;
      setElement(newValue);
      changePercentageOfBlueProgressBar(newValue);
    }
  };

  const handleClickProgressBar = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!GEHProgressBarRef.current) return;

    const rect = GEHProgressBarRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const clickedPercentage = (x / rect.width) * 100;

    const newValue = Math.round(((max - min) * clickedPercentage) / 100 + min);

    setElement(newValue);

    changePercentageOfBlueProgressBar(newValue);
  };

  return (
    <div className="w-[80%] mx-auto my-6 flex items-center">
      <button onClick={handleDecrement} className="mr-4">
        <Image
          src={"left-arrow-aqua-creator.svg"}
          alt="Left arrow"
          height={25}
          width={25}
        />
      </button>

      <div className="w-full relative">
        <div className="w-full bg-light h-[13px] rounded-2xl relative">
          <div
            ref={GEHProgressBarRef}
            className="bg-gray-200 absolute h-full left-0 rounded-2xl w-full cursor-pointer"
            onClick={handleClickProgressBar}
          />
          <div
            ref={blueProgressBarRef}
            className={`bg-primary absolute h-full left-0 rounded-2xl w-0 cursor-pointer`}
            onClick={handleClickProgressBar}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="cursor-default"
            >
              <span className="bg-primary absolute -right-12 bottom-full mb-2 rounded-sm py-1 px-4 text-m font-semibold text-white flex items-center justify-center">
                <span className="bg-primary absolute bottom-[-2px] left-1/2 -z-10 h-5 w-5 -translate-x-1/2 rotate-45 rounded-sm" />

                <div className="appearance-none bg-primary  bottom-full  rounded-sm py-1  text-m font-semibold text-white flex items-center justify-center">
                  {element}
                </div>

                <span className="ml-1">{unit}</span>
              </span>
            </div>
          </div>
        </div>
        <span className="absolute top-[-90px] font-bold text-xl">{title}</span>
      </div>

      <button onClick={handleIncrement} className="ml-4">
        <Image
          src={"right-arrow-aqua-creator.svg"}
          alt="Right arrow"
          height={25}
          width={25}
        />
      </button>
    </div>
  );
};

export default ProgressBar;
