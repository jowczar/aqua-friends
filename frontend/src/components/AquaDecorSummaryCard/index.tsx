type AquaDecorSummaryCardProps = {
  pump: string;
  heater: string;
  light: string;
  plants: string[];
  decors: string[];
  terrains: string[];
};

const AquaDecorSummaryCard = ({
  pump,
  heater,
  light,
  plants,
  decors,
  terrains,
}: AquaDecorSummaryCardProps) => {
  const formatArrayToString = (array: string[]) => array.join(", ");

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl  shadow-sm overflow-hidden md:max-w-lg m-4 py-4">
      <div className="text-2xl font-light text-center mt-4">Your Aquarium</div>
      <div className="md:flex">
        <div className="p-8">
          <div className="text-lg font-bold">
            Pumps: <span className="font-normal">{pump}</span>
          </div>
          <div className="text-lg font-bold mt-2">
            Heater: <span className="font-normal">{heater}</span>
          </div>
          <div className="text-lg font-bold mt-2 mb-4">
            Light: <span className="font-normal">{light}</span>
          </div>
          <div className="text-lg font-bold mt-2">
            Plants:{" "}
            <span className="font-normal">{formatArrayToString(plants)}</span>
          </div>
          <div className="text-lg font-bold mt-2">
            Decors:{" "}
            <span className="font-normal">{formatArrayToString(decors)}</span>
          </div>
          <div className="text-lg font-bold mt-2">
            Terrains:{" "}
            <span className="font-normal">{formatArrayToString(terrains)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AquaDecorSummaryCard;
