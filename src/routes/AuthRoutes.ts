import { Router } from "express";
import AuthController from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/auth/login", AuthController.login);
authRouter.post("/auth/register", AuthController.register);
authRouter.post("/auth/logout", AuthController.logout);

export default authRouter;
