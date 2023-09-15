import Image from "next/image"
import { type Student } from "@prisma/client"

interface ProfileInfoProps {
    data: Student
}

export function ProfileInfo({ data }: ProfileInfoProps) {
    return (
        <section className="relative flex w-full flex-col items-center justify-center">
            <div className="relative m-5 mt-0 h-32 w-32 rounded-full border bg-secondary">
                <Image src="/images/avatars/shadcn.png" alt="U" fill />
            </div>
            <div className="h-24 w-full bg-secondary">
                <p className="w-full text-center">{data.email}</p>
                <div className="flex justify-between p-7">
                    <p> name: {data.name}</p>
                    <p> year: {data.year}</p>
                    <p> semester: {data.semester}</p>
                    <p> programme: {data.programme}</p>
                    <p> branch: {data.branch}</p>
                </div>
            </div>
        </section>
    )
}