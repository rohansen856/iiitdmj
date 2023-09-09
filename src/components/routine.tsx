import { db } from "@/lib/db"
import { User } from "@prisma/client"

interface RoutineProps {
    user: Omit<User, "createdAt" | "updatedAt">
    semester: number
}

const weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

export async function Routine({ user, semester = 1 }: RoutineProps) {
    try {
        const routine = await db.routine.findMany({
            where: {
                semester,
                day: weekDays[(new Date).getDay()],
                group: "B",
            }
        })
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
                        <div className={`flex h-full w-80 min-w-[300px] max-w-[80%] flex-col items-center justify-center rounded-md ${isActiveClass(classes.start, classes.end)}`}>
                            <div className="flex w-full justify-between px-8">
                                <p>{classes.start.toString().padStart(4, "0").substring(0, 2)}:{classes.start.toString().padStart(4, "0").substring(2)}</p><p> - </p><p>{classes.end.toString().padStart(4, "0").substring(0, 2)}:{classes.end.toString().padStart(4, "0").substring(2)}</p>
                            </div>
                            <p>{classes.subject_code} ({classes.subject_name})</p>
                            <p>{classes.faculty}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    } catch (err) {
        return (
            <div className="relative w-full">
                <div className="flex h-24 w-full space-x-2 bg-secondary">
                    <p className="m-auto rounded-md p-2 text-red-700">Error fetching Routine!</p>
                </div>
            </div>
        )
    }
}

function isActiveClass(start: number, end: number): string {
    const currentTime = (new Date()).getHours() * 100
    if (currentTime >= start && currentTime <= end) {
        return "bg-yellow-500"
    }

    return "bg-secondary"
}