import { SupplyItem } from '../types/clinical';

export const ALL_SUPPLIES: SupplyItem[] = [
  // PPE
  {
    id: 'gloves',
    name: 'Sterile Exam Gloves',
    category: 'ppe',
    description: 'Nitrile examination gloves for universal infection control.',
    iconName: 'Shield',
    targetRegionAllowed: ['head_face', 'eye_ear', 'chest', 'abdomen', 'right_arm', 'left_arm', 'right_hand', 'left_hand', 'right_leg', 'left_leg']
  },
  // Wound & Hemorrhage Care
  {
    id: 'sterile_saline',
    name: 'Sterile 0.9% Saline Wash',
    category: 'wound_care',
    description: 'Isotonic sterile irrigation solution to cleanse wounds and flush foreign particles.',
    iconName: 'Droplets',
    targetRegionAllowed: ['right_leg', 'left_leg', 'right_arm', 'left_arm', 'right_hand', 'left_hand', 'head_face', 'eye_ear']
  },
  {
    id: 'sterile_gauze',
    name: 'Sterile Gauze Pad',
    category: 'wound_care',
    description: '10x10 cm sterile absorbent cotton gauze for hemostasis and wound coverage.',
    iconName: 'Square',
    targetRegionAllowed: ['right_leg', 'left_leg', 'right_arm', 'left_arm', 'right_hand', 'left_hand', 'head_face', 'eye_ear']
  },
  {
    id: 'direct_pressure',
    name: 'Firm Direct Pressure',
    category: 'procedure',
    description: 'Continuous manual pressure over wound site to achieve hemostasis.',
    iconName: 'Hand',
    targetRegionAllowed: ['right_leg', 'left_leg', 'right_arm', 'left_arm', 'right_hand', 'left_hand', 'head_face']
  },
  {
    id: 'arterial_tourniquet',
    name: 'Combat Arterial Tourniquet',
    category: 'procedure',
    description: 'Emergency windlass tourniquet applied 5-7 cm proximal to life-threatening catastrophic limb hemorrhage.',
    iconName: 'CircleDot',
    targetRegionAllowed: ['right_leg', 'left_leg', 'right_arm', 'left_arm']
  },
  {
    id: 'elastic_bandage',
    name: 'Conforming Roller Bandage',
    category: 'wound_care',
    description: 'Elastic compression bandage to secure dressings and support sprained joints.',
    iconName: 'Layers',
    targetRegionAllowed: ['right_leg', 'left_leg', 'right_arm', 'left_arm', 'right_hand', 'left_hand', 'head_face']
  },
  {
    id: 'adhesive_plaster',
    name: 'Adhesive Island Plaster',
    category: 'wound_care',
    description: 'Sterile adhesive bandage for minor clean cuts and abrasions.',
    iconName: 'Bandage',
    targetRegionAllowed: ['right_leg', 'left_leg', 'right_arm', 'left_arm', 'right_hand', 'left_hand']
  },
  {
    id: 'nose_pinch',
    name: 'Pinch Soft Part of Nose (Forward Lean)',
    category: 'procedure',
    description: 'Continuous digital compression over nasal cartilage with head tilted slightly forward for 10-15 minutes.',
    iconName: 'ArrowDown',
    targetRegionAllowed: ['head_face']
  },
  {
    id: 'padded_splint',
    name: 'Padded Limb Splint & Sling',
    category: 'procedure',
    description: 'Rigid immobilization splint with padding to stabilize suspected fractures or severe joint dislocations.',
    iconName: 'Minimize',
    targetRegionAllowed: ['right_arm', 'left_arm', 'right_leg', 'left_leg', 'right_hand', 'left_hand']
  },
  // Eye, Ear, Dental
  {
    id: 'eye_wash_flush',
    name: 'Sterile Copious Eye Flush',
    category: 'procedure',
    description: 'Continuous low-pressure ocular flush with sterile saline/water for 15-20 min for chemical burns.',
    iconName: 'Eye',
    targetRegionAllowed: ['eye_ear', 'head_face']
  },
  {
    id: 'rigid_eye_shield',
    name: 'Rigid Protective Eye Shield',
    category: 'procedure',
    description: 'Protective rigid plastic cone placed over eye without applying pressure to the globe.',
    iconName: 'Shield',
    targetRegionAllowed: ['eye_ear', 'head_face']
  },
  {
    id: 'tooth_milk_container',
    name: 'Cold Milk / Hank\'s Tooth Preservation Kit',
    category: 'procedure',
    description: 'Immerse knocked-out permanent tooth in cold cow\'s milk or buccal saliva; do not touch or scrape root.',
    iconName: 'Milk',
    targetRegionAllowed: ['head_face']
  },
  // Burn Care
  {
    id: 'cool_water',
    name: 'Cool Running Tap Water Flush',
    category: 'burn_care',
    description: 'Clean running cool water (15-25°C) for 10 to 20 minutes to halt thermal burn progression.',
    iconName: 'Waves',
    targetRegionAllowed: ['right_arm', 'left_arm', 'right_hand', 'left_hand', 'right_leg', 'left_leg', 'head_face']
  },
  {
    id: 'burn_cling_film',
    name: 'Sterile Plastic Cling Film',
    category: 'burn_care',
    description: 'Clean plastic food-grade wrap applied in sheets (not circumferentially) to protect burn.',
    iconName: 'WrapText',
    targetRegionAllowed: ['right_arm', 'left_arm', 'right_hand', 'left_hand', 'right_leg', 'left_leg']
  },
  {
    id: 'hydrogel_burn_sheet',
    name: 'Hydrogel Burn Dressing',
    category: 'burn_care',
    description: 'Non-adherent cooling gel dressing that soothes pain and prevents desiccation.',
    iconName: 'Sparkles',
    targetRegionAllowed: ['right_arm', 'left_arm', 'right_hand', 'left_hand', 'right_leg', 'left_leg']
  },
  // Airway & Cardiac Emergency Interventions
  {
    id: 'heimlich_thrusts',
    name: 'Abdominal Thrusts (Heimlich) / Back Blows',
    category: 'procedure',
    description: 'Firm inward/upward abdominal thrusts for adult severe choking, or firm back blows for infant/child.',
    iconName: 'UserX',
    targetRegionAllowed: ['abdomen', 'chest']
  },
  {
    id: 'cpr_compressions',
    name: 'High-Quality Chest Compressions (CPR)',
    category: 'procedure',
    description: 'Rhythmic compressions at 100-120 bpm, 5-6 cm depth in center of chest with complete recoil.',
    iconName: 'HeartCrack',
    targetRegionAllowed: ['chest']
  },
  {
    id: 'salbutamol_inhaler',
    name: 'Salbutamol 100mcg MDI',
    category: 'medication',
    description: 'Short-acting beta-2 agonist bronchodilator for acute bronchospasm.',
    iconName: 'Wind',
    targetRegionAllowed: ['chest', 'head_face']
  },
  {
    id: 'spacer_chamber',
    name: 'Valved Holding Chamber / Spacer',
    category: 'airway_support',
    description: 'AeroChamber spacer device for optimal aerosol delivery to distal lungs.',
    iconName: 'Maximize2',
    targetRegionAllowed: ['head_face', 'chest']
  },
  {
    id: 'epinephrine_adult',
    name: 'EpiPen Auto-Injector 0.3mg (IM)',
    category: 'medication',
    description: 'First-line intramuscular epinephrine for adult / >30kg anaphylaxis.',
    iconName: 'Syringe',
    targetRegionAllowed: ['right_leg', 'left_leg'] // Anterolateral thigh
  },
  {
    id: 'epinephrine_pediatric',
    name: 'EpiPen Jr Auto-Injector 0.15mg (IM)',
    category: 'medication',
    description: 'First-line intramuscular epinephrine for child (15-30kg) anaphylaxis.',
    iconName: 'Syringe',
    targetRegionAllowed: ['right_leg', 'left_leg']
  },
  {
    id: 'naloxone_spray',
    name: 'Naloxone (Narcan) 4mg Nasal Spray',
    category: 'medication',
    description: 'Opioid antagonist to reverse life-threatening respiratory depression and coma.',
    iconName: 'Syringe',
    targetRegionAllowed: ['head_face']
  },
  {
    id: 'chewable_aspirin',
    name: 'Chewable Soluble Aspirin 300mg',
    category: 'medication',
    description: 'Stat antiplatelet therapy for suspected Acute Coronary Syndrome (STEMI/Heart Attack).',
    iconName: 'Pill',
    targetRegionAllowed: ['head_face']
  },
  {
    id: 'oral_glucose_gel',
    name: 'Rapid-Acting Oral Glucose Gel (15-20g)',
    category: 'medication',
    description: 'Immediate carbohydrate administration for conscious hypoglycemic patient (Rule of 15).',
    iconName: 'Activity',
    targetRegionAllowed: ['head_face']
  },
  {
    id: 'oral_cetirizine',
    name: 'Cetirizine 10mg Tablets',
    category: 'medication',
    description: 'Second-generation oral antihistamine for mild cutaneous hives.',
    iconName: 'Pill',
    targetRegionAllowed: ['head_face']
  },
  {
    id: 'oral_paracetamol',
    name: 'Paracetamol 500mg Oral',
    category: 'medication',
    description: 'Safe oral analgesic and antipyretic.',
    iconName: 'HeartPulse',
    targetRegionAllowed: ['head_face']
  },
  // Positioning & First Aid Actions
  {
    id: 'upright_position',
    name: 'Position Upright & Forward',
    category: 'procedure',
    description: 'Sit patient fully upright leaning forward to optimize respiratory mechanics and diaphragmatic excursion.',
    iconName: 'UserCheck',
    targetRegionAllowed: ['chest', 'head_face']
  },
  {
    id: 'recumbent_legs_elevated',
    name: 'Lay Flat with Legs Elevated',
    category: 'procedure',
    description: 'Trendelenburg / shock positioning to restore venous return and prevent empty heart syndrome.',
    iconName: 'Bed',
    targetRegionAllowed: ['abdomen', 'right_leg', 'left_leg']
  },
  {
    id: 'recovery_position',
    name: 'Lateral Recovery Position',
    category: 'procedure',
    description: 'Roll patient onto side with chin tilted to keep airway open and prevent saliva/emesis aspiration.',
    iconName: 'RotateCcw',
    targetRegionAllowed: ['head_face', 'chest', 'abdomen']
  },
  {
    id: 'head_cushion',
    name: 'Cushion Head & Clear Hazards',
    category: 'procedure',
    description: 'Place soft padding beneath the head and remove dangerous furniture during convulsion.',
    iconName: 'Smile',
    targetRegionAllowed: ['head_face']
  },
  // Escalation & Emergency Activation
  {
    id: 'emergency_ambulance',
    name: 'Call 112 / EMS Emergency Ambulance',
    category: 'procedure',
    description: 'Activate emergency medical services for immediate transport and life support.',
    iconName: 'PhoneCall',
    targetRegionAllowed: ['head_face', 'chest', 'abdomen']
  },
  {
    id: 'hospital_referral',
    name: 'Generate Urgent Hospital Referral Note',
    category: 'procedure',
    description: 'Provide written clinical referral detailing triage findings, vitals, and initial care.',
    iconName: 'FileText',
    targetRegionAllowed: ['head_face', 'chest', 'abdomen']
  },
  // CLINICAL DISTRACTORS & SAFETY HAZARDS (For rigorous safety testing)
  {
    id: 'induce_vomiting',
    name: 'Induce Vomiting / Ipecac Syrup',
    category: 'procedure',
    description: 'Forcing patient to vomit ingested toxic substances.',
    iconName: 'AlertTriangle',
    targetRegionAllowed: ['head_face', 'abdomen'],
    isHarmful: true,
    harmfulRationale: 'CRITICAL SAFETY HAZARD: Inducing vomiting in hydrocarbon/kerosene or corrosive ingestion causes fatal pulmonary chemical pneumonitis and double-esophageal perforation.'
  },
  {
    id: 'tilt_head_back',
    name: 'Tilt Head Backwards in Nosebleed',
    category: 'procedure',
    description: 'Tilting the head back during active epistaxis.',
    iconName: 'AlertTriangle',
    targetRegionAllowed: ['head_face'],
    isHarmful: true,
    harmfulRationale: 'CRITICAL HAZARD: Tilting the head backwards causes active blood flow down the pharynx into the stomach (inducing violent emesis) and larynx (aspiration airway occlusion).'
  },
  {
    id: 'snakebite_tourniquet',
    name: 'Arterial Tourniquet for Snakebite',
    category: 'procedure',
    description: 'Tying a tight tourniquet proximal to venomous snakebite puncture.',
    iconName: 'AlertTriangle',
    targetRegionAllowed: ['right_leg', 'left_leg', 'right_arm', 'left_arm'],
    isHarmful: true,
    harmfulRationale: 'CRITICAL HAZARD: Tourniquets concentrate venom locally, accelerating rapid compartment syndrome, tissue necrosis, and amputation, while causing catastrophic systemic surge upon release.'
  },
  {
    id: 'scrub_knocked_tooth',
    name: 'Scrub Knocked-Out Tooth with Brush',
    category: 'procedure',
    description: 'Scrubbing root of avulsed tooth with a brush under disinfectant.',
    iconName: 'AlertTriangle',
    targetRegionAllowed: ['head_face'],
    isHarmful: true,
    harmfulRationale: 'CRITICAL HAZARD: Scrubbing the root destroys viable periodontal ligament (PDL) progenitor cells, making permanent replantation impossible.'
  },
  {
    id: 'hydrogen_peroxide',
    name: '3% Hydrogen Peroxide',
    category: 'wound_care',
    description: 'Harsh oxidative chemical solution.',
    iconName: 'AlertTriangle',
    targetRegionAllowed: ['right_leg', 'left_leg', 'right_arm', 'left_arm', 'right_hand', 'left_hand'],
    isHarmful: true,
    harmfulRationale: 'Hydrogen peroxide is cytotoxic to healthy granulating fibroblasts and macrophages, causes chemical necrosis, and severely delays wound healing.'
  },
  {
    id: 'ice_pack',
    name: 'Direct Ice Pack to Burn',
    category: 'burn_care',
    description: 'Sub-zero frozen ice block applied directly to wound.',
    iconName: 'Snowflake',
    targetRegionAllowed: ['right_arm', 'left_arm', 'right_hand', 'left_hand', 'right_leg', 'left_leg'],
    isHarmful: true,
    harmfulRationale: 'Direct application of ice to burned skin induces severe vasoconstriction, ischemia, and frostbite necrosis, deepening the burn from partial to full thickness.'
  },
  {
    id: 'butter_ointment',
    name: 'Butter / Household Toothpaste',
    category: 'burn_care',
    description: 'Household greasy paste applied over burn.',
    iconName: 'Flame',
    targetRegionAllowed: ['right_arm', 'left_arm', 'right_hand', 'left_hand', 'right_leg', 'left_leg'],
    isHarmful: true,
    harmfulRationale: 'Household butter and toothpaste trap residual heat in the subcutaneous tissues, prevent evaporative cooling, and cause severe polymicrobial wound infections.'
  },
  {
    id: 'mouth_gag_spoon',
    name: 'Insert Spoon / Gag in Seizure Mouth',
    category: 'procedure',
    description: 'Attempting to pry open jaws and force an object into the patient\'s mouth.',
    iconName: 'XCircle',
    targetRegionAllowed: ['head_face'],
    isHarmful: true,
    harmfulRationale: 'CRITICAL HAZARD: Inserting objects into a seizing patient\'s mouth fractures teeth, causes severe soft tissue lacerations, and risks fatal airway obstruction from broken fragments.'
  },
  {
    id: 'limb_restraint',
    name: 'Forcefully Restrain Convulsive Limbs',
    category: 'procedure',
    description: 'Holding down jerking arms and legs during tonic-clonic convulsion.',
    iconName: 'Lock',
    targetRegionAllowed: ['right_arm', 'left_arm', 'right_leg', 'left_leg'],
    isHarmful: true,
    harmfulRationale: 'Forcefully restraining violent involuntary muscular contractions leads to muscle tears, joint dislocations, and long bone fractures.'
  },
  {
    id: 'oral_ibuprofen',
    name: 'Ibuprofen 400mg Oral',
    category: 'medication',
    description: 'Oral non-steroidal anti-inflammatory drug.',
    iconName: 'AlertCircle',
    targetRegionAllowed: ['head_face'],
    isHarmful: true,
    harmfulRationale: 'NSAIDs like Ibuprofen inhibit COX-1, shunting arachidonic acid to leukotrienes and triggering catastrophic bronchospasm in asthmatics, as well as worsening GI hemorrhage.'
  }
];

export const getSupplyById = (id: string): SupplyItem | undefined => {
  return ALL_SUPPLIES.find(s => s.id === id);
};
