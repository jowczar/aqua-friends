import express, { Request, Response } from "express";
import { StreamChat } from "stream-chat";
import { logger } from "firebase-functions/v1";
import { object, string } from "yup";
import { firestore } from "firebase-admin";

import isFirebaseError, { UserRole } from "./utils";
import isAuthenticated from "./middleware/is-authenticated.middleware";
import isAuthorized from "./middleware/is-authorized.middleware";
import validate from "./middleware/validation.middleware";
import { UserDetails } from "./utils/types";

const router = express.Router();

router.post(
  "/get-token",
  isAuthenticated,
  isAuthorized({ hasRole: [UserRole.USER] }),
  async (req: Request, res: Response) => {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("User not attached to the request");
      }

      const apiKey = process.env.STREAM_API_KEY;
      const apiSecret = process.env.STREAM_API_SECRET;

      if (!apiKey || !apiSecret) {
        throw new Error("Stream credentials not set");
      }

      const server = StreamChat.getInstance(apiKey, apiSecret);
      const token = server.createToken(user.uid);

      res.status(201).send({ token });
    } catch (err) {
      logger.error(err);
      if (isFirebaseError(err)) {
        res.status(400).send({ message: `${err.code} - ${err.message}` });
      } else if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(500).send({ message: "Something went wrong" });
      }
    }
  }
);

router.post(
  "/sync",
  isAuthenticated,
  isAuthorized({ hasRole: [UserRole.USER] }),
  validate(object({ query: object({ recipientId: string().required() }) })),
  async (req: Request, res: Response) => {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("User not attached to the request");
      }

      const apiKey = process.env.STREAM_API_KEY;
      const apiSecret = process.env.STREAM_API_SECRET;

      if (!apiKey || !apiSecret) {
        throw new Error("Stream credentials not set");
      }

      const otherUserId = req.query.recipientId as string;
      const usersRef = firestore().collection("users");

      const meDocument = await usersRef.doc(user.uid).get();
      const otherUserDocument = await usersRef.doc(otherUserId).get();

      if (!meDocument.exists || !otherUserDocument.exists) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      const me = meDocument.data() as UserDetails;
      const otherUser = otherUserDocument.data() as UserDetails;

      const meInChat = {
        id: user.uid,
        name: me.username,
        avatar: me.avatar,
      };
      const otherUserInChat = {
        id: req.query.recipientId as string,
        name: otherUser.username,
        avatar: otherUser.avatar,
      };

      const server = StreamChat.getInstance(apiKey, apiSecret);
      await server.upsertUsers([meInChat, otherUserInChat]);
      const channel = server.channel("messaging", {
        members: [me.id, otherUser.id],
        created_by_id: me.id,
      });
      await channel.create(); // Stream ensures that only one channel exists

      res.status(204).send();
    } catch (err) {
      logger.error(err);
      if (isFirebaseError(err)) {
        res.status(400).send({ message: `${err.code} - ${err.message}` });
      } else if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(500).send({ message: "Something went wrong" });
      }
    }
  }
);

export default router;
