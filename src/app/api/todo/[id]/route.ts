import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> => {
  const id = parseInt(params.id);

  // Проверяем, является ли id числом
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    // Получаем задачу по ID
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    // Проверяем, существует ли задача
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Возвращаем задачу
    return NextResponse.json({ success: true, todo }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching todo:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    // Отключаемся от базы данных
    await prisma.$disconnect();
  }
};
