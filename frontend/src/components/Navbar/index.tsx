"use client";

import { getAuth } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import useUserWithRole from "@/hooks/useUserWithRole";
import NavbarContainer from "./Navbar.component";
import { ScreenLoader } from "@/components/Loader";

import "react-toastify/dist/ReactToastify.css";

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
  const { userWithRole, loading } = useUserWithRole();

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

  if (loading) {
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
