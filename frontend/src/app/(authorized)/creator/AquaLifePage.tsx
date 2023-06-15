"use client";

import { useEffect, useState } from "react";
import useFirestore from "@/hooks/useFirestore";
import { Water } from "@/enums/Water.enum";
import { getFishData, getFishRules } from "./aquaLife.logic";
import AquaLifeCardDataTable from "@/components/DataTables/AquaLifeCardDataTable";
import AquaLifeSummaryCard from "@/components/AquaLifeSummaryCard";
import Search from "@/components/Search";
import { FishRuleSet } from "@/enums/FishRuleSet.enum";

type AquaLifePageProps = {
  isFreshWater: boolean;
  userFishes: Fish[];
  setUserFishes: React.Dispatch<React.SetStateAction<Fish[]>>;
};

export type Requirements = {
  maxKh: number;
  maxPh: number;
  minKh: number;
  minPh: number;
  minTemp: number;
  minimumTankSize: number;
  water: Water;
};

export type Fish = {
  image: string;
  name: string;
  requirements: Requirements;
  species: string;
};

export type FishCompatibility = {
  [fishName: string]: FishRuleSet;
};

export type FishRules = {
  [fishName: string]: FishCompatibility;
};

const AquaLifePage = ({
  isFreshWater,
  userFishes,
  setUserFishes,
}: AquaLifePageProps) => {
  const firestore = useFirestore();

  const [searchText, setSearchText] = useState("");

  const [allFishes, setAllFishes] = useState<Fish[]>([]);

  const [fishRules, setFishRules] = useState<FishRules>({
    fish: {
      fish: FishRuleSet.COMPATIBLE,
    },
  });

  useEffect(() => {
    getFishData(firestore, setAllFishes, isFreshWater);
    getFishRules(firestore, setFishRules, isFreshWater);
  }, [firestore, isFreshWater]);

  const filteredFishes = allFishes.filter((fish) =>
    fish.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="md:my-10 px-5 lg:px-20 flex flex-col xl:flex-row">
      <div className="w-full xl:w-1/3 xl:pr-4 mt-4 xl:mt-0">
        <AquaLifeSummaryCard fishes={userFishes} />
      </div>
      <div className="w-full xl:w-2/3 xl:pl-4">
        <div className="xl:flex xl:justify-between w-full xl:-flex-col mb-2">
          <Search className="w-full" onChange={handleSearchChange} />
        </div>
        <AquaLifeCardDataTable
          columnTitle="Fishes"
          allFishes={filteredFishes}
          userFishes={userFishes}
          setUserFishes={setUserFishes}
          itemsPerPage={5}
          fishRules={fishRules}
        />
      </div>
    </div>
  );
};

export default AquaLifePage;
