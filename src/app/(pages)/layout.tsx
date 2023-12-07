import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'BS ST Store',
    description: 'View date and table vise number generated',
}

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}
