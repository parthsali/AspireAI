// User Router
import express from "express";
import { register, login, getUser, uploadData } from "./userController";
import { auth } from "../../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", auth, getUser);
userRouter.put("/", auth, uploadData);

export default userRouter;
