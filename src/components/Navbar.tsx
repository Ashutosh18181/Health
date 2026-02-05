import Link from 'next/link';
// import { Button } from './ui/button';
// To avoid error if UI component doesn't exist yet, I'll inline the button styles or use HTML button if needed, 
// but I'll create the UI button right after.

export default function Navbar() {
    return (
        <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-18 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                        <span className="text-white font-bold text-2xl">+</span>
                    </div>
                    <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
                        Diagnostic
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
                    <Link href="/symptoms" className="text-muted-foreground hover:text-primary transition-colors">Symptom Checker</Link>
                    <Link href="/diseases" className="text-muted-foreground hover:text-primary transition-colors">Encyclopedia</Link>
                    <Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                </div>

                <div className="flex items-center space-x-5">
                    <Link href="/login" className="text-sm font-semibold hover:text-primary transition-colors">
                        Log In
                    </Link>
                    <Link href="/signup">
                        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
