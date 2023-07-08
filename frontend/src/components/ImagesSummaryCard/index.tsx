import React from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import {
  Decor,
  Heater,
  Light,
  Plant,
  Pump,
  Terrain,
} from "@/app/(authorized)/creator/AquaDecorPage";
import { Fish } from "@/app/(authorized)/creator/AquaLifePage";

type AllItems = Pump | Heater | Light | Fish | Decor | Plant | Terrain;

type ImagesSummaryCardProps = {
  title: string;
  data: AllItems[];
};

const ImagesSummaryCard = ({ title, data }: ImagesSummaryCardProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const getItemType = (item: AllItems): string => {
    if ("lph" in item) return "Pump";
    if ("maxTemperature" in item) return "Heater";
    if ("power" in item) return "Light";
    if ("requirements" in item) return "Fish";
    if ("height" in item) return "Decor";
    if ("water" in item) return "PlantOrTerrain";
    return "Unknown";
  };

  const renderTooltip = (item: AllItems) => {
    switch (getItemType(item)) {
      case "Pump":
        const pump = item as Pump;
        return (
          <div>
            <p>Name: {pump.name}</p>
            <p>Power: {pump.power} W</p>
            <p>Flow Rate: {pump.lph} L/h</p>
          </div>
        );
      case "Heater":
        const heater = item as Heater;
        return (
          <div>
            <p>Name: {heater.name}</p>
            <p>Power: {heater.power} W</p>
            <p>
              Temperature Range: {heater.minTemperature}°C -{" "}
              {heater.maxTemperature}°C
            </p>
          </div>
        );
      case "Light":
        const light = item as Light;
        return (
          <div>
            <p>Name: {light.name}</p>
            <p>Power: {light.power} W</p>
          </div>
        );
      case "Fish":
        const fish = item as Fish;
        return (
          <div>
            <p>Name: {fish.name}</p>
            <p>Species: {fish.species}</p>
            <p>Max KH: {fish.requirements.maxKh}</p>
            <p>Min KH: {fish.requirements.minKh}</p>
            <p>Max PH: {fish.requirements.maxPh}</p>
            <p>Min PH: {fish.requirements.minPh}</p>
            <p>Min Temp: {fish.requirements.minTemp}°C</p>
            <p>Minimum Tank Size: {fish.requirements.minimumTankSize} L</p>
            <p>Amount: {fish.amount}</p>
          </div>
        );
      case "Decor":
        const decor = item as Decor;
        return (
          <div>
            <p>Name: {decor.name}</p>
            <p>Height: {decor.height}</p>
            <p>Length: {decor.length}</p>
            <p>Width: {decor.width}</p>
          </div>
        );
      case "PlantOrTerrain":
        const plantOrTerrain = item as Plant | Terrain;
        return (
          <div>
            <p>Name: {plantOrTerrain.name}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto rounded-xl overflow-visible m-4 z-10">
      <div className="text-xl md:text-2xl font-light text-center mt-4 mb-6">
        {title}
      </div>
      <div className="flex flex-wrap flex-row justify-center">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative inline-block flex-row px-4 mt-5 mb-10"
          >
            <div className="group">
              <Image
                className="h-15 w-15 rounded-full md:h-15 md:w-15"
                src={item.image ? item.image : "/man.png"}
                alt={item.name}
                height={isMobile ? 90 : 105}
                width={isMobile ? 90 : 105}
              />
              <div className="border-light text-body-color absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 whitespace-nowrap rounded border bg-white py-[6px] px-4 text-sm font-semibold opacity-0 group-hover:opacity-100">
                <span className="border-light absolute -bottom-1 left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-l-sm border-b border-r bg-white"></span>
                {renderTooltip(item)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesSummaryCard;
