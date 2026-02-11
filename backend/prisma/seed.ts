import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.status.createMany({
    data: [
      { name: "Novo Lead" },
      { name: "Contato Realizado" },
      { name: "Diagnóstico" },
      { name: "Proposta Enviada" },
      { name: "Negociação Aberta" },
      { name: "Finalizada" },
    ],
    skipDuplicates: true,
  });

  console.log("Status inseridos com sucesso");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
