import { User as FirebaseUser, getAuth } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export type User = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: string | null;
};

const useUserWithRole = () => {
  const [userWithRole, setUserWithRole] = useState<User | null>(null);
  const [user, loading, error] = useAuthState(getAuth(), {
    onUserChanged: async (user: FirebaseUser | null) => {
      if (!user) return;
      const idTokenResult = await user.getIdTokenResult();
      const role = idTokenResult.claims.role;

      setUserWithRole({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role,
      });
    },
  });

  return { user, userWithRole, loading, error };
};

export default useUserWithRole;
