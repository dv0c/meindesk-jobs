import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { searchParams } = new URL(request.url);
  const isFirstSetup = searchParams.get("first-setup") === "true";

  const { firstName, lastName, username, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);

  if (isFirstSetup) {
    try {
      const existingAdmin = await db.user.findFirst({
        where: { role: "ADMIN" },
      });

      if (existingAdmin) {
        return NextResponse.json(
          { message: "Admin account already exists" },
          { status: 403 }
        );
      }

      const user = await db.user.create({
        data: {
          name: firstName,
          firstName,
          lastName,
          username,
          email,
          emailVerified: new Date(),
          hashedPassword,
          role: "ADMIN",
        },
      });

      return NextResponse.json(
        { message: "Admin account created successfully", user },
        { status: 201 }
      );
    } catch (error) {
      console.error("Registration error:", error);
      return NextResponse.json(
        { message: "An error occurred during registration" },
        { status: 500 }
      );
    }
  }

  if (!email) return NextResponse.json("Email is required", { status: 400 });

  const EmailValidate = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (EmailValidate)
    return NextResponse.json("Email already exists", { status: 400 });

  const user = await db.user.create({
    data: {
      email,
      name: username,
      username,
      emailVerified: new Date(),
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
