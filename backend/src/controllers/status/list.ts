import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function list(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const allStatus = await prisma.status.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        leads: {
          where: {
            ownerId: user.id,
          },
          orderBy: {
            updatedAt: "asc",
          },
        },
      },
    });

    return res.json(allStatus);
  } catch (error) {
    console.error("Erro ao listar status:", error);
    return res.status(500).json({ message: "Erro ao buscar status" });
  }
}
