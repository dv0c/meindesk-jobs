import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(res: Response) {
    const auth = await currentUser()

    if (!auth) {
      return NextResponse.json({ isSynced: false })
    }

    const user = await db.user.findFirst({
        where: { externalId: auth.id },
      })

    if (!user) {
        await db.user.create({
          data: {
            externalId: auth.id,
            email: auth.emailAddresses[0].emailAddress,
          },
        })
      }
  
      return NextResponse.json({ isSynced: true })

}