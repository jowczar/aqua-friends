"use client";

import { createContext } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAH13HYYacBDxbdRvIk5m7_uxwqeePdkWg",
  authDomain: "aquafriends-f8367.firebaseapp.com",
  projectId: "aquafriends-f8367",
  storageBucket: "aquafriends-f8367.appspot.com",
  messagingSenderId: "184957897431",
  appId: "1:184957897431:web:093a877a4ecf804beb3e92",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
//TODO: implement firebase app initialized logic and connect it with api, and then remove this console log :gituwa:
console.log("🔥 Firebase app initialized");

export const FirebaseContext = createContext<FirebaseApp | null>(null);
export const FirestoreContext = createContext<Firestore | null>(null);

type FirebaseProviderProps = {
  children: React.ReactNode;
};

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  return (
    <FirebaseContext.Provider value={app}>
      <FirestoreContext.Provider value={firestore}>
        {children}
      </FirestoreContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
