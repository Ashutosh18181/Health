import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { symptoms } = await request.json(); // Array of symptom names or IDs

        if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
            return NextResponse.json({ error: 'No symptoms provided' }, { status: 400 });
        }

        const supabase = await createClient();

        // 1. Fetch diseases that have ANY of the selected symptoms
        // We do this by querying disease_symptoms

        // First, resolve symptom IDs if names provided, but let's assume IDs API-side for robustness.
        // If names are passed, we would need to look them up. Assuming IDs for now.
        // Actually, let's support names too just in case.

        // For simplicity validation, let's assume we receive an array of Symptom IDs.
        const symptomIds = symptoms;

        const { data: matches, error } = await supabase
            .from('disease_symptoms')
            .select(`
        disease_id,
        weight,
        diseases (
          id,
          name,
          description,
          risk_level,
          general_advice
        )
      `)
            .in('symptom_id', symptomIds);

        if (error) throw error;

        // 2. Score Diseases
        const diseaseScores = new Map();

        matches.forEach((match: any) => {
            const disease = match.diseases;
            const weight = match.weight || 1;

            if (!diseaseScores.has(disease.id)) {
                diseaseScores.set(disease.id, {
                    ...disease,
                    score: 0,
                    matched_symptoms_count: 0
                });
            }

            const entry = diseaseScores.get(disease.id);
            entry.score += weight;
            entry.matched_symptoms_count += 1;
        });

        // 3. Convert to array and sort
        const results = Array.from(diseaseScores.values())
            .map(d => ({
                ...d,
                confidence: Math.min((d.score / (d.matched_symptoms_count * 5 + 5)) * 100, 95) // fast hacky confidence
                // Better confidence: score / (total possible score for this disease)
                // usage: matched_count / total_symptoms_of_disease ?
                // For now, raw score sorting is enough for MVP.
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 10); // Top 10

        return NextResponse.json({ results });

    } catch (error: any) {
        console.error('Diagnosis error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
