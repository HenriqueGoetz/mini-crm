import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function deleteInteraction(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const interactionId = req.params.interactionId as string;

    try {
      const interaction = await prisma.interaction.delete({
        where: {
          id: parseInt(interactionId),
          userId: user.id,
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
