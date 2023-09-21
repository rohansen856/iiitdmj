import { z } from "zod"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { userNameSchema } from "@/lib/validations/user"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function PATCH(
  req: Request
) {
  try {

    // Ensure user is authentication and has access to this user.
    const session = await getCurrentUser()
    if (!session?.id) {
      return new Response(null, { status: 403 })
    }
    // Get the request body and validate it.
    const body = await req.json()
    const payload = userNameSchema.parse(body)

    // Update the user.
    await db.student.update({
      where: {
        id: session.id,
      },
      data: {
        name: payload.name,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
