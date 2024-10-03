import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CheckUserPassword } from "../utils/HashPasswords";

const prisma = new PrismaClient();

class AuthController {
    constructor() {}

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Email e senha são obrigatórios.",
                });
            }

            const user = await prisma.user.findFirst({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: "Email não encontrado." });
            }

            const isPasswordValid = await CheckUserPassword(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Usuário ou senha inválidos." });
            }

            return res.status(200).json({
                token: "token_de_exemplo",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async register(req: Request, res: Response) {
        // Implementar lógica de registro
    }

    async logout(req: Request, res: Response) {
        // Implementar lógica de logout
    }
}

export default new AuthController();
