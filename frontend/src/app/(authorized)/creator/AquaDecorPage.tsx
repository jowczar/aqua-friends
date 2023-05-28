"use client";

import AquaDecorSummaryCard from "@/components/AquaDecorSummaryCard";
import CardDataTable from "@/components/DataTables/CardDataTable";
import Tabs, { TabsProps } from "@/components/Tabs";
import { TabEnum } from "@/enums/Tab.enum";
import { useState, useEffect } from "react";
import { AquariumData } from "./page";
import {
  pumpsMock,
  heatersMock,
  terrainsMock,
} from "@/components/DataTables/CardDataTable/data-mock";
import Search from "@/components/Search";

type AquaDecorPageProps = Omit<TabsProps, "className"> & {
  aquariumData: AquariumData;
};

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
    <div className="my-10 xs:px-5 lg:px-20 flex flex-col 2xl:flex-row">
      <div className="w-full 2xl:w-1/3 2xl:pr-4 mt-4 2xl:mt-0">
        <AquaDecorSummaryCard aquariumData={aquariumData} />
      </div>
      <div className="w-full 2xl:w-2/3 2xl:pl-4">
        <div className="xl:flex xl:justify-between w-full xl:-flex-col mb-2">
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <Search className="w-full" />
        </div>
        <CardDataTable
          columnTitle={currentTab.tabName}
          isSingleAnswer={isSingleAnswer}
          items={items}
        />
      </div>
    </div>
  );
};

export default AquaDecorPage;
