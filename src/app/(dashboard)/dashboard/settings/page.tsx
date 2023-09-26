import { redirect } from "next/navigation"
import Image from "next/image"

import { getStudentData } from "@/lib/studentdata"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"
import { ImgUploadButton } from "@/components/upload-image"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user || !user.id) {
    redirect("/login")
  }

  const student = await getStudentData()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border border-blue-950 bg-slate-400">
          {student?.image 
          ? <Image src={student.image} alt="" fill />
          : <ImgUploadButton className="relative m-0 p-0" />
          }
        </div>
        <UserNameForm user={{ id: user.id, name: student?.name || null }} />
      </div>
    </DashboardShell>
  )
}
