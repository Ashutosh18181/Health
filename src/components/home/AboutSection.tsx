'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart, Search } from 'lucide-react';

const features = [
    { icon: Zap, text: "Simple and user-friendly health tools" },
    { icon: Heart, text: "Focus on everyday wellness and prevention" },
    { icon: ShieldCheck, text: "Privacy-first approach to your data" },
    { icon: Search, text: "Continuously improving with new insights" },
];

export function AboutSection() {
    return (
        <section id="about" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 space-y-8"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide uppercase">
                            About Diagnostic
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            We believe that good health starts with <span className="text-primary">awareness</span> and access.
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Our platform is designed to help people better understand their health through easy-to-use tools,
                            clear insights, and reliable wellness guidance. Whether you’re looking to improve daily habits,
                            explore symptoms, or learn more about maintaining a balanced lifestyle, we’re here to support you.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 pt-4">
                            {features.map((f, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-primary">
                                        <f.icon className="size-5" />
                                    </div>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">{f.text}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-sm text-muted-foreground border-l-4 border-primary/20 pl-4 py-2 italic bg-slate-50 dark:bg-slate-800/50 rounded-r-lg">
                            "Our goal is not to replace healthcare professionals, but to empower individuals with knowledge that helps them make informed decisions."
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 relative"
                    >
                        <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent relative z-10 overflow-hidden border border-border">
                            {/* Abstract visual elements */}
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700" />

                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <div className="text-center space-y-4">
                                    <Heart className="size-20 text-primary mx-auto opacity-50" />
                                    <p className="text-2xl font-black opacity-10 uppercase tracking-widest leading-none">Your Wellbeing<br />Our Priority</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative floating card */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl border z-20 max-w-[240px]"
                        >
                            <p className="text-sm font-bold mb-2">Privacy First</p>
                            <p className="text-xs text-muted-foreground">Your health data is encrypted and remains strictly under your control.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
