"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import DataTable from "@/components/DataTables";
import { getUserData } from "./data.logic";
import { Firestore, updateDoc, doc } from "firebase/firestore";
import { useUserWithDetails } from "@/hooks/useUserWithDetails";
import useFirestore from "@/hooks/useFirestore";
import useUserWithRole from "@/hooks/useUserWithRole";
import { getAquariumsColumns } from "./aquariums.columns";
import { AquaViewAquariumDataProps } from "../../page";
import useAddLog from "@/hooks/useAddLog";

interface UserAquaViewPageProps {
  params: { id: string };
}

export type UserAquariumDataProps = Omit<
  AquaViewAquariumDataProps,
  "name" | "email" | "avatar"
>;

type UserData = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  isFriend: boolean;
};

const initialUserData: UserData = {
  id: "",
  name: "",
  avatar: "",
  email: "",
  isFriend: false,
};

export default function UserAquaViewPage({ params }: UserAquaViewPageProps) {
  const router = useRouter();
  const firestore = useFirestore();

  const { user } = useUserWithRole();

  const loggedInUserWithDetails = useUserWithDetails(firestore, user?.uid);

  const { addLog } = useAddLog(
    firestore,
    "Aqua View Users Service",
    loggedInUserWithDetails.id
  );

  const [aquariumsData, setAquariumsData] = useState<UserAquariumDataProps[]>(
    []
  );
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const handleUserData = useCallback(async () => {
    const { userData, aquariums } = await getUserData(
      firestore as Firestore,
      params.id,
      loggedInUserWithDetails
    );

    setUserData(userData);
    setAquariumsData(aquariums);
  }, [firestore, loggedInUserWithDetails, params.id]);

  useEffect(() => {
    handleUserData();
  }, [handleUserData, loggedInUserWithDetails]);

  const aquariumsColumns = getAquariumsColumns(aquariumsData, setAquariumsData);

  const handlePreviousButton = () => {
    router.push("/view");
  };

  const handleFriendButton = async () => {
    if (!loggedInUserWithDetails) return;

    const usersRef = doc(firestore, "users", loggedInUserWithDetails.id);

    let newFriendsList: string[];
    let isFriend: boolean;

    if (userData?.isFriend) {
      newFriendsList = loggedInUserWithDetails.friends.filter(
        (friendId: string) => friendId !== userData.id
      );
      isFriend = false;
      addLog(
        `Remove ${userData?.name} from friends for user ${loggedInUserWithDetails.username}`
      );
    } else {
      newFriendsList = [...loggedInUserWithDetails.friends, userData?.id || ""];
      isFriend = true;
      addLog(
        `Add ${userData?.name} to friends for user ${loggedInUserWithDetails.username}`
      );
    }

    await updateDoc(usersRef, {
      friends: newFriendsList,
    });

    setUserData((prevUserData) => {
      if (!prevUserData) return prevUserData;
      return { ...prevUserData, isFriend };
    });
  };

  //TODO: add logic here when chats will be applied
  const handleChatButton = () => {};

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

  const friendButton = (
    <>
      <button
        onClick={async () => await handleFriendButton()}
        className={`w-full md:w-auto ${
          userData?.isFriend
            ? "bg-transparent border-blue-500 text-blue-500"
            : "bg-stepsGreen border-green-500 text-gray-100"
        } border-solid border-2" inline-flex items-center justify-center rounded-md py-2 px-4 text-center text-base font-normal  hover:bg-opacity-90 mb-2 md:mb-0`}
      >
        {userData?.isFriend ? "Remove from friends" : "Add to friend"}
      </button>
    </>
  );

  const chatButton = (
    <>
      <button
        onClick={handleChatButton}
        className="w-full md:w-auto bg-blue-500 border-blue-500 border-solid border-2 text-gray-100 inline-flex items-center justify-center rounded-md py-2 px-4 text-center text-base font-normal  hover:bg-opacity-90 mb-2 md:mb-0"
      >
        Chat
      </button>
    </>
  );

  return (
    <div className="my-10 px-4 md:px-20">
      <div className={`w-full mb-5 mt-5  md:flex gap-4`}>
        {previousButton}
        {friendButton}
        {chatButton}
      </div>

      <div className="flex py-8">
        <div className="flex-shrink-0 h-15 w-15 hidden xl:block mr-4">
          <Image
            className="h-15 w-15 rounded-full"
            src={userData?.avatar ? userData?.avatar : "/man.png"}
            alt="Default avatar"
            height={100}
            width={100}
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <div className="text-2xl text-primary font-bold text-center md:text-left">
            {userData?.name}
          </div>
          <div className="text-lg text-primary font-normal text-center md:text-left">
            {userData?.email}
          </div>
        </div>
      </div>

      <DataTable
        rowsData={aquariumsData}
        columnsData={aquariumsColumns}
        itemsPerPage={10}
      />
    </div>
  );
}
