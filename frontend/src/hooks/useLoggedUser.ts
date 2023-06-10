import { Firestore, getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export type LoggedUser = {
  email: string;
  fav_aquariums: string[];
  friends: string[];
  id: string;
  username: string;
};

export const useLoggedUser = (
  firestore: Firestore,
  userId: string | undefined
) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  useEffect(() => {
    if (!firestore || !userId) return;

    const fetchUser = async () => {
      const usersRef = doc(firestore, "users", userId);
      const userSnapshot = await getDoc(usersRef);

      if (userSnapshot.exists()) {
        setLoggedUser(userSnapshot.data() as LoggedUser);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return loggedUser;
};
