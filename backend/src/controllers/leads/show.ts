import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function show(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    try {
      const lead = await prisma.lead.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          owner: {
            select: {
              id: true,
              username: true,
            },
          },
          interactions: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
            orderBy: {
              date: "desc",
            },
          },
        },
      });

      if (!lead) {
        return res.status(404).json({ message: "Lead não encontrado" });
      }

      res.status(200).json(lead);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar lead" });
  }
}
