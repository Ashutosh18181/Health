'use client';
import { motion } from 'framer-motion';
import { Search, Heart, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-to-b from-emerald-50/80 via-background to-background">
            {/* Professional Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />

                {/* Abstract Wellness Shapes */}
                <svg className="absolute top-20 right-20 w-64 h-64 text-primary/5 animate-pulse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.6,-0.9C84,13.9,77.5,27.8,69.2,40.1C60.9,52.4,50.8,63,38.5,70.9C26.2,78.8,11.7,83.9,-2.4,87.9C-16.5,91.9,-30.2,94.9,-43.3,90.3C-56.4,85.7,-68.9,73.5,-77.8,60C-86.7,46.5,-92.1,31.7,-93.6,16.4C-95.1,1.1,-92.7,-14.7,-86.3,-28.9C-79.9,-43.1,-69.5,-55.7,-56.7,-63.4C-43.9,-71.1,-28.7,-73.9,-14,-72C0.7,-70.1,15.4,-63.5,28.7,-56.7C42.1,-49.9,54,-42.9,61.8,-32.1" transform="translate(100 100)" />
                </svg>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold text-sm mb-8 border border-emerald-200 dark:border-emerald-800 shadow-sm"
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
                        className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl leading-relaxed font-medium"
                    >
                        Navigate your health journey with clarity. Our AI tools provide instant symptom
                        insights and personalized wellness paths tailored to your lifestyle.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 mb-16"
                    >
                        <Link href="/symptoms">
                            <button className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/30 hover:shadow-2xl hover:scale-105 active:scale-95 group focus-visible:ring-offset-2">
                                <Search size={22} className="group-hover:rotate-12 transition-transform" />
                                Start Symptom Check
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link href="/diseases">
                            <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-primary/20 hover:border-primary/50 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-slate-50 dark:hover:bg-slate-750 active:scale-95 shadow-lg shadow-slate-200/50 dark:shadow-none">
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
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 border border-emerald-100 dark:border-emerald-800">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">Privacy Focused</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-600 border border-rose-100 dark:border-rose-800">
                                <Heart size={20} />
                            </div>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">Patient Centric</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Visual Decoration */}
            <div className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-1/3 aspect-square">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 rounded-full animate-blob filter blur-3xl opacity-50" />
            </div>
        </section>
    );
}
