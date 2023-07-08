import { useCallback, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { HealthStatus } from "@/enums/HealthStatus.enum";
import { AquariumDataProps } from "../../page";
import useFirestore from "@/hooks/useFirestore";
import { CardData } from "./page";

export const useAquariumData = (params: any) => {
  const firestore = useFirestore();
  const [aquariumData, setAquariumData] = useState<AquariumDataProps | null>(
    null
  );

  const getAquariumData = useCallback(async () => {
    if (!firestore) return;

    const aquariumId = params.id;
    const aquariumRef = doc(firestore, "aquariums", aquariumId);

    const aquariumSnapshot = await getDoc(aquariumRef);

    const aquariumData = aquariumSnapshot.data();

    const userId = aquariumData?.user_id;

    const usersRef = doc(firestore, "users", userId);

    const userSnapshot = await getDoc(usersRef);

    const user = userSnapshot.data();

    const aquariumSize =
      (aquariumData?.width / 100) *
        (aquariumData?.height / 100) *
        (aquariumData?.length / 100) +
      "m^3";

    //TODO: how is healthStatus prepared?
    const healthStatus = HealthStatus.GOOD;
    const mappedAquariumData = {
      id: aquariumId,
      name: user?.username || "",
      avatar: "",
      email: user?.email || "",
      aquariumTitle: aquariumData?.name,
      healthStatus,
      aquariumSize,
      isLiked: user?.fav_aquariums?.includes(aquariumId) || false,
      aquariumData: {
        fishes: aquariumData?.fishes,
        pump: aquariumData?.pump,
        heater: aquariumData?.heater,
        light: aquariumData?.light,
        plants: aquariumData?.plants,
        decors: aquariumData?.decors,
        terrains: aquariumData?.terrains,
      },
    };

    setAquariumData(mappedAquariumData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
