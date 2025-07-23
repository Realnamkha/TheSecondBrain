import { Router } from "express";
import {
  logOut,
  shareLink,
  signIn,
  signUp,
  viewShare,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/logout").get(verifyJWT, logOut);
router.route("/sharelink").post(verifyJWT, shareLink);
router.route("/view/:shareLink").get(viewShare);
export default router;
