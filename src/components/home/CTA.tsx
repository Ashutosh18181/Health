'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export function CTA() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <section className="py-24 px-4">
            <div className="container mx-auto">
                <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white px-6 py-16 md:p-20 text-center">
                    {/* Background Gradients */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-900/50 to-emerald-900/50 z-0" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-30" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-30" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your Transformation Today</h2>
                        <p className="text-lg text-slate-300 mb-10">
                            Join thousands of users who are taking control of their health.
                            Get weekly tips and insights delivered straight to your inbox.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 backdrop-blur-sm"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold flex items-center justify-center gap-2"
                            >
                                Subscribe <Send className="w-4 h-4" />
                            </motion.button>
                        </div>
                        <p className="text-xs text-slate-500 mt-6 max-w-xs mx-auto">
                            By subscribing, you agree to our Terms and Privacy Policy. No spam, ever.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
