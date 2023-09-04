import { db } from "@/lib/db"

interface RoutineProps {
    semester: number
}

export async function Routine({ semester = 1 }: RoutineProps) {
    const routine = await db.routine.findMany({
        where: {
            semester,
            day: "MONDAY",
            group: "B",
        }
    })
    routine[0] = routine[0]
    routine[1] = routine[0]
    routine[2] = routine[0]
    routine[3] = routine[0]
    routine[4] = routine[0]
    routine.sort((a, b) => a.start - b.start)

    if (routine.length === 0) {
        return (
            <div className="relative w-full">
                <div className="flex h-24 w-full space-x-2">
                    <p className="m-auto rounded-md bg-secondary p-2">No classes today</p>
                </div>
            </div>
        )
    }

    return (
        <div className="relative w-full">
            <div className="flex h-24 w-full space-x-2 overflow-x-scroll">
                {routine.map(classes => (
                    <div className="flex h-full w-80 min-w-[300px] max-w-[80%] flex-col items-center justify-center bg-secondary">
                        <p>{classes.start.toString().substring(0, 2)}:{classes.start.toString().substring(2, 4)} - {classes.end.toString().substring(0, 2)}:{classes.end.toString().substring(2, 4)}</p>
                        <p>{classes.subject_code} ({classes.subject_name})</p>
                        <p>{classes.faculty}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}