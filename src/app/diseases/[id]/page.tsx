
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, AlertTriangle, ShieldCheck, Stethoscope, Pill, Brain, Calendar, Users, AlertOctagon, Activity } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function DiseaseDetail(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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

    // Helper for rendering section content or default
    const Section = ({ title, icon: Icon, children, colorClass, bgClass }: any) => (
        <div className={`p-6 rounded-2xl border ${bgClass} ${colorClass}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon className="h-6 w-6 opacity-80" /> {title}
            </h3>
            <div className="text-lg leading-relaxed opacity-90">
                {children || <span className="opacity-50 italic">Information unavailable</span>}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* 4.1 Navigation Aids */}
            <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span>/</span>
                <Link href="/symptoms" className="hover:text-primary">Symptom Checker</Link>
                <span>/</span>
                <span className="text-primary font-medium">{disease.name}</span>
            </div>

            <Link href="/symptoms" className="inline-flex items-center text-sm mb-6 text-muted-foreground hover:text-primary transition-colors font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to results
            </Link>

            {/* 5.1 Overview Section */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl border shadow-xl overflow-hidden mb-12">
                <div className="relative overflow-hidden">
                    <div className={`absolute inset-0 opacity-10 ${disease.risk_level === 'high' ? 'bg-red-600' :
                        disease.risk_level === 'moderate' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                    <div className="bg-gradient-to-r from-transparent to-background/10 backdrop-blur-sm p-8 md:p-12 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${disease.risk_level === 'high' ? 'bg-red-100 border-red-200 text-red-800' :
                                        disease.risk_level === 'moderate' ? 'bg-amber-100 border-amber-200 text-amber-800' :
                                            'bg-emerald-100 border-emerald-200 text-emerald-800'
                                        }`}>
                                        {disease.risk_level} Risk
                                    </span>
                                    {disease.icd_code && (
                                        <span className="text-muted-foreground font-mono text-xs">ICD: {disease.icd_code}</span>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">{disease.name}</h1>
                                <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                    {disease.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5.2 Common Symptoms Grid */}
                <div className="p-8 border-b bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" /> Common Symptoms
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {disease.disease_symptoms?.map((ds: any, i: number) => (
                            <span key={i} className="px-4 py-2 bg-white dark:bg-slate-800 border rounded-xl text-sm font-medium shadow-sm inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary/40" />
                                {ds.symptoms?.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="p-8 space-y-8">

                    {/* 5.3 Possible Causes & Risk Factors */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <Section
                            title="Causes & Triggers"
                            icon={Brain}
                            bgClass="bg-indigo-50 dark:bg-indigo-900/20"
                            colorClass="border-indigo-100 dark:border-indigo-800 text-indigo-900 dark:text-indigo-100"
                        >
                            {disease.causes}
                        </Section>
                        <Section
                            title="Risk Factors"
                            icon={ChartAreaIcon}
                            bgClass="bg-purple-50 dark:bg-purple-900/20"
                            colorClass="border-purple-100 dark:border-purple-800 text-purple-900 dark:text-purple-100"
                        >
                            {disease.risk_factors}
                        </Section>
                    </div>

                    {/* 5.4 & 5.5 Precautions & Action Plan */}
                    <h2 className="text-2xl font-bold pt-4">Action Plan</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Section
                            title="Prevention & Precautions"
                            icon={ShieldCheck}
                            bgClass="bg-emerald-50 dark:bg-emerald-900/20"
                            colorClass="border-emerald-100 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100"
                        >
                            {disease.prevention}
                        </Section>
                        <Section
                            title="Treatment & Self-Care"
                            icon={Pill}
                            bgClass="bg-blue-50 dark:bg-blue-900/20"
                            colorClass="border-blue-100 dark:border-blue-800 text-blue-900 dark:text-blue-100"
                        >
                            {disease.treatment}
                        </Section>
                    </div>

                    {/* 5.6 When to See a Doctor */}
                    <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 p-6 rounded-2xl flex items-start gap-4">
                        <AlertOctagon className="w-8 h-8 text-rose-600 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-rose-700 dark:text-rose-400 mb-2">When to see a Doctor</h3>
                            <p className="text-rose-900 dark:text-rose-200 text-lg">{disease.when_to_see_doctor}</p>
                        </div>
                    </div>

                    {/* 5.7 Suggested Specialist */}
                    <div className="flex flex-col md:flex-row gap-6 mt-8">
                        <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border shadow-sm">
                                <Stethoscope className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-bold uppercase text-muted-foreground">Recommended Specialist</p>
                                <p className="text-xl font-bold">{disease.specialist}</p>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border shadow-sm">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-bold uppercase text-muted-foreground">Affected Groups</p>
                                <p className="text-xl font-bold">{disease.affected_groups || "General Population"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="text-center pt-8 border-t">
                        <p className="text-sm text-muted-foreground italic">
                            "This content is for educational purposes only and does not replace professional medical advice."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Icon helper
function ChartAreaIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3v18h18" />
            <path d="M7 12v5h12V8l-5 5-4-4Z" />
        </svg>
    )
}
