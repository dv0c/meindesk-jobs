import BackgroundPattern from "@/components/ui/background-pattern"
import { Heading } from "@/components/ui/heading"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const page = () => {
    return <div className="flex w-full flex-1 items-center justify-center px-4">
        <BackgroundPattern className="absolute inset-0 left-1/2 z-0 -translate-x-1/2 opacity-75" />

        <div className="relative z-10 flex justify-center mt-60 flex-col items-center gap-6 text-center">
            <LoadingSpinner size="md" />
            <Heading>Creating your account...</Heading>
            <p className="text-base/7 font-serif text-gray-600 max-w-prose">
                Just a moment while we set things up for you.
            </p>
        </div>
    </div>
}

export default page