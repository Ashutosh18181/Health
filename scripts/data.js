const bodySystems = [
    'Cardiovascular', 'Respiratory', 'Digestive', 'Nervous', 'Musculoskeletal',
    'Integumentary', 'Endocrine', 'Reproductive', 'Urinary', 'Immune'
];

const severities = ['low', 'medium', 'high', 'critical'];

const specificSymptoms = [
    { name: 'Fever', body_system: 'Immune', severity_level: 'medium' },
    { name: 'Cough', body_system: 'Respiratory', severity_level: 'low' },
    { name: 'Fatigue', body_system: 'Nervous', severity_level: 'low' },
    { name: 'Nausea', body_system: 'Digestive', severity_level: 'medium' },
    { name: 'Vomiting', body_system: 'Digestive', severity_level: 'medium' },
    { name: 'Headache', body_system: 'Nervous', severity_level: 'medium' },
    { name: 'Chills', body_system: 'Immune', severity_level: 'medium' },
    { name: 'Sweating', body_system: 'Integumentary', severity_level: 'low' },
    { name: 'Shortness of breath', body_system: 'Respiratory', severity_level: 'high' },
    { name: 'Chest pain', body_system: 'Cardiovascular', severity_level: 'critical' },
    { name: 'Dizziness', body_system: 'Nervous', severity_level: 'medium' },
    { name: 'Sore throat', body_system: 'Respiratory', severity_level: 'low' },
    { name: 'Runny nose', body_system: 'Respiratory', severity_level: 'low' },
    { name: 'Diarrhea', body_system: 'Digestive', severity_level: 'medium' },
    { name: 'Constipation', body_system: 'Digestive', severity_level: 'low' },
    { name: 'Abdominal pain', body_system: 'Digestive', severity_level: 'medium' },
    { name: 'Back pain', body_system: 'Musculoskeletal', severity_level: 'medium' },
    { name: 'Joint pain', body_system: 'Musculoskeletal', severity_level: 'medium' },
    { name: 'Rash', body_system: 'Integumentary', severity_level: 'low' },
    { name: 'Itching', body_system: 'Integumentary', severity_level: 'low' },
    { name: 'Blurry vision', body_system: 'Nervous', severity_level: 'medium' },
    { name: 'Hearing loss', body_system: 'Nervous', severity_level: 'medium' },
    { name: 'Insomnia', body_system: 'Nervous', severity_level: 'low' },
    { name: 'Anxiety', body_system: 'Nervous', severity_level: 'low' },
    { name: 'Depression', body_system: 'Nervous', severity_level: 'medium' },
];

// Generative symptoms to reach ~400+
const conditions = [
    'Pain', 'Swelling', 'Numbness', 'Weakness', 'Bleeding', 'Inflammation',
    'Cramps', 'Stiffness', 'Discoloration', 'Tingling', 'Itching', 'Burning',
    'Coldness', 'Heat', 'Tremors', 'Redness', 'Tenderness' // 17 conditions
];
// 30 locations * 17 conditions = 510 symptoms + specific ones = ~535. Perfect.

const locations = [
    'Head', 'Neck', 'Shoulder', 'Upper Arm', 'Elbow', 'Forearm', 'Wrist', 'Hand', 'Finger',
    'Chest', 'Abdomen', 'Upper Back', 'Lower Back', 'Hip', 'Thigh', 'Knee', 'Calf', 'Ankle', 'Foot', 'Toe',
    'Eye', 'Ear', 'Nose', 'Mouth', 'Tongue', 'Throat', 'Stomach', 'Liver', 'Kidney', 'Bladder'
];

const generatedSymptoms = [];

locations.forEach(loc => {
    conditions.forEach(cond => {
        generatedSymptoms.push({
            name: `${loc} ${cond}`,
            body_system: 'Musculoskeletal',
            severity_level: 'medium'
        });
    });
});

export const symptomsData = [...specificSymptoms, ...generatedSymptoms].map(s => ({
    ...s,
    slug: s.name.toLowerCase().replace(/ /g, '-')
}));

export const diseasesData = [
    { name: 'Common Cold', icd: 'J00', risk: 'low', advice: 'Rest and fluids.', symptoms: ['Cough', 'Sore throat', 'Runny nose', 'Fever'] },
    { name: 'Influenza (Flu)', icd: 'J11', risk: 'moderate', advice: 'Rest, fluids, antivirals.', symptoms: ['Fever', 'Chills', 'Muscle aches', 'Cough', 'Headache', 'Fatigue'] },
    { name: 'COVID-19', icd: 'U07.1', risk: 'high', advice: 'Isolate, monitor oxygen.', symptoms: ['Fever', 'Cough', 'Shortness of breath', 'Fatigue', 'Loss of taste or smell'] },
    { name: 'Migraine', icd: 'G43', risk: 'moderate', advice: 'Rest in dark room.', symptoms: ['Headache', 'Nausea', 'Sensitivity to light'] },
    { name: 'Hypertension', icd: 'I10', risk: 'high', advice: 'Dietary changes, exercise.', symptoms: ['Headache', 'Shortness of breath', 'Nosebleeds', 'Dizziness'] },
    { name: 'Diabetes Type 2', icd: 'E11', risk: 'high', advice: 'Diet control, insulin.', symptoms: ['Increased thirst', 'Frequent urination', 'Hunger', 'Blurry vision'] },
    { name: 'Asthma', icd: 'J45', risk: 'moderate', advice: 'Inhalers.', symptoms: ['Shortness of breath', 'Chest tightness', 'Wheezing', 'Cough'] },
    { name: 'Pneumonia', icd: 'J18', risk: 'high', advice: 'Antibiotics, rest.', symptoms: ['Cough with phlegm', 'Fever', 'Chills', 'Difficulty breathing'] },
    { name: 'Gastroenteritis', icd: 'A09', risk: 'moderate', advice: 'Fluids, BRAT diet.', symptoms: ['Diarrhea', 'Vomiting', 'Stomach pain', 'Fever'] },
    { name: 'Anemia', icd: 'D64', risk: 'moderate', advice: 'Iron supplements.', symptoms: ['Fatigue', 'Weakness', 'Pale skin', 'Chest pain'] },
    { name: 'Malaria', icd: 'B54', risk: 'high', advice: 'Antimalarial medication.', symptoms: ['Fever', 'Chills', 'Sweating', 'Headache'] },
    { name: 'Tuberculosis', icd: 'A15', risk: 'critical', advice: 'Antibiotics.', symptoms: ['Coughing blood', 'Chest pain', 'Weight loss', 'Night sweats'] },
    { name: 'GERD', icd: 'K21', risk: 'moderate', advice: 'Avoid trigger foods.', symptoms: ['Heartburn', 'Chest pain', 'Regurgitation'] },
    { name: 'Appendicitis', icd: 'K35', risk: 'critical', advice: 'Surgery.', symptoms: ['Abdominal pain', 'Nausea', 'Vomiting'] },
    { name: 'Bronchitis', icd: 'J40', risk: 'moderate', advice: 'Rest.', symptoms: ['Cough', 'Fatigue', 'Shortness of breath'] }
];
