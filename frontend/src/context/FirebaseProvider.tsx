"use client";

import { createContext } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAH13HYYacBDxbdRvIk5m7_uxwqeePdkWg",
    authDomain: "aquafriends-f8367.firebaseapp.com",
    projectId: "aquafriends-f8367",
    storageBucket: "aquafriends-f8367.appspot.com",
    messagingSenderId: "184957897431",
    appId: "1:184957897431:web:093a877a4ecf804beb3e92"
};

export const FirebaseContext = createContext<FirebaseApp | null>(null);

type FirebaseProviderProps = {
    children: React.ReactNode;
};

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
    const app = initializeApp(firebaseConfig);
    console.log('🔥 Firebase app initialized');
    
    return (
        <FirebaseContext.Provider value={app}>
            {children}
        </FirebaseContext.Provider>
    );
};


export default FirebaseProvider;