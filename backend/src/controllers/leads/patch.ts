import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function patch(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const leadId = req.params.id as string;
    const { name, email, phone, company, role, value, statusId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome do lead é obrigatório" });
    }

    if (value && typeof value !== "number") {
      return res
        .status(400)
        .json({ message: "O valor do lead deve ser um número" });
    }

    const status = await prisma.status.findUnique({
      where: {
        id: parseInt(statusId),
      },
    });

    if (!status) {
      return res.status(400).json({ message: "Status do lead inválido" });
    }

    try {
      const lead = await prisma.lead.update({
        where: { id: parseInt(leadId), ownerId: user.id },
        data: {
          name,
          email: email || "",
          phone: phone || "",
          company: company || "",
          role: role || "",
          value: value || 0,
          statusId: parseInt(statusId),
        },
      });

      res.status(200).json(lead);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao editar lead" });
  }
}
