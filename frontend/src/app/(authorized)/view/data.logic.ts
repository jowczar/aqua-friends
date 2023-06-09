import { HealthStatus } from "@/enums/HealthStatus.enum";
import { Firestore } from "firebase/firestore";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

import { useCallback, useEffect, useState } from "react";
import {
  AquaViewAquariumDataProps,
  AquariumDataProps,
  AquariumFilter,
  UserFilter,
} from "./page";
import { LoggedInUserWithDetails } from "@/hooks/useUserWithDetails";
import { UserFilterOptions } from "@/enums/UserFilterOptions.enum";
import { AquariumFilterOptions } from "@/enums/AquariumFilterOptions.enum";
import { getUserAvatar } from "@/common/helpers";

export type AquaViewUserData = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  aquariums: string;
  isFriend: boolean;
};

export const getAndMapAquariumData = async (
  firestore: Firestore,
  data: DocumentData,
  userId: string,
  aquariumId: string,
  loggeInUserWithDetails: LoggedInUserWithDetails
) => {
  const aquariumSize =
    (data.width / 100) * (data.height / 100) * (data.length / 100) + "m^3";

  const usersRef = doc(firestore, "users", userId);

  const userSnapshot = await getDoc(usersRef);

  const user = userSnapshot.data();

  const avatarUrl = await getUserAvatar(userId);

  //TODO: how is healthStatus prepared?
  const healthStatus = HealthStatus.GOOD;

  return {
    id: aquariumId,
    name: user?.username || "",
    avatar: avatarUrl,
    email: user?.email || "",
    aquariumTitle: data.name,
    healthStatus,
    aquariumSize,
    isLiked:
      loggeInUserWithDetails?.fav_aquariums?.includes(aquariumId) || false,
    aquariumData: {
      fishes: data?.fishes,
      pump: data?.pump,
      heater: data?.heater,
      light: data?.light,
      plants: data?.plants,
      decors: data?.decors,
      terrains: data?.terrains,
    },
    userId: data?.user_id,
  };
};

export const useAquariumData = (
  firestore: Firestore,
  currentAquariumFilter: AquariumFilter,
  loggedInUserWithDetails: LoggedInUserWithDetails
) => {
  const [aquariums, setAquariums] = useState<AquaViewAquariumDataProps[]>([]);

  const getAquariums = useCallback(async () => {
    const aquariumsRef = collection(firestore, "aquariums");

    const snapshot = await getDocs(aquariumsRef);

    const aquariumsData = await Promise.all(
      snapshot.docs.map(async (document: DocumentData) => {
        const data = document.data();
        const aquariumId = document.id;
        const userId = data.user_id;

        return getAndMapAquariumData(
          firestore,
          data,
          userId,
          aquariumId,
          loggedInUserWithDetails
        );
      })
    );

    const filteredAquariums = aquariumsData.filter((aquarium) => {
      if (currentAquariumFilter.value === AquariumFilterOptions.ONLY_LIKED) {
        return aquarium.isLiked;
      }

      if (
        currentAquariumFilter.value === AquariumFilterOptions.USER_AQUARIUMS
      ) {
        return aquarium.userId === loggedInUserWithDetails.id;
      }

      return true;
    });

    setAquariums(filteredAquariums);
  }, [firestore, loggedInUserWithDetails, currentAquariumFilter.value]);

  useEffect(() => {
    getAquariums();
  }, [getAquariums, loggedInUserWithDetails]);

  return { aquariums, setAquariums };
};

export const useUserData = (
  firestore: Firestore,
  currentUserFilter: UserFilter,
  loggedInUserWithDetails: LoggedInUserWithDetails
) => {
  const [users, setUsers] = useState<AquaViewUserData[]>([]);

  const getUsers = useCallback(async () => {
    const usersRef = collection(firestore, "users");

    const snapshot = await getDocs(usersRef);

    const usersData = await Promise.all(
      snapshot.docs.map(async (document: DocumentData) => {
        const data = document.data();
        const userId = document.id;

        const aquariumsRef = collection(firestore, "aquariums");
        const q = query(aquariumsRef, where("user_id", "==", userId));
        const aquariumsSnapshot = await getDocs(q);

        const aquariumNames = aquariumsSnapshot.docs.map((doc) => {
          const aquariumData = doc.data();
          return aquariumData.name;
        });

        const aquariums = aquariumNames.join(", ");
        const isFriend =
          loggedInUserWithDetails?.friends?.includes(userId) || false;

        const avatarUrl = await getUserAvatar(userId);

        return {
          id: userId,
          name: data?.username || "",
          avatar: avatarUrl,
          email: data?.email || "",
          aquariums,
          isFriend,
        };
      })
    );

    const filteredUsers = usersData.filter((user) => {
      if (currentUserFilter.value === UserFilterOptions.ONLY_FRIENDS) {
        return user.isFriend;
      }
      return true;
    });

    setUsers(filteredUsers);
  }, [currentUserFilter.value, firestore, loggedInUserWithDetails?.friends]);

  useEffect(() => {
    getUsers();
  }, [currentUserFilter, getUsers, loggedInUserWithDetails]);

  return { users, setUsers };
};
