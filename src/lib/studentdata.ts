"use server"
import { cookies } from "next/headers"

import { type StudentInfoProps } from "@/types"
import { db } from "@/lib/db"

export async function getStudentData(): Promise<StudentInfoProps | null>{
    let data = cookies().get("id")
    let email = cookies().get("email")

    if(!data?.value || !email?.value) return null

    const studentData = await db.student.findUnique({
        where: {
            id: data.value
        },
        select: {
            image: true,
            name: true,
            year: true,
            programme: true,
            semester: true,
            branch: true,
            group: true,
            roll: true
        }
    })

    return{
        email: email.value,
        name: studentData?.name || null,
        image: studentData?.image || null,
        year: studentData?.year || null,
        programme: studentData?.programme || null,
        semester: 1,
        branch: studentData?.branch || null,
        group: studentData?.group || null,
        roll: studentData?.roll || null
    }
}