import { Router } from "express";
import CommentController from "../controllers/CommentController";

const commentRouter = Router();

commentRouter.get("/comments", CommentController.getAllComments);
commentRouter.post("/comments", CommentController.createComment);
commentRouter.delete("/comments/:id", CommentController.removeComment);

export default commentRouter;

