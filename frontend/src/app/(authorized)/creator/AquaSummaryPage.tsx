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
  console.log("aquariumName", aquariumName);
  return (
    <div className="my-10 px-1 md:px-20 flex flex-col items-center">
      <input
        value={aquariumName}
        onChange={(e) => setAquariumName(e.target.value)}
        className="text-3xl font-bold bg-transparent border-none outline-none mb-2 w-1/5 text-center"
        placeholder={aquariumName}
      />
      <hr className="border-gray-300 w-1/5" />
      <p className="my-2 text-lg w-1/5 text-center">
        Length: {aquariumDimensions.length} cm, Width:{" "}
        {aquariumDimensions.width} cm, Height: {aquariumDimensions.height} cm
      </p>
      <div className="flex mt-4 w-full">
        <div className="w-1/3 pr-4">
          <ImagesSummaryCard
            title={"Equipment"}
            data={[aquariumData.pump, aquariumData.heater, aquariumData.light]}
          />
        </div>
        <div className="w-1/3 pr-4">
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
        <div className="w-1/3 pr-4">
          <ImagesSummaryCard title={"Fishes"} data={[aquariumData.pump]} />
        </div>
      </div>
    </div>
  );
};

export default AquaSummaryPage;
