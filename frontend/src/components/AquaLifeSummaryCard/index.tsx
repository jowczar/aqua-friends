import { Fish } from "@/app/(authorized)/creator/AquaLifePage";

type AquaLifeSummaryCardProps = {
  fishes: Fish[];
};

const AquaLifeSummaryCard = ({ fishes }: AquaLifeSummaryCardProps) => {
  const formatArrayToString = (array: string[]) => array?.join(", ");

  console.log("fishes", fishes);

  return (
    <div className="w-full  mx-auto bg-white rounded-xl shadow-sm overflow-hidden  m-4 md:py-4">
      <div className="text-lg md:text-2xl font-light text-center mt-4">
        Your Aquarium
      </div>
      <div className="md:flex">
        <div className="p-4 md:p-8">
          <div className="flex text-sm md:text-lg font-bold gap-2">
            Fishes:{" "}
            <span className="font-normal">
              {formatArrayToString(
                fishes?.map((fish: Fish) => `${fish?.name} [${fish?.amount}]`)
              )}
            </span>
          </div>
          <div className="flex text-sm md:text-lg font-bold gap-2">
            Species:{" "}
            <span className="font-normal">
              {formatArrayToString(
                Array.from(new Set(fishes?.map((fish: Fish) => fish?.species)))
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AquaLifeSummaryCard;
