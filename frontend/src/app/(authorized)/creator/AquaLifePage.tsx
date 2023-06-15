"use client";

import { useEffect, useState } from "react";
import useFirestore from "@/hooks/useFirestore";
import { Water } from "@/enums/Water.enum";
import { getFishData } from "./aquaLife.logic";
import AquaLifeCardDataTable from "@/components/DataTables/AquaLifeCardDataTable";
import AquaLifeSummaryCard from "@/components/AquaLifeSummaryCard";
import Search from "@/components/Search";

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

const AquaLifePage = ({
  isFreshWater,
  userFishes,
  setUserFishes,
}: AquaLifePageProps) => {
  const firestore = useFirestore();

  const [searchText, setSearchText] = useState("");

  const [allFishes, setAllFishes] = useState<Fish[]>([]);

  useEffect(() => {
    getFishData(firestore, setAllFishes, isFreshWater);
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
        />
      </div>
    </div>
  );
};

export default AquaLifePage;
