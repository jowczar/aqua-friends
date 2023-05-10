"use client";

import React, { FC, useCallback, useEffect } from "react";
import { FirebaseApp } from "firebase/app";
import { getAuth }from "firebase/auth";
import 'firebaseui/dist/firebaseui.css'

interface Props {
  firebaseClient: FirebaseApp;
  config: firebaseui.auth.Config;
}

const FirebaseUiLogin: FC<Props> = ({ firebaseClient, config }) => {
  const loadFirebaseui = useCallback(async () => {
    const firebaseui = await import("firebaseui");
    const firebaseUi =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(getAuth(firebaseClient));
    firebaseUi.start("#firebaseui-auth-container", config);
  }, [firebaseClient, config]);

  useEffect(() => {
    loadFirebaseui();
  }, []);

  return <div id="firebaseui-auth-container"></div>;
};

export default FirebaseUiLogin;