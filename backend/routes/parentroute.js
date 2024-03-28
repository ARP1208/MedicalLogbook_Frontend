import express from "express";
import { parent } from "../controllers/studentcontroller.js";

const router = express.Router();

////////////Admin Registration Component/////////////
router.route("/parent-details").post(parent);

export default router;