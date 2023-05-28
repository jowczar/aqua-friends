import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

import users from "./users";
import {Claims} from "./utils/types";
import {logger} from "firebase-functions";

admin.initializeApp();

const app = express();
app.use(cors({origin: true}));

app.use("/users", users);

export const api = functions.https.onRequest(app);
export const addDefaultUserRole = functions.auth.user().onCreate((user) => {
  const claims: Claims = {
    role: "user",
  };
  return admin.auth()
    .setCustomUserClaims(user.uid, claims)
    .then(() => {
      logger.info(`Added default user role to ${user.uid}`);
    });
});
