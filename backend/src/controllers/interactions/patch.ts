import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function patch(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const id = req.params.id as string;
    const interactionId = req.params.interactionId as string;

    const lead = await prisma.lead.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead não encontrado." });
    }

    const interaction = await prisma.interaction.findUnique({
      where: {
        id: parseInt(interactionId),
        userId: user.id,
      },
    });

    if (!interaction) {
      return res.status(404).json({ message: "Interação não encontrada." });
    }

    const { type, notes, date } = req.body;

    if (!type) {
      return res
        .status(400)
        .json({ message: "O tipo de interação é obrigatório." });
    }

    if (!date || isNaN(Date.parse(date))) {
      return res.status(400).json({
        message: "A data da interação é obrigatória e deve ser válida.",
      });
    }

    try {
      const updatedInteraction = await prisma.interaction.update({
        where: {
          id: interaction.id,
        },
        data: {
          type,
          notes: notes || "",
          date: new Date(date),
        },
      });
      res.status(200).json(updatedInteraction);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar interação." });
    }
  } catch (error) {
    console.error("Erro ao atualizar interação:", error);
    return res.status(500).json({ message: "Erro ao atualizar interação." });
  }
}
