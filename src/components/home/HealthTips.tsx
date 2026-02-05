'use client';
import { motion } from 'framer-motion';
import { Utensils, Activity, Brain, ShieldCheck } from 'lucide-react';

const categories = [
    {
        icon: Utensils,
        title: "Nutrition",
        desc: "Discover balanced meal plans and nutritional advice tailored to your energy needs.",
        color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20",
        border: "group-hover:border-orange-200"
    },
    {
        icon: Activity,
        title: "Fitness",
        desc: "Personalized workout routines to help you build strength and maintain vitality.",
        color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20",
        border: "group-hover:border-emerald-200"
    },
    {
        icon: Brain,
        title: "Mental Wellbeing",
        desc: "Guided techniques for stress management and mindfulness to keep your mind sharp.",
        color: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20",
        border: "group-hover:border-cyan-200"
    },
    {
        icon: ShieldCheck,
        title: "Self Care",
        desc: "Small daily habits that lead to big long-term health transformations.",
        color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20",
        border: "group-hover:border-indigo-200"
    }
];

export function HealthTips() {
    return (
        <section className="py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Holistic Health Highlights</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We focus on the complete picture. Explore our key categories designed to help you
                        achieve a balanced and thriving lifestyle.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -12 }}
                            className={`group bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-border transition-all duration-300 ${cat.border}`}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${cat.color} group-hover:scale-110 transition-transform`}>
                                <cat.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{cat.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{cat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
