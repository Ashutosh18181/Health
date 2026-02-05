import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
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

            <div className="bg-white dark:bg-slate-800 rounded-2xl border shadow-sm p-8">
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{disease.name}</h1>
                        {disease.icd_code && (
                            <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-md font-mono text-sm">
                                ICD: {disease.icd_code}
                            </span>
                        )}
                    </div>

                    <div className={`px-6 py-4 rounded-xl flex items-center gap-3 border
            ${disease.risk_level === 'low' ? "bg-emerald-50 border-emerald-100 text-emerald-800" :
                            disease.risk_level === 'moderate' ? "bg-yellow-50 border-yellow-100 text-yellow-800" :
                                disease.risk_level === 'high' ? "bg-orange-50 border-orange-100 text-orange-800" :
                                    "bg-red-50 border-red-100 text-red-800"
                        }`}>
                        <AlertTriangle className="h-6 w-6" />
                        <div>
                            <p className="text-xs uppercase font-bold tracking-wider opacity-70">Risk Level</p>
                            <p className="font-bold text-lg capitalize">{disease.risk_level}</p>
                        </div>
                    </div>
                </div>

                <div className="prose dark:prose-invert max-w-none mb-8">
                    <h3 className="text-xl font-semibold mb-3">Overview</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        {disease.description}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            Common Symptoms
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {disease.disease_symptoms?.map((ds: any, i: number) => (
                                <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm">
                                    {ds.symptoms?.name}
                                </span>
                            )) || <p className="text-muted-foreground">No specific symptoms listed.</p>}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">General Advice</h3>
                        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50">
                            <p>{disease.general_advice || "Consult a doctor for professional advice."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
