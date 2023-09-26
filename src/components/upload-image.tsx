"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import React from "react";

import { UploadButton } from "@/lib/upload";

export interface ImageUploadButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ImgUploadButton = React.forwardRef<HTMLButtonElement, ImageUploadButtonProps>(
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
            console.log("Files: ", res);
            alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
            }}
        />
        )
    }
)
ImgUploadButton.displayName = "Button"

export { ImgUploadButton }