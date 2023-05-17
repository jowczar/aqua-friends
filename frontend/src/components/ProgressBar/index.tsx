import { Unit } from "@/enums/Unit.enum";
import React, { useState } from "react";

type ProgressBarProps = {
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
  const handleIncrement = () => {
    console.log("element to", element);

    if (element < max) setElement(element + 1);
  };

  const handleDecrement = () => {
    if (element > min) setElement(element - 1);
  };

  const progressPercentage = ((element - min) / (max - min)) * 100;

  return (
    <div className="w-[80%] mx-auto my-6 flex items-center">
      <button onClick={handleDecrement} className="mr-4">
        <svg
          width="20"
          height="20"
          viewBox="0 0 8 15"
          className="fill-current stroke-current"
        >
          <path
            d="M7.12979 1.91389L7.1299 1.914L7.1344 1.90875C7.31476 1.69833 7.31528 1.36878 7.1047 1.15819C7.01062 1.06412 6.86296 1.00488 6.73613 1.00488C6.57736 1.00488 6.4537 1.07206 6.34569 1.18007L6.34564 1.18001L6.34229 1.18358L0.830207 7.06752C0.830152 7.06757 0.830098 7.06763 0.830043 7.06769C0.402311 7.52078 0.406126 8.26524 0.827473 8.73615L0.827439 8.73618L0.829982 8.73889L6.34248 14.6014L6.34243 14.6014L6.34569 14.6047C6.546 14.805 6.88221 14.8491 7.1047 14.6266C7.30447 14.4268 7.34883 14.0918 7.12833 13.8693L1.62078 8.01209C1.55579 7.93114 1.56859 7.82519 1.61408 7.7797L1.61413 7.77975L1.61729 7.77639L7.12979 1.91389Z"
            stroke-width="0.5"
          ></path>
        </svg>
      </button>
      <div className="w-full relative">
        <div className="w-full bg-light h-[13px] rounded-2xl relative">
          <div
            className="bg-primary absolute h-full left-0 rounded-2xl"
            style={{ width: `${progressPercentage}%` }}
          >
            <span className="bg-primary absolute -right-4 bottom-full mb-2 rounded-sm py-1 px-4 text-m font-semibold text-white flex items-center justify-center">
              <span className="bg-primary absolute bottom-[-2px] left-1/2 -z-10 h-5 w-5 -translate-x-1/2 rotate-45 rounded-sm"></span>
              {element} <span className="ml-1">{unit}</span>
            </span>
          </div>
        </div>
        <span className="absolute top-[-70px] font-bold text-xl">{title}</span>
      </div>
      <button onClick={handleIncrement} className="ml-4">
        <svg
          width="20"
          height="20"
          viewBox="0 0 8 15"
          className="fill-current stroke-current"
        >
          <path
            d="M0.870212 13.0861L0.870097 13.086L0.865602 13.0912C0.685237 13.3017 0.684716 13.6312 0.895299 13.8418C0.989374 13.9359 1.13704 13.9951 1.26387 13.9951C1.42264 13.9951 1.5463 13.9279 1.65431 13.8199L1.65436 13.82L1.65771 13.8164L7.16979 7.93248C7.16985 7.93243 7.1699 7.93237 7.16996 7.93231C7.59769 7.47923 7.59387 6.73477 7.17253 6.26385L7.17256 6.26382L7.17002 6.26111L1.65752 0.398611L1.65757 0.398563L1.65431 0.395299C1.454 0.194997 1.11779 0.150934 0.895299 0.373424C0.695526 0.573197 0.651169 0.908167 0.871667 1.13067L6.37922 6.98791C6.4442 7.06886 6.43141 7.17481 6.38592 7.2203L6.38587 7.22025L6.38271 7.22361L0.870212 13.0861Z"
            stroke-width="0.5"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ProgressBar;