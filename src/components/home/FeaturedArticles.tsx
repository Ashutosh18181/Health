'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const articles = [
    {
        title: "Understanding Seasonal Allergies",
        desc: "Why they happen and how to manage symptoms effectively during peak seasons.",
        date: "Feb 5, 2026",
        color: "bg-rose-100"
    },
    {
        title: "The Importance of Hydration",
        desc: "How water intake impacts your energy levels, brain function, and overall health.",
        date: "Feb 2, 2026",
        color: "bg-blue-100"
    },
    {
        title: "10 Minutes to Better Posture",
        desc: "Simple daily exercises to correct your posture and reduce back pain.",
        date: "Jan 28, 2026",
        color: "bg-amber-100"
    }
];

export function FeaturedArticles() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Latest Insights</h2>
                        <p className="text-muted-foreground">Expert articles to guide your health journey.</p>
                    </div>
                    <button className="hidden md:flex items-center text-primary font-bold hover:underline">
                        View All <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group cursor-pointer"
                        >
                            <div className={`h-48 rounded-xl mb-4 ${article.color} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                            </div>
                            <div className="flex items-center gap-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                <span>Article</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span>{article.date}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">{article.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
