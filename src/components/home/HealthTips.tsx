'use client';
import { motion } from 'framer-motion';
import { Utensils, Activity, Brain } from 'lucide-react';

const tips = [
    {
        icon: Utensils,
        title: "Nutrition Tips",
        desc: "Fuel your body with the right balance of nutrients. Discover recipes and meal plans tailored for a healthy life.",
        color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    },
    {
        icon: Activity,
        title: "Workout Plans",
        desc: "From cardio to strength training, find routines that fit your lifestyle and help you achieve your fitness goals.",
        color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    {
        icon: Brain,
        title: "Mental Health",
        desc: "Mindfulness and stress management techniques to keep your mind as healthy and fit as your body.",
        color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
    }
];

export function HealthTips() {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Holistic Health Highlights</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Specific advice for every aspect of your well-being.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {tips.map((tip, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${tip.color}`}>
                                <tip.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{tip.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{tip.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
