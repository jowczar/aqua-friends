"use client";

import AquaDecorSummaryCard from "@/components/AquaDecorSummaryCard";
import CardDataTable from "@/components/DataTables/CardDataTable";
import Tabs, { TabsProps } from "@/components/Tabs";
import { useState, useEffect } from "react";
import { AquariumData } from "./page";
import Search from "@/components/Search";
import { getDecorTableData, switchDecorTableData } from "./aquaDecor.logic";
import { Water } from "@/enums/Water.enum";
import useFirestore from "@/hooks/useFirestore";

type AquaDecorPageProps = Omit<TabsProps, "className"> & {
  aquariumData: AquariumData;
  setAquariumData: React.Dispatch<React.SetStateAction<AquariumData>>;
};

export type Pump = {
  name: string;
};
export type Heater = {
  height: number;
  image: string;
  length: number;
  maxTemperature: number;
  minTemperature: number;
  name: string;
  power: number;
  water: Water;
  width: number;
};
export type Light = {
  height: number;
  image: string;
  length: number;
  name: string;
  power: number;
  water: Water;
  width: number;
};
export type Plant = {
  name: string;
};
export type Decor = {
  name: string;
};
export type Terrain = {
  name: string;
};

export type AquaItem = Pump | Heater | Light | Plant | Decor | Terrain;

const AquaDecorPage = ({
  currentTab,
  setCurrentTab,
  aquariumData,
  setAquariumData,
}: AquaDecorPageProps) => {
  const firestore = useFirestore();

  const [searchText, setSearchText] = useState("");
  const [isSingleAnswer, setIsSingleAnswer] = useState(false);

  const [pumps, setPumps] = useState<Pump[]>([]);
  const [heaters, setHeaters] = useState<Heater[]>([]);
  const [lights, setLights] = useState<Light[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [decors, setDecors] = useState<Decor[]>([]);
  const [terrains, setTerrains] = useState<Terrain[]>([]);

  useEffect(() => {
    // if (!pumps.length) getDecorTableData<Pump>(firestore, setPumps, "pumps");
    if (!heaters.length)
      getDecorTableData<Heater>(firestore, setHeaters, "heaters");
    if (!lights.length)
      getDecorTableData<Light>(firestore, setLights, "lights");
    // if (!plants.length)
    //   getDecorTableData<Plant>(firestore, setPlants, "plants");
    // if (!decors.length)
    //   getDecorTableData<Decor>(firestore, setDecors, "decors");
    // if (!terrains.length)
    //   getDecorTableData<Terrain>(firestore, setTerrains, "terrains");
  }, [decors, firestore, heaters, lights, plants, pumps, terrains]);

  const [items, setItems] = useState<AquaItem[]>(pumps);

  const setNewItems = () => {
    const newItems = switchDecorTableData(
      currentTab,
      pumps,
      heaters,
      lights,
      plants,
      decors,
      terrains
    );
    setItems(newItems.items);
    setIsSingleAnswer(newItems.isSingleAnswer);
  };

  useEffect(() => {
    if (heaters.length && lights.length) {
      setNewItems();
    }
  }, [heaters.length, lights.length, currentTab]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="md:my-10 px-5 lg:px-20 flex flex-col xl:flex-row">
      <div className="w-full xl:w-1/3 xl:pr-4 mt-4 xl:mt-0">
        <AquaDecorSummaryCard aquariumData={aquariumData} />
      </div>
      <div className="w-full xl:w-2/3 xl:pl-4">
        <div className="xl:flex xl:justify-between w-full xl:-flex-col mb-2">
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <Search className="w-full" onChange={handleSearchChange} />
        </div>
        <CardDataTable
          columnTitle={currentTab.tabName}
          isSingleAnswer={isSingleAnswer}
          items={filteredItems}
          aquariumData={aquariumData}
          setAquariumData={setAquariumData}
        />
      </div>
    </div>
  );
};

export default AquaDecorPage;
