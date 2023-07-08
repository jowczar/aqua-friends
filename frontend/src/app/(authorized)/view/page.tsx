"use client";

import Switch from "@/components/Switch";
import DataTable from "@/components/DataTables";
import FilterDropdown from "@/components/FilterDropdown";

import { HealthStatus } from "@/enums/HealthStatus.enum";
import useFirestore from "@/hooks/useFirestore";
import useUserWithRole from "@/hooks/useUserWithRole";

import { useEffect, useState } from "react";
import { AquaViewUserData, useAquariumData, useUserData } from "./data.logic";
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
  {
    label: "Show only your aquariums",
    value: AquariumFilterOptions.USER_AQUARIUMS,
  },
];

export default function View() {
  const firestore = useFirestore();

  const { user } = useUserWithRole();

  const loggedInUserWithDetails = useUserWithDetails(firestore, user?.uid);

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
    loggedInUserWithDetails
  );

  const { users, setUsers } = useUserData(
    firestore,
    currentUserFilter,
    loggedInUserWithDetails
  );

  const usersColumns = getUsersColumns(users, setUsers);

  const aquariumsColumns = getAquariumsColumns(aquariums, setAquariums);

  const recommendations = aquariums.filter(aquarium => aquarium.userId != user.uid).sort((a, b) => parseFloat(b.aquariumSize.replace('m^3', '')) - parseFloat(a.aquariumSize.replace('m^3', ''))).slice(0, 5);

  return (
    <div className="my-10 px-5 lg:px-20">
     <div className="mb-4">
      <h1 className="font-bold text-xl mb-2">You might like...</h1>
      <div className="flex flex-row gap-1 justify-between">
        {recommendations.map((recommendation, i) => (
          <div className="flex flex-col items-center justify-center" key={"recommendation_" + i}>
            <img
              className="rounded-full w-20 h-20"
              src={recommendation.avatar}
              alt="avatar"
            />
            <p className="font-bold">{recommendation.aquariumTitle}</p>
            <p className="text-sm">{recommendation.aquariumSize}</p>
          </div>
        ))}
      </div>
     </div>
      <div className="">
        <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 py-2">
          <div className="grid-rows-1 md:grid-cols-1 flex justify-center">
            <Switch
              setView={setIsUserView}
              firstText="Users"
              secondText="Aquariums"
              isFirstView={isUsersView}
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
        {isUsersView ? (
          <DataTable<AquaViewUserData>
            rowsData={users}
            columnsData={usersColumns}
            itemsPerPage={10}
          />
        ) : (
          <DataTable<AquaViewAquariumDataProps>
            rowsData={aquariums}
            columnsData={aquariumsColumns}
            itemsPerPage={10}
          />
        )}
      </div>
    </div>
  );
}
