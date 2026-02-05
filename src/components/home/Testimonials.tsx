'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "David Miller",
        role: "Health Enthusiast",
        text: "The symptom checker is incredibly intuitive. It gave me peace of mind and clear steps for my recovery.",
        avatar: "DM"
    },
    {
        name: "Elena Rodriguez",
        role: "Yoga Instructor",
        text: "I love the holistic approach. The mental wellbeing section has become a part of my daily routine.",
        avatar: "ER"
    },
    {
        name: "Marcus Thorne",
        role: "Tech Professional",
        text: "Fast, reliable, and privacy-focused. Exactly what I was looking for in a personal health assistant.",
        avatar: "MT"
    }
];

export function Testimonials() {
    return (
        <section className="py-32 bg-slate-50 dark:bg-slate-900/30">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl font-black mb-4">Trusted by Thousands</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Don't just take our word for it. Here is what our community has to say about their journey with Diagnostic.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-border relative group hover:shadow-xl transition-all"
                        >
                            <Quote size={40} className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={16} className="fill-emerald-400 text-emerald-400" />
                                ))}
                            </div>

                            <p className="text-lg text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed text-left">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t pt-6">
                                <div className="size-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                                    {t.avatar}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">{t.name}</p>
                                    <p className="text-xs text-muted-foreground font-semibold">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
