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
        image: "https://images.unsplash.com/photo-1576091160550-21733b091f8d?auto=format&fit=crop&q=80&w=800",
        color: "bg-emerald-100"
    },
    {
        title: "The Importance of Hydration",
        desc: "How water intake impacts your energy levels, brain function, and overall health.",
        date: "Feb 2, 2026",
        author: "Sarah Johnson",
        tag: "Nutrition",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf3d?auto=format&fit=crop&q=80&w=800",
        color: "bg-cyan-100"
    },
    {
        title: "10 Minutes to Better Posture",
        desc: "Simple daily exercises to correct your posture and reduce back pain.",
        date: "Jan 28, 2026",
        author: "John Doe",
        tag: "Fitness",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
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
                    <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all pb-2 border-b-2 border-primary/20 hover:border-primary focus-visible:ring-offset-2">
                        View All Articles <ArrowRight size={20} />
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {articles.map((article, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col h-full"
                        >
                            <div className="aspect-[16/10] rounded-3xl mb-6 relative overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500 bg-slate-100">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    loading="lazy"
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg">
                                    {article.tag}
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {article.date}</span>
                                    <span className="flex items-center gap-1.5"><User size={14} /> {article.author}</span>
                                </div>
                                <h3 className="text-2xl font-black leading-tight group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed line-clamp-2 font-medium">
                                    {article.desc}
                                </p>
                            </div>

                            <button
                                className="mt-6 flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors focus-visible:ring-offset-2"
                                aria-label={`Read more about ${article.title}`}
                            >
                                Read More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
