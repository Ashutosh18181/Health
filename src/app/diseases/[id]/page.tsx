import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, AlertTriangle, ShieldCheck, Stethoscope, Pill } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function DiseaseDetail({ params }: { params: { id: string } }) {
    const supabase = await createClient();

    const { data: disease } = await supabase
        .from('diseases')
        .select(`
        *,
        disease_symptoms (
          weight,
          symptoms (
            name,
            severity_level
          )
        )
      `)
        .eq('id', params.id)
        .single();

    if (!disease) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/diseases" className="inline-flex items-center text-sm mb-6 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Encyclopedia
            </Link>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border shadow-xl overflow-hidden">
                {/* Header - Colored based on risk? Or just primary gradient */}
                <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 border-b">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{disease.name}</h1>
                            {disease.icd_code && (
                                <span className="bg-white/50 dark:bg-black/20 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-md font-mono text-sm backdrop-blur-sm">
                                    ICD: {disease.icd_code}
                                </span>
                            )}
                        </div>

                        <div className={`px-6 py-4 rounded-xl flex items-center gap-3 border shadow-sm backdrop-blur-md
                ${disease.risk_level === 'low' ? "bg-emerald-100/50 border-emerald-200 text-emerald-800" :
                                disease.risk_level === 'moderate' ? "bg-yellow-100/50 border-yellow-200 text-yellow-800" :
                                    disease.risk_level === 'high' ? "bg-orange-100/50 border-orange-200 text-orange-800" :
                                        "bg-red-100/50 border-red-200 text-red-800"
                            }`}>
                            <AlertTriangle className="h-6 w-6" />
                            <div>
                                <p className="text-xs uppercase font-bold tracking-wider opacity-70">Risk Level</p>
                                <p className="font-bold text-lg capitalize">{disease.risk_level}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-2xl font-bold mb-3 text-primary">Overview</h3>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            {disease.description}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Stethoscope className="h-5 w-5 text-primary" /> Common Symptoms
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {disease.disease_symptoms?.map((ds: any, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-white dark:bg-slate-800 border rounded-full text-sm font-medium">
                                        {ds.symptoms?.name}
                                    </span>
                                )) || <p className="text-muted-foreground">No specific symptoms listed.</p>}
                            </div>
                        </div>

                        {disease.specialist && (
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
                                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-purple-700 dark:text-purple-300">
                                    <Stethoscope className="h-5 w-5" /> Consult Specialist
                                </h3>
                                <p className="text-lg font-medium">{disease.specialist}</p>
                            </div>
                        )}
                    </div>

                    {/* Actionable Advice Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {disease.prevention && (
                            <div className="relative overflow-hidden rounded-2xl border bg-emerald-50/50 dark:bg-emerald-900/10 p-6">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <ShieldCheck className="w-24 h-24 text-emerald-600" />
                                </div>
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                    <ShieldCheck className="h-5 w-5" /> Prevention
                                </h3>
                                <p className="relative z-10 text-emerald-900 dark:text-emerald-100">{disease.prevention}</p>
                            </div>
                        )}

                        {disease.treatment && (
                            <div className="relative overflow-hidden rounded-2xl border bg-blue-50/50 dark:bg-blue-900/10 p-6">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Pill className="w-24 h-24 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                                    <Pill className="h-5 w-5" /> Treatment & Care
                                </h3>
                                <p className="relative z-10 text-blue-900 dark:text-blue-100">{disease.treatment}</p>
                            </div>
                        )}
                    </div>

                    {disease.general_advice && (
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border-l-4 border-primary">
                            <h3 className="font-bold mb-2">General Medical Advice</h3>
                            <p className="text-muted-foreground italic">"{disease.general_advice}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
