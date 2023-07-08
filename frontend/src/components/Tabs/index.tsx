import { TabsElements } from "@/app/(authorized)/creator/page";
import { TabEnum } from "../../enums/Tab.enum";
import React from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

type TabProps = {
  text: string;
  isLeft?: boolean;
  isRight?: boolean;
  isActive: boolean;
  shouldShowSuccess?: boolean;
  shouldShowWarning?: boolean;
  numberOfElements?: number;
  showIconsOnly?: boolean;
  showNumbersOnly?: boolean;
  onClick: () => void;
};

const Dropdown = ({
  currentTab,
  setCurrentTab,
}: Omit<TabsProps, "className" | "tabs">) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentTab((prev) => ({
      ...prev,
      tabName: event.target.value as TabEnum,
    }));
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"></div>
      <select
        value={currentTab.tabName}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {Object.values(TabEnum).map((tab) => (
          <option key={tab} value={tab}>
            {tab}
          </option>
        ))}
      </select>
    </div>
  );
};

const Tab = ({
  text,
  isLeft,
  isRight,
  isActive,
  shouldShowSuccess,
  shouldShowWarning,
  numberOfElements,
  showIconsOnly,
  showNumbersOnly,
  onClick,
}: TabProps) => {
  const getClassName = () => {
    const mainClass =
      "inline-flex items-center justify-center cursor-pointer border py-2 px-3 text-center text-sm lg:text-base font-semibold transition-all md:py-3 md:px-6";

    let baseClass = isActive
      ? "bg-primary text-white flex-grow flex-shrink"
      : "border-light text-black hover:bg-primary hover:text-white flex-grow flex-shrink";

    if (isLeft) return `${mainClass} rounded-l-lg ${baseClass}`;

    if (isRight) return `${mainClass} rounded-r-lg ${baseClass}`;

    return `${mainClass} ${baseClass}`;
  };
  return (
    <div className={`${getClassName()}`} onClick={onClick}>
      <span className="text-xs lg:text-base">{text}</span>
      <span className="pl-2">
        {showIconsOnly && shouldShowSuccess && (
          <FaCheckCircle className="text-stepsGreen" />
        )}
        {showIconsOnly && shouldShowWarning && (
          <FaExclamationTriangle className="text-red-300" />
        )}
        {showNumbersOnly && numberOfElements !== 0 && (
          <span className="text-xs lg:text-base text-blue-400">
            {numberOfElements}
          </span>
        )}
      </span>
    </div>
  );
};

export type CurrentTab = {
  tabName: TabEnum;
  numberOfElements: number;
  shouldShowSuccess: boolean;
  shouldShowWarning: boolean;
};

export type TabsProps = {
  currentTab: CurrentTab;
  setCurrentTab: React.Dispatch<React.SetStateAction<CurrentTab>>;
  tabs: TabsElements;
};

const Tabs = ({ currentTab, setCurrentTab, tabs }: TabsProps) => {
  return (
    <div
      className={`inline-flex justify-center rounded-lg w-full mx-auto mr-4`}
    >
      <div className="inline-flex w-full mb-1 sm:hidden">
        <Dropdown currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      <div className="hidden sm:inline-flex sm:w-full">
        <Tab
          text={"Pumps"}
          isLeft
          isActive={currentTab.tabName === TabEnum.PUMP}
          shouldShowSuccess={tabs.pump.shouldShowSuccess}
          shouldShowWarning={tabs.pump.shouldShowWarning}
          showIconsOnly
          onClick={() =>
            setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.PUMP }))
          }
        />

        <Tab
          text={"Heaters"}
          isActive={currentTab.tabName === TabEnum.HEATER}
          shouldShowSuccess={tabs.heater.shouldShowSuccess}
          shouldShowWarning={tabs.heater.shouldShowWarning}
          showIconsOnly
          onClick={() =>
            setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.HEATER }))
          }
        />

        <Tab
          text={"Lights"}
          isActive={currentTab.tabName === TabEnum.LIGHT}
          shouldShowSuccess={tabs.light.shouldShowSuccess}
          shouldShowWarning={tabs.light.shouldShowWarning}
          showIconsOnly
          onClick={() =>
            setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.LIGHT }))
          }
        />

        <Tab
          text={"Plants"}
          isActive={currentTab.tabName === TabEnum.PLANTS}
          numberOfElements={tabs.plants.numberOfElements}
          showNumbersOnly
          onClick={() =>
            setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.PLANTS }))
          }
        />

        <Tab
          text={"Decors"}
          isActive={currentTab.tabName === TabEnum.DECORS}
          numberOfElements={tabs.decors.numberOfElements}
          showNumbersOnly
          onClick={() =>
            setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.DECORS }))
          }
        />

        <Tab
          text={"Terrains"}
          isRight
          isActive={currentTab.tabName === TabEnum.TERRAINS}
          numberOfElements={tabs.terrains.numberOfElements}
          showNumbersOnly
          onClick={() =>
            setCurrentTab((prev) => ({ ...prev, tabName: TabEnum.TERRAINS }))
          }
        />
      </div>
    </div>
  );
};

export default Tabs;
