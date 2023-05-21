"use client";

import AquaDecorSummaryCard from "@/components/AquaDecorSummaryCard";
import AquaDecorDataTable from "@/components/DataTables/AquaDecorDataTable";
import { TabsProps } from "@/components/DataTables/AquaDecorDataTable/Tabs";
import { TabEnum } from "@/enums/Tab.enum";
import { useState, useEffect } from "react";

type AquaDecorPageProps = TabsProps;

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

const AquaDecorPage = ({ currentTab, setCurrentTab }: AquaDecorPageProps) => {
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
