import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();

userRouter.get("/users", UserController.getAllUsers);
userRouter.post("/users", UserController.registerUser);
userRouter.put("/users/:id", UserController.modifyUser);
userRouter.delete("/users/:id", UserController.removeUser);

export default userRouter;

