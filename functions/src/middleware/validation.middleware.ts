import { NextFunction, Request, Response } from "express";
import { Schema, ValidationError } from "yup";

const validate = (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      if (err instanceof ValidationError) {
        // TODO: customize message
        console.log({ err });
        return res.status(400).json({ message: err.message });
      }

      return res.status(400).json({ message: "Something went wrong" });
    }
  };

export default validate;
