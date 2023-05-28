import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import users from "./users";

admin.initializeApp();

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true}));

app.use("/users", users);

export const api = functions.https.onRequest(app);
