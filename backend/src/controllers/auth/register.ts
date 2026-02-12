import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prismaClient";

const JWT_SECRET = process.env.JWT_SECRET as string;

const SALT_ROUNDS = 10;

export async function register(req: Request, res: Response) {
  const { username, password, crmPassword } = req.body;

  if (crmPassword !== (process.env.CRM_PASSWORD as string)) {
    return res
      .status(403)
      .json({ message: "Senha de acesso ao CRM incorreta." });
  }

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username e senha são obrigatórios" });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return res.status(409).json({ message: "Username já em uso." });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
      },
      select: {
        id: true,
        username: true,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    return res.status(201).json({ username, token });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro ao criar usuário" });
  }
}
