import express from "express";
import { createChannel } from "../controllers/channel.controller.js";

const router = express.Router();

router.post("/", createChannel);

export default router;