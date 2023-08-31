import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  // return session?.user
  return {
    id: "1234567",
    name: "dev user",
    image: "/og.jpg",
  }
}
