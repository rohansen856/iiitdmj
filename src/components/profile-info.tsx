import Image from "next/image"

interface ProfileInfoProps {
    data?: any
}

export function ProfileInfo({ data }: ProfileInfoProps) {
    return (
        <div className="relative flex w-full flex-col items-center justify-center">
            <div className="relative m-5 mt-0 h-32 w-32 rounded-full border bg-secondary">
                <Image src="/images/avatars/shadcn.png" alt="U" fill />
            </div>
            <div className="h-24 w-full bg-secondary"></div>
        </div>
    )
}