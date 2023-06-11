import { Firestore, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export type LoggedInUserWithDetails = {
  email: string;
  fav_aquariums: string[];
  friends: string[];
  id: string;
  username: string;
};

const defaultLoggedUser: LoggedInUserWithDetails = {
  email: "",
  fav_aquariums: [],
  friends: [],
  id: "",
  username: "",
};

export const useUserWithDetails = (
  firestore: Firestore,
  userId: string | undefined
) => {
  const [userWithDetails, setUserWithDetails] =
    useState<LoggedInUserWithDetails>(defaultLoggedUser);

  useEffect(() => {
    if (userId) {
      const docRef = doc(firestore, "users", userId);

      const unsubscribe = onSnapshot(docRef, (doc) => {
        const data = doc.data();
        setUserWithDetails({
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

  return userWithDetails;
};
