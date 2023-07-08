import { useCallback, useState } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";

import useFirestore from "@/hooks/useFirestore";
import { CardData } from "./page";
import { getAndMapAquariumData } from "../../data.logic";
import { LoggedInUserWithDetails } from "@/hooks/useUserWithDetails";
import { AquariumDataProps } from "../../page";
import { HealthStatus } from "@/enums/HealthStatus.enum";

const initialAquariumData: AquariumDataProps = {
  id: "",
  name: "",
  avatar: "",
  email: "",
  aquariumTitle: "",
  healthStatus: HealthStatus.GOOD,
  aquariumSize: "",
  isLiked: false,
  aquariumData: {
    fishes: [],
    pump: null,
    heater: null,
    light: null,
    plants: [],
    decors: [],
    terrains: [],
  },
};

export const useAquariumData = (
  aquariumIdFromParams: string,
  loggedInUserWithDetails: LoggedInUserWithDetails
) => {
  const firestore = useFirestore();

  const [aquariumData, setAquariumData] =
    useState<AquariumDataProps>(initialAquariumData);

  const getAquariumData = useCallback(async () => {
    const aquariumId = aquariumIdFromParams;
    const aquariumRef = doc(firestore, "aquariums", aquariumId);

    const aquariumSnapshot = await getDoc(aquariumRef);
    const aquariumData = aquariumSnapshot.data();
    const userId = aquariumData?.user_id;

    const mappedAquariumData = await getAndMapAquariumData(
      firestore,
      aquariumData as DocumentData,
      userId,
      aquariumId,
      loggedInUserWithDetails
    );

    setAquariumData(mappedAquariumData);
  }, [firestore, aquariumIdFromParams, loggedInUserWithDetails]);

  return { aquariumData, getAquariumData, setAquariumData };
};

export const generateFirstRowData = (
  aquariumData: AquariumDataProps
): CardData[] => [
  {
    column: "Aquarium title",
    value: aquariumData?.aquariumTitle,
    iconUrl: "/title.svg",
  },
  {
    column: "Aquarium size",
    value: aquariumData?.aquariumSize,
    iconUrl: "/size.svg",
  },
  {
    column: "Health status",
    value: aquariumData?.healthStatus,
    iconUrl: "/health-status.svg",
  },
];

export const generateSecondRowData = (
  aquariumData: AquariumDataProps
): CardData[] => [
  {
    column: "Pump",
    value: aquariumData?.aquariumData?.pump?.name,
    iconUrl: "/pump.svg",
  },
  {
    column: "Heater",
    value: aquariumData?.aquariumData?.heater?.name,
    iconUrl: "/heater.svg",
  },
  {
    column: "Light",
    value: aquariumData?.aquariumData?.light?.name,
    iconUrl: "/light.svg",
  },
];

//TODO: this any typeing will be changeing when i will know full proper structure of plants, decors etc.
export const generateThirdRowData = (
  aquariumData: AquariumDataProps
): CardData[] => [
  {
    column: "Plants",
    value:
      aquariumData?.aquariumData?.plants &&
      aquariumData?.aquariumData?.plants
        .map((plants: any) => plants.name)
        .join(", "),
    iconUrl: "/plants.svg",
  },
  {
    column: "Decors",
    value:
      aquariumData?.aquariumData?.decors &&
      aquariumData?.aquariumData?.decors
        .map((decor: any) => decor.name)
        .join(", "),
    iconUrl: "/decors.svg",
  },
  {
    column: "Terrains",
    value:
      aquariumData?.aquariumData?.terrains &&
      aquariumData?.aquariumData?.terrains
        .map((terrain: any) => terrain.name)
        .join(", "),
    iconUrl: "/terrain.svg",
  },
  {
    column: "Fishes",
    value:
      aquariumData?.aquariumData?.fishes &&
      aquariumData?.aquariumData?.fishes
        .map((fish: any) => fish.name)
        .join(", "),
    iconUrl: "/fishes.svg",
  },
];
