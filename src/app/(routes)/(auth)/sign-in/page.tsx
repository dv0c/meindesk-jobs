'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    email: z.string().min(2, { message: "Email must be at least 2 characters" }).email({ message: "Email must be valid" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }).max(50, {
        message: "Password must be less than 50 characters"
    })
})

export default function SignIn() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false
            })

            if (result?.error) {
                throw new Error(result.error)
            }

            router.push("/")
        } catch (error: any) {
            console.error("Login failed:", error)
            setError("Login failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Card className="w-[400px] mx-auto shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="space-y-1 text-center">
                    <h2 className="text-lg font-semibold">Sign in to Meindesk Jobs</h2>
                    <p className="text-sm text-gray-500">Welcome back! Please sign in to continue</p>
                </CardHeader>
                <CardContent className="space-y-5 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full h-10 text-sm font-normal">
                            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </Button>
                        <Button variant="outline" className="w-full h-10 text-sm font-normal">
                            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">or</span>
                        </div>
                    </div>
                    <Form {...form}>
                        <form id="123" className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
                                <Input
                                    id="email"
                                    {...form.register("email")}
                                    className="w-full h-9 text-sm"
                                />
                                {form.formState.errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {form.formState.errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type="password"
                                        {...form.register("password")}
                                        className="w-full h-9 text-sm pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="absolute inset-y-0 right-0 h-9 px-2 hover:bg-transparent"
                                        onClick={() => {
                                            const input = document.getElementById('password') as HTMLInputElement;
                                            input.type = input.type === 'password' ? 'text' : 'password';
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </Button>
                                </div>
                                {form.formState.errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {form.formState.errors.password.message}
                                    </p>
                                )}
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs mt-1">
                                    {error}
                                </p>
                            )}
                            <div className="p-5 w-full">
                                <Button type="submit" disabled={isLoading} className="w-full transition-all h-8 text-sm">
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 p-0">
                    <div className="bg-muted w-full py-4 flex items-center justify-center h-full">
                        <p className="text-sm text-center text-gray-500">
                            {"Don't have an account? "}
                            <Link href="/sign-up" className="text-blue-600 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}