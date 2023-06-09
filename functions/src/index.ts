/* eslint-disable object-curly-spacing */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

import users from "./users";
import { Claims } from "./utils/types";
import { logger } from "firebase-functions";

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

app.use("/users", users);

export const api = functions.https.onRequest(app);
export const addDefaultUserRole = functions.auth.user().onCreate((user) => {
  const claims: Claims = {
    role: "user",
  };
  return admin
    .auth()
    .setCustomUserClaims(user.uid, claims)
    .then(() => {
      logger.info(`Added default user role to ${user.uid}`);
    });
});

export const createUserRecord = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();

  // INFO: there was a problem with getting displayName, so i tried this way
  const freshUser = await admin.auth().getUser(user.uid);

  return db
    .collection("users")
    .doc(freshUser.uid)
    .set({
      id: freshUser.uid,
      email: freshUser.email,
      username: freshUser.displayName,
      admin: false,
      fav_aquariums: [],
      friends: [],
    })
    .then(() => {
      logger.info(`User record created for ${freshUser.uid}`);
    })
    .catch((error) => {
      logger.error(`Error creating user record for ${freshUser.uid}`, error);
    });
});
