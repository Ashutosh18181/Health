'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
    { text: "The greatest wealth is health.", author: "Virgil" },
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { text: "A healthy outside starts from the inside.", author: "Robert Urich" },
    { text: "It is health that is real wealth and not pieces of gold and silver.", author: "Mahatma Gandhi" }
];

export function Motivation() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Patterns */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/40 via-slate-900 to-cyan-900/40 opacity-60" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="size-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-10 border border-primary/30"
                >
                    <Quote className="size-8 text-primary" />
                </motion.div>

                <div className="min-h-[200px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="max-w-4xl"
                        >
                            <h2 className="text-3xl md:text-5xl font-serif italic mb-8 leading-tight tracking-tight">
                                "{quotes[index].text}"
                            </h2>
                            <div className="flex items-center justify-center gap-3">
                                <div className="h-px w-8 bg-primary/50" />
                                <p className="text-xl text-primary font-bold tracking-widest uppercase">{quotes[index].author}</p>
                                <div className="h-px w-8 bg-primary/50" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center gap-3 mt-16">
                    {quotes.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-primary' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
