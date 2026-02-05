'use client';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">+</span>
                            </div>
                            <span className="text-xl font-bold">Diagnostic</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Empowering individuals with knowledge and tools to take charge of their health and well-being.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 rounded-lg bg-white dark:bg-slate-800 border hover:text-primary transition-colors">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/symptoms" className="hover:text-primary transition-colors">Symptom Checker</Link></li>
                            <li><Link href="/diseases" className="hover:text-primary transition-colors">Encyclopedia</Link></li>
                            <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>support@diagnostic.ai</li>
                            <li>+1 (555) 123-4567</li>
                            <li>123 Health Way, San Francisco, CA</li>
                        </ul>
                    </div >
                </div >

                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2026 Diagnostic AI. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        Made with <Heart size={14} className="text-rose-500 fill-current" /> for a healthier world.
                    </div>
                </div>
            </div >
        </footer >
    );
}
