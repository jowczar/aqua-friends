"use client";

import FirebaseUiLogin from "@/components/FirebaseUiLogin";
import { ScreenLoader } from "@/components/Loader";
import useFirebaseApp from "@/hooks/useFirebaseApp";
import { GoogleAuthProvider, EmailAuthProvider, getAuth }from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login() {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    
    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    if (loading) {
        return <ScreenLoader />;
    }

    if (error) {
        console.error(error);
        return <p>Error: {error.message}</p>;
    }

    if (user) {
        return;
    }

    return (
        <div className="grid h-screen place-items-center">
            <div className="flex flex-col gap-4 items-center">
                <Image 
                    src="logo.svg" 
                    alt="Aqua Friends" 
                    className="filter invert select-none cursor-default"
                    height={32}
                    width={166}
                    style={{ height: 'auto', objectFit: 'contain', position: 'relative'  }} />
                <FirebaseUiLogin 
                    firebaseClient={app} 
                    config={{
                        signInOptions: [
                            GoogleAuthProvider.PROVIDER_ID,
                            EmailAuthProvider.PROVIDER_ID,
                        ],
                        signInFlow: "popup",
                        signInSuccessUrl: "/",
                    }} 
                />
            </div>
        </div>
    );
}
