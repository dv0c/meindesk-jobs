'use client'
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import BackgroundPattern from "@/components/ui/background-pattern"
import { Heading } from "@/components/ui/heading"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useEffect, useState } from "react"

const page = () => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsOpen(true)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [])

    return <div className="flex w-full flex-1 items-center justify-center px-4">
        <BackgroundPattern className="absolute inset-0 left-1/2 z-0 -translate-x-1/2 opacity-75" />

        <div className="relative z-10 flex justify-center mt-60 flex-col items-center gap-6 text-center">
            <LoadingSpinner size="md" />
            <Heading>Creating your account...</Heading>
            <p className="text-base/7 font-serif text-gray-600 max-w-prose">
                Just a moment while we set things up for you.
            </p>
        </div>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Your account need some changes</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="flex flex-col gap-4 p-4">
                    <p className="text-base/7 font-serif text-gray-600 max-w-prose">
                        null
                    </p>
                </div>
                <AlertDialogFooter></AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
}

export default page