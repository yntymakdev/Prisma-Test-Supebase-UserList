// src/app/api/todo/get/[id]/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  if (method === "GET") {
    try {
      const todo = await prisma.todo.findUnique({
        where: { id: parseInt(id as string) },
      });

      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      return res.json(todo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Не удалось получить задачу" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Метод ${method} не разрешен`);
  }
}
