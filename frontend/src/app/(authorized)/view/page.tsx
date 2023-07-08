"use client";

import AquaViewSwitch from "@/components/AquaViewSwitch";
import DataTable from "@/components/DataTables";
import FilterDropdown from "@/components/FilterDropdown";

import { HealthStatus } from "@/enums/HealthStatus.enum";
import useFirestore from "@/hooks/useFirestore";
import useUserWithRole from "@/hooks/useUserWithRole";
import { User } from "firebase/auth";

import { useEffect, useState } from "react";
import { useAquariumData, useUserData } from "./data.logic";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { AquariumFilterOptions } from "@/enums/AquariumFilterOptions.enum";
import { UserFilterOptions } from "@/enums/UserFilterOptions.enum";

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

export type UserFilter = {
  label: string;
  value: UserFilterOptions;
};

export type AquariumFilter = {
  label: string;
  value: AquariumFilterOptions;
};

const aquariumsColumns = [
  "Owner",
  "Aquarium Title",
  "Aquarium Size",
  "Health Status",
];

const usersColumns = ["User", "Aquariums"];

const userFilterOptions = [
  {
    label: "Show all users",
    value: UserFilterOptions.ALL,
  },
  {
    label: "Show only friends",
    value: UserFilterOptions.ONLY_FRIENDS,
  },
];
const aquariumFilterOptions = [
  {
    label: "Show all aquariums",
    value: AquariumFilterOptions.ALL,
  },
  {
    label: "Show only liked",
    value: AquariumFilterOptions.ONLY_LIKED,
  },
];

export default function View() {
  const firestore = useFirestore();

  const { user }: { user: User | null | undefined } = useUserWithRole();

  const loggedUser = useLoggedUser(firestore, user?.uid);

  const [isUsersView, setIsUserView] = useState(true);
  const [currentUserFilter, setCurrentUserFilter] = useState(
    userFilterOptions[0]
  );
  const [currentAquariumFilter, setCurrentAquariumFilter] = useState(
    aquariumFilterOptions[0]
  );

  const { aquariums } = useAquariumData(
    firestore,
    currentAquariumFilter,
    loggedUser
  );

  const { users } = useUserData(firestore, currentUserFilter, loggedUser);

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
          loggedUser={loggedUser}
        />
      </div>
    </div>
  );
}
