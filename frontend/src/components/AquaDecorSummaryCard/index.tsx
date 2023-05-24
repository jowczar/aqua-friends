type AquaDecorSummaryCardProps = {
  aquariumData: any;
};

const AquaDecorSummaryCard = ({ aquariumData }: AquaDecorSummaryCardProps) => {
  const formatArrayToString = (array: string[]) => array.join(", ");

  return (
    <div className="w-full  2xl:max-w-full mx-auto bg-white rounded-xl shadow-sm overflow-hidden  m-4 py-4">
      <div className="text-2xl font-light text-center mt-4">Your Aquarium</div>
      <div className="md:flex">
        <div className="p-8">
          <div className="text-lg font-bold">
            Pumps: <span className="font-normal">{aquariumData.pump.name}</span>
          </div>
          <div className="text-lg font-bold mt-2">
            Heater:{" "}
            <span className="font-normal">{aquariumData.heater.name}</span>
          </div>
          <div className="text-lg font-bold mt-2 mb-4">
            Light:{" "}
            <span className="font-normal">{aquariumData.light.name}</span>
          </div>
          <div className="text-lg font-bold mt-2">
            Plants:{" "}
            <span className="font-normal">
              {formatArrayToString(
                aquariumData.plants.map((plant: any) => plant.name)
              )}
            </span>
          </div>
          <div className="text-lg font-bold mt-2">
            Decors:{" "}
            <span className="font-normal">
              {formatArrayToString(
                aquariumData.decors.map((decor: any) => decor.name)
              )}
            </span>
          </div>
          <div className="text-lg font-bold mt-2">
            Terrains:{" "}
            <span className="font-normal">
              {formatArrayToString(
                aquariumData.terrains.map((terrain: any) => terrain.name)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AquaDecorSummaryCard;
