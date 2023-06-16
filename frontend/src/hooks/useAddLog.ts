import { useCallback } from "react";
import { Firestore, doc, setDoc } from "firebase/firestore";
import { LoggedInUserWithDetails } from "./useUserWithDetails";

const useAddLog = (
  firestore: Firestore,
  serviceName: string,
  userId: string
) => {
  const addLog = useCallback(
    async (logMessage: string) => {
      try {
        await setDoc(doc(firestore, "logs", crypto.randomUUID()), {
          service_name: serviceName,
          message: logMessage,
          date: new Date(),
          user_id: userId,
        });

        console.log("New log added successfully");
      } catch (error) {
        console.error("Error adding log: ", error);
      }
    },
    [firestore, serviceName, userId]
  );

  return { addLog };
};

export default useAddLog;
