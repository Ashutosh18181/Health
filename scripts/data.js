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
    {
        name: 'Common Cold', icd: 'J00', risk: 'low',
        advice: 'Rest and fluids.',
        prevention: 'Wash hands frequently, avoid close contact with sick people.',
        treatment: 'Over-the-counter decongestants, hydration, rest.',
        specialist: 'General Practitioner',
        causes: 'Viral infection (Rhinovirus), weakened immunity, exposure to cold weather.',
        risk_factors: 'Close contact with infected individuals, seasonal changes, smoking.',
        when_to_see_doctor: 'If symptoms persist > 10 days, high fever, or difficulty breathing.',
        affected_groups: 'Everyone, especially children and elderly.',
        symptoms: ['Cough', 'Sore throat', 'Runny nose', 'Fever']
    },
    {
        name: 'Influenza (Flu)', icd: 'J11', risk: 'moderate',
        advice: 'Rest, fluids, antivirals if severe.',
        prevention: 'Annual flu vaccination, hygiene.',
        treatment: 'Antivirals (Tamiflu), pain relievers, bed rest.',
        specialist: 'General Practitioner',
        causes: 'Influenza viruses (A, B, C), airborne droplets from infected persons.',
        risk_factors: 'Age < 5 or > 65, pregnancy, chronic illness, weakened immune system.',
        when_to_see_doctor: 'Difficulty breathing, chest pain, persistent dizziness, seizures.',
        affected_groups: 'All ages, high risk for elderly and infants.',
        symptoms: ['Fever', 'Chills', 'Muscle aches', 'Cough', 'Headache', 'Fatigue']
    },
    {
        name: 'COVID-19', icd: 'U07.1', risk: 'high',
        advice: 'Isolate, monitor oxygen, seek help if breathing difficult.',
        prevention: 'Vaccination, masking in high-risk areas, ventilation.',
        treatment: 'Symptomatic relief, antivirals (Paxlovid), oxygen therapy if severe.',
        specialist: 'Infectious Disease Specialist',
        causes: 'SARS-CoV-2 virus transmission via respiratory droplets.',
        risk_factors: 'Obesity, diabetes, cardiovascular disease, age > 60.',
        when_to_see_doctor: 'Oxygen saturation < 94%, confusion, blue lips/face.',
        affected_groups: 'Global population.',
        symptoms: ['Fever', 'Cough', 'Shortness of breath', 'Fatigue', 'Loss of taste or smell']
    },
    {
        name: 'Migraine', icd: 'G43', risk: 'moderate',
        advice: 'Rest in dark room, hydration.',
        prevention: 'Identify triggers (stress, food), regular sleep schedule.',
        treatment: 'Triptans, pain relievers, anti-nausea medication.',
        specialist: 'Neurologist',
        causes: 'Genetics, hormonal changes, stress, certain foods (aged cheese, wine).',
        risk_factors: 'Family history, female gender, high stress levels.',
        when_to_see_doctor: 'Sudden severe headache ("thunderclap"), visual loss, speech difficulty.',
        affected_groups: 'Adults 20-50, more common in women.',
        symptoms: ['Headache', 'Nausea', 'Sensitivity to light']
    },
    {
        name: 'Hypertension', icd: 'I10', risk: 'high',
        advice: 'Dietary changes, exercise, medication.',
        prevention: 'Low salt diet, regular exercise, weight management.',
        treatment: 'ACE inhibitors, lifestyle changes, regular monitoring.',
        specialist: 'Cardiologist',
        causes: 'High salt intake, obesity, genetics, lack of physical activity.',
        risk_factors: 'Smoking, alcohol, stress, age > 45, family history.',
        when_to_see_doctor: 'BP > 180/120 (Hypertensive Crisis), chest pain, vision changes.',
        affected_groups: 'Adults > 40, African Americans.',
        symptoms: ['Headache', 'Shortness of breath', 'Nosebleeds', 'Dizziness']
    },
    {
        name: 'Diabetes Type 2', icd: 'E11', risk: 'high',
        advice: 'Diet control, exercise, insulin if needed.',
        prevention: 'Healthy diet, regular physical activity, weight loss.',
        treatment: 'Metformin, insulin therapy, blood sugar monitoring.',
        specialist: 'Endocrinologist',
        causes: 'Insulin resistance, obesity, genetics, sedentary lifestyle.',
        risk_factors: 'Overweight, age > 45, family history, inactivity.',
        when_to_see_doctor: 'Frequent infections, slow healing sores, extreme fatigue.',
        affected_groups: 'Adults > 45, rising in younger adults.',
        symptoms: ['Increased thirst', 'Frequent urination', 'Hunger', 'Blurry vision']
    },
    {
        name: 'Asthma', icd: 'J45', risk: 'moderate',
        advice: 'Inhalers, avoid triggers.',
        prevention: 'Avoid allergens, smoke, and pollution.',
        treatment: 'Inhalers (bronchodilators, steroids), allergy medications.',
        specialist: 'Pulmonologist',
        causes: 'Airway inflammation, allergens (pollen, dust), genetics.',
        risk_factors: 'Family history of allergies, smoking exposure, pollution.',
        when_to_see_doctor: 'Inhaler not working, rapid breathing, talking difficulty.',
        affected_groups: 'Children and adults.',
        symptoms: ['Shortness of breath', 'Chest tightness', 'Wheezing', 'Cough']
    },
    {
        name: 'Pneumonia', icd: 'J18', risk: 'high',
        advice: 'Antibiotics, rest, hospital if severe.',
        prevention: 'Vaccination (Pneumococcal), good hygiene.',
        treatment: 'Antibiotics (if bacterial), fluids, oxygen therapy.',
        specialist: 'Pulmonologist',
        causes: 'Bacterial, viral, or fungal infection of air sacs.',
        risk_factors: 'Age > 65 or < 2, smoking, chronic lung disease.',
        when_to_see_doctor: 'High fever, shaking chills, chest pain, confusion.',
        affected_groups: 'Elderly, infants, immunocompromised.',
        symptoms: ['Cough with phlegm', 'Fever', 'Chills', 'Difficulty breathing']
    },
    {
        name: 'Gastroenteritis', icd: 'A09', risk: 'moderate',
        advice: 'Fluids, BRAT diet.',
        prevention: 'Hand washing, food safety.',
        treatment: 'Rehydration salts, anti-emetics, probiotics.',
        specialist: 'Gastroenterologist',
        causes: 'Viral (Norovirus) or bacterial infection (Salmonella) from food/water.',
        risk_factors: 'Contaminated food/water, poor hygiene, travel.',
        when_to_see_doctor: 'Bloody stool, severe dehydration, fever > 102°F.',
        affected_groups: 'All ages, dangerous for infants/elderly.',
        symptoms: ['Diarrhea', 'Vomiting', 'Stomach pain', 'Fever']
    },
    {
        name: 'Anemia', icd: 'D64', risk: 'moderate',
        advice: 'Iron supplements, dietary changes.',
        prevention: 'Iron-rich diet (spinach, red meat).',
        treatment: 'Iron supplements, vitamin B12 injections.',
        specialist: 'Hematologist',
        causes: 'Iron deficiency, vitamin B12 deficiency, blood loss.',
        risk_factors: 'Menstruation, pregnancy, low-iron diet, chronic disease.',
        when_to_see_doctor: 'Shortness of breath, chest pain, fainting.',
        affected_groups: 'Women of childbearing age, vegetarians.',
        symptoms: ['Fatigue', 'Weakness', 'Pale skin', 'Chest pain']
    },
    {
        name: 'Malaria', icd: 'B54', risk: 'high',
        advice: 'Antimalarial medication.',
        prevention: 'Mosquito nets, repellents, prophylaxis.',
        treatment: 'Artemisinin-based combination therapy (ACT).',
        specialist: 'Infectious Disease Specialist',
        causes: 'Plasmodium parasite transmitted by Anopheles mosquito.',
        risk_factors: 'Living in or traveling to tropical regions.',
        when_to_see_doctor: 'Fever after travel to endemic area (emergency).',
        affected_groups: 'Travelers, residents of tropical areas.',
        symptoms: ['Fever', 'Chills', 'Sweating', 'Headache']
    },
    {
        name: 'Tuberculosis', icd: 'A15', risk: 'critical',
        advice: 'Long-term antibiotics.',
        prevention: 'BCG vaccine, infection control.',
        treatment: '6-9 months of combination antibiotics (RIPE therapy).',
        specialist: 'Infectious Disease Specialist',
        causes: 'Mycobacterium tuberculosis bacteria.',
        risk_factors: 'Close contact with TB patient, HIV/AIDS, malnutrition.',
        when_to_see_doctor: 'Coughing up blood, unexplained weight loss.',
        affected_groups: 'Immunocompromised, crowded living conditions.',
        symptoms: ['Coughing blood', 'Chest pain', 'Weight loss', 'Night sweats']
    },
    {
        name: 'GERD', icd: 'K21', risk: 'moderate',
        advice: 'Avoid spicy food, dont lie down after eating.',
        prevention: 'Small meals, avoid late eating, elevate head while sleeping.',
        treatment: 'Antacids, PPIs, dietary modifications.',
        specialist: 'Gastroenterologist',
        causes: 'Weak lower esophageal sphincter, hiatal hernia.',
        risk_factors: 'Obesity, pregnancy, smoking, spicy/fatty foods.',
        when_to_see_doctor: 'Difficulty swallowing, chest pain, choking sensation.',
        affected_groups: 'Adults > 40, pregnant women.',
        symptoms: ['Heartburn', 'Chest pain', 'Regurgitation']
    },
    {
        name: 'Appendicitis', icd: 'K35', risk: 'critical',
        advice: 'Immediate surgery.',
        prevention: 'High fiber diet may help (not guaranteed).',
        treatment: 'Appendectomy (surgical removal).',
        specialist: 'General Surgeon',
        causes: 'Blockage of the appendix lining (fecalith, infection).',
        risk_factors: 'Age 10-30, family history.',
        when_to_see_doctor: 'Severe right lower abdominal pain (Emergency).',
        affected_groups: 'Teens and young adults.',
        symptoms: ['Abdominal pain', 'Nausea', 'Vomiting']
    },
    {
        name: 'Bronchitis', icd: 'J40', risk: 'moderate',
        advice: 'Rest, hydration.',
        prevention: 'Avoid smoking, vaccination.',
        treatment: 'Rest, fluids, cough suppressants.',
        specialist: 'Pulmonologist',
        causes: 'Viral infection (cold/flu), smoking, air pollution.',
        risk_factors: 'Smoking, low immunity, exposure to irritants.',
        when_to_see_doctor: 'Cough > 3 weeks, fever > 100.4°F, bloody mucus.',
        affected_groups: 'Smokers, elderly, children.',
        symptoms: ['Cough', 'Fatigue', 'Shortness of breath']
    }
];
