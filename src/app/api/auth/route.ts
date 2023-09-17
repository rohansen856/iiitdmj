import { cookies } from "next/headers"
import { db } from "@/lib/db";
import * as z from "zod"

const userCreateSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export async function POST(req: Request) {

    try{
        const json = await req.json()
        const body = userCreateSchema.parse(json.body)
        
        const isValidEmail = body.email.endsWith("@iiitdmj.ac.in")
        if(!isValidEmail) return new Response(JSON.stringify({message: "please enter a valid institute email"}), {status: 401})

        const isExistingUser = await db.student.findUnique({
            select: {
                id: true,
                email: true
            },
            where: {
                email: body.email.toLowerCase(),
            },
        })
        if(isExistingUser) return new Response(JSON.stringify({message: "email already exists"}), {status: 405})

        const newUser = await await db.student.create({
            data: {
                email: body.email.toLowerCase(),
                password: body.password,
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

        return new Response(JSON.stringify({status: 500, message: "There was an error please try again later"}))

    }catch(error){
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }
    }
}

export async function GET(req: Request) {
    
    try{
        const json = await req.json()
        const body = userCreateSchema.parse(json)

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
        if(!user) return new Response(JSON.stringify({message: "user does not exist"}), {status: 404})

        return new Response(JSON.stringify({body: user}), {status: 200})

    }catch(error){
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }
    }
}