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
  const [idToken, setIdToken] = useState<string | null>(null);
  const [user, loading, error] = useAuthState(getAuth(), {
    onUserChanged: async (user: FirebaseUser | null) => {
      if (!user) return;
      const idToken = await user.getIdToken();
      const idTokenResult = await user.getIdTokenResult();
      const role = idTokenResult.claims.role;

      setIdToken(idToken);
      setUserWithRole({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role,
      });
    },
  });

  return { user, userWithRole, loading, error, idToken };
};

export default useUserWithRole;
