import { cookies } from "next/headers"
import { db } from "@/lib/db";
import * as z from "zod"

const userCreateSchema = z.object({
    email: z.string().min(15),
    password: z.string(),
})

export async function POST(req: Request) {

    try{
        const json = await req.json()
        const body = userCreateSchema.parse(json.body)
        
        const isValidEmail = body.email.endsWith("@iiitdmj.ac.in")
        if(!isValidEmail) return new Response(JSON.stringify({header: "Invalid email id", description: "please enter a valid institute email"}), {status: 401})

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

        return new Response(JSON.stringify({header: "Internal server error", description: "There was an error in the server! please try again later"}), { status: 500 })

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