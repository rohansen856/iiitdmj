"use server"
import { cookies } from "next/headers"

import { type StudentnfoProps } from "@/types"

export async function getStudentData(): Promise<StudentnfoProps | null>{
    let data = cookies().get("email")

    if(!data?.value) return null

    const email = data.value.toUpperCase()

    return{
        name: "rohan",
        email: email,
        image: null,
        year: (parseInt(email.slice(0, 2))-(new Date()).getFullYear()+2001),
        //@ts-expect-error
        programme: email.slice(2, 3)+". Tech",
        semester: 1,
        //@ts-expect-error
        branch: email.slice(3, 5),
        group: "B",
        roll: parseInt(email.slice(5, 8))
    }
}