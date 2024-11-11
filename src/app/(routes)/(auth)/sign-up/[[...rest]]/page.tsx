import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <SignUp
                appearance={{
                    elements: {
                        formButtonPrimary:
                            "bg-primary text-primary-foreground hover:bg-primary/90",
                        socialButtonsBlockButton:
                            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                        formFieldInput:
                            "bg-background text-foreground",
                        footerActionLink:
                            "text-primary hover:text-primary/80",
                    },
                }}
            />

        </div>
    );
}