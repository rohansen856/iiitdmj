"use client";

import { redirect } from "next/navigation";
import { ButtonHTMLAttributes, forwardRef } from "react";

import { toast } from "@/components/ui/use-toast"
import { UploadButton } from "@/lib/upload";

export interface ImageUploadButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ImgUploadButton = forwardRef<HTMLButtonElement, ImageUploadButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <UploadButton
            appearance={{
                button: "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-none after:bg-orange-400 w-full h-full rounded-none",
                container: "w-full h-full flex-row rounded-md border-cyan-300 bg-blue-500",
                allowedContent: "w-0 h-0 hidden",
            }}
            className={className}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
            // Do something with the response
            return toast({
                title: "Success!",
                description: "Your profile image has been updated successfully.",
                variant: "default",
            })
            redirect("/dashboard/settings")
            }}
            onUploadError={(error: Error) => {
            // Do something with the error.
            return toast({
                title: "Error!",
                description: "There was an error while uploading the image.",
                variant: "destructive",
            })
            }}
        />
        )
    }
)
ImgUploadButton.displayName = "Button"

export { ImgUploadButton }