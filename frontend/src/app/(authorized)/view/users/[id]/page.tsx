"use client";

import { getUserDataMockById } from "@/components/DataTables/helpers";
import MonitorCard, { MonitorCardProps } from "@/components/MonitorCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserAquaViewPageProps {
  params: { id: string };
}

export default function UserAquaViewPage({ params }: UserAquaViewPageProps) {
  const router = useRouter();
  //TODO: right now, im using mock function to get mock data by id, it will be
  // changed in the future, when api will be finished
  const itemData = getUserDataMockById(+params.id);

  // TODO: get this data from backend
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];
  const sensors: MonitorCardProps[] = [
    {
      parameter: "NO2 – Nitrogen dioxide",
      currentValue: 1.368,
      changePercentage: +0.43,
      currentValueDate: "Now",
      history: data,
      color: "#D4F5EC",
    },
    {
      parameter: "NO3 – Nitrate",
      currentValue: 795,
      changePercentage: -1.39,
      currentValueDate: "Now",
      history: data,
      color: "#FDEDE0",
    },
    {
      parameter: "GH – Water hardness",
      currentValue: 785,
      changePercentage: +0.39,
      currentValueDate: "Now",
      history: data,
      color: "#DBE1F7",
    },
    {
      parameter: "KH – Carbonate hardness",
      currentValue: 1.368,
      changePercentage: +0.43,
      currentValueDate: "Now",
      history: data,
      color: "#D4F5EC",
    },
    {
      parameter: "ph – Acidity",
      currentValue: 795,
      changePercentage: -1.39,
      currentValueDate: "Now",
      history: data,
      color: "#FDEDE0",
    },
  ];
  // ================

  const handlePreviousButton = () => {
    router.push("/view");
  };

  const previousButton = (
    <>
      <button
        onClick={handlePreviousButton}
        className="w-full md:w-auto bg-transparent border-blue-500 border-solid border-2 text-blue-500 inline-flex items-center justify-center rounded-md py-2 px-4 text-center text-base font-normal  hover:bg-opacity-90 mb-2 md:mb-0"
      >
        Go back
      </button>
    </>
  );

  return (
    <div className="my-10 px-4 md:px-20">
      <div className={`w-full mb-5 mt-5  md:flex md:justify-between`}>
        {previousButton}
      </div>

      <div className="flex py-8">
        <div className="flex-shrink-0 h-15 w-15 hidden xl:block mr-4">
          <Image
            className="h-15 w-15 rounded-full"
            src={itemData?.avatar ? itemData?.avatar : "man.png"}
            alt="Default avatar"
            height={100}
            width={100}
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <div className="text-2xl text-primary font-bold text-center md:text-left">
            {itemData?.name}
          </div>
          <div className="text-lg text-primary font-normal text-center md:text-left">
            {itemData?.email}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mb-4 mt-4 gap-5">
        <div className="flex w-full items-center justify-center text-sm text-primary font-light bg-gray-50 border border-gray-300 rounded-lg p-2.5">
          Aquarium Title:
          <div className="font-bold px-1">{itemData?.aquariumTitle}</div>
        </div>
        <div className="flex w-full items-center justify-center text-sm text-primary font-light bg-gray-50 border border-gray-300 rounded-lg p-2.5">
          Aquarium Size:
          <div className="font-bold px-1">{itemData?.aquariumSize}</div>
        </div>
        <div className="flex w-full items-center justify-center text-sm text-primary font-light bg-gray-50 border border-gray-300 rounded-lg p-2.5">
          Health Status:
          <div className="font-bold px-1">{itemData?.healthStatus}</div>
        </div>
      </div>
      <div className="grid md:grid-flow-col grid-rows-2 lg:grid-rows-1 auto-cols-fr gap-4 overflow-x-auto overflow-y-hidden">
        {sensors.map((sensor, index) => (
          <div className="flex-1" key={`sensor_${index}`}>
            <MonitorCard
              parameter={sensor.parameter}
              currentValue={sensor.currentValue}
              history={sensor.history}
              changePercentage={sensor.changePercentage}
              currentValueDate={sensor.currentValueDate}
              color={sensor.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
