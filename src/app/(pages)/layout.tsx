"use client";

import { ToastContainer } from "@/components/bsToast"

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <ToastContainer />
            {children}
        </div>
    )
}
