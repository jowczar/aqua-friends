"use client";

import AquaDecorSummaryCard from "@/components/AquaDecorSummaryCard";
import AquaDecorDataTable from "@/components/DataTables/AquaDecorDataTable";
import { TabsProps } from "@/components/DataTables/AquaDecorDataTable/Tabs";
import { TabEnum } from "@/enums/Tab.enum";
import { useState, useEffect } from "react";

type AquaDecorPageProps = Omit<TabsProps, "className"> & {
  aquariumData: any;
};

const terrainsMock = [
  {
    image: "",
    name: "Terrain 1",
    description: "description of terrain",
    value: "someValue",
  },
  {
    image: "",
    name: "Terrain 1",
    description: "description of terrain",
    value: "someValue",
  },
  {
    image: "",
    name: "Terrain 1",
    description: "description of terrain",
    value: "someValue",
  },
  {
    image: "",
    name: "Terrain 1",
    description: "description of terrain",
    value: "someValue",
  },
];

const pumpsMock = [
  {
    image: "",
    name: "Pump 1",
    description: "description of pumps",
    value: "someValue",
  },
  {
    image: "",
    name: "Pump 1",
    description: "description of pumps",
    value: "someValue",
  },
  {
    image: "",
    name: "Pump 1",
    description: "description of pumps",
    value: "someValue",
  },
  {
    image: "",
    name: "Pump 1",
    description: "description of pumps",
    value: "someValue",
  },
];

const heatersMock = [
  {
    image: "",
    name: "Heater 1",
    description: "description of heater",
    value: "someValue",
  },
  {
    image: "",
    name: "Heater 1",
    description: "description of heater",
    value: "someValue",
  },
  {
    image: "",
    name: "Heater 1",
    description: "description of heater",
    value: "someValue",
  },
  {
    image: "",
    name: "Heater 1",
    description: "description of heater",
    value: "someValue",
  },
];

const AquaDecorPage = ({
  currentTab,
  setCurrentTab,
  aquariumData,
}: AquaDecorPageProps) => {
  const [items, setItems] = useState(pumpsMock);
  const [isSingleAnswer, setIsSingleAnswer] = useState(false);

  const setNewItems = () => {
    if (currentTab.tabName === TabEnum.PUMP) {
      setItems(pumpsMock);
      setIsSingleAnswer(true);
    }

    if (currentTab.tabName === TabEnum.HEATER) {
      setItems(heatersMock);
      setIsSingleAnswer(true);
    }

    if (currentTab.tabName === TabEnum.TERRAINS) {
      setItems(terrainsMock);
      setIsSingleAnswer(false);
    }
  };

  useEffect(() => {
    setNewItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  return (
    <div className="my-10 xs:px-5 sm:px-20 flex flex-col 2xl:flex-row">
      <div className="w-full 2xl:w-1/3 2xl:pr-4 mt-4 2xl:mt-0">
        <AquaDecorSummaryCard aquariumData={aquariumData} />
      </div>
      <div className="w-full 2xl:w-2/3 2xl:pl-4">
        <AquaDecorDataTable
          columnTitle={currentTab.tabName}
          isSingleAnswer={isSingleAnswer}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          items={items}
        />
      </div>
    </div>
  );
};

export default AquaDecorPage;
