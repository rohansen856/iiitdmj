import { getCurrentUser } from "@/lib/session"
import { ProfileInfo } from "@/components/profile-info"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function Profile() {
    const user = await getCurrentUser()

    return (
        <div className="w-full">
            <ProfileInfo data={user} />
            <Separator className="my-2" />
            <div className="mx-auto grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                <Button>Club Activities</Button>
                <Button>Your Seniors</Button>
                <Button>
                    Notifications
                    <Badge className="absolute self-end rounded-full bg-cyan-700 p-1 text-xs">
                        1
                    </Badge>
                </Button>
            </div>
        </div>
    )
}