"use client";

import FirebaseUiLogin from "@/components/FirebaseUiLogin";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, EmailAuthProvider }from "firebase/auth";

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
    );
}
