import Link from 'next/link';
// import { Button } from './ui/button';
// To avoid error if UI component doesn't exist yet, I'll inline the button styles or use HTML button if needed, 
// but I'll create the UI button right after.

export default function Navbar() {
    return (
        <nav className="border-b bg-white dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">+</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Diagnostic
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
                    <Link href="/symptoms" className="hover:text-primary transition-colors">Symptom Checker</Link>
                    <Link href="/diseases" className="hover:text-primary transition-colors">Disease Encyclopedia</Link>
                    <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-sm font-medium hover:text-primary">
                        Log In
                    </Link>
                    <Link href="/signup">
                        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
