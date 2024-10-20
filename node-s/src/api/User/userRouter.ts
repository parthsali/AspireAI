// User Router
import express from "express";
import { register, login, getUser, uploadData } from "./userController";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", getUser);
userRouter.put("/", uploadData);
export default userRouter;
