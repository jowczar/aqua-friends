import express, { Request, Response } from "express";
import { StreamChat } from "stream-chat";
import { logger } from "firebase-functions/v1";
import isFirebaseError, { UserRole } from "./utils";
import isAuthenticated from "./middleware/is-authenticated.middleware";
import isAuthorized from "./middleware/is-authorized.middleware";

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

export default router;
