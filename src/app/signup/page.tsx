import Link from 'next/link';

export default function SignupPage() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg max-w-md w-full border text-center">
                <h1 className="text-2xl font-bold mb-4">Create Account</h1>
                <p className="text-muted-foreground mb-8">
                    Join us to track your health journey.
                </p>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="w-full px-4 py-2 rounded-lg border bg-background" disabled />
                        <input type="text" placeholder="Last Name" className="w-full px-4 py-2 rounded-lg border bg-background" disabled />
                    </div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-lg border bg-background"
                        disabled
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded-lg border bg-background"
                        disabled
                    />
                    <button disabled className="w-full py-2 bg-primary text-white rounded-lg opacity-50 cursor-not-allowed">
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-sm">
                    Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
                </div>
            </div>
        </div>
    );
}
