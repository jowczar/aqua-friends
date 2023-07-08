import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";

const isAuthenticated =
    async (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      if (!authorization.startsWith("Bearer")) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      const split = authorization.split("Bearer ");
      if (split.length !== 2) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      const token = split[1];

      try {
        const auth = admin.auth();
        const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);
        req.user = {
          uid: decodedToken.uid,
          role: decodedToken.role,
          email: decodedToken.email,
        };
        return next();
      } catch (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }
    };

export default isAuthenticated;
