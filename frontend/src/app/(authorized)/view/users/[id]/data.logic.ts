import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  Firestore,
} from "firebase/firestore";
import { HealthStatus } from "@/enums/HealthStatus.enum";
import { LoggedInUserWithDetails } from "@/hooks/useUserWithDetails";
import { getUserAvatar } from "@/common/helpers";
import { UserAquariumDataProps } from "./page";

type UserData = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  isFriend: boolean;
};

export const getUserData = async (
  firestore: Firestore,
  userIdFromParams: string,
  loggedInUserWithDetails: LoggedInUserWithDetails
): Promise<{ userData: UserData; aquariums: UserAquariumDataProps[] }> => {
  const userId = userIdFromParams;
  const userRef = doc(firestore, "users", userId);

  const userSnapshot = await getDoc(userRef);
  const user = userSnapshot.data();

  const isFriend = loggedInUserWithDetails?.friends?.includes(userId) || false;

  const avatarUrl = await getUserAvatar(userId);

  const userDataObj = {
    id: userId,
    name: user?.username || "",
    avatar: avatarUrl,
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
      isLiked:
        loggedInUserWithDetails?.fav_aquariums?.includes(doc.id) || false,
    };
  });

  return { userData: userDataObj, aquariums };
};
