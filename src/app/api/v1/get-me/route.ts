import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();
export const GET = async (request: Request) => {
  try {
    const data = await prisma.user.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(data);
  }
};
export const POST = async (request: Request) => {
  const body = await request.json();
  const { firstName, lastName, email, password } = body;
  try {
    const newData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      creatAr: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };
    const data = await prisma.user.create({
      data: newData,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(data);
  }
};
