import { Router } from "express";
import {
  createContent,
  deleteContent,
  getContent,
} from "../controllers/content.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();
router.route("/").post(verifyJWT, createContent);
router.route("/").get(verifyJWT, getContent);
router.route("/:id").delete(verifyJWT, deleteContent);
export default router;
