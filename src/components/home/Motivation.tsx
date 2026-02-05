'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
    { text: "The greatest wealth is health.", author: "Virgil" },
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { text: "A healthy outside starts from the inside.", author: "Robert Urich" },
    { text: "It is health that is real wealth and not pieces of gold and silver.", author: "Mahatma Gandhi" }
];

export function Motivation() {
    const [mounted, setMounted] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    return (
        <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('/file.svg')] bg-repeat opacity-5" />
            <div className="container mx-auto px-4 relative z-10 text-center">
                <Quote className="w-12 h-12 mx-auto mb-8 opacity-50" />
                <div className="h-48 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <h2 className="text-3xl md:text-5xl font-serif italic mb-6 leading-tight">
                                "{quotes[index].text}"
                            </h2>
                            <p className="text-xl opacity-80 font-medium">— {quotes[index].author}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {quotes.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
