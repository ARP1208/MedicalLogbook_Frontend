import express from "express";
import { parent } from "../controllers/studentcontroller.js";

const router = express.Router();

router.route("/parent-details").post(parent);

// // Route to save a new parent
// router.post('/parent-details', async (req, res) => {
//   try {
//     await parent(req, res);
//   } finally {
//     // No need to close the database connection here
//   }
// });


export default router;