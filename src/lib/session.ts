"use server"

import { cookies } from "next/headers"

export async function getCurrentUser() {
  const user = {id: cookies().get("id"), email: cookies().get("email")}

  if(user.id) return user

  return null

  return {
    id: "1256tg",
    name: "dev user",
    email: "rcsen@iiitdmj",
    image: "/images/avatars/shadcn.png",
  }
}
