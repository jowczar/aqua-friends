import { TabEnum } from "@/enums/Tab.enum";
import React from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const SelectTab = ({
  currentTab,
  setCurrentTab,
}: Omit<TabsProps, "className">) => {
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
  showSuccess,
  showWarning,
  numberOfElements,
  showIconsOnly,
  showNumbersOnly,
  onClick,
  className,
}: any) => {
  const getClassName = () => {
    let baseClass = isActive
      ? "bg-primary text-white flex-grow flex-shrink"
      : "border-light text-black hover:bg-primary hover:text-white flex-grow flex-shrink";

    if (isLeft)
      return `inline-flex items-center justify-center rounded-l-lg border py-2 px-3 text-center text-sm sm:text-base font-semibold transition-all md:py-3 md:px-6 ${baseClass}`;

    if (isRight)
      return `inline-flex items-center justify-center rounded-r-lg border py-2 px-3 text-center text-sm sm:text-base font-semibold transition-all md:py-3 md:px-6 ${baseClass}`;

    return `inline-flex items-center justify-center border-y py-2 px-3 text-center text-sm sm:text-base font-semibold transition-all md:py-3 md:px-6 ${baseClass}`;
  };
  return (
    <a
      href="javascript:void(0)"
      className={`${getClassName()} ${className}`}
      onClick={onClick}
    >
      <span className="pr-2">
        {showIconsOnly && showSuccess && <FaCheckCircle className="mr-2" />}
        {showIconsOnly && showWarning && (
          <FaExclamationTriangle className="mr-2" />
        )}
        {showNumbersOnly && numberOfElements !== 0 && (
          <span className="mr-2">{numberOfElements}</span>
        )}
      </span>
      <span className="text-xs sm:text-base">{text}</span>
    </a>
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
  className: string;
};

const Tabs = ({ currentTab, setCurrentTab, className }: TabsProps) => {
  return (
    <div
      className={`inline-flex justify-center rounded-lg w-full xl:w-4/5 mx-auto ${className}`}
    >
      <div className="inline-flex w-full mb-1 sm:hidden">
        <SelectTab currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      <div className="hidden sm:inline-flex sm:w-full">
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
    </div>
  );
};

export default Tabs;
