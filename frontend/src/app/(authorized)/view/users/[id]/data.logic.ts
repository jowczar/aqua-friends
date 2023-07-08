import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { HealthStatus } from "@/enums/HealthStatus.enum";

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

export const getUserData = async (
  firestore: any,
  paramsId: string,
  loggedUserId: string
): Promise<{ userData: UserData; aquariums: UserAquariumDataProps[] }> => {
  const userId = paramsId;
  const userRef = doc(firestore, "users", userId);

  const userSnapshot = await getDoc(userRef);
  const user = userSnapshot.data();

  const isFriend = user?.friends?.includes(loggedUserId) || false;

  const userDataObj = {
    id: userId,
    name: user?.username || "",
    avatar: "",
    email: user?.email || "",
    isFriend,
  };

  const aquariumsRef = collection(firestore, "aquariums");
  const q = query(aquariumsRef, where("user_id", "==", userId));

  const querySnapshot = await getDocs(q);
  const aquariums = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    const aquariumSize =
      (data?.width / 100) * (data?.height / 100) * (data?.length / 100) + "m^3";

    const healthStatus = HealthStatus.GOOD;

    return {
      id: doc.id,
      aquariumTitle: data.name,
      healthStatus,
      aquariumSize,
    };
  });

  return { userData: userDataObj, aquariums };
};
