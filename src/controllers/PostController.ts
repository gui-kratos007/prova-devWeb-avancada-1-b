import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostController {
    constructor() {}

    async getAllPosts(req: Request, res: Response) {
        try {
            const allPosts = await prisma.post.findMany();
            res.json(allPosts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async createPost(req: Request, res: Response) {
        try {
            const postDetails = req.body;
            const newPost = await prisma.post.create({
                data: {
                    user_id: postDetails.user_id,
                    content: postDetails.content,
                    image_url: postDetails.image_url || null,
                },
            });

            res.status(201).json({ post: newPost });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async updatePost(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.id);
            const updatedData = req.body;

            const updatedPost = await prisma.post.update({
                where: { id: postId },
                data: updatedData,
            });

            res.json({ post: updatedPost });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async removePost(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.id);
            await prisma.post.delete({ where: { id: postId } });

            res.status(200).json({ message: "Post removido com sucesso." });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Erro ao remover o post." });
        }
    }
}

export default new PostController();
