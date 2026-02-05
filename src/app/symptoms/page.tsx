'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X, Activity, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Keep using src/lib/utils if it exists, or just relative import if in src

export default function SymptomChecker() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState<any[]>([]);
    const [diagnosis, setDiagnosis] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    // Search symptoms
    useEffect(() => {
        const search = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const res = await fetch(`/api/symptoms/search?q=${query}`);
                const data = await res.json();
                setResults(data.data || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        const debounce = setTimeout(search, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    const addSymptom = (s: any) => {
        if (!selectedSymptoms.find(i => i.id === s.id)) {
            setSelectedSymptoms([...selectedSymptoms, s]);
        }
        setQuery('');
        setResults([]);
    };

    const removeSymptom = (id: string) => {
        setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== id));
    };

    const handleDiagnose = async () => {
        if (selectedSymptoms.length === 0) return;
        setAnalyzing(true);
        setDiagnosis([]);
        try {
            const res = await fetch('/api/diagnose', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms: selectedSymptoms.map(s => s.id) })
            });
            const data = await res.json();
            setDiagnosis(data.results || []);
        } catch (e) {
            console.error(e);
            alert('Error analyzing symptoms');
        } finally {
            setAnalyzing(false);
        }
    };

    const commonSymptoms = [
        "Fever", "Cough", "Headache", "Fatigue", "Nausea",
        "Sore throat", "Runny nose", "Chills"
    ];

    const handleQuickAdd = async (name: string) => {
        // We need to fetch the ID for the symptom first, or handle name-only logic if API allows key-value
        // But for this quick UX, we'll hit the search API for exact match to get full object
        setLoading(true);
        try {
            const res = await fetch(`/api/symptoms/search?q=${name}`);
            const data = await res.json();
            if (data.data && data.data.length > 0) {
                // Find exact match or first
                const match = data.data.find((s: any) => s.name.toLowerCase() === name.toLowerCase()) || data.data[0];
                addSymptom(match);
            }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent inline-block">Symptom Checker</h1>
                <p className="text-muted-foreground">Select your symptoms to get an instant AI-powered health analysis.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column: Input */}
                <div className="space-y-6">

                    {/* Quick Select Chips */}
                    <div>
                        <p className="text-sm font-medium mb-3 text-muted-foreground">Common Symptoms</p>
                        <div className="flex flex-wrap gap-2">
                            {commonSymptoms.map(s => (
                                <button
                                    key={s}
                                    onClick={() => handleQuickAdd(s)}
                                    className="px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all text-sm font-medium"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search symptoms (e.g. fever, headache)..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {loading && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-slate-400" />}
                        </div>

                        {/* Results Dropdown */}
                        {results.length > 0 && (
                            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-900 rounded-lg shadow-xl border overflow-hidden max-h-60 overflow-y-auto">
                                {results.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => addSymptom(s)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between group transition-colors"
                                    >
                                        <span>{s.name}</span>
                                        <Plus className="h-4 w-4 opacity-0 group-hover:opacity-100 text-primary" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Selected Tags */}
                    <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                            {selectedSymptoms.map(s => (
                                <motion.div
                                    key={s.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium"
                                >
                                    {s.name}
                                    <button onClick={() => removeSymptom(s.id)} className="hover:text-red-500">
                                        <X className="h-3 w-3" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {selectedSymptoms.length === 0 && (
                            <p className="text-sm text-slate-400 italic">No symptoms selected.</p>
                        )}
                    </div>

                    <button
                        onClick={handleDiagnose}
                        disabled={selectedSymptoms.length === 0 || analyzing}
                        className="w-full py-4 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                    >
                        {analyzing ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" /> Analyzing...
                            </>
                        ) : (
                            <>
                                Analyze Symptoms <ArrowRight className="h-5 w-5" />
                            </>
                        )}
                    </button>
                </div>

                {/* Right Column: Results */}
                <div className="relative min-h-[400px]">
                    {diagnosis.length > 0 ? (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Activity className="h-5 w-5 text-emerald-500" /> Possible Conditions
                            </h3>

                            <div className="space-y-3">
                                {diagnosis.map((d, i) => (
                                    <motion.div
                                        key={d.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-4 bg-white dark:bg-slate-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-lg">{d.name}</h4>
                                            <div className={cn(
                                                "text-xs px-2 py-1 rounded-full font-bold uppercase",
                                                d.risk_level === 'low' ? "bg-emerald-100 text-emerald-700" :
                                                    d.risk_level === 'moderate' ? "bg-yellow-100 text-yellow-700" :
                                                        d.risk_level === 'high' ? "bg-orange-100 text-orange-700" :
                                                            "bg-red-100 text-red-700"
                                            )}>
                                                {d.risk_level} Risk
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{d.description}</p>

                                        {/* Progress Bar for match score */}
                                        <div className="mb-2">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>Match Strength</span>
                                                <span>{Math.round(d.confidence)}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all duration-1000 ease-out"
                                                    style={{ width: `${d.confidence}%` }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-400 border-2 border-dashed rounded-xl p-8 bg-slate-50/50 dark:bg-slate-900/50">
                            {analyzing ? (
                                <div className="space-y-4">
                                    <Activity className="h-12 w-12 text-primary animate-pulse mx-auto" />
                                    <p>Comparing your symptoms with 500+ medical conditions...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-full mb-4">
                                        <Search className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Waiting for Input</h3>
                                    <p className="max-w-xs">Add symptoms on the left to see potential matches here.</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
