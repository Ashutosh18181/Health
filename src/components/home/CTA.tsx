'use client';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function CTA() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 5000);
        }
    };

    return (
        <section className="py-32 px-4 relative overflow-hidden">
            <div className="container mx-auto">
                <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 text-white px-8 py-20 md:p-24 text-center border border-white/10">
                    {/* Dynamic background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-slate-900 to-accent/30 z-0" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute -top-32 -right-32 w-96 h-96 bg-primary rounded-full blur-[120px] pointer-events-none"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                        className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent rounded-full blur-[120px] pointer-events-none"
                    />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-primary font-bold text-sm mb-8 border border-white/10 uppercase tracking-widest"
                        >
                            Newsletter
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
                            Start Your Transformation <span className="text-primary italic">Today.</span>
                        </h2>
                        <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                            Join over 50,000+ health-conscious individuals. Get science-backed wellness
                            tips and AI insights delivered straight to your inbox every week.
                        </p>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="flex-1 px-8 py-5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-primary/40 backdrop-blur-md text-lg transition-all"
                                required
                            />
                            <button
                                type="submit"
                                disabled={subscribed}
                                className={`px-10 py-5 rounded-full font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl ${subscribed ? 'bg-emerald-500' : 'bg-primary hover:bg-primary/90 shadow-primary/30'}`}
                            >
                                {subscribed ? (
                                    <>Success <CheckCircle2 size={24} /></>
                                ) : (
                                    <>Subscribe <Send size={24} /></>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-sm text-slate-400">
                            Respecting your privacy. No spam, ever. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
