import { Router } from "express";
import PostController from "../controllers/PostController";

const postRouter = Router();

postRouter.get("/posts", PostController.getAllPosts);
postRouter.post("/posts", PostController.createPost);
postRouter.put("/posts/:id", PostController.updatePost);
postRouter.delete("/posts/:id", PostController.removePost);

export default postRouter;

