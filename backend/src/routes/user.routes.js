import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);