import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentController {
    constructor() {}

    async getAllComments(req: Request, res: Response) {
        try {
            const allComments = await prisma.comment.findMany();
            res.json(allComments);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async createComment(req: Request, res: Response) {
        try {
            const commentDetails = req.body;
            const newComment = await prisma.comment.create({
                data: {
                    post_id: commentDetails.post_id,
                    user_id: commentDetails.user_id,
                    content: commentDetails.content,
                },
            });

            res.status(201).json({ comment: newComment });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async removeComment(req: Request, res: Response) {
        try {
            const commentId = parseInt(req.params.id);
            await prisma.comment.delete({ where: { id: commentId } });

            res.status(200).json({ message: "Comentário removido com sucesso." });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Erro ao remover o comentário." });
        }
    }
}

export default new CommentController();

