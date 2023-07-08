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
import { AquariumDataProps, AquariumFilter, UserFilter } from "./page";
import { LoggedUser } from "@/hooks/useLoggedUser";
import { UserFilterOptions } from "@/enums/UserFilterOptions.enum";
import { AquariumFilterOptions } from "@/enums/AquariumFilterOptions.enum";

type UserData = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  aquariums: string;
  isFriend: boolean;
};

export const useAquariumData = (
  firestore: Firestore,
  currentAquariumFilter: AquariumFilter,
  loggedUser: LoggedUser | null
) => {
  const [aquariums, setAquariums] = useState<AquariumDataProps[]>([]);

  const getAquariums = useCallback(async () => {
    if (!firestore) return;

    const aquariumsRef = collection(firestore, "aquariums");

    const snapshot = await getDocs(aquariumsRef);

    const aquariumsData = await Promise.all(
      snapshot.docs.map(async (document: DocumentData) => {
        const data = document.data();
        const aquariumId = document.id;

        const aquariumSize =
          (data.width / 100) * (data.height / 100) * (data.length / 100) +
          "m^3";

        const userId = data.user_id;

        const usersRef = doc(firestore, "users", userId);

        const userSnapshot = await getDoc(usersRef);

        const user = userSnapshot.data();

        //TODO: how is healthStatus prepared?
        const healthStatus = HealthStatus.GOOD;
        return {
          id: aquariumId,
          name: user?.username || "",
          avatar: "",
          email: user?.email || "",
          aquariumTitle: data.name,
          healthStatus,
          aquariumSize,
          isLiked: loggedUser?.fav_aquariums?.includes(aquariumId) || false,
          aquariumData: {
            fishes: data.fishes,
            pump: data.pump,
            heater: data.heater,
            light: data.light,
            plants: data.plants,
            decors: data.decors,
            terrains: data.terrains,
          },
        };
      })
    );

    const filteredAquariums = aquariumsData.filter((aquarium) => {
      if (currentAquariumFilter.value === AquariumFilterOptions.ONLY_LIKED) {
        return aquarium.isLiked;
      }
      return true;
    });

    setAquariums(filteredAquariums);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAquariumFilter, loggedUser]);

  useEffect(() => {
    getAquariums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAquariumFilter, loggedUser]);

  return { aquariums };
};

export const useUserData = (
  firestore: Firestore,
  currentUserFilter: UserFilter,
  loggedUser: LoggedUser | null
) => {
  const [users, setUsers] = useState<UserData[]>([]);

  const getUsers = useCallback(async () => {
    if (!firestore) return;

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
        const isFriend = loggedUser?.friends?.includes(userId) || false;

        return {
          id: userId,
          name: data?.username || "",
          avatar: "",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserFilter, loggedUser]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserFilter, loggedUser]);

  return { users };
};
