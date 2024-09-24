import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const body = await req.json();
  const { title, description } = body;
  try {
    await prisma.todo.create({
      data: { title, description },
    });
    return NextResponse.json(
      { message: "Success createAt Todo" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
