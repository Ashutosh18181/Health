'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';

const articles = [
    {
        title: "Understanding Seasonal Allergies",
        desc: "Why they happen and how to manage symptoms effectively during peak seasons.",
        date: "Feb 5, 2026",
        author: "Dr. Amy Chen",
        tag: "Wellness",
        color: "bg-emerald-100"
    },
    {
        title: "The Importance of Hydration",
        desc: "How water intake impacts your energy levels, brain function, and overall health.",
        date: "Feb 2, 2026",
        author: "Sarah Johnson",
        tag: "Nutrition",
        color: "bg-cyan-100"
    },
    {
        title: "10 Minutes to Better Posture",
        desc: "Simple daily exercises to correct your posture and reduce back pain.",
        date: "Jan 28, 2026",
        author: "John Doe",
        tag: "Fitness",
        color: "bg-slate-200"
    }
];

export function FeaturedArticles() {
    return (
        <section className="py-32 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="max-w-xl">
                        <div className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Health Blog</div>
                        <h2 className="text-4xl font-black tracking-tight mb-4">Latest Insights & Stories</h2>
                        <p className="text-muted-foreground text-lg">Expert-vetted articles to guide your journey towards a healthier, more balanced life.</p>
                    </div>
                    <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all pb-2 border-b-2 border-primary/20 hover:border-primary">
                        View All Articles <ArrowRight size={20} />
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {articles.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group"
                        >
                            <div className={`aspect-video rounded-3xl mb-6 ${article.color} relative overflow-hidden shadow-inner group-hover:shadow-2xl transition-all duration-500`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                                    {article.tag}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold">
                                    <span className="flex items-center gap-1"><Clock size={14} /> {article.date}</span>
                                    <span className="flex items-center gap-1"><User size={14} /> {article.author}</span>
                                </div>
                                <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed line-clamp-2">
                                    {article.desc}
                                </p>
                                <button className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-primary transition-colors">
                                    Read More <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
