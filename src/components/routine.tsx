import { db } from "@/lib/db"
import { type StudentnfoProps } from "@/types"

interface RoutineProps {
    data: {
        semester: number | undefined
        group: string | undefined
    }
}

const weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

function NoRoutine(){

    return (
        <div className="relative w-full">
            <div className="flex h-24 w-full space-x-2">
                <p className="m-auto rounded-md bg-secondary p-2">No classes today</p>
            </div>
        </div>
    )
}

export async function Routine({ data }: RoutineProps) {
    try {
        if(data.group !== "A"||"B"){
            return <NoRoutine />
        }

        const routine = await db.routine.findMany({
            where: {
                semester: data.semester,
                day: weekDays[(new Date).getDay()],
                group: data.group,
            }
        })
        routine.sort((a, b) => a.start - b.start)

        if (routine.length === 0) {
            return <NoRoutine />
        }

        return (
            <section className="relative w-full">
                <div className="flex h-24 w-full space-x-2 overflow-x-scroll">
                    {routine.map(classes => (
                        <div className="relative flex h-full w-80 min-w-[300px] max-w-[80%] flex-col items-center justify-center overflow-hidden rounded-md">
                            <div className="z-20 flex w-full justify-between overflow-hidden px-8">
                                <p>{classes.start.toString().padStart(4, "0").substring(0, 2)}:{classes.start.toString().padStart(4, "0").substring(2)}</p><p> - </p><p>{classes.end.toString().padStart(4, "0").substring(0, 2)}:{classes.end.toString().padStart(4, "0").substring(2)}</p>
                            </div>
                            <p className="z-20 whitespace-nowrap">{classes.subject_code} ({classes.subject_name})</p>
                            <p className="z-20">{classes.faculty}</p>
                            <span className={`absolute z-10 h-full w-full ${isActiveClass(classes.start, classes.end)}`}></span>
                        </div>
                    ))}
                </div>
            </section>
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