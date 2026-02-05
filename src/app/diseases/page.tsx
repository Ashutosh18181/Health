import { createClient } from '@/lib/supabase/server';
import { Search } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DiseasePage() {
    const supabase = await createClient();

    // Fetch diseases
    const { data: diseases } = await supabase
        .from('diseases')
        .select('*')
        .order('name')
        .limit(50); // Pagination in V2

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Disease Encyclopedia</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Explore our comprehensive database of medical conditions, symptoms, and advice.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {diseases?.map((disease) => (
                    <Link href={`/diseases/${disease.id}`} key={disease.id} className="block group">
                        <div className="h-full bg-white dark:bg-slate-800 rounded-xl border p-6 hover:shadow-lg transition-all hover:border-primary/50">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                                    {disease.name}
                                </h2>
                                <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                                    {disease.icd_code || 'N/A'}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                {disease.description || 'No description available.'}
                            </p>
                            <div className="flex items-center gap-2 mt-auto">
                                <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase
                   ${disease.risk_level === 'low' ? "bg-emerald-100 text-emerald-700" :
                                        disease.risk_level === 'moderate' ? "bg-yellow-100 text-yellow-700" :
                                            disease.risk_level === 'high' ? "bg-orange-100 text-orange-700" :
                                                "bg-red-100 text-red-700"
                                    }`}>
                                    {disease.risk_level}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
