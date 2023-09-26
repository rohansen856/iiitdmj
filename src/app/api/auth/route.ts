import { cookies } from "next/headers"
import { db } from "@/lib/db";
import * as z from "zod"
import { type StudentInfoProps } from "@/types";

const userCreateSchema = z.object({
    email: z.string().min(15),
    password: z.string(),
})

interface StudentDataProps extends StudentInfoProps {
    isValid: boolean
}

function validateData(email: string) {
    let isValid: boolean = true
    email = email.toUpperCase()

    const year: number = (parseInt(email.slice(0, 2))-(new Date()).getFullYear()+2001)
    const programme: string = email.slice(2, 3)
    const semester: number = 1
    const branch: string = email.slice(3, 5)
    const group: "A" | "B" = "B"
    const roll: number = parseInt(email.slice(5, 8))

    if(!email.endsWith("@IIITDMJ.AC.IN")) isValid = false
    if(year < 1 || year > 6) isValid = false
    if(programme !== "B" && "M" && "P") isValid = false
    if(semester < 1 || semester > 10) isValid = false
    if(branch !== "CS" && "EC" && "ME" && "SM" && "DS") isValid = false
    if(group !== "B") isValid = false
    if(roll < 1 || roll > 500) isValid = false
    return {
        isValid, email, year, programme, semester, branch, group, roll
    }
}

export async function POST(req: Request) {

    try{
        const json = await req.json() as any
        const body = userCreateSchema.parse(json.body)
        
        const filteredData = validateData(body.email)
        if(!filteredData.isValid) return new Response(JSON.stringify({header: "Invalid email id", description: "please enter a valid institute email"}), {status: 401})

        const isExistingUser = await db.student.findUnique({
            select: {
                id: true,
                email: true
            },
            where: {
                email: body.email.toLowerCase(),
            },
        })
        if(isExistingUser) return new Response(JSON.stringify({header: "email already exists", description: "This email id is already registered. Please try logging in"}), {status: 405})

        const newUser = await db.student.create({
            data: {
                email: body.email.toLowerCase(),
                password: body.password,
                year: filteredData.year,
                // @ts-expect-error
                programme: filteredData.programme,
                semester: filteredData.semester,
                // @ts-expect-error
                branch: filteredData.branch,
                roll: filteredData.roll,
                group: filteredData.group,
            },
            select: {
                id: true,
                email: true
            },
        })
        if(newUser) {
            cookies().set("id", newUser.id, { secure: true })
            cookies().set("email", newUser.email, { secure: true })
            return new Response(JSON.stringify({body: newUser}), {status: 201})
        }

        return new Response(JSON.stringify({header: "Internal server error", description: "There was an error in the server! please try again later", filteredData}), { status: 500 })

    }catch(error){
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify({header: "Fatal server error!" , description: error.issues}), { status: 422 })
        }
        return new Response(JSON.stringify({header: "Internal server error", description: "There was an error in the server! please try again later"}), { status: 500 })
    }
}

export async function GET(req: Request) {
    
    try{
        const email = (new URL(req.url)).searchParams.get("email")
        const password = (new URL(req.url)).searchParams.get("password")
        const data = { email, password }

        const isValidEmail = data?.email?.endsWith("@iiitdmj.ac.in")
        if(!isValidEmail) return new Response(JSON.stringify({header: "Invalid email id", description: "please enter a valid institute email"}), {status: 401})

        const body = userCreateSchema.parse(data)

        const user = await db.student.findUnique({
            select: {
                id: true,
                email: true
            },
            where: {
                email: body.email,
                password: body.password
            },
        })
        if(!user) return new Response(JSON.stringify({header: "Invalid email or password", description: "The email id and password you entered is wrong or user does not exist!"}), {status: 404})

        if(user && user.id){
            cookies().set("id", user.id, { secure: true })
            cookies().set("email", user.email, { secure: true })
            return new Response(JSON.stringify({body: user}), {status: 200})
        }

        return new Response(JSON.stringify({header: "Internal server error", description: "There was an error in the server! please try again later"}), { status: 500 })

    }catch(error){
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify({header: "Fatal server error!" , description: error.issues}), { status: 422 })
        }
        return new Response(JSON.stringify({header: "Internal server error", description: "There was an error in the server! please try again later"}), { status: 500 })
    }
}