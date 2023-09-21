"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
    cookies().delete("email")
    cookies().delete("id")

    return redirect("/")
}