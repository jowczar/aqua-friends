import express, { Request, Response } from "express";
import { StreamChat } from "stream-chat";
import { logger } from "firebase-functions/v1";
import { object, string } from "yup";

import isFirebaseError, { UserRole } from "./utils";
import isAuthenticated from "./middleware/is-authenticated.middleware";
import isAuthorized from "./middleware/is-authorized.middleware";
import validate from "./middleware/validation.middleware";

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

      return res.status(201).send({ token });
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

      const me = {
        id: user.uid,
      };
      const otherUser = {
        id: req.query.recipientId as string,
      };

      const server = StreamChat.getInstance(apiKey, apiSecret);
      await server.upsertUsers([me, otherUser]);
      const channel = server.channel("messaging", {
        members: [me.id, otherUser.id],
      });
      await channel.create(); // Stream ensures that only one channel exists

      return res.status(204).send();
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
