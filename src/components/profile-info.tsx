
interface ProfileInfoProps {
    data?: any
}

export function ProfileInfo({ data }: ProfileInfoProps) {
    return (
        <div className="relative flex w-full flex-col items-center justify-center">
            <div className="m-5 mt-0 h-32 w-32 rounded-full border bg-slate-800">

            </div>
            <div className="h-24 w-full bg-slate-800"></div>
        </div>
    )
}