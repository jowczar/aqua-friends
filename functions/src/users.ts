import express, { Request, Response } from "express";
import * as admin from "firebase-admin";
import { logger } from "firebase-functions/v1";
import isFirebaseError, { UserRole } from "./utils";
import { Claims } from "./utils/types";
import validate from "./middleware/validation.middleware";
import { addAdminSchema, deleteAdminSchema } from "./users.validation";
import isAuthenticated from "./middleware/is-authenticated.middleware";
import isAuthorized from "./middleware/is-authorized.middleware";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  isAuthorized({ hasRole: [UserRole.ADMIN] }),
  validate(addAdminSchema),
  async (req: Request, res: Response) => {
    try {
      const { displayName, password, email } = req.body;

      const { uid } = await admin.auth().createUser({
        displayName,
        password,
        email,
      });
      const claims: Claims = {
        role: "admin",
      };
      await admin.auth().setCustomUserClaims(uid, claims);

      return res.status(201).send({ uid });
    } catch (err) {
      logger.error(err);
      if (isFirebaseError(err)) {
        return res
          .status(400)
          .send({ message: `${err.code} - ${err.message}` });
      } else if (err instanceof Error) {
        return res.status(500).send({ message: err.message });
      } else {
        return res.status(500).send({ message: "Something went wrong" });
      }
    }
  }
);

router.delete(
  "/:uid",
  isAuthenticated,
  isAuthorized({ hasRole: [UserRole.ADMIN] }),
  validate(deleteAdminSchema),
  async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;
      const db = admin.firestore();

      await admin.auth().deleteUser(uid);
      await db.collection("users").doc(uid).delete();

      return res.status(200).send({ message: "User deleted" });
    } catch (err) {
      logger.error(err);
      if (isFirebaseError(err)) {
        return res
          .status(400)
          .send({ message: `${err.code} - ${err.message}` });
      } else if (err instanceof Error) {
        return res.status(500).send({ message: err.message });
      } else {
        return res.status(500).send({ message: "Something went wrong" });
      }
    }
  }
);

export default router;
