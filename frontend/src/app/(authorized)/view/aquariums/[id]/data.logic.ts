import { useCallback, useState } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { AquariumDataProps } from "../../page";
import useFirestore from "@/hooks/useFirestore";
import { CardData } from "./page";
import { getAndMapAquariumData } from "../../data.logic";

export const useAquariumData = (params: any) => {
  const firestore = useFirestore();
  const [aquariumData, setAquariumData] = useState<AquariumDataProps | null>(
    null
  );

  const getAquariumData = useCallback(async () => {
    const aquariumId = params.id;
    const aquariumRef = doc(firestore, "aquariums", aquariumId);

    const aquariumSnapshot = await getDoc(aquariumRef);
    const aquariumData = aquariumSnapshot.data();
    const userId = aquariumData?.user_id;

    const mappedAquariumData = await getAndMapAquariumData(
      firestore,
      aquariumData as DocumentData,
      userId,
      aquariumId
    );

    setAquariumData(mappedAquariumData);
  }, [firestore, params.id]);

  return { aquariumData, getAquariumData };
};

export const generateFirstRowData = (
  aquariumData: AquariumDataProps | null
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
  aquariumData: AquariumDataProps | null
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

export const generateThirdRowData = (
  aquariumData: AquariumDataProps | null
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
