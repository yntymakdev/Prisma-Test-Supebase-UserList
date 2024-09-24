import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, todo }, { status: 200 });
  } catch (error) {
    console.error("Error fetching todo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
