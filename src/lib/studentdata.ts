import { type Student } from "@prisma/client"

export async function getStudentData(): Promise<Student>{
    return{
        id: "i2iwwij",
        name: "rohan",
        email: "23bcs212@iiitdmj.ac.in",
        image: "/",
        year: 1,
        programme: "B",
        semester: 1,
        branch: "CS",
        group: "B",
        roll: 212
    }
}