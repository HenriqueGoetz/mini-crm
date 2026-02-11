import { Request, Response } from "express";
import prisma from "../../prismaClient";

export async function create(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const { name, email, phone, company, role, statusId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome do lead é obrigatório" });
    }

    try {
      const lead = await prisma.lead.create({
        data: {
          name,
          email: email || "",
          phone: phone || "",
          company: company || "",
          role: role || "",
          statusId: statusId || 1,
          ownerId: user.id,
        },
      });

      res.status(200).json(lead);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  } catch (error) {
    console.error("Erro ao criar lead:", error);
    return res.status(500).json({ message: "Erro ao criar lead" });
  }
}
