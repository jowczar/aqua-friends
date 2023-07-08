import { Firestore, getDoc, doc, onSnapshot } from "firebase/firestore";
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
    if (userId) {
      const docRef = doc(firestore, "users", userId);

      const unsubscribe = onSnapshot(docRef, (doc) => {
        const data = doc.data();
        setLoggedUser({
          id: doc.id,
          email: data?.email,
          fav_aquariums: data?.fav_aquariums,
          friends: data?.friends,
          username: data?.username,
        });
      });

      return () => unsubscribe();
    }
  }, [firestore, userId]);

  return loggedUser;
};
