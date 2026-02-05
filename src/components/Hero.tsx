'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                    >
                        From <span className="text-rose-500">Uncertainty</span> to <span className="text-emerald-500">Clarity</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
                    >
                        Advanced AI-powered symptom analysis and health tracking to guide you towards a healthier lifestyle.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/symptoms">
                            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all transform hover:-translate-y-1">
                                Check Symptoms
                            </button>
                        </Link>
                        <Link href="/about">
                            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-lg font-semibold rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                How It Works
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl opacity-50 animate-pulse delay-75" />
                <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-emerald-200/30 rounded-full blur-3xl opacity-50" />
            </div>

            {/* Animation Placeholder for "Unfit -> Fit" */}
            <div className="mt-20 container mx-auto px-4">
                <div className="relative h-64 md:h-96 w-full max-w-5xl mx-auto bg-slate-100 dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center group">
                    {/* This area would hold the Lottie/Framer animation */}
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-8 text-4xl opacity-50 group-hover:opacity-100 transition-opacity">
                            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>🍕</motion.div>
                            <span>→</span>
                            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🏃</motion.div>
                            <span>→</span>
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🥗</motion.div>
                            <span>→</span>
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>💪</motion.div>
                        </div>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Lifestyle Transformation</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
