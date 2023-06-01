"use client";

import ImagesSummaryCard from "@/components/ImagesSummaryCard";
import { AquariumData, AquariumDimensions } from "./page";

type AquaSummaryPageProps = {
  aquariumName: string;
  setAquariumName: React.Dispatch<React.SetStateAction<string>>;
  aquariumDimensions: AquariumDimensions;
  aquariumData: AquariumData;
};
//TODO: this page included mocks data, remove them once connected with backend
const AquaSummaryPage = ({
  aquariumName,
  setAquariumName,
  aquariumDimensions,
  aquariumData,
}: AquaSummaryPageProps) => {
  return (
    <div className="my-10 px-5 md:px-20 flex flex-col items-center">
      <input
        value={aquariumName}
        onChange={(e) => setAquariumName(e.target.value)}
        className="text-xl md:text-3xl font-bold bg-transparent border-none outline-none mb-2 w-full text-center"
        placeholder={aquariumName}
      />
      <div className="my-2 text-sm md:text-lg w-full text-center md:flex md:justify-center">
        <p className="md:mr-4">Length: {aquariumDimensions.length} cm</p>

        <p className="md:mr-4">Width: {aquariumDimensions.width} cm</p>
        <p>Height: {aquariumDimensions.height} cm</p>
      </div>
      <div className="flex flex-col xl:flex-row mt-4 w-full">
        <div className="w-full px-4 mb-4 mt-4 xl:mt-0 md:mb-0">
          <ImagesSummaryCard
            title={"Equipment"}
            data={[aquariumData.pump, aquariumData.heater, aquariumData.light]}
          />
        </div>
        <div className="w-full px-4 mb-4 md:mb-0">
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
        <div className="w-full  px-4">
          <ImagesSummaryCard title={"Fishes"} data={[aquariumData.pump]} />
        </div>
      </div>
    </div>
  );
};

export default AquaSummaryPage;
