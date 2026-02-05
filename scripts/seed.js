import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { symptomsData, diseasesData } from './data.js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Note: Ideally use SERVICE_ROLE_KEY for admin tasks, but ANON with RLS policies allowing insert for admin might work 
// OR we just use SERVICE_ROLE key if available. For this setup, we'll try to rely on Service Role if user provides it, or just Anon if policies allow.
// Usually for seeding, we NEED service_role key to bypass RLS.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    console.log('🌱 Starting seed...');

    // 1. Insert Symptoms
    console.log(`Preparing ${symptomsData.length} symptoms...`);

    // Dedup symptoms by slug
    const uniqueSymptoms = Array.from(new Map(symptomsData.map(item => [item.slug, item])).values());
    console.log(`Inserting ${uniqueSymptoms.length} unique symptoms...`);

    const { data: symptoms, error: symptomError } = await supabase
        .from('symptoms')
        .upsert(uniqueSymptoms, { onConflict: 'slug' })
        .select();

    if (symptomError) {
        console.error('Error inserting symptoms:', symptomError);
        return;
    }
    console.log('✅ Symptoms inserted.');

    // 2. Insert Diseases
    console.log(`Preparing ${diseasesData.length} diseases...`);

    const diseasesPayload = diseasesData.map(d => ({
        name: d.name,
        icd_code: d.icd,
        risk_level: d.risk,
        general_advice: d.advice,
        prevention: d.prevention,
        treatment: d.treatment,
        specialist: d.specialist,
        causes: d.causes,
        risk_factors: d.risk_factors,
        when_to_see_doctor: d.when_to_see_doctor,
        affected_groups: d.affected_groups,
        description: `A condition characterized by ${d.symptoms.slice(0, 3).join(', ')}.`
    }));

    // Manual Update/Insert Loop
    console.log(`Processing ${diseasesPayload.length} diseases...`);

    // Fetch existing to map Names -> IDs
    const { data: existingDiseases } = await supabase.from('diseases').select('id, name');
    const existingMap = new Map(existingDiseases?.map(d => [d.name, d.id]) || []);

    const updates = [];
    const inserts = [];

    for (const d of diseasesPayload) {
        if (existingMap.has(d.name)) {
            updates.push({ ...d, id: existingMap.get(d.name) });
        } else {
            inserts.push(d);
        }
    }

    // Perform Updates
    if (updates.length > 0) {
        console.log(`Updating ${updates.length} existing diseases...`);
        for (const update of updates) {
            const { error } = await supabase
                .from('diseases')
                .update(update)
                .eq('id', update.id);
            if (error) console.error(`Error updating ${update.name}:`, error);
        }
    }

    // Perform Inserts
    let diseaseIds = existingDiseases || [];
    if (inserts.length > 0) {
        console.log(`Inserting ${inserts.length} new diseases...`);
        const { data: newlyInserted, error } = await supabase.from('diseases').insert(inserts).select('id, name');
        if (error) {
            console.error('Error inserting new diseases:', error);
        } else {
            diseaseIds = [...diseaseIds, ...newlyInserted];
        }
    }

    console.log('✅ Diseases processed.');

    // 3. Map Disease Symptoms
    console.log('🔗 Mapping diseases to symptoms...');
    const diseaseSymptomsPayload = [];

    for (const diseaseData of diseasesData) {
        const disease = diseaseIds.find(d => d.name === diseaseData.name);
        if (!disease) continue;

        for (const symptomName of diseaseData.symptoms) {
            // Find symptom by name (fuzzy or exact)
            const match = symptoms.find(s => s.name.toLowerCase() === symptomName.toLowerCase()) ||
                symptoms.find(s => s.name.toLowerCase().includes(symptomName.toLowerCase()));

            if (match) {
                diseaseSymptomsPayload.push({
                    disease_id: disease.id,
                    symptom_id: match.id,
                    weight: 5 // Default weight
                });
            }
        }
    }

    // Insert links (we'll just use insert and ignore conflict if possible, or same check)
    // But disease_symptoms has unique(disease_id, symptom_id), so upsert works there!
    if (diseaseSymptomsPayload.length > 0) {
        const { error: linkError } = await supabase
            .from('disease_symptoms')
            .upsert(diseaseSymptomsPayload, { onConflict: 'disease_id,symptom_id', ignoreDuplicates: true });

        if (linkError) console.error('Error linking symptoms:', linkError);
        else console.log(`✅ Processed links.`);
    }

    console.log('🎉 Seeding complete!');
}

seed().catch(console.error);
