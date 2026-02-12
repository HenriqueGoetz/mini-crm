import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function list(req: Request, res: Response) {
  try {
    const statusIdsString = req.query.statusIds as string;
    const statusIds = statusIdsString
      ? statusIdsString.split(",").map((id) => parseInt(id))
      : [];

    let columns = await prisma.status.findMany({
      where: {
        id: {
          in: statusIds,
        },
      },
      orderBy: {
        id: "asc",
      },
      include: {
        leads: {
          include: {
            owner: {
              select: {
                id: true,
                username: true,
              },
            },
          },
          orderBy: {
            updatedAt: "asc",
          },
        },
      },
    });

    return res.json(columns);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar leads." });
  }
}
