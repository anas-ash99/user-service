import express from "express";
import { createNewUser, signInUser, welcome } from "../controllers/UserController.js";

const router = express.Router();


router.get("/", welcome)
router.post("/", createNewUser)
router.post("/sign-in", signInUser)


export default router;