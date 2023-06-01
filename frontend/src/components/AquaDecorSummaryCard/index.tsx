import { AquariumData, Equipment } from "@/app/(authorized)/creator/page";

type AquaDecorSummaryCardProps = {
  aquariumData: AquariumData;
};

const AquaDecorSummaryCard = ({ aquariumData }: AquaDecorSummaryCardProps) => {
  const formatArrayToString = (array: string[]) => array.join(", ");

  return (
    <div className="w-full  mx-auto bg-white rounded-xl shadow-sm overflow-hidden  m-4 md:py-4">
      <div className="text-lg md:text-2xl font-light text-center mt-4">
        Your Aquarium
      </div>
      <div className="md:flex">
        <div className="p-4 md:p-8">
          <div className="flex text-sm md:text-lg font-bold gap-2">
            Pumps: <span className="font-normal">{aquariumData.pump.name}</span>
          </div>
          <div className="flex text-sm md:text-lg font-bold gap-2">
            Heater:{" "}
            <span className="font-normal">{aquariumData.heater.name}</span>
          </div>
          <div className="flex text-sm md:text-lg font-bold gap-2">
            Light:{" "}
            <span className="font-normal">{aquariumData.light.name}</span>
          </div>
          <div className="flex text-sm md:text-lg font-bold gap-2">
            Plants:{" "}
            <span className="font-normal">
              {formatArrayToString(
                aquariumData.plants.map((plant: Equipment) => plant.name)
              )}
            </span>
          </div>
          <div className="flex text-sm md:text-lg font-bold gap-2">
            Decors:{" "}
            <span className="font-normal">
              {formatArrayToString(
                aquariumData.decors.map((decor: Equipment) => decor.name)
              )}
            </span>
          </div>
          <div className="flex text-sm md:text-lg font-bold gap-2">
            Terrains:{" "}
            <span className="font-normal">
              {formatArrayToString(
                aquariumData.terrains.map((terrain: Equipment) => terrain.name)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AquaDecorSummaryCard;
