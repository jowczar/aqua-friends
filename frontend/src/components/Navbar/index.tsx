"use client";

import { getAuth } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import useUserWithRole from "@/hooks/useUserWithRole";
import NavbarContainer from "./Navbar.component";
import { ScreenLoader } from "@/components/Loader";
import { UserRole } from "@/enums/UserRole.enum";

import "react-toastify/dist/ReactToastify.css";

export const INITIAL_ROUTES = [
  { name: "Home", href: "/", current: true },
  { name: "Aqua view", href: "/view", current: false },
  { name: "Aqua creator", href: "/creator", current: false },
  { name: "Aqua history", href: "/history", current: false },
];

export const ADMIN_ROUTES = [
  { name: "Home", href: "/", current: true },
  { name: "Fishes", href: "/fishes", current: false },
  { name: "Equipment", href: "/equipment", current: false },
  { name: "Admins", href: "/admins", current: false },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [navigation, setNavigation] = useState(INITIAL_ROUTES);
  const { userWithRole, loading } = useUserWithRole();

  useEffect(() => {
    if (!userWithRole && !loading) {
      router.push("/login");
    }
    if (!loading && userWithRole?.role === UserRole.ADMIN) {
      // TODO: this solution does not forbid admins from directly using routes that are not in the navbar
      setNavigation(ADMIN_ROUTES);
    }
  }, [userWithRole, loading, router]);

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

  if (loading || !userWithRole) {
    return <ScreenLoader />;
  }

  return (
    <>
      <NavbarContainer
        user={userWithRole}
        signOut={signOut}
        navigation={navigation}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Navbar;
