import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
    constructor() {}

    async getAllUsers(req: Request, res: Response) {
        try {
            const allUsers = await prisma.user.findMany();
            res.json(allUsers);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
    }

    async registerUser(req: Request, res: Response) {
        try {
            const userInfo = req.body;
            if (!userInfo.email) {
                return res.status(400).json({
                    status: 400,
                    message: "O email é obrigatório.",
                });
            }

            if (!userInfo.password) {
                return res.status(400).json({
                    status: 400,
                    message: "A senha é obrigatória.",
                });
            }

            const createdUser = await prisma.user.create({
                data: userInfo,
            });

            res.json({
                status: 200,
                user: createdUser,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: 500,
                message: err,
            });
        }
    }

    async modifyUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            const updatedData = req.body;

            const modifiedUser = await prisma.user.update({
                where: { id: userId },
                data: updatedData,
            });

            return res.json({
                status: 200,
                user: modifiedUser,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: 500,
                message: err,
            });
        }
    }

    async removeUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);

            await prisma.user.delete({
                where: { id: userId },
            });

            res.status(200).json({
                status: 200,
                message: "Usuário removido com sucesso.",
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "Erro ao remover o usuário.",
            });
        }
    }
}

export default new UserController();


