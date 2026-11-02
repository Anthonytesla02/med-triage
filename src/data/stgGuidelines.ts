export interface STGChapter {
  id: string;
  category: 'trauma' | 'acute_emergency' | 'pharma_emergency';
  title: string;
  source: string;
  overview: string;
  firstAidProtocol: string[];
  pharmacyRole: string[];
  contraindicationsAndWarnings: string[];
  referralCriteria: string[];
  clinicalPearls: string[];
}

export const STG_GUIDELINES: STGChapter[] = [
  {
    id: 'stg-wound-care',
    category: 'trauma',
    title: 'Management of Acute Minor Wounds & Lacerations',
    source: 'Ghana Standard Treatment Guidelines (STG 7th Ed.) & WHO Basic Emergency Care',
    overview: 'Assessment and initial management of minor cuts, lacerations, and abrasions presenting in the primary community pharmacy setting.',
    firstAidProtocol: [
      '1. Infection Control: Wear sterile examination gloves and adhere to universal precautions.',
      '2. Bleeding Control: Apply continuous firm, direct pressure over the wound using sterile gauze. Elevate the affected limb if no fracture is suspected.',
      '3. Wound Cleansing & Irrigation: Copiously irrigate the wound with sterile 0.9% normal saline or clean potable water to remove foreign debris. Avoid scrubbing healthy granulating tissue.',
      '4. Contamination Check: Inspect for visible, easily accessible superficial grit. Never probe deeply into puncture wounds or forcibly extract embedded foreign bodies.',
      '5. Dressing Selection: Apply a sterile non-adherent dressing pad and secure with an appropriate bandage or hypoallergenic tape.',
      '6. Tetanus Triage: Assess tetanus toxoid vaccination status (booster recommended if last dose > 5 years ago for dirty wounds, or > 10 years for clean wounds).'
    ],
    pharmacyRole: [
      'Decontaminate superficial wounds with copious irrigation',
      'Provide sterile dressing and teach wound monitoring',
      'Assess for signs of infection (erythema, warmth, purulent discharge)',
      'Dispense appropriate oral analgesia (paracetamol) if indicated'
    ],
    contraindicationsAndWarnings: [
      'DO NOT pour hydrogen peroxide or surgical methylated spirit directly onto open wound beds; they cause chemical tissue necrosis, impair leukocyte activity, and delay wound healing.',
      'DO NOT attempt closure or primary suturing of dirty, contaminated, animal bite, or deep puncture wounds in a community pharmacy.',
      'DO NOT use tourniquets for standard minor venous or capillary bleeds.'
    ],
    referralCriteria: [
      'Arterial spurting or uncontrolled bleeding despite 10-15 minutes of firm direct pressure',
      'Wounds extending deep into fascia, tendon, muscle, or exposing bone/joints',
      'Facial or genital lacerations requiring specialized cosmetic repair',
      'Human or animal bites (high rabies and polymorphic infection risk)',
      'Loss of distal neurovascular sensation, motor function, or capillary refill > 2 seconds'
    ],
    clinicalPearls: [
      'Saline irrigation at low to moderate pressure is clinically superior to topical antiseptic dousing.',
      'Direct pressure stops >95% of external bleeding when applied consistently without lifting the gauze constantly.'
    ]
  },
  {
    id: 'stg-burn-care',
    category: 'trauma',
    title: 'First Aid & Management of Thermal and Scald Burns',
    source: 'Ghana STG 7th Ed. & International Society for Burn Injuries (ISBI)',
    overview: 'Immediate assessment, cooling, and covering of acute thermal scalds and flame burns presenting at the pharmacy.',
    firstAidProtocol: [
      '1. Immediate Cooling: Immediately irrigate the burn with clean, cool running water (15°C–25°C) for a minimum of 10 to 20 minutes. Start as soon as possible after injury.',
      '2. Remove Constricting Items: Promptly remove rings, watches, tight clothing, and jewellery around the affected area before swelling sets in.',
      '3. Dressing & Protection: Cover the burn loosely with clean, clear plastic cling film or sterile non-adherent hydrogel sheets. Avoid circumferential tight wrapping.',
      '4. Pain Relief: Administer appropriate age-weight adjusted simple analgesia (e.g. Paracetamol).',
      '5. Hydration: Encourage oral fluids if conscious, tolerating fluids, and not in impending shock.'
    ],
    pharmacyRole: [
      'Initiate rapid active cooling with clean tap water',
      'Calculate approximate Total Body Surface Area (TBSA) using Rule of Nines or Palmar surface (patient palm = ~1% TBSA)',
      'Protect blistered skin and prevent secondary bacterial contamination',
      'Identify critical transfer criteria'
    ],
    contraindicationsAndWarnings: [
      'NEVER apply ice, iced water, or frozen packs directly to a burn; extreme cold causes intense vasoconstriction, frostbite necrosis, and converts partial thickness burns into full thickness burns.',
      'NEVER apply butter, raw eggs, toothpaste, engine oil, or herbal concoctions; these trap heat, induce chemical irritation, and introduce severe bacterial infection.',
      'NEVER intentionally puncture, de-roof, or aspirate intact burn blisters in a pharmacy.'
    ],
    referralCriteria: [
      'Any burn involving the face, airway, neck, hands, feet, genitalia, or over major flexural joints',
      'Partial thickness burns > 10% TBSA in adults, or > 5% TBSA in children/elderly',
      'All full-thickness (third-degree) burns of any size',
      'Chemical burns, electrical high-voltage burns, or burns with suspected smoke inhalation injury'
    ],
    clinicalPearls: [
      'Cool water cooling remains beneficial if initiated up to 3 hours post-injury.',
      'Plastic food wrap (cling film) is an ideal first aid burn dressing: sterile inside, non-adherent, prevents fluid evaporative heat loss, and allows wound visualization without removal.'
    ]
  },
  {
    id: 'stg-asthma-emergency',
    category: 'acute_emergency',
    title: 'Acute Asthma Exacerbation Triage & Bronchodilator Reliever Therapy',
    source: 'Global Initiative for Asthma (GINA 2024) & Ghana STG',
    overview: 'Recognition and rapid pharmacy-level emergency management of acute bronchospasm and severe asthma exacerbations.',
    firstAidProtocol: [
      '1. Immediate Recognition: Identify acute breathlessness, audible wheeze, tachypnea, speech limited to phrases or words, intercostal recession.',
      '2. Patient Positioning: Sit the patient upright and slightly forward. Do NOT allow the patient to lie flat.',
      '3. High-Dose SABA Administration: Administer Salbutamol (Albuterol) 100 mcg MDI via a spacer device: 4 to 10 puffs sequentially. Give 1 puff into spacer, allow 4-5 breaths, wait 30-60 seconds between puffs.',
      '4. Reassurance: Keep the patient calm to minimize anxiety-induced hyperventilation and autonomic surge.',
      '5. Reassess Vitals: Check pulse, respiratory rate, work of breathing, and SpO2 at 5 to 10 minutes.',
      '6. Repeat Dosing if needed: If symptoms persist after first round, administer further 4-10 puffs while preparing emergency transfer.'
    ],
    pharmacyRole: [
      'Provide immediate pressurized MDI bronchodilator with spacer chamber',
      'Monitor oxygen saturation (target 94-98% in adults, 93-95% in children)',
      'Recognize life-threatening "Silent Chest" (loss of wheeze due to air hunger / exhausted respiration)',
      'Coordinate emergency medical transport'
    ],
    contraindicationsAndWarnings: [
      'DO NOT sedate or administer anxiolytics/benzodiazepines; causes fatal respiratory depression.',
      'DO NOT administer non-selective beta-blockers (e.g., Propranolol) or oral NSAIDs to known asthmatics.',
      'DO NOT delay emergency escalation in severe acute exacerbations.'
    ],
    referralCriteria: [
      'SpO2 < 92% on ambient air despite reliever doses',
      'Inability to complete full sentences in one breath, cyanosis, or exhaustion',
      'Peak expiratory flow (PEF) < 50% predicted or personal best',
      'Silent chest (absent breath sounds due to severe airway occlusion)'
    ],
    clinicalPearls: [
      'A spacer device with a standard MDI delivers bronchodilator aerosol to peripheral airways as effectively as a wet nebulizer and works faster with less aerosolization risk.',
      'A silent chest is an ominous pre-terminal sign in asthma, indicating near-total absence of air movement.'
    ]
  },
  {
    id: 'stg-anaphylaxis-emergency',
    category: 'acute_emergency',
    title: 'Community Management of Anaphylaxis & Severe Allergic Reactions',
    source: 'World Allergy Organization (WAO 2020) & Resuscitation Council UK / Ghana STG',
    overview: 'Emergency recognition and immediate lifesaving administration of intramuscular epinephrine for acute anaphylaxis.',
    firstAidProtocol: [
      '1. Emergency Call: Immediately dial emergency services (Ambulance/EMS) and announce "Anaphylaxis".',
      '2. First-Line Epinephrine: Administer Epinephrine (Adrenaline) 1:1,000 (1 mg/mL) INTRAMUSCULARLY into the anterolateral mid-thigh.',
      '   - Adult Dose: 0.5 mg (or autoinjector 0.3 mg for > 30 kg).',
      '   - Pediatric Dose (15-30 kg): 0.15 mg IM.',
      '3. Safe Posture: Lay the patient flat with lower legs elevated to support venous return. If dyspneic or vomiting, allow semi-recumbent or recovery position. NEVER let the patient suddenly stand or walk (risk of empty heart syndrome).',
      '4. Remove Trigger: Discontinue any offending drug or allergen immediately.',
      '5. Repeat Epinephrine: If no clinical improvement within 5 minutes, administer a second IM epinephrine dose into opposite thigh.',
      '6. Airway Support: Maintain open patent airway and administer high-flow oxygen if available.'
    ],
    pharmacyRole: [
      'Immediate IM epinephrine delivery from emergency grab-bag',
      'Maintain strict recumbent posture',
      'Continuous vital signs monitoring and EMS handoff'
    ],
    contraindicationsAndWarnings: [
      'CRITICAL: There are NO absolute contraindications to IM epinephrine in life-threatening anaphylaxis.',
      'DO NOT rely on oral antihistamines (e.g. cetirizine/chlorphenamine) or oral steroids as first-line therapy; they take 30-90 minutes to act and DO NOT relieve airway edema, laryngeal spasm, or vascular shock.',
      'DO NOT allow the patient to stand up or walk; sudden upright postural change can cause catastrophic cardiovascular collapse.'
    ],
    referralCriteria: [
      'ALL patients with anaphylaxis require mandatory hospital observation for at least 6-8 hours due to the risk of biphasic anaphylactic reactions (delayed secondary reaction in up to 20% of cases).'
    ],
    clinicalPearls: [
      'Intramuscular injection into the anterolateral vastus lateralis achieves peak plasma epinephrine concentrations 4 times faster than subcutaneous or deltoid injection.',
      'Failure or delay in administering epinephrine is the single leading cause of fatal anaphylaxis.'
    ]
  },
  {
    id: 'stg-seizure-first-aid',
    category: 'acute_emergency',
    title: 'Community Pharmacy Seizure First Aid & Status Epilepticus Triage',
    source: 'International League Against Epilepsy (ILAE) & Ghana STG',
    overview: 'Safe management of an active generalized tonic-clonic convulsive seizure occurring in a pharmacy setting.',
    firstAidProtocol: [
      '1. Protect from Injury: Cushion the patient’s head with a soft pad/clothing and guide away from sharp furniture or glass counters.',
      '2. Time the Seizure: Note the exact onset time and track seizure duration.',
      '3. DO NOT Restrain: Allow convulsive movements to run their course; never forcefully hold down limbs.',
      '4. DO NOT Place Objects in Mouth: Never insert wooden spatulas, spoons, fingers, or medications between clenched teeth (choking/fracture risk).',
      '5. Post-Ictal Airway: As soon as convulsive jerking ceases, gently roll the patient onto their side into the standard Recovery Position to prevent saliva/vomit airway aspiration.',
      '6. Reassure & Monitor: Stay with the patient throughout post-ictal confusion until full orientation returns.'
    ],
    pharmacyRole: [
      'Maintain safe environment and safeguard airway',
      'Check blood glucose if glucometer available once safe (rule out hypoglycemia)',
      'Assess for traumatic injury sustained during collapse'
    ],
    contraindicationsAndWarnings: [
      'NEVER force anything into the patient’s mouth or attempt oral fluids/tablets during or immediately following a seizure.',
      'NEVER attempt chest compressions or CPR while the patient is actively convulsing and breathing.'
    ],
    referralCriteria: [
      'Convulsive seizure lasting longer than 5 minutes (impending Status Epilepticus)',
      'A second seizure occurring without full recovery of consciousness between episodes',
      'First-ever seizure with no prior diagnosed history of epilepsy',
      'Significant trauma/head injury, prolonged apnea, pregnancy, or diabetic on insulin'
    ],
    clinicalPearls: [
      'Most unprovoked seizures terminate spontaneously within 2 to 3 minutes. The primary role is trauma prevention and airway protection.'
    ]
  },
  {
    id: 'stg-pharma-interactions',
    category: 'pharma_emergency',
    title: 'Pharmaceutical Emergencies: Drug Interactions & Adverse Reactions',
    source: 'Ghana National Formulary & British National Formulary (BNF)',
    overview: 'Identification of severe drug-drug interactions, contraindications, and acute adverse drug reactions presenting at the pharmacy counter.',
    firstAidProtocol: [
      '1. Medication Reconciliation: Systematically verify all concurrent prescription medications, OTC products, and herbal supplements.',
      '2. Severity Stratification: Screen for high-risk pairs (e.g. Warfarin + azole antifungals/macrolides; NSAIDs + severe asthma/peptic ulcer; ACE inhibitors + acute angioedema).',
      '3. Immediate Withholding: Immediately halt the offending or interacting agent.',
      '4. Emergency Escalation: For ACEI-induced angioedema (lip/tongue/airway swelling), treat as emergency airway compromise and refer urgently.',
      '5. Action Plan: Contact prescriber with therapeutic alternative.'
    ],
    pharmacyRole: [
      'Detect interactions prior to dispensing or upon acute presentation',
      'Calculate toxic dose thresholds (e.g. Paracetamol > 150 mg/kg pediatric)',
      'Provide patient counseling on red flag symptoms'
    ],
    contraindicationsAndWarnings: [
      'Never dispense non-selective beta-blockers or oral NSAIDs to patients with aspirin-exacerbated respiratory disease (AERD) or brittle asthma.',
      'Never ignore miconazole oral gel interaction with warfarin: miconazole is a potent CYP2C9 inhibitor that can cause massive INR elevation and fatal internal bleeding even from buccal absorption.'
    ],
    referralCriteria: [
      'Active spontaneous bleeding, petechiae, or gross hematuria on anticoagulants',
      'Suspected acute paracetamol overdose ingested within 8-24 hours (requires serum paracetamol level and IV N-acetylcysteine at hospital)',
      'Facial/oropharyngeal angioedema on ACE inhibitors'
    ],
    clinicalPearls: [
      'Topical and oral gel azoles are systemically absorbed enough to inhibit hepatic enzymes and produce life-threatening interactions.'
    ]
  }
];
