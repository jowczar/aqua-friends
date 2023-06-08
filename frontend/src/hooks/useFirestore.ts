import { FirestoreContext } from "@/context/FirebaseProvider";
import { useContext } from "react";

const useFirestore = () => {
  const app = useContext(FirestoreContext);
  if (!app) {
    throw new Error(
      "When using `useFirestore`, the page must be wrapped in `FirebaseProvider`."
    );
  }
  return app;
};

export default useFirestore;
