import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function create(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const id = req.params.id as string;

    const lead = await prisma.lead.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead não encontrado" });
    }

    const { type, notes, date } = req.body;

    if (!type) {
      return res
        .status(400)
        .json({ message: "O tipo de interação é obrigatório" });
    }

    if (!date || isNaN(Date.parse(date))) {
      return res.status(400).json({
        message: "A data da interação é obrigatória e deve ser válida",
      });
    }

    try {
      const interaction = await prisma.interaction.create({
        data: {
          type,
          notes: notes || "",
          leadId: lead.id,
          userId: user.id,
          date: new Date(date),
        },
      });
      res.status(201).json(interaction);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar interação" });
  }
}
