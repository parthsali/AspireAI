// User Controller

import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "./userModel";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log(req.body);

    const user = new User({ firstName, lastName, email, password });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    next(createHttpError(400, error as Error));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // You should use a proper hashing function for passwords (e.g., bcrypt)
    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const authToken = jwt.sign(
      { _id: user._id, email: user.email }, // Payload
      config.JWT_SECRET as string, // Secret
      { expiresIn: "7d" } // Expiry
    );

    res.status(200).json({ auth_token: authToken, user });
  } catch (error) {
    next(createHttpError(400, error as Error));
  }
};

export const uploadData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const {
      firstName,
      lastName,
      email,
      phone,
      grade,
      skills,
      interests,
      projects,
      experiences,
    } = req.body;

    const auth_token = req.headers["auth_token"] as string;
    const decoded = jwt.verify(auth_token, config.JWT_SECRET as string) as {
      _id: string;
    };

    const userId = decoded._id;

    const userDetails = await User.findById(userId);

    if (!userDetails) {
      throw new Error("User not found");
    }

    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    userDetails.email = email;
    userDetails.phone = phone;
    userDetails.grade = grade;
    userDetails.skills = skills;
    userDetails.interests = interests;
    userDetails.projects = projects;
    userDetails.experiences = experiences;

    await userDetails.save();

    res.status(200).json(userDetails);
  } catch (error) {
    next(createHttpError(400, error as Error));
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth_token = req.headers["auth_token"] as string;
    const decoded = jwt.verify(auth_token, config.JWT_SECRET as string) as {
      _id: string;
    };

    const userId = decoded._id;

    const userDetails = await User.findById(userId);

    if (!userDetails) {
      throw new Error("User not found");
    }

    res.status(200).json(userDetails);
  } catch (error) {
    next(createHttpError(400, error as Error));
  }
};
