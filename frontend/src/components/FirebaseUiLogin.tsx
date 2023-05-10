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

  return (
    <>
      <div id="firebaseui-auth-container"></div>
      <style>
        {`
            .mdl-button--colored {
                background-color: #3056D3 !important;
                color: white !important;
            }

            .firebaseui-id-secondary-link  {
                color: #3056D3 !important;
            }

            .firebaseui-textfield.mdl-textfield .firebaseui-label:after {
                background-color: #3056D3 !important;
            }

            .mdl-progress > .progressbar {
                background-color: #3056D3 !important;
            }

            .mdl-progress > .bufferbar {
                background-image: linear-gradient(
                        90deg,
                        hsla(0, 0%, 100%, 0.7),
                        hsla(0, 0%, 100%, 0.7)
                    ),
                    linear-gradient(90deg, #3056D3, #3056D3) !important;
                z-index: 0;
                left: 0;
            }

            .mdl-progress:not(.mdl-progress--indeterminate) > .auxbar,
            .mdl-progress:not(.mdl-progress__indeterminate) > .auxbar {
                background-image: linear-gradient(
                        90deg,
                        hsla(0, 0%, 100%, 0.9),
                        hsla(0, 0%, 100%, 0.9)
                    ),
                    linear-gradient(90deg, #3056D3, #3056D3) !important;
            }
        `}
      </style>
    </>
  );
};

export default FirebaseUiLogin;