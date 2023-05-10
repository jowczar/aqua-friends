"use client";

import FirebaseUiLogin from "@/components/FirebaseUiLogin";
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
