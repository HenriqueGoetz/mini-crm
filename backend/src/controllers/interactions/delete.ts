import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function deleteInteraction(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const id = req.params.id as string;
    const interactionId = req.params.interaction as string;

    const lead = await prisma.lead.findUnique({
      where: {
        id: parseInt(id),
        ownerId: user.id,
      },
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead não encontrado" });
    }

    try {
      const interaction = await prisma.interaction.delete({
        where: {
          id: parseInt(interactionId),
        },
      });
      res.status(200).json(interaction);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao remover interação" });
    }
  } catch (error) {
    console.error("Erro ao remover interação:", error);
    return res.status(500).json({ message: "Erro ao remover interação" });
  }
}
