"use client";

import AquaDecorSummaryCard from "@/components/AquaDecorSummaryCard";
import CardDataTable from "@/components/DataTables/CardDataTable";
import Tabs, { TabsProps } from "@/components/Tabs";
import { useState, useEffect } from "react";
import { AquariumData, TabElement, TabsElements } from "./page";
import Search from "@/components/Search";
import { getDecorTableData, switchDecorTableData } from "./aquaDecor.logic";
import { Water } from "@/enums/Water.enum";
import useFirestore from "@/hooks/useFirestore";
import Switch from "@/components/Switch";

type AquaDecorPageProps = Omit<TabsProps, "className"> & {
  aquariumData: AquariumData;
  setAquariumData: React.Dispatch<React.SetStateAction<AquariumData>>;
  updateTabsData: (newCurrentTab: TabElement) => void;
  tabs: TabsElements;
  isFreshWater: boolean;
  setIsFreshWater: React.Dispatch<React.SetStateAction<boolean>>;
};

export type BasicAquariumItem = {
  name: string;
  image: string;
  water: Water;
};

export type DimensionalAquariumItem = BasicAquariumItem & {
  height: number;
  length: number;
  width: number;
};

export type PoweredAquariumItem = DimensionalAquariumItem & {
  power: number;
};

export type Pump = PoweredAquariumItem & {
  lph: number;
};

export type Heater = PoweredAquariumItem & {
  maxTemperature: number;
  minTemperature: number;
};

export type Light = PoweredAquariumItem;
export type Plant = BasicAquariumItem;
export type Decor = DimensionalAquariumItem;
export type Terrain = BasicAquariumItem;

export type AquaItem = Pump | Heater | Light | Plant | Decor | Terrain;

const AquaDecorPage = ({
  currentTab,
  setCurrentTab,
  aquariumData,
  setAquariumData,
  tabs,
  updateTabsData,
  isFreshWater,
  setIsFreshWater,
}: AquaDecorPageProps) => {
  const firestore = useFirestore();

  const [searchText, setSearchText] = useState("");

  const [pumps, setPumps] = useState<Pump[]>([]);
  const [heaters, setHeaters] = useState<Heater[]>([]);
  const [lights, setLights] = useState<Light[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [saltWaterPlants, setSaltWaterPlants] = useState<Plant[]>([]);
  const [freshWaterPlants, setFreshWaterPlants] = useState<Plant[]>([]);
  const [decors, setDecors] = useState<Decor[]>([]);
  const [terrains, setTerrains] = useState<Terrain[]>([]);

  useEffect(() => {
    if (!pumps.length) getDecorTableData<Pump>(firestore, setPumps, "pumps");
    if (!heaters.length)
      getDecorTableData<Heater>(firestore, setHeaters, "heaters");
    if (!lights.length)
      getDecorTableData<Light>(firestore, setLights, "lights");
    if (!saltWaterPlants.length)
      getDecorTableData<Plant>(
        firestore,
        setSaltWaterPlants,
        "saltwater_plants"
      );
    if (!freshWaterPlants.length) {
      getDecorTableData<Plant>(
        firestore,
        setFreshWaterPlants,
        "freshwater_plants"
      );
    }
    if (!decors.length)
      getDecorTableData<Decor>(firestore, setDecors, "decors");
    if (!terrains.length)
      getDecorTableData<Terrain>(firestore, setTerrains, "terrains");
  }, [
    decors,
    firestore,
    heaters,
    lights,
    saltWaterPlants,
    freshWaterPlants,
    pumps,
    terrains,
  ]);

  useEffect(() => {
    setPlants(isFreshWater ? freshWaterPlants : saltWaterPlants);
  }, [isFreshWater, freshWaterPlants, saltWaterPlants]);

  const [items, setItems] = useState<AquaItem[]>(pumps);

  const setNewItems = () => {
    let newItems = switchDecorTableData(
      currentTab,
      pumps,
      heaters,
      lights,
      plants,
      decors,
      terrains
    );

    newItems.items = newItems.items.filter((item: AquaItem) => {
      if (item.water === Water.BOTH) return true;

      return isFreshWater
        ? item.water === Water.FRESHWATER
        : item.water === Water.SALTWATER;
    });

    setItems(newItems.items);
  };

  useEffect(() => {
    if (
      heaters.length &&
      lights.length &&
      pumps.length &&
      decors.length &&
      terrains.length &&
      freshWaterPlants.length &&
      saltWaterPlants.length
    ) {
      setNewItems();
    }
  }, [
    currentTab,
    decors.length,
    heaters.length,
    lights.length,
    pumps.length,
    terrains.length,
    freshWaterPlants.length,
    saltWaterPlants.length,
    isFreshWater,
    plants,
  ]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const updateTabs = () => {
    let numberOfElements = 0;
    let currentData = aquariumData[currentTab.tabName.toLowerCase()];

    if (Array.isArray(currentData)) {
      numberOfElements = ["plants", "decors", "terrains"].includes(
        currentTab.tabName.toLowerCase()
      )
        ? currentData.length
        : 0;
    }

    const shouldShowSuccess =
      ["pump", "heater", "light"].includes(currentTab.tabName.toLowerCase()) &&
      (currentData as AquaItem).name
        ? true
        : false;

    const shouldShowWarning =
      shouldShowSuccess === false ? !shouldShowSuccess : false;

    updateTabsData({
      ...currentTab,
      numberOfElements,
      shouldShowSuccess,
      shouldShowWarning,
    });
  };

  useEffect(() => {
    updateTabs();
  }, [aquariumData]);

  return (
    <div className="md:my-10 px-5 lg:px-20 flex flex-col xl:flex-row">
      <div className="w-full xl:w-1/3 xl:pr-4 mt-4 xl:mt-0">
        <Switch
          setView={setIsFreshWater}
          firstText="Fresh water"
          secondText="Salt water"
        />
        <AquaDecorSummaryCard aquariumData={aquariumData} />
      </div>
      <div className="w-full xl:w-2/3 xl:pl-4">
        <div className="xl:flex xl:justify-between w-full xl:-flex-col mb-2">
          <Tabs
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            tabs={tabs}
          />
          <Search className="w-full" onChange={handleSearchChange} />
        </div>
        <CardDataTable
          columnTitle={currentTab.tabName}
          items={filteredItems}
          aquariumData={aquariumData}
          setAquariumData={setAquariumData}
        />
      </div>
    </div>
  );
};

export default AquaDecorPage;
