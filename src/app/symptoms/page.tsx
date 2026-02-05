'use client';
import { useState } from 'react';
import { Search, X, AlertCircle, ArrowRight, Brain, Activity, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function SymptomChecker() {
    const [query, setQuery] = useState('');
    const [selectedSymptoms, setSelectedSymptoms] = useState<any[]>([]);
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Suggestions map (Mock logic for "Related Symptoms")
    const relatedMap: Record<string, string[]> = {
        'Fever': ['Chills', 'Sweating', 'Headache', 'Fatigue'],
        'Cough': ['Sore throat', 'Chest pain', 'Shortness of breath'],
        'Headache': ['Nausea', 'Sensitivity to light', 'Dizziness'],
        'Nausea': ['Vomiting', 'Stomach pain', 'Diarrhea'],
        'Fatigue': ['Weakness', 'Dizziness', 'Sleepiness'],
    };

    const commonSymptoms = [
        "Fever", "Cough", "Headache", "Fatigue", "Nausea",
        "Sore throat", "Runny nose", "Chills"
    ];

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        // Quick add if it matches common ones, else search API
        handleQuickAdd(query);
        setQuery('');
    };

    const handleQuickAdd = async (name: string) => {
        // Avoid duplicates
        if (selectedSymptoms.find(s => s.name.toLowerCase() === name.toLowerCase())) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/symptoms/search?q=${name}`);
            const data = await res.json();
            if (data.data && data.data.length > 0) {
                const match = data.data.find((s: any) => s.name.toLowerCase() === name.toLowerCase()) || data.data[0];
                addSymptom(match);
            } else {
                // Fallback for demo if API returns empty but we want to allow it
                // addSymptom({ id: Date.now(), name: name });
            }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const addSymptom = (symptom: any) => {
        if (selectedSymptoms.find(s => s.id === symptom.id)) return;
        setSelectedSymptoms(prev => [...prev, symptom]);
        setResults([]); // Clear previous results on change
    };

    const removeSymptom = (id: any) => {
        setSelectedSymptoms(prev => prev.filter(s => s.id !== id));
        setResults([]);
    };

    const handleDiagnose = async () => {
        if (selectedSymptoms.length < 2) return;

        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/diagnose', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms: selectedSymptoms.map(s => s.id) })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResults(data.data);
        } catch (err: any) {
            setError(err.message || 'Failed to analyze symptoms.');
        } finally {
            setLoading(false);
        }
    };

    // Get related suggestions based on last added symptom
    const lastSymptom = selectedSymptoms.length > 0 ? selectedSymptoms[selectedSymptoms.length - 1].name : null;
    const suggestions = lastSymptom ? relatedMap[Object.keys(relatedMap).find(k => lastSymptom.includes(k)) || '']?.filter(s => !selectedSymptoms.find(sel => sel.name === s)) : [];

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent inline-block">Symptom Checker</h1>
                <p className="text-muted-foreground text-lg">Select at least 2 symptoms to get an instant AI-powered health analysis.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Input (Span 1 or 2 depending on state?) Let's keep it 3 cols: 1 col input, 2 cols results */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Quick Select Chips */}
                    <div>
                        <p className="text-sm font-bold uppercase tracking-wider mb-3 text-muted-foreground/70">Common Symptoms</p>
                        <div className="flex flex-wrap gap-2">
                            {commonSymptoms.map(s => (
                                <button
                                    key={s}
                                    onClick={() => handleQuickAdd(s)}
                                    disabled={selectedSymptoms.some(sel => sel.name === s)}
                                    className="px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-primary/20 transition-all text-sm font-medium"
                                >
                                    + {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search symptoms (e.g. dizzy, pain)..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                            />
                        </form>
                    </div>

                    {/* Selected Symptoms Area */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border min-h-[200px]">
                        <h3 className="font-bold mb-4 flex items-center justify-between">
                            Your Symptoms
                            <span className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded text-xs border">{selectedSymptoms.length} selected</span>
                        </h3>

                        {selectedSymptoms.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                                <Activity className="w-10 h-10 mx-auto mb-2 opacity-20" />
                                <p className="text-sm">No symptoms selected yet.</p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {selectedSymptoms.map(s => (
                                    <span key={s.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border shadow-sm text-sm font-medium animate-in fade-in zoom-in duration-200">
                                        {s.name}
                                        <button onClick={() => removeSymptom(s.id)} className="text-slate-400 hover:text-destructive transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Smart Suggestions */}
                        {suggestions && suggestions.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-dashed">
                                <p className="text-xs font-bold text-primary mb-2 flex items-center gap-1">
                                    <Brain className="w-3 h-3" /> People also reported:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.map(s => (
                                        <button key={s} onClick={() => handleQuickAdd(s)} className="text-xs px-2 py-1 bg-primary/5 text-primary rounded-md hover:bg-primary/10 transition-colors">
                                            + {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleDiagnose}
                        disabled={selectedSymptoms.length < 2 || loading}
                        className="w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <> <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing... </>
                        ) : (
                            <> <Brain className="w-5 h-5" /> Analyze Symptoms </>
                        )}
                    </button>

                    {selectedSymptoms.length > 0 && selectedSymptoms.length < 2 && (
                        <p className="text-xs text-center text-amber-600 dark:text-amber-400 font-medium">Please select at least 2 symptoms.</p>
                    )}
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-2">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 mb-6 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5" /> {error}
                        </div>
                    )}

                    {!results.length && !loading && !error && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-6">
                                <Activity className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to Analyze</h3>
                            <p className="text-muted-foreground max-w-sm">
                                Our AI engine will cross-reference your symptoms with over 500 medical conditions to provide preliminary insights.
                            </p>
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="grid md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                            {/* Main Results Column */}
                            <div className="md:col-span-2 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Possible Conditions</h2>
                                    <span className="text-sm text-muted-foreground">{results.length} matches found</span>
                                </div>

                                {results.map((r, i) => (
                                    <Link href={`/diseases/${r.id}`} key={r.id}>
                                        <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border hover:border-primary/50 shadow-sm hover:shadow-md transition-all cursor-pointer mb-4 relative overflow-hidden">
                                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${r.risk_level === 'high' ? 'bg-red-500' :
                                                    r.risk_level === 'moderate' ? 'bg-amber-500' : 'bg-emerald-500'
                                                }`} />

                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{r.name}</h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{r.description}</p>
                                                </div>
                                                <ArrowRight className="text-slate-300 group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${r.risk_level === 'high' ? 'bg-red-100 text-red-700' :
                                                        r.risk_level === 'moderate' ? 'bg-amber-100 text-amber-700' :
                                                            'bg-emerald-100 text-emerald-700'
                                                    }`}>
                                                    {r.risk_level} Risk
                                                </span>
                                                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs font-medium">
                                                    {r.match_count}/{selectedSymptoms.length} symptoms match
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Sidebar: Causes & Deficiencies (Aggregated from top result) */}
                            <div className="md:col-span-1">
                                <div className="sticky top-6">
                                    <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
                                        <h3 className="font-bold flex items-center gap-2 text-indigo-900 dark:text-indigo-300 mb-4">
                                            <ShieldAlert className="w-5 h-5" /> Possible Causes
                                        </h3>

                                        {results[0].causes ? (
                                            <div className="space-y-4">
                                                <div className="p-3 bg-white/60 dark:bg-black/20 rounded-xl">
                                                    <p className="text-xs font-bold uppercase text-indigo-400 mb-1">Underlying Factors</p>
                                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                                        {results[0].causes}
                                                    </p>
                                                </div>
                                                <div className="p-3 bg-white/60 dark:bg-black/20 rounded-xl">
                                                    <p className="text-xs font-bold uppercase text-indigo-400 mb-1">Deficiencies / Triggers</p>
                                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                                        Check for common deficiencies like Iron or Vitamin D if fatigue is present.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">Detailed cause analysis not available for these symptoms.</p>
                                        )}

                                        <div className="mt-4 pt-4 border-t border-indigo-200/50">
                                            <p className="text-xs text-indigo-400 mb-1">*Disclaimer</p>
                                            <p className="text-[10px] text-muted-foreground leading-tight">
                                                Possible causes and deficiencies are informational correlations, not medical diagnoses.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
