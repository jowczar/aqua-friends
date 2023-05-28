import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

import users from "./users";

admin.initializeApp();

const app = express();
app.use(cors({origin: true}));

app.use("/users", users);

export const api = functions.https.onRequest(app);
