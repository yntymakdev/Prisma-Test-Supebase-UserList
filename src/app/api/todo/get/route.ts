import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const data = await prisma.todo.findMany();
    return NextResponse.json(
      { message: "Success createAt Todo", data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
