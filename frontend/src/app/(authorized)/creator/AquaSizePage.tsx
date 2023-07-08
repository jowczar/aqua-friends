"use client";

import ProgressBar from "@/components/ProgressBar";
import { Unit } from "@/enums/Unit.enum";
import { AquariumDimensions } from "./page";

type ProgressBarPageProps = {
  aquariumDimensions: AquariumDimensions;
  setAquariumDimensions: React.Dispatch<
    React.SetStateAction<AquariumDimensions>
  >;
};

const AquaSizePage = ({
  aquariumDimensions,
  setAquariumDimensions,
}: ProgressBarPageProps) => {
  return (
    <>
      <div className="my-20 px-1 md:px-20">
        <ProgressBar
          title={"Aquarium Length"}
          min={10}
          max={500}
          unit={Unit.CENTIMETER}
          element={aquariumDimensions.length}
          setElement={(newValue: number) =>
            setAquariumDimensions((prev) => ({ ...prev, length: newValue }))
          }
        />
      </div>

      <div className="my-20 px-1 md:px-20">
        <ProgressBar
          title={"Aquarium Width"}
          min={10}
          max={500}
          unit={Unit.CENTIMETER}
          element={aquariumDimensions.width}
          setElement={(newValue: number) =>
            setAquariumDimensions((prev) => ({ ...prev, width: newValue }))
          }
        />
      </div>

      <div className="my-20 px-1 md:px-20">
        <ProgressBar
          title={"Aquarium Height"}
          min={10}
          max={500}
          unit={Unit.CENTIMETER}
          element={aquariumDimensions.height}
          setElement={(newValue: number) =>
            setAquariumDimensions((prev) => ({ ...prev, height: newValue }))
          }
        />
      </div>
    </>
  );
};

export default AquaSizePage;
