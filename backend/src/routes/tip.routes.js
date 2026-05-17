import express from "express";
import { getTip } from "../controllers/tip.controller.js";

export const tipRouter = express.Router();

tipRouter.get("/", getTip);