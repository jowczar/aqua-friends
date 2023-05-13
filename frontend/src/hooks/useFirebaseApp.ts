import { FirebaseContext } from "@/context/FirebaseProvider";
import { useContext } from "react";

const useFirebaseApp = () => {
    const app = useContext(FirebaseContext);
    if (!app) {
        throw new Error(
            'When using `useFirebaseApp`, the page must be wrapped in `FirebaseProvider`.'
        )
    }
    return app;
}
  
export default useFirebaseApp;
