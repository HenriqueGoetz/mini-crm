import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function list(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const { closed } = req.query;
    let columns;
    if (closed) {
      columns = await prisma.status.findMany({
        where: {
          name: "Finalizada",
        },
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
    } else {
      columns = await prisma.status.findMany({
        where: {
          name: {
            not: "Finalizada",
          },
        },
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
    }

    return res.json(columns);
  } catch (error) {
    console.error("Erro ao listar leads:", error);
    return res.status(500).json({ message: "Erro ao buscar leads" });
  }
}
