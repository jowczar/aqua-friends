import { NextFunction, Request, Response } from "express";
import * as functions from "firebase-functions";
import { Role } from "../utils/types";

const isAuthorized =
    (opts: {
        hasRole: Role[],
        allowSameUser?: boolean
    }) => {
      return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
          functions.logger.error("User not attached to request");
          return res
            .status(500)
            .send({ message: "Something went wrong, we are looking into it" });
        }

        const { role, uid } = req.user;
        const { id } = req.params;

        if (opts.allowSameUser && id && uid === id) {
          return next();
        }

        if (!role) {
          return res
            .status(403)
            .send({ message: "You are not authorized to make this request" });
        }

        if (opts.hasRole.includes(role)) {
          return next();
        }

        return res
          .status(403)
          .send({ message: "You are not authorized to make this request" });
      };
    };

export default isAuthorized;
