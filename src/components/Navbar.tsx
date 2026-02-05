'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-md bg-background/95 border-primary/10' : 'py-4'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg shadow-primary/20">
                        <span className="text-white font-bold text-2xl" aria-hidden="true">+</span>
                    </div>
                    <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
                        Diagnostic
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
                    <Link href="/symptoms" className="text-muted-foreground hover:text-primary transition-colors py-2">Symptom Checker</Link>
                    <Link href="/diseases" className="text-muted-foreground hover:text-primary transition-colors py-2">Encyclopedia</Link>
                    <Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors py-2">About Us</Link>
                </div>

                <div className="flex items-center space-x-4 md:space-x-6">
                    <Link href="/login" className="text-sm font-semibold hover:text-primary transition-colors hidden sm:block">
                        Log In
                    </Link>
                    <Link href="/signup">
                        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-offset-2">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
