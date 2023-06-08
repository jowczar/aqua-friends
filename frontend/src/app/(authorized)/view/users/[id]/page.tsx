"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FirestoreContext } from "@/context/FirebaseProvider";

import { useCallback, useContext, useEffect, useState } from "react";
import { HealthStatus } from "@/enums/HealthStatus.enum";

import DataTable from "@/components/DataTables";
import { User } from "firebase/auth";
import useUserWithRole from "@/hooks/useUserWithRole";
import { getUserData } from "./data.logic";

interface UserAquaViewPageProps {
  params: { id: string };
}

export type UserAquariumDataProps = {
  id: string;
  aquariumTitle: string;
  healthStatus: HealthStatus;
  aquariumSize: string;
};

type UserData = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  isFriend: boolean;
};

const aquariumsColumns = ["Aquarium Title", "Aquarium Size", "Health Status"];

export default function UserAquaViewPage({ params }: UserAquaViewPageProps) {
  const router = useRouter();
  const firestore = useContext(FirestoreContext);
  const { user }: { user: User | null | undefined } = useUserWithRole();

  const [loggedUserId, setLoggedUserId] = useState("");

  useEffect(() => {
    if (user) {
      setLoggedUserId(user?.uid.toString());
    }
  }, [user]);

  const [aquariumsData, setAquariumsData] = useState<
    UserAquariumDataProps[] | []
  >([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleUserData = useCallback(async () => {
    const { userData, aquariums } = await getUserData(
      firestore,
      params.id,
      loggedUserId
    );

    setUserData(userData);
    setAquariumsData(aquariums);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId]);

  useEffect(() => {
    handleUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId]);

  const handlePreviousButton = () => {
    router.push("/view");
  };

  const handleFriendButton = () => {};

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
        onClick={handleFriendButton}
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
        data={aquariumsData}
        columns={aquariumsColumns}
        itemsPerPage={10}
        allowAquaViewAquariumsActions={true}
        allowImages={false}
      />
    </div>
  );
}
