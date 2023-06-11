"use client";

import AquaViewSwitch from "@/components/AquaViewSwitch";
import DataTable from "@/components/DataTables";
import FilterDropdown from "@/components/FilterDropdown";

import { HealthStatus } from "@/enums/HealthStatus.enum";
import useFirestore from "@/hooks/useFirestore";
import useUserWithRole from "@/hooks/useUserWithRole";

import { useEffect, useState } from "react";
import { useAquariumData, useUserData } from "./data.logic";
import { useUserWithDetails } from "@/hooks/useUserWithDetails";
import { AquariumFilterOptions } from "@/enums/AquariumFilterOptions.enum";
import { UserFilterOptions } from "@/enums/UserFilterOptions.enum";
import { getUsersColumns } from "./users.columns";
import { getAquariumsColumns } from "./aquariums.columns";

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

export type AquaViewAquariumDataProps = Omit<AquariumDataProps, "aquariumData">;

export type UserFilter = {
  label: string;
  value: UserFilterOptions;
};

export type AquariumFilter = {
  label: string;
  value: AquariumFilterOptions;
};

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

  const { user } = useUserWithRole();

  const loggedUser = useUserWithDetails(firestore, user?.uid);

  const [isUsersView, setIsUserView] = useState(true);
  const [currentUserFilter, setCurrentUserFilter] = useState(
    userFilterOptions[0]
  );
  const [currentAquariumFilter, setCurrentAquariumFilter] = useState(
    aquariumFilterOptions[0]
  );

  const { aquariums, setAquariums } = useAquariumData(
    firestore,
    currentAquariumFilter,
    loggedUser
  );

  const { users, setUsers } = useUserData(
    firestore,
    currentUserFilter,
    loggedUser
  );

  const usersColumns = getUsersColumns(users, setUsers);

  const aquariumsColumns = getAquariumsColumns(aquariums, setAquariums);

  return (
    <div>
      <div className="my-10 px-5 lg:px-20">
        <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 py-2">
          <div className="grid-rows-1 md:grid-cols-1 flex justify-center">
            <AquaViewSwitch setIsUsersView={setIsUserView} />
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
          rowsData={isUsersView ? users : aquariums}
          columnsData={isUsersView ? usersColumns : aquariumsColumns}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
}
