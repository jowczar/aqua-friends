import { TabEnum } from "@/enums/Tab.enum";
import React, { useState } from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const Tab = ({
  text,
  isLeft,
  isRight,
  isActive,
  showSuccess,
  showWarning,
  numberOfElements,
  showIconsOnly,
  showNumbersOnly,
  onClick,
}: any) => {
  const getClassName = () => {
    let baseClass = isActive
      ? "bg-primary  text-white"
      : "border-light text-black hover:bg-primary hover:text-white";

    if (isLeft)
      return `inline-flex items-center justify-center rounded-l-lg border py-[10px] px-[12px] text-center text-base font-semibold transition-all sm:py-3 sm:px-6 ${baseClass}`;

    if (isRight)
      return `inline-flex items-center justify-center rounded-r-lg border py-[10px] px-[12px] text-center text-sm font-semibold transition-all sm:py-3 sm:px-6 sm:text-base ${baseClass}`;

    return `inline-flex items-center justify-center border-y py-[10px] px-[12px] text-center text-sm font-semibold transition-all sm:py-3 sm:px-6 sm:text-base ${baseClass}`;
  };

  return (
    <a href="javascript:void(0)" className={getClassName()} onClick={onClick}>
      <span className="pr-2">
        {showIconsOnly && showSuccess && <FaCheckCircle className="mr-2" />}
        {showIconsOnly && showWarning && (
          <FaExclamationTriangle className="mr-2" />
        )}
        {showNumbersOnly && numberOfElements !== 0 && (
          <span className="mr-2">{numberOfElements}</span>
        )}
      </span>
      {text}
    </a>
  );
};

type CurrentTab = {
  tabName: TabEnum;
  numberOfElements: number;
  shouldShowSuccess: boolean;
  shouldShowWarning: boolean;
};

type TabsProps = {
  currentTab: CurrentTab;
  setCurrentTab: React.Dispatch<React.SetStateAction<CurrentTab>>;
};

const Tabs = ({ currentTab, setCurrentTab }: TabsProps) => {
  return (
    <div className="inline-flex rounded-lg">
      <Tab
        text={"Pumps"}
        isLeft
        isActive={currentTab.tabName === TabEnum.PUMP}
        shouldShowSuccess={currentTab.shouldShowSuccess}
        shouldShowWarning={currentTab.shouldShowWarning}
        showIconOnly
        onClick={() =>
          setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.PUMP }))
        }
      />

      <Tab
        text={"Heaters"}
        isActive={currentTab.tabName === TabEnum.HEATER}
        shouldShowSuccess={currentTab.shouldShowSuccess}
        shouldShowWarning={currentTab.shouldShowWarning}
        showIconOnly
        onClick={() =>
          setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.HEATER }))
        }
      />

      <Tab
        text={"Lights"}
        isActive={currentTab.tabName === TabEnum.LIGHT}
        shouldShowSuccess={currentTab.shouldShowSuccess}
        shouldShowWarning={currentTab.shouldShowWarning}
        showIconOnly
        onClick={() =>
          setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.LIGHT }))
        }
      />

      <Tab
        text={"Plants"}
        isActive={currentTab.tabName === TabEnum.PLANTS}
        numberOfElements={currentTab.numberOfElements}
        showNumbersOnly
        onClick={() =>
          setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.PLANTS }))
        }
      />

      <Tab
        text={"Decors"}
        isActive={currentTab.tabName === TabEnum.DECORS}
        numberOfElements={currentTab.numberOfElements}
        showNumbersOnly
        onClick={() =>
          setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.DECORS }))
        }
      />

      <Tab
        text={"Terrains"}
        isRight
        isActive={currentTab.tabName === TabEnum.TERRAINS}
        numberOfElements={currentTab.numberOfElements}
        showNumbersOnly
        onClick={() =>
          setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.TERRAINS }))
        }
      />
    </div>
  );
};

export default Tabs;
