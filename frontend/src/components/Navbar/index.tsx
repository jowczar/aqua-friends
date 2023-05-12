import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarContainer from "./Navbar.component";

export const INITIAL_ROUTES = [
  { name: "Home", href: "/", current: true },
  { name: "Aqua monitor", href: "/monitor", current: false },
  { name: "Aqua view", href: "/view", current: false },
  { name: "Aqua creator", href: "/creator", current: false },
  { name: "Aqua history", href: "/history", current: false },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [navigation, setNavigation] = useState(INITIAL_ROUTES);
  const [user] = useAuthState(getAuth());

  useEffect(() => {
    setNavigation(
      navigation.map((nav) => {
        nav.current = nav.href === pathname;
        return nav;
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const signOut = () => {
    const auth = getAuth();
    auth.signOut();
    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <NavbarContainer user={user} signOut={signOut} navigation={navigation} />
  );
};

export default Navbar;