"use client";

import AquaViewSwitch from "@/components/AquaViewSwitch";
import DataTable from "@/components/DataTables";
import FilterDropdown from "@/components/FilterDropdown";
import { FirestoreContext } from "@/context/FirebaseProvider";
import { HealthStatus } from "@/enums/HealthStatus.enum";
import useUserWithRole from "@/hooks/useUserWithRole";
import { User } from "firebase/auth";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

import { useCallback, useContext, useEffect, useState } from "react";

//TODO: types here needs to be changed
type AquariumData = {
  fishes: any[];
  pump: any;
  heater: any;
  light: any;
  plants: any[];
  decors: any[];
  terrains: any[];
};

export type AquariumDataProps = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  aquariumTitle: string;
  healthStatus: HealthStatus;
  aquariumSize: string;
  isLiked: boolean;
  aquariumData: AquariumData;
};

type UserData = {};

const aquariumsColumns = [
  "Owner",
  "Aquarium Title",
  "Aquarium Size",
  "Health Status",
];

const usersColumns = ["User", "Aquariums"];

const userFilterOptions = ["Show all users", "Show only friends"];
const aquariumFilterOptions = ["Show all aquariums", "Show only liked"];

export default function View() {
  const firestore = useContext(FirestoreContext);

  const { user }: { user: User | null | undefined } = useUserWithRole();

  const [loggedUserId, setLoggedUserId] = useState("");

  useEffect(() => {
    if (user) {
      setLoggedUserId(user?.uid.toString());
    }
  }, [user]);

  const [isUsersView, setIsUserView] = useState(true);
  const [currentUserFilter, setCurrentUserFilter] = useState(
    userFilterOptions[0]
  );
  const [currentAquariumFilter, setCurrentAquariumFilter] = useState(
    aquariumFilterOptions[0]
  );

  const [aquariums, setAquariums] = useState<AquariumDataProps[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);

  const getAquariums = useCallback(async () => {
    if (!firestore) return;

    const aquariumsRef = collection(firestore, "aquariums");

    const snapshot = await getDocs(
      currentAquariumFilter === aquariumFilterOptions[0]
        ? aquariumsRef
        : aquariumsRef
    );

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
          isLiked: user?.fav_aquariums?.includes(aquariumId) || false,
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
      if (currentAquariumFilter === aquariumFilterOptions[1]) {
        return aquarium.isLiked;
      }
      return true;
    });

    setAquariums(filteredAquariums);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAquariumFilter]);

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
        const isFriend = data?.friends?.includes(loggedUserId) || false;

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
      if (currentUserFilter === userFilterOptions[1]) {
        return user.isFriend;
      }
      return true;
    });

    setUsers(filteredUsers);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserFilter, loggedUserId]);

  useEffect(() => {
    getAquariums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAquariumFilter]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserFilter, loggedUserId]);

  return (
    <div>
      <div className="my-10 px-5 lg:px-20">
        <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 py-2">
          <div className="grid-rows-1 md:grid-cols-1 flex justify-center">
            <AquaViewSwitch
              isUsersView={isUsersView}
              setIsUsersView={setIsUserView}
            />
          </div>
          <div className="grid-rows-1 md:grid-cols-2 w-full">
            <FilterDropdown
              filterOptions={
                isUsersView ? userFilterOptions : aquariumFilterOptions
              }
              currentFilter={
                isUsersView ? currentUserFilter : currentAquariumFilter
              }
              setCurrentFilter={
                isUsersView ? setCurrentUserFilter : setCurrentAquariumFilter
              }
            />
          </div>
        </div>
        <DataTable
          data={isUsersView ? users : aquariums}
          columns={isUsersView ? usersColumns : aquariumsColumns}
          itemsPerPage={10}
          allowAquaViewUsersActions={isUsersView ? true : false}
          allowAquaViewAquariumsActions={isUsersView ? false : true}
          allowImages={true}
        />
      </div>
    </div>
  );
}
