'use client';
import { motion } from 'framer-motion';
import { Search, Heart, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-background to-background">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold text-sm mb-8 border border-emerald-200 dark:border-emerald-800"
                    >
                        <Sparkles size={16} /> AI-Powered Health Guidance
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-slate-900 dark:text-white"
                    >
                        Your partner in <br />
                        <span className="text-primary italic">confident</span> wellbeing.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
                    >
                        Navigate your health journey with clarity. Our AI tools provide instant symptom
                        insights and personalized wellness paths tailored to your lifestyle.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 mb-16"
                    >
                        <Link href="/symptoms">
                            <button className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/30 hover:shadow-2xl hover:scale-105 active:scale-95 group">
                                <Search size={22} className="group-hover:rotate-12 transition-transform" />
                                Start Symptom Check
                            </button>
                        </Link>
                        <Link href="/diseases">
                            <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-primary/30 active:scale-95">
                                Explore Encyclopedia
                            </button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-sm font-semibold opacity-70 italic tracking-wide">Privacy Focused</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-600">
                                <Heart size={20} />
                            </div>
                            <span className="text-sm font-semibold opacity-70 italic tracking-wide">Patient Centric</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Visual Decoration */}
            <div className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-1/3 aspect-square">
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/20 rounded-full animate-blob filter blur-3xl opacity-50" />
            </div>
        </section>
    );
}
