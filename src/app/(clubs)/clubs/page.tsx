import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ClubsList } from "@/components/clubs-list"
import { Icons } from "@/components/icons"

export const metadata = {
    title: "Clubs",
}

export default async function DashboardPage() {
    const clubs = [
        {
            name: "Football"
        }, {
            name: "Football"
        }, {
            name: "Football"
        }, {
            name: "Football"
        }, {
            name: "Football"
        }, {
            name: "Football"
        }, {
            name: "Football"
        }, {
            name: "Football"
        }, {
            name: "Football"
        },
    ]

    return (
        <div className="w-full p-2">
            <div className="flex w-full">
                <Input className="mr-1 h-10 w-[90%]" placeholder="Search Clubs..." />
                <Button className="h-10 w-[10%]" variant="default">
                    <Icons.search className="h-6 w-6" />
                </Button>
            </div>
            <ClubsList clubs={clubs} />
        </div>
    )
}
