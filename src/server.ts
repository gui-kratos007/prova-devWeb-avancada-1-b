import express from "express";
import userRouter from "./routes/UserRoutes";
import postRouter from "./routes/PostRoutes";
import commentRouter from "./routes/CommentRoutes";
import authRouter from "./routes/AuthRoutes";

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(authRouter);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
