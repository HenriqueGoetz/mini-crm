import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function list(req: Request, res: Response) {
  try {
    const allStatus = await prisma.status.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        leads: {
          orderBy: {
            updatedAt: "asc",
          },
        },
      },
    });

    return res.json(allStatus);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar status." });
  }
}
