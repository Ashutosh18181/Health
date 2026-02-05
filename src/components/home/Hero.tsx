'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    const [mounted, setMounted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    if (!mounted) {
        return (
            <div className="h-[90vh] bg-slate-900 flex items-center justify-center">
                <div className="animate-pulse text-white/20 text-4xl font-bold font-sans">Diagnostic</div>
            </div>
        );
    }

    return (
        <div ref={ref} className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
            {/* Background with Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black" />

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl"
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Wellness</span> <br />
                        Starts Here.
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Empowering you with AI-driven health insights, personalized tips, and a comprehensive disease encyclopedia.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/symptoms">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                            >
                                Check Symptoms <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                        <Link href="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg transition-all"
                            >
                                Start Your Journey
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
            >
                <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-slate-400 rounded-full" />
                </div>
            </motion.div>
        </div>
    );
}
