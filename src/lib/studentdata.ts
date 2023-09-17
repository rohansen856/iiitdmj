"use server"

import { cookies } from "next/headers"

export async function getStudentData(){
    const data = cookies().get("email")

    if(!data?.value) return null

    const email = data.value.toUpperCase()

    return{
        name: "rohan",
        email: email,
        image: null,
        year: (parseInt(email.slice(0, 2))-(new Date()).getFullYear()+2001),
        programme: email.slice(2, 3)+". Tech",
        semester: 1,
        branch: email.slice(3, 5),
        group: "B",
        roll: parseInt(email.slice(5, 8))
    }
}