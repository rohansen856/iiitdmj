import Link from "next/link"
import { redirect } from "next/navigation"

import { getStudentData } from "@/lib/studentdata"
import { ProfileInfo } from "@/components/profile-info"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Routine } from "@/components/routine"

export const metadata = {
    title: "Dashboard",
}

export default async function Profile() {
    const user = await getStudentData()
    if(!user) return redirect("/login")

    return (
        <div className="w-full">
            <ProfileInfo data={user} />
            <Separator className="my-2" />
            {"@ts-expext-error"}
            <Routine data={user} />
            <Separator className="my-2" />
            <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                <Button variant={"default"}><Link href={"/clubs"} className="h-full w-full">Club Activities</Link></Button>
                <Button variant={"default"}>Your Seniors</Button>
                <Button variant={"default"}>
                    Notifications
                    <Badge className="absolute ml-56 rounded-full border border-blue-950 bg-cyan-700 p-1 text-xs">
                        1
                    </Badge>
                </Button>
            </div>
        </div>
    )
}