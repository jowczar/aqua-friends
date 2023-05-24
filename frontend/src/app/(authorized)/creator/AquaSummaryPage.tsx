"use client";

import ImagesSummaryCard from "@/components/ImagesSummaryCard";
import { AquariumData, AquariumDimensions } from "./page";
import { useState } from "react";

type AquaSummaryPageProps = {
  aquariumName: string;
  setAquariumName: React.Dispatch<React.SetStateAction<string>>;
  aquariumDimensions: AquariumDimensions;
  aquariumData: AquariumData;
};

const AquaSummaryPage = ({
  aquariumName,
  setAquariumName,
  aquariumDimensions,
  aquariumData,
}: AquaSummaryPageProps) => {
  return (
    <div className="my-10 px-1 md:px-20 flex flex-col items-center">
      <input
        value={aquariumName}
        onChange={(e) => setAquariumName(e.target.value)}
        className="text-3xl font-bold bg-transparent border-none outline-none mb-2 w-4/5 md:w-2/5 text-center"
        placeholder={aquariumName}
      />
      <hr className="border-gray-300 w-4/5 md:w-1/5" />
      <div className="my-2 text-lg w-4/5 md:w-2/5 text-center md:flex md:justify-center">
        <p className="md:mr-4">Length: {aquariumDimensions.length} cm</p>

        <p className="md:mr-4">Width: {aquariumDimensions.width} cm</p>
        <p>Height: {aquariumDimensions.height} cm</p>
      </div>
      <div className="flex flex-col md:flex-row mt-4 w-full">
        <div className="w-full md:w-1/3 pr-4 mb-4 md:mb-0">
          <ImagesSummaryCard
            title={"Equipment"}
            data={[aquariumData.pump, aquariumData.heater, aquariumData.light]}
          />
        </div>
        <div className="w-full md:w-1/3 pr-4 mb-4 md:mb-0">
          <ImagesSummaryCard
            title={"Environment"}
            data={[
              ...aquariumData.plants,
              ...aquariumData.plants,
              ...aquariumData.terrains,
              ...aquariumData.decors,
            ]}
          />
        </div>
        <div className="w-full md:w-1/3 pr-4">
          <ImagesSummaryCard title={"Fishes"} data={[aquariumData.pump]} />
        </div>
      </div>
    </div>
  );
};

export default AquaSummaryPage;
