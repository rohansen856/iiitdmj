import { db } from "@/lib/db"
// import { Routine } from "@prisma/client"

interface RoutineProps {
    semester: number
}

export async function Routine({ semester }: RoutineProps) {
    // const routine = await db.routine.findFirst({
    //     where: {
    //         semester,
    //         day: "monday",
    //         group: "A",
    //     }
    // })

    return (
        <div className="relative w-full">
            <div className="flex h-24 space-x-2 w-full overflow-x-scroll bg-slate-800">
                {[1, 2, 3, 4, 5].map(i => (
                    <div className="h-full w-80 min-w-[300px] max-w-full bg-blue-500"></div>
                ))}
            </div>
        </div>
    )
}