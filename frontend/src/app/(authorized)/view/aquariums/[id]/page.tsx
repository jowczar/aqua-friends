"use client";

import MonitorCard, { MonitorCardProps } from "@/components/MonitorCard";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import {
  generateFirstRowData,
  generateSecondRowData,
  generateThirdRowData,
  useAquariumData,
} from "./data.logic";
import useFirestore from "@/hooks/useFirestore";
import useUserWithRole from "@/hooks/useUserWithRole";
import { useUserWithDetails } from "@/hooks/useUserWithDetails";
import { doc, updateDoc } from "firebase/firestore";

interface AquariumAquaViewPageProps {
  params: { id: string };
}

export type CardData = {
  column: string;
  value: string | undefined;
  iconUrl: string;
};

export default function AquariumAquaViewPage({
  params,
}: AquariumAquaViewPageProps) {
  const router = useRouter();
  const firestore = useFirestore();

  const { user } = useUserWithRole();

  const loggedUserWithDetails = useUserWithDetails(firestore, user?.uid);

  const { aquariumData, getAquariumData, setAquariumData } = useAquariumData(
    params.id,
    loggedUserWithDetails
  );

  useEffect(() => {
    getAquariumData();
  }, [getAquariumData, aquariumData]);

  const firstRowData = generateFirstRowData(aquariumData);
  const secondRowData = generateSecondRowData(aquariumData);
  const thirdRowData = generateThirdRowData(aquariumData);

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

  const handleLikeButton = async () => {
    if (!loggedUserWithDetails) return;

    const usersRef = doc(firestore, "users", loggedUserWithDetails.id);

    let newFavAquariumList: string[];
    let isLiked: boolean;

    if (aquariumData?.isLiked) {
      newFavAquariumList = loggedUserWithDetails.fav_aquariums.filter(
        (friendId: string) => friendId !== aquariumData.id
      );
      isLiked = false;
    } else {
      newFavAquariumList = [
        ...loggedUserWithDetails.fav_aquariums,
        aquariumData?.id || "",
      ];
      isLiked = true;
    }

    await updateDoc(usersRef, {
      fav_aquariums: newFavAquariumList,
    });

    setAquariumData((prevAquariumData) => {
      if (!prevAquariumData) return prevAquariumData;
      return { ...prevAquariumData, isLiked };
    });
  };

  const likeButton = (
    <>
      <button
        onClick={async () => await handleLikeButton()}
        className={`w-full md:w-auto ${
          aquariumData?.isLiked
            ? "bg-transparent border-blue-500 text-blue-500"
            : "bg-stepsGreen border-green-500 text-gray-100"
        } border-solid border-2" inline-flex items-center justify-center rounded-md py-2 px-4 text-center text-base font-normal  hover:bg-opacity-90 mb-2 md:mb-0`}
      >
        {aquariumData?.isLiked ? "Remove from favorites" : "Add to favorites"}
      </button>
    </>
  );

  const Cards = ({ data }: { data: CardData[] }) => {
    return (
      <div className="flex flex-col md:flex-row mb-4 mt-4 gap-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex w-full text-center items-center justify-center text-sm text-primary font-light bg-gray-50 border border-gray-300 rounded-lg p-2.5"
          >
            <div className="flex items-center justify-start text-left w-full">
              <Image
                src={item.iconUrl}
                alt="icon"
                className="flex"
                height={30}
                width={30}
                aria-hidden="true"
              />
              <div className="flex flex-col justify-center ml-2 w-full text-center">
                {item.column}:
                <div className="font-bold px-1 text-center">{item.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="my-10 px-4 md:px-20">
      <div className={`w-full mb-5 mt-5  md:flex gap-4`}>
        {previousButton}
        {likeButton}
      </div>

      <div className="flex py-8">
        <div className="flex-shrink-0 h-15 w-15 hidden xl:block mr-4">
          <Image
            className="h-15 w-15 rounded-full"
            src={aquariumData?.avatar ? aquariumData?.avatar : "/man.png"}
            alt="Default avatar"
            height={100}
            width={100}
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <div className="text-2xl text-primary font-bold text-center md:text-left">
            {aquariumData?.name}
          </div>
          <div className="text-lg text-primary font-normal text-center md:text-left">
            {aquariumData?.email}
          </div>
        </div>
      </div>

      <Cards data={firstRowData} />
      <Cards data={secondRowData} />
      <Cards data={thirdRowData} />

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
