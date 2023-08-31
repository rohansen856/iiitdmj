import { Skeleton } from "@/components/ui/skeleton"

export default function Profile() {

    return (
        <div className="min-h-[50vh] w-full">
            <div className="relative flex w-full flex-col items-center justify-center">
                <Skeleton className="m-5 h-32 w-32 rounded-full border bg-slate-800" />
                <Skeleton className="h-24 w-full bg-slate-800" />
            </div>
        </div>
    )
}