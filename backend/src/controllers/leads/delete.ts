import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function deleteLead(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const id = req.params.id as string;

    const lead = await prisma.lead.delete({
      where: {
        id: parseInt(id),
        ownerId: user.id,
      },
    });
    res.status(200).json(lead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno" });
  }
}
