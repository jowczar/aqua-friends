"use client";

import FirebaseUiLogin from "@/components/FirebaseUiLogin";
import Loader from "@/components/Loader";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, EmailAuthProvider }from "firebase/auth";
import Image from "next/image";

const firebaseConfig = {
  apiKey: "AIzaSyAH13HYYacBDxbdRvIk5m7_uxwqeePdkWg",
  authDomain: "aquafriends-f8367.firebaseapp.com",
  projectId: "aquafriends-f8367",
  storageBucket: "aquafriends-f8367.appspot.com",
  messagingSenderId: "184957897431",
  appId: "1:184957897431:web:093a877a4ecf804beb3e92"
};

export default function Login() {
    const app = initializeApp(firebaseConfig);
    const [isLoading, setIsLoading] = useState(true);

    // TODO: probably should be in a higher place, the whole checking if user is logged in
    // and redirecting to login page if not, but I'm just gonna leave it here for now as I'm styling the login page atm
    if (isLoading) {
        return (
            <div className="grid h-screen place-items-center animate-pulse duration-500">
                <Loader text="Please wait a moment" />
            </div>
        );
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
