import { NextFunction, Request, Response } from "express";
import { Schema, ValidationError } from "yup";

const validate =
  (schema: Schema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validate(
          {
            body: req.body,
            query: req.query,
            params: req.params,
          },
          { abortEarly: false }
        );
        return next();
      } catch (err) {
        if (err instanceof ValidationError) {
          return res
            .status(400)
            .json({ message: err.message, errors: err.errors });
        }

        return res.status(500).json({ message: "Something went wrong" });
      }
    };

export default validate;
