import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface ClubsListProps {
    clubs: { name: string }[]
}

export function ClubsList({ clubs }: ClubsListProps) {

    return (
        <div className="mt-3 w-full">
            {
                clubs.map(club =>
                    <div key={club.name} className="my-1 flex h-16 w-full items-center rounded bg-secondary px-2">
                        <Avatar>
                            <AvatarImage alt="Picture" src={"/images/avatars/shadcn.png"} />

                            <AvatarFallback>
                                <span className="sr-only">p</span>
                            </AvatarFallback>
                        </Avatar>
                        <h3 className="m-auto ml-7">{club.name}</h3>
                    </div>
                )
            }
        </div>
    )
}