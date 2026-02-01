import { Router } from "express";
import {
  createSession,
  getMySessions,
  getSessionById,
  deleteSession,
} from "../controllers/sessionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/create").post(protect, createSession);
router.route("/my-sessions").get(protect, getMySessions);

router
  .route("/:id")
  .get(protect, getSessionById)
  .delete(protect, deleteSession);

export default router;
