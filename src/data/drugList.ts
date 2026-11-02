import { DrugMonograph } from '../types/clinical';

export const DRUG_DATABASE: DrugMonograph[] = [
  {
    id: 'epinephrine',
    genericName: 'Epinephrine (Adrenaline)',
    brandNames: ['EpiPen', 'Adrenaclick', 'Auvi-Q', 'Adrenaline 1:1000'],
    drugClass: 'Direct-Acting Sympathomimetic / Alpha & Beta Agonist',
    indications: ['Acute Anaphylaxis', 'Severe Angioedema with Airway Obstruction', 'Cardiac Arrest'],
    adultDose: '0.5 mg (0.5 mL of 1:1,000) IM in anterolateral mid-thigh, or 0.3 mg autoinjector. Repeat every 5-15 min if needed.',
    pediatricDose: '0.01 mg/kg (max 0.3 mg); autoinjector: 0.15 mg for 15-30 kg, 0.3 mg for >30 kg.',
    routes: ['Intramuscular (vastus lateralis)'],
    frequencies: ['Stat, repeat every 5-15 minutes as needed'],
    contraindications: ['No absolute contraindications in life-threatening anaphylaxis.'],
    majorInteractions: [
      {
        interactingDrug: 'Beta-Blockers (Propranolol, Atenolol)',
        severity: 'severe',
        effect: 'May blunt bronchodilator response and lead to unopposed alpha-mediated severe hypertension and reflex bradycardia.',
        management: 'Administer epinephrine as indicated; Glucagon may be required as an antidote if refractoriness occurs.'
      }
    ],
    adverseEffects: ['Palpitations', 'Tachycardia', 'Tremor', 'Anxiety', 'Transient hypertension', 'Pallor'],
    administrationPearls: 'Always inject into the anterolateral mid-thigh. Never inject into gluteal muscle (slow absorption) or digits/extremities (gangrene risk).',
    emergencyProtocol: 'First-line therapy for anaphylaxis. Do not delay injection for minor signs.'
  },
  {
    id: 'salbutamol',
    genericName: 'Salbutamol (Albuterol)',
    brandNames: ['Ventolin', 'ProAir', 'Asthalin', 'Salamol'],
    drugClass: 'Short-Acting Beta-2 Adrenergic Agonist (SABA)',
    indications: ['Acute Bronchospasm', 'Acute Asthma Exacerbation', 'Exercise-Induced Bronchospasm'],
    adultDose: '100 mcg per puff: 4 to 10 puffs via spacer device. 1 puff every 30-60 seconds, repeated every 15-20 min if needed.',
    pediatricDose: '2 to 6 puffs via spacer with mask (for age < 4 yrs) or mouthpiece (age ≥ 4 yrs).',
    routes: ['Inhalation (MDI with spacer preferred)'],
    frequencies: ['Stat, every 15-20 minutes up to 3 cycles in first hour if severe'],
    contraindications: ['Hypersensitivity to salbutamol. Caution in severe cardiac arrhythmias.'],
    majorInteractions: [
      {
        interactingDrug: 'Non-Selective Beta-Blockers (Propranolol, Timolol eye drops)',
        severity: 'life_threatening',
        effect: 'Direct antagonism blocks bronchodilation and precipitates severe fatal bronchospasm.',
        management: 'Strictly avoid beta-blockers in reactive airway disease.'
      }
    ],
    adverseEffects: ['Fine skeletal muscle tremor', 'Tachycardia', 'Palpitations', 'Headache', 'Hypokalemia at high doses'],
    administrationPearls: 'Using a spacer chamber improves pulmonary drug deposition by up to 50% compared to uncoordinated MDI puffing.',
    emergencyProtocol: 'Administer 4-10 puffs with spacer while sitting patient upright.'
  },
  {
    id: 'cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    brandNames: ['Zyrtec', 'Cetzine', 'Alerid'],
    drugClass: 'Second-Generation H1-Receptor Antagonist',
    indications: ['Allergic Rhinitis', 'Urticaria / Hives', 'Mild Allergic Pruritus'],
    adultDose: '10 mg once daily orally.',
    pediatricDose: '2.5 mg to 5 mg once daily depending on age (6 months - 11 years).',
    routes: ['Oral'],
    frequencies: ['Once daily'],
    contraindications: ['End-stage renal disease (CrCl < 10 mL/min). Hypersensitivity to hydroxyzine/piperazines.'],
    majorInteractions: [
      {
        interactingDrug: 'CNS Depressants / Alcohol',
        severity: 'mild',
        effect: 'Additive somnolence and motor impairment.',
        management: 'Caution when driving or operating machinery.'
      }
    ],
    adverseEffects: ['Mild sedation', 'Dry mouth', 'Fatigue', 'Headache'],
    administrationPearls: 'Useful for cutaneous hives, but NOT an emergency airway drug. Never use as sole therapy in systemic anaphylaxis.',
    emergencyProtocol: 'Second-line adjunct only after IM epinephrine in anaphylaxis.'
  },
  {
    id: 'paracetamol',
    genericName: 'Paracetamol (Acetaminophen)',
    brandNames: ['Panadol', 'Tylenol', 'Calpol', 'Paramol'],
    drugClass: 'Centrally-Acting Analgesic & Antipyretic',
    indications: ['Mild to Moderate Pain', 'Fever', 'Post-Trauma Analgesia', 'Burn Pain Relief'],
    adultDose: '500 mg to 1,000 mg every 4 to 6 hours as needed (Maximum 4,000 mg in 24 hours).',
    pediatricDose: '10 to 15 mg/kg per dose orally every 4 to 6 hours (Maximum 60 mg/kg/day or 4 doses).',
    routes: ['Oral', 'Rectal', 'Intravenous'],
    frequencies: ['Every 4-6 hours PRN'],
    contraindications: ['Severe active hepatic impairment or acute liver failure.', 'Known paracetamol hypersensitivity.'],
    majorInteractions: [
      {
        interactingDrug: 'Chronic Alcohol Excess / Isoniazid',
        severity: 'moderate',
        effect: 'Induces CYP2E1, accelerating production of toxic metabolite NAPQI and increasing hepatotoxicity risk.',
        management: 'Limit total daily paracetamol to 2,000 mg in chronic liver disease or alcohol use.'
      }
    ],
    adverseEffects: ['Rare in therapeutic doses. Hepatotoxicity and acute hepatic necrosis in acute overdose (>150 mg/kg).'],
    administrationPearls: 'Calculate weight-based dosing for pediatric patients using oral measuring syringes, not household teaspoons.',
    emergencyProtocol: 'In acute overdose (>150 mg/kg), refer immediately to hospital for IV N-acetylcysteine (NAC) within 8 hours.'
  },
  {
    id: 'ibuprofen',
    genericName: 'Ibuprofen',
    brandNames: ['Brufen', 'Advil', 'Motrin', 'Nurofen'],
    drugClass: 'Non-Steroidal Anti-Inflammatory Drug (NSAID)',
    indications: ['Inflammatory Musculoskeletal Pain', 'Mild to Moderate Pain', 'Fever'],
    adultDose: '200 mg to 400 mg every 6 to 8 hours with food (Maximum 1,200 mg OTC, 2,400 mg Rx).',
    pediatricDose: '5 to 10 mg/kg per dose every 6 to 8 hours with food (Maximum 30-40 mg/kg/day).',
    routes: ['Oral'],
    frequencies: ['Every 6-8 hours with food'],
    contraindications: [
      'Active peptic ulcer disease or history of GI bleeding',
      'Severe asthma / Aspirin-Exacerbated Respiratory Disease (AERD)',
      'Third trimester of pregnancy',
      'Severe renal impairment (eGFR < 30 mL/min)'
    ],
    majorInteractions: [
      {
        interactingDrug: 'Warfarin / Direct Oral Anticoagulants',
        severity: 'severe',
        effect: 'Inhibits platelet COX-1 and causes GI mucosal erosion, dramatically increasing major bleeding risk.',
        management: 'Avoid concurrent use. Use Paracetamol for analgesia.'
      },
      {
        interactingDrug: 'ACE Inhibitors / ARBs + Diuretics (Triple Whammy)',
        severity: 'severe',
        effect: 'Constricts afferent arterioles, causing acute renal failure and hyperkalemia.',
        management: 'Avoid combination; monitor renal function.'
      }
    ],
    adverseEffects: ['Dyspepsia', 'GI bleeding/ulceration', 'Bronchospasm in sensitive asthmatics', 'Fluid retention', 'Renal impairment'],
    administrationPearls: 'Always counsel patients to take with meals or milk. Avoid in active asthmatics unless known to tolerate NSAIDs.',
    emergencyProtocol: 'Contraindicated in bleeding trauma wounds and acute asthma.'
  },
  {
    id: 'warfarin',
    genericName: 'Warfarin Sodium',
    brandNames: ['Coumadin', 'Marevan'],
    drugClass: 'Vitamin K Antagonist / Oral Anticoagulant',
    indications: ['Deep Vein Thrombosis', 'Pulmonary Embolism', 'Atrial Fibrillation Thromboprophylaxis', 'Mechanical Heart Valves'],
    adultDose: 'Target INR usually 2.0 - 3.0 (or 2.5 - 3.5 for mechanical valves). Dose adjusted by INR.',
    routes: ['Oral'],
    frequencies: ['Once daily in the evening'],
    contraindications: ['Active bleeding', 'Severe thrombocytopenia', 'Pregnancy (teratogenic)'],
    majorInteractions: [
      {
        interactingDrug: 'Miconazole (Oral Gel or Topical Buccal)',
        severity: 'life_threatening',
        effect: 'Miconazole potent CYP2C9 inhibition impairs warfarin clearance, causing massive INR spike (>10) and catastrophic bleeding.',
        management: 'Completely avoid miconazole oral gel in warfarin patients. Use nystatin oral suspension instead.'
      },
      {
        interactingDrug: 'Co-trimoxazole / Ciprofloxacin / Metronidazole',
        severity: 'severe',
        effect: 'CYP2C9 inhibition doubles INR, triggering spontaneous hematomas or GI bleed.',
        management: 'Reduce warfarin dose by 30-50% and monitor INR within 3 days if concurrent use is unavoidable.'
      }
    ],
    adverseEffects: ['Spontaneous bruising', 'Epistaxis', 'Hematuria', 'Major hemorrhage'],
    administrationPearls: 'Patient education regarding INR monitoring and reporting signs of spontaneous bleeding is mandatory.',
    emergencyProtocol: 'In major bleed: refer immediately for IV Vitamin K1 (Phytomenadione) and Prothrombin Complex Concentrate (PCC).'
  },
  {
    id: 'miconazole_gel',
    genericName: 'Miconazole Oral Gel',
    brandNames: ['Daktarin Oral Gel'],
    drugClass: 'Imidazole Antifungal',
    indications: ['Oral Candidiasis (Thrush) in Adults and Children'],
    adultDose: '2.5 mL (half a measuring spoonful) 4 times daily after meals, held in mouth for as long as possible before swallowing.',
    routes: ['Oral buccal'],
    frequencies: ['4 times daily'],
    contraindications: ['Infants under 4 months (choking risk)', 'Patients receiving Warfarin (absolute contraindication)'],
    majorInteractions: [
      {
        interactingDrug: 'Warfarin',
        severity: 'life_threatening',
        effect: 'Systemic absorption through buccal mucosa potently inhibits CYP2C9, leading to fatal hemorrhages.',
        management: 'Contraindicated. Prescribe Nystatin suspension instead.'
      }
    ],
    adverseEffects: ['Nausea', 'Dysgeusia (taste alteration)', 'Choking if placed too far back in infant mouth'],
    administrationPearls: 'Always screen for anticoagulant therapy before dispensing oral miconazole gel.',
    emergencyProtocol: 'If co-dispensed with warfarin, immediately withhold, check urgent INR, and notify medical doctor.'
  },
  {
    id: 'lisinopril',
    genericName: 'Lisinopril',
    brandNames: ['Zestril', 'Prinivil'],
    drugClass: 'Angiotensin-Converting Enzyme (ACE) Inhibitor',
    indications: ['Hypertension', 'Heart Failure', 'Diabetic Nephropathy'],
    adultDose: '10 mg to 40 mg once daily.',
    routes: ['Oral'],
    frequencies: ['Once daily'],
    contraindications: ['History of ACE-inhibitor associated angioedema', 'Hereditary angioedema', 'Pregnancy'],
    majorInteractions: [
      {
        interactingDrug: 'Potassium Supplements / Spironolactone',
        severity: 'moderate',
        effect: 'Additively elevates serum potassium, risking hyperkalemic arrhythmias.',
        management: 'Monitor serum electrolytes periodically.'
      }
    ],
    adverseEffects: ['Persistent dry cough', 'Angioedema (lip, tongue, throat swelling)', 'Hyperkalemia', 'Hypotension'],
    administrationPearls: 'ACEI angioedema is bradykinin-mediated, not histamine-mediated. It can develop months or years into therapy.',
    emergencyProtocol: 'If lip, tongue, or airway swelling occurs: immediately discontinue, maintain airway, call EMS, and never re-challenge.'
  }
];
