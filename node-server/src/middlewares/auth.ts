import { Request, Response, NextFunction } from "express";
// Import the User model
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["auth_token"] as string;
    if (!token) {
      return res.status(401).send({ error: "Please authenticate" });
    }
    const decoded = jwt.verify(token, config.JWT_SECRET as string) as any;
    req.user = decoded; // Attach the decoded token to the request

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
