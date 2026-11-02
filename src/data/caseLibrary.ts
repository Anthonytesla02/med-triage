import { ClinicalCase, CaseCategory, DifficultyLevel, BodyRegion } from '../types/clinical';
import { ALL_SUPPLIES } from './suppliesCatalog';

export interface ChallengeTopicDefinition {
  topicId: string;
  topicTitle: string;
  category: CaseCategory;
  defaultDifficulty: DifficultyLevel;
  injuryType: ClinicalCase['injuryType'];
  defaultBodyRegion: BodyRegion;
  timeLimitSeconds?: number;
  mustEscalateToEMS: boolean;
  requiredSupplyIds: string[];
  recommendedSequence: string[];
  prohibitedSupplyIds: string[];
  criticalSafetyRules: string[];
  stgTitle: string;
  stgChapter: string;
  stgKeyPoints: string[];
  stgReferralCriteria: string[];
  baseComplaint: string;
  baseFindings: string[];
  // 5 distinct clinical variations
  variations: {
    variationIndex: number;
    patientName: string;
    gender: 'male' | 'female';
    ageGroup: 'child' | 'adult' | 'elderly';
    age: number;
    skinTone: string;
    caregiverPresent?: boolean;
    caregiverName?: string;
    expression: 'in_pain' | 'gasping' | 'distressed' | 'confused' | 'unconscious' | 'relieved';
    scenarioContext: string;
    patientStatement: string;
    vitals: {
      heartRate: number;
      bloodPressure: string;
      respiratoryRate: number;
      oxygenSaturation: number;
      temperature: number;
      gcsOrAvpu: 'Alert' | 'Voice' | 'Pain' | 'Unresponsive';
    };
    medicalHistory: string[];
    currentMeds: string[];
    allergies: string[];
    twistSummary: string;
  }[];
}

export const CHALLENGE_TOPICS: ChallengeTopicDefinition[] = [
  // 1. Wounds, Cuts & Bleeding - Minor Laceration
  {
    topicId: 'topic-wound-laceration',
    topicTitle: 'Acute Lacerations and Hemorrhage Control',
    category: 'trauma',
    defaultDifficulty: 'beginner',
    injuryType: 'laceration',
    defaultBodyRegion: 'right_leg',
    mustEscalateToEMS: false,
    requiredSupplyIds: ['gloves', 'sterile_saline', 'direct_pressure', 'sterile_gauze', 'elastic_bandage'],
    recommendedSequence: ['gloves', 'sterile_saline', 'direct_pressure', 'sterile_gauze', 'elastic_bandage'],
    prohibitedSupplyIds: ['hydrogen_peroxide'],
    criticalSafetyRules: [
      'Universal precautions: don examination gloves before wound contact.',
      'Do not pour cytotoxic hydrogen peroxide or methylated spirit into open tissue.',
      'Achieve hemostasis via direct pressure with sterile gauze, followed by conforming bandage.'
    ],
    stgTitle: 'Management of Acute Lacerations & Minor Bleeding',
    stgChapter: 'Ghana STG 7th Ed. Chapter 21: Trauma Care',
    stgKeyPoints: [
      'Copious low-pressure saline irrigation removes debris without cell necrosis.',
      'Direct pressure stops >95% of capillary and venous external hemorrhage.'
    ],
    stgReferralCriteria: ['Arterial spurting, gaping wounds > 5cm, loss of distal neurovascular function.'],
    baseComplaint: 'Sharp laceration with steady venous oozing after trauma.',
    baseFindings: [
      'Superficial laceration with active oozing blood',
      'No tendon or bone exposure',
      'Distal pulses palpable with capillary refill < 2s'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Kwame Mensah',
        gender: 'male',
        ageGroup: 'adult',
        age: 28,
        skinTone: '#8d5524',
        expression: 'in_pain',
        scenarioContext: 'Sheet metal edge grazed right shin while working on roofing.',
        patientStatement: 'I was carrying roofing sheet and it sliced into my shin. It bled a lot initially, now it is oozing.',
        vitals: { heartRate: 78, bloodPressure: '122/76', respiratoryRate: 16, oxygenSaturation: 99, temperature: 36.8, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil chronic', 'Tetanus booster 3 years ago'],
        currentMeds: ['None'],
        allergies: ['NKDA'],
        twistSummary: 'Standard occupational laceration on healthy adult.'
      },
      {
        variationIndex: 2,
        patientName: 'Akosua Frimpong',
        gender: 'female',
        ageGroup: 'adult',
        age: 32,
        skinTone: '#c68642',
        expression: 'in_pain',
        scenarioContext: 'Broken ceramic bowl shattered in kitchen slicing forearm.',
        patientStatement: 'A glass mixing bowl dropped and shattered against my arm! It stings so sharply.',
        vitals: { heartRate: 84, bloodPressure: '126/80', respiratoryRate: 18, oxygenSaturation: 98, temperature: 36.9, gcsOrAvpu: 'Alert' },
        medicalHistory: ['No prior surgery'],
        currentMeds: ['Multivitamins'],
        allergies: ['None'],
        twistSummary: 'Kitchen glass laceration requiring inspection for superficial shards.'
      },
      {
        variationIndex: 3,
        patientName: 'Kofi Mensah Jr.',
        gender: 'male',
        ageGroup: 'child',
        age: 8,
        skinTone: '#5c3826',
        caregiverPresent: true,
        caregiverName: 'Mother (Abena)',
        expression: 'distressed',
        scenarioContext: 'Tripped on school playground against sharp wire fence.',
        patientStatement: 'It hurts so bad mommy! (crying)',
        vitals: { heartRate: 104, bloodPressure: '105/68', respiratoryRate: 22, oxygenSaturation: 99, temperature: 37.0, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Up to date on childhood immunizations'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Pediatric patient requiring caregiver reassurance and gentle wound irrigation.'
      },
      {
        variationIndex: 4,
        patientName: 'Opanin Boateng',
        gender: 'male',
        ageGroup: 'elderly',
        age: 74,
        skinTone: '#3e2723',
        expression: 'in_pain',
        scenarioContext: 'Fell against coffee table edge with fragile senile purpura skin tear.',
        patientStatement: 'My skin tears so easily now. It caught the wooden corner.',
        vitals: { heartRate: 72, bloodPressure: '138/84', respiratoryRate: 17, oxygenSaturation: 97, temperature: 36.6, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Hypertension', 'Mild osteoarthritis'],
        currentMeds: ['Amlodipine 5mg'],
        allergies: ['Penicillin rash'],
        twistSummary: 'Fragile elderly skin tear requiring gentle non-adherent dressing.'
      },
      {
        variationIndex: 5,
        patientName: 'Esi Nyarko',
        gender: 'female',
        ageGroup: 'adult',
        age: 23,
        skinTone: '#8d5524',
        expression: 'in_pain',
        scenarioContext: 'Barbed wire fence snagged lower leg in agricultural farm plot.',
        patientStatement: 'The rusty wire caught my calf as I crossed the irrigation ditch.',
        vitals: { heartRate: 90, bloodPressure: '118/74', respiratoryRate: 18, oxygenSaturation: 98, temperature: 37.1, gcsOrAvpu: 'Alert' },
        medicalHistory: ['No tetanus booster in over 12 years'],
        currentMeds: ['None'],
        allergies: ['NKDA'],
        twistSummary: 'High tetanus risk contaminated wound requiring immediate booster referral.'
      }
    ]
  },

  // 2. Severe Arterial Bleeding
  {
    topicId: 'topic-arterial-bleeding',
    topicTitle: 'Life-Threatening Catastrophic Limb Hemorrhage',
    category: 'trauma',
    defaultDifficulty: 'advanced',
    injuryType: 'arterial_bleed',
    defaultBodyRegion: 'right_leg',
    timeLimitSeconds: 90,
    mustEscalateToEMS: true,
    requiredSupplyIds: ['gloves', 'arterial_tourniquet', 'direct_pressure', 'sterile_gauze', 'emergency_ambulance'],
    recommendedSequence: ['gloves', 'arterial_tourniquet', 'emergency_ambulance', 'sterile_gauze'],
    prohibitedSupplyIds: [],
    criticalSafetyRules: [
      'Pulsatile bright red spurting hemorrhage represents arterial compromise and can exsanguinate in 3 minutes.',
      'Apply emergency arterial tourniquet 5-7 cm proximal to wound immediately.',
      'Mandatory urgent EMS activation.'
    ],
    stgTitle: 'Management of Catastrophic External Hemorrhage',
    stgChapter: 'Ghana STG / WHO Basic Emergency Care',
    stgKeyPoints: [
      'Stop the Bleed protocols: High and tight arterial tourniquet is lifesaving for arterial limb wounds.',
      'Never remove tourniquet once placed in field; record exact application time.'
    ],
    stgReferralCriteria: ['All arterial bleeding cases require immediate surgical trauma center transfer.'],
    baseComplaint: 'Deep laceration with bright red pulsatile spurting blood.',
    baseFindings: [
      'Pulsatile high-velocity bright red arterial spurting',
      'Rapid pool of blood > 400 mL on floor',
      'Tachycardia with hypotension and pallor'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Kojo Antwi',
        gender: 'male',
        ageGroup: 'adult',
        age: 35,
        skinTone: '#5c3826',
        expression: 'gasping',
        scenarioContext: 'Industrial circular saw kickback cut deep into right anterior thigh.',
        patientStatement: 'The saw slipped! Blood is pumping everywhere... feeling so faint!',
        vitals: { heartRate: 128, bloodPressure: '88/54', respiratoryRate: 26, oxygenSaturation: 93, temperature: 36.2, gcsOrAvpu: 'Voice' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Femoral branch arterial transection requiring immediate windlass tourniquet.'
      },
      {
        variationIndex: 2,
        patientName: 'Yaw Badu',
        gender: 'male',
        ageGroup: 'adult',
        age: 29,
        skinTone: '#3e2723',
        expression: 'gasping',
        scenarioContext: 'Automobile shattered windshield glass slashed deep into brachial artery of right arm.',
        patientStatement: 'Glass pierced right through my arm... can\'t stop the fountain of blood!',
        vitals: { heartRate: 132, bloodPressure: '82/50', respiratoryRate: 28, oxygenSaturation: 92, temperature: 36.0, gcsOrAvpu: 'Voice' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['NKDA'],
        twistSummary: 'Upper extremity brachial laceration with arterial hemorrhage.'
      },
      {
        variationIndex: 3,
        patientName: 'Grace Asare',
        gender: 'female',
        ageGroup: 'adult',
        age: 41,
        skinTone: '#8d5524',
        expression: 'distressed',
        scenarioContext: 'Plate glass sliding door shattered, lacerating popliteal region behind knee.',
        patientStatement: 'The glass door caved in... I\'m bleeding out, please help!',
        vitals: { heartRate: 122, bloodPressure: '92/58', respiratoryRate: 24, oxygenSaturation: 94, temperature: 36.4, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Hypertension'],
        currentMeds: ['Lisinopril 10mg'],
        allergies: ['None'],
        twistSummary: 'Popliteal vessel laceration with rapid hemorrhagic shock risk.'
      },
      {
        variationIndex: 4,
        patientName: 'Eric Quaye',
        gender: 'male',
        ageGroup: 'adult',
        age: 22,
        skinTone: '#c68642',
        expression: 'gasping',
        scenarioContext: 'Machete clearing brush bounced onto right calf severing tibial artery.',
        patientStatement: 'The cutlass bounced off bamboo... bright red blood won\'t stop squirting!',
        vitals: { heartRate: 120, bloodPressure: '94/60', respiratoryRate: 24, oxygenSaturation: 95, temperature: 36.5, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Agricultural machete severe tibial bleed.'
      },
      {
        variationIndex: 5,
        patientName: 'Maame Serwaa',
        gender: 'female',
        ageGroup: 'elderly',
        age: 69,
        skinTone: '#5c3826',
        expression: 'distressed',
        scenarioContext: 'Ruptured lower limb varicose vein cluster ulcer bleeding profusely on anticoagulant.',
        patientStatement: 'My leg ulcer suddenly burst and blood is spraying across the carpet!',
        vitals: { heartRate: 110, bloodPressure: '98/62', respiratoryRate: 22, oxygenSaturation: 96, temperature: 36.7, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Atrial Fibrillation', 'Chronic Venous Insufficiency'],
        currentMeds: ['Rivaroxaban 20mg'],
        allergies: ['Sulfa drugs'],
        twistSummary: 'High-volume venous/arteriolar eruption on anticoagulant.'
      }
    ]
  },

  // 3. Epistaxis (Nosebleeds)
  {
    topicId: 'topic-epistaxis',
    topicTitle: 'Acute Epistaxis (Nosebleed) First Aid',
    category: 'trauma',
    defaultDifficulty: 'beginner',
    injuryType: 'epistaxis',
    defaultBodyRegion: 'head_face',
    mustEscalateToEMS: false,
    requiredSupplyIds: ['gloves', 'nose_pinch', 'sterile_gauze'],
    recommendedSequence: ['gloves', 'nose_pinch'],
    prohibitedSupplyIds: ['tilt_head_back'],
    criticalSafetyRules: [
      'CRITICAL SAFETY: NEVER tilt head backwards (causes blood aspiration and vomiting).',
      'Pinch soft lower cartilaginous part of nose continuously for 10-15 minutes with head tilted slightly forward.',
      'Breathe through mouth and spit out any pooling blood.'
    ],
    stgTitle: 'Management of Acute Epistaxis',
    stgChapter: 'Ghana STG Chapter 24: ENT Emergencies',
    stgKeyPoints: [
      'Most anterior bleeds arise from Kiesselbach\'s plexus and halt with firm soft-nose compression.',
      'Tilting head back is dangerous and ineffective.'
    ],
    stgReferralCriteria: ['Bleeding persisting beyond 20-30 minutes of continuous compression, suspected posterior bleed.'],
    baseComplaint: 'Active nasal bleeding from anterior nares.',
    baseFindings: [
      'Active brisk bleeding from left naris',
      'Patient clothes blood-stained',
      'Airway patent when leaning forward'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Kweku Arthur',
        gender: 'male',
        ageGroup: 'child',
        age: 9,
        skinTone: '#8d5524',
        caregiverPresent: true,
        caregiverName: 'Father (Kwabena)',
        expression: 'in_pain',
        scenarioContext: 'Hit in the nose by a football during school break.',
        patientStatement: 'My nose hurts so much and blood keeps running down my lip!',
        vitals: { heartRate: 98, bloodPressure: '102/64', respiratoryRate: 20, oxygenSaturation: 99, temperature: 36.9, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Pediatric blunt nasal trauma anterior epistaxis.'
      },
      {
        variationIndex: 2,
        patientName: 'Mr. Emmanuel Tetteh',
        gender: 'male',
        ageGroup: 'elderly',
        age: 67,
        skinTone: '#3e2723',
        expression: 'distressed',
        scenarioContext: 'Spontaneous nosebleed during severe dry harmattan weather on antihypertensives.',
        patientStatement: 'I woke up and my nose was dripping like a tap. My friend told me to throw my head back!',
        vitals: { heartRate: 88, bloodPressure: '168/102', respiratoryRate: 18, oxygenSaturation: 97, temperature: 36.7, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Hypertension'],
        currentMeds: ['Amlodipine 10mg'],
        allergies: ['None'],
        twistSummary: 'Hypertensive crisis exacerbating anterior epistaxis; bystander myth intervention.'
      },
      {
        variationIndex: 3,
        patientName: 'Abena Mansa',
        gender: 'female',
        ageGroup: 'adult',
        age: 26,
        skinTone: '#c68642',
        expression: 'distressed',
        scenarioContext: 'Frequent nose picking and mucosal dryness leading to brisk bleeding.',
        patientStatement: 'It started bleeding when I blew my nose this morning and hasn\'t stopped.',
        vitals: { heartRate: 80, bloodPressure: '116/72', respiratoryRate: 16, oxygenSaturation: 99, temperature: 36.8, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Allergic rhinitis'],
        currentMeds: ['Fluticasone nasal spray'],
        allergies: ['Dust mites'],
        twistSummary: 'Mucosal irritation from steroid spray misuse.'
      },
      {
        variationIndex: 4,
        patientName: 'Nana Kofi',
        gender: 'male',
        ageGroup: 'adult',
        age: 44,
        skinTone: '#5c3826',
        expression: 'in_pain',
        scenarioContext: 'Assaulted with a punch to the nasal bridge during argument.',
        patientStatement: 'Someone punched my face... my nose is swollen and bleeding.',
        vitals: { heartRate: 94, bloodPressure: '130/85', respiratoryRate: 18, oxygenSaturation: 98, temperature: 36.9, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Suspected nasal bone fracture with epistaxis.'
      },
      {
        variationIndex: 5,
        patientName: 'Auntie Mary',
        gender: 'female',
        ageGroup: 'elderly',
        age: 71,
        skinTone: '#8d5524',
        expression: 'distressed',
        scenarioContext: 'Spontaneous heavy bilateral epistaxis on Aspirin and Clopidogrel post-stent.',
        patientStatement: 'Blood is running out of both nostrils and into my throat.',
        vitals: { heartRate: 102, bloodPressure: '144/88', respiratoryRate: 20, oxygenSaturation: 96, temperature: 36.6, gcsOrAvpu: 'Alert' },
        medicalHistory: ['CAD / Coronary Stent 6 months ago'],
        currentMeds: ['Aspirin 75mg', 'Clopidogrel 75mg'],
        allergies: ['None'],
        twistSummary: 'Dual antiplatelet therapy with heavy epistaxis requiring ENT referral.'
      }
    ]
  },

  // 4. Musculoskeletal - Fractures & Sprains
  {
    topicId: 'topic-musculoskeletal-fracture',
    topicTitle: 'Acute Limb Trauma & Suspected Fracture Immobilization',
    category: 'musculoskeletal',
    defaultDifficulty: 'intermediate',
    injuryType: 'sprain_fracture',
    defaultBodyRegion: 'right_leg',
    mustEscalateToEMS: true,
    requiredSupplyIds: ['gloves', 'padded_splint', 'elastic_bandage', 'hospital_referral'],
    recommendedSequence: ['gloves', 'padded_splint', 'elastic_bandage', 'hospital_referral'],
    prohibitedSupplyIds: [],
    criticalSafetyRules: [
      'Do not attempt forceful reduction or bone manipulation in a pharmacy.',
      'Immobilize the joint above and below the suspected fracture site using a padded splint.',
      'Check and document distal pulses, motor movement, and sensation before and after splinting.'
    ],
    stgTitle: 'Initial Stabilization of Musculoskeletal Fractures',
    stgChapter: 'Ghana STG Chapter 21 / AO Trauma First Aid',
    stgKeyPoints: [
      'Padded immobilization dramatically relieves severe spasm pain and prevents vascular puncture.',
      'All suspected long-bone fractures require radiographic examination.'
    ],
    stgReferralCriteria: ['Deformity, severe swelling, inability to bear weight, neurovascular compromise.'],
    baseComplaint: 'Severe limb pain, deformity, and inability to bear weight after fall.',
    baseFindings: [
      'Marked swelling and angular contour deformity of limb',
      'Exquisite bony tenderness on palpation',
      'Distal pulse present, toes warm with sensation intact'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Kofi Annan',
        gender: 'male',
        ageGroup: 'adult',
        age: 24,
        skinTone: '#5c3826',
        expression: 'in_pain',
        scenarioContext: 'Landed awkwardly playing football; audible snap on right lower leg.',
        patientStatement: 'I jumped for a header and my leg twisted with a loud crack! I can\'t put any weight on it.',
        vitals: { heartRate: 104, bloodPressure: '134/84', respiratoryRate: 20, oxygenSaturation: 98, temperature: 37.0, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Closed tibia/fibula fracture requiring rigid padded splinting.'
      },
      {
        variationIndex: 2,
        patientName: 'Adwoa Poku',
        gender: 'female',
        ageGroup: 'adult',
        age: 29,
        skinTone: '#c68642',
        expression: 'in_pain',
        scenarioContext: 'Tripped in high heels on uneven gutter pavement, severe inversion ankle injury.',
        patientStatement: 'My right ankle rolled completely under me. It ballooned up instantly like a grapefruit.',
        vitals: { heartRate: 88, bloodPressure: '124/78', respiratoryRate: 18, oxygenSaturation: 99, temperature: 36.8, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Severe Grade III ankle ligamentous rupture with Ottawa criteria.'
      },
      {
        variationIndex: 3,
        patientName: 'Kweku Junior',
        gender: 'male',
        ageGroup: 'child',
        age: 7,
        skinTone: '#8d5524',
        caregiverPresent: true,
        caregiverName: 'Mother (Efua)',
        expression: 'distressed',
        scenarioContext: 'Fell off playground jungle gym onto outstretched right arm (FOOSH).',
        patientStatement: 'My wrist is crooked and it hurts so much! (screaming)',
        vitals: { heartRate: 112, bloodPressure: '106/66', respiratoryRate: 24, oxygenSaturation: 98, temperature: 37.1, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Healthy child'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Pediatric distal radius greenstick / dinner-fork fracture.'
      },
      {
        variationIndex: 4,
        patientName: 'Madam Faustina',
        gender: 'female',
        ageGroup: 'elderly',
        age: 78,
        skinTone: '#3e2723',
        expression: 'in_pain',
        scenarioContext: 'Slipped on wet bathroom tiles, landing on right hip and humerus.',
        patientStatement: 'I slipped getting out of the bath... my right arm and hip won\'t move at all.',
        vitals: { heartRate: 96, bloodPressure: '152/90', respiratoryRate: 20, oxygenSaturation: 96, temperature: 36.5, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Osteoporosis', 'Hypertension'],
        currentMeds: ['Hydrochlorothiazide 25mg', 'Calcium/Vit D'],
        allergies: ['None'],
        twistSummary: 'Elderly osteoporotic proximal humeral fracture.'
      },
      {
        variationIndex: 5,
        patientName: 'Sgt. Mensah',
        gender: 'male',
        ageGroup: 'adult',
        age: 42,
        skinTone: '#5c3826',
        expression: 'in_pain',
        scenarioContext: 'Heavy pallet of warehouse crates collapsed across right foot and ankle.',
        patientStatement: 'A crate of motor parts crushed my foot. Massive swelling inside my boot.',
        vitals: { heartRate: 100, bloodPressure: '140/88', respiratoryRate: 20, oxygenSaturation: 97, temperature: 36.9, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Severe crush injury with high risk of acute compartment syndrome.'
      }
    ]
  },

  // 5. Burns - Scald & Chemical
  {
    topicId: 'topic-burns-chemical',
    topicTitle: 'Acute Thermal & Corrosive Chemical Burns',
    category: 'burns_environmental',
    defaultDifficulty: 'intermediate',
    injuryType: 'burn_chemical',
    defaultBodyRegion: 'right_hand',
    mustEscalateToEMS: false,
    requiredSupplyIds: ['gloves', 'cool_water', 'burn_cling_film', 'oral_paracetamol'],
    recommendedSequence: ['gloves', 'cool_water', 'burn_cling_film', 'oral_paracetamol'],
    prohibitedSupplyIds: ['ice_pack', 'butter_ointment'],
    criticalSafetyRules: [
      'Continuous cooling with clean potable water for at least 15-20 minutes.',
      'NEVER apply ice or icy slush (causes frostbite necrosis and converts partial to full thickness burns).',
      'NEVER apply butter, toothpaste, or herbal pastes (introduces severe infection).',
      'Cover loosely with sterile plastic cling film or hydrogel sheet.'
    ],
    stgTitle: 'First Aid for Thermal & Chemical Burns',
    stgChapter: 'Ghana STG Chapter 21: Burns Management',
    stgKeyPoints: [
      'Latent heat dissipation via cool water saves viable dermal layers.',
      'Chemical burns require 20-30 min continuous irrigation to dilute caustic ions.'
    ],
    stgReferralCriteria: ['Burns to hands, face, feet, perineum, or >10% TBSA.'],
    baseComplaint: 'Painful burn following thermal scald or chemical exposure.',
    baseFindings: [
      'Erythematous tender skin with serous fluid-filled blisters',
      'No circumferential constriction',
      'Capillary refill brisk in surrounding uninjured skin'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Ama Serwaa',
        gender: 'female',
        ageGroup: 'adult',
        age: 34,
        skinTone: '#c68642',
        expression: 'in_pain',
        scenarioContext: 'Boiling water splashed over dorsal right hand while lifting tea kettle.',
        patientStatement: 'The boiling water splashed over my hand 10 minutes ago! It feels on fire.',
        vitals: { heartRate: 92, bloodPressure: '128/82', respiratoryRate: 18, oxygenSaturation: 98, temperature: 37.0, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Partial thickness scald burn on right hand.'
      },
      {
        variationIndex: 2,
        patientName: 'Kwesi Appiah',
        gender: 'male',
        ageGroup: 'adult',
        age: 27,
        skinTone: '#8d5524',
        expression: 'in_pain',
        scenarioContext: 'Sulfuric car battery acid ruptured splashing across right forearm in mechanic garage.',
        patientStatement: 'Battery acid splashed all over my arm! It is eating through my skin!',
        vitals: { heartRate: 106, bloodPressure: '136/88', respiratoryRate: 22, oxygenSaturation: 98, temperature: 37.2, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Corrosive chemical acid burn requiring 20 minutes irrigation.'
      },
      {
        variationIndex: 3,
        patientName: 'Little Yaw',
        gender: 'male',
        ageGroup: 'child',
        age: 4,
        skinTone: '#5c3826',
        caregiverPresent: true,
        caregiverName: 'Mother (Mansah)',
        expression: 'distressed',
        scenarioContext: 'Hot vegetable soup bowl overturned onto right thigh and hand.',
        patientStatement: 'Hurts mommy! (screaming)',
        vitals: { heartRate: 124, bloodPressure: '100/62', respiratoryRate: 26, oxygenSaturation: 99, temperature: 37.3, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Childhood immunizations complete'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Pediatric scald burn with high fluid shift risk.'
      },
      {
        variationIndex: 4,
        patientName: 'Auntie Cecilia',
        gender: 'female',
        ageGroup: 'elderly',
        age: 68,
        skinTone: '#3e2723',
        expression: 'in_pain',
        scenarioContext: 'Hot oil splatter from frying plantain onto dorsal right hand.',
        patientStatement: 'Hot palm oil popped right out of the skillet onto my fingers.',
        vitals: { heartRate: 88, bloodPressure: '146/86', respiratoryRate: 18, oxygenSaturation: 97, temperature: 36.8, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Type 2 Diabetes (HbA1c 8.2%)'],
        currentMeds: ['Metformin 1000mg BID'],
        allergies: ['None'],
        twistSummary: 'Diabetic burn with high secondary infection and delayed healing risk.'
      },
      {
        variationIndex: 5,
        patientName: 'Sulemana Issah',
        gender: 'male',
        ageGroup: 'adult',
        age: 38,
        skinTone: '#8d5524',
        expression: 'in_pain',
        scenarioContext: 'Contact flame burn from faulty domestic gas cylinder valve flare.',
        patientStatement: 'The gas regulator flamed up and caught my right arm.',
        vitals: { heartRate: 100, bloodPressure: '130/84', respiratoryRate: 20, oxygenSaturation: 97, temperature: 37.1, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Thermal flame burn requiring rule of nines triage.'
      }
    ]
  },

  // 6. Breathing & Airway - Choking & Foreign Body Airway Obstruction
  {
    topicId: 'topic-choking-airway',
    topicTitle: 'Acute Foreign Body Airway Obstruction (Choking)',
    category: 'acute_emergency',
    defaultDifficulty: 'advanced',
    injuryType: 'choking',
    defaultBodyRegion: 'head_face',
    timeLimitSeconds: 90,
    mustEscalateToEMS: true,
    requiredSupplyIds: ['heimlich_thrusts', 'emergency_ambulance'],
    recommendedSequence: ['heimlich_thrusts', 'emergency_ambulance'],
    prohibitedSupplyIds: [],
    criticalSafetyRules: [
      'Recognize universal choking sign (hands clutching throat, unable to speak, silent cough).',
      'For severe airway obstruction: deliver 5 sharp back blows followed by 5 inward/upward abdominal thrusts (Heimlich).',
      'If patient becomes unresponsive, lower to floor, call 112 EMS, and begin CPR compressions.'
    ],
    stgTitle: 'Emergency Airway Obstruction Protocol',
    stgChapter: 'Ghana STG / ILCOR Choking Guidelines',
    stgKeyPoints: [
      'Abdominal thrusts elevate intra-thoracic pressure to expel tracheal foreign bodies.',
      'Do not blind finger-sweep: it pushes objects deeper into vocal cords.'
    ],
    stgReferralCriteria: ['All patients requiring abdominal thrusts need hospital evaluation for internal injury.'],
    baseComplaint: 'Sudden severe choking while eating with loss of phonation.',
    baseFindings: [
      'Hands clutching throat in universal choking distress sign',
      'Silent cough, unable to speak or vocalize',
      'Facial cyanosis and frantic gaze'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Chief Kwadwo',
        gender: 'male',
        ageGroup: 'adult',
        age: 52,
        skinTone: '#5c3826',
        expression: 'gasping',
        scenarioContext: 'Choking on piece of meat at local chop bar next to pharmacy.',
        patientStatement: 'Struggling silently, clutching neck with bulging eyes, completely unable to speak.',
        vitals: { heartRate: 130, bloodPressure: '160/100', respiratoryRate: 0, oxygenSaturation: 82, temperature: 36.8, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Hypertension'],
        currentMeds: ['Losartan 50mg'],
        allergies: ['None'],
        twistSummary: 'Complete food bolus laryngeal obstruction in adult male.'
      },
      {
        variationIndex: 2,
        patientName: 'Baby Jason',
        gender: 'male',
        ageGroup: 'child',
        age: 2,
        skinTone: '#c68642',
        caregiverPresent: true,
        caregiverName: 'Mother (Bernice)',
        expression: 'distressed',
        scenarioContext: 'Swallowed whole grape in waiting room; turned blue with silent wheeze.',
        patientStatement: 'My baby is choking! He can\'t breathe! (Mother screams)',
        vitals: { heartRate: 145, bloodPressure: '85/50', respiratoryRate: 0, oxygenSaturation: 80, temperature: 37.0, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Normal birth'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Toddler airway foreign body requiring back blows & chest thrusts.'
      },
      {
        variationIndex: 3,
        patientName: 'Madam Comfort',
        gender: 'female',
        ageGroup: 'elderly',
        age: 72,
        skinTone: '#3e2723',
        expression: 'gasping',
        scenarioContext: 'Large multivitamin tablet lodged in oropharynx causing severe stridor.',
        patientStatement: 'Struggling to draw breath, pointing violently at throat, silent gagging.',
        vitals: { heartRate: 118, bloodPressure: '150/92', respiratoryRate: 6, oxygenSaturation: 85, temperature: 36.6, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Mild stroke 2 years ago (dysphagia)'],
        currentMeds: ['Aspirin', 'Atorvastatin'],
        allergies: ['None'],
        twistSummary: 'Dysphagic elderly tablet bolus aspiration.'
      },
      {
        variationIndex: 4,
        patientName: 'Dennis Adjei',
        gender: 'male',
        ageGroup: 'adult',
        age: 26,
        skinTone: '#8d5524',
        expression: 'gasping',
        scenarioContext: 'Laughing while drinking and eating fried plantain chips.',
        patientStatement: 'Clutching neck, unable to draw air, lips turning purple-blue.',
        vitals: { heartRate: 126, bloodPressure: '144/90', respiratoryRate: 0, oxygenSaturation: 84, temperature: 36.9, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Aspiration of hard snack fragment during laughter.'
      },
      {
        variationIndex: 5,
        patientName: 'Patricia Osei',
        gender: 'female',
        ageGroup: 'adult',
        age: 33,
        skinTone: '#5c3826',
        expression: 'gasping',
        scenarioContext: 'Choking on piece of hard toffee candy while talking on phone.',
        patientStatement: 'Frantically gestures at mouth and throat, cyanotic lips.',
        vitals: { heartRate: 124, bloodPressure: '138/86', respiratoryRate: 0, oxygenSaturation: 83, temperature: 36.8, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Smooth confection airway impaction requiring rapid Heimlich maneuvers.'
      }
    ]
  },

  // 7. Cardiac & Circulation - Sudden Collapse & Suspected Cardiac Arrest
  {
    topicId: 'topic-cardiac-arrest',
    topicTitle: 'Sudden Collapse & Basic Life Support (CPR)',
    category: 'cardiac_circulation',
    defaultDifficulty: 'expert',
    injuryType: 'cardiac_arrest',
    defaultBodyRegion: 'chest',
    timeLimitSeconds: 90,
    mustEscalateToEMS: true,
    requiredSupplyIds: ['cpr_compressions', 'emergency_ambulance'],
    recommendedSequence: ['emergency_ambulance', 'cpr_compressions'],
    prohibitedSupplyIds: [],
    criticalSafetyRules: [
      'Unresponsive with absent or abnormal agonal breathing = Cardiac Arrest.',
      'Shout for help, activate 112 EMS emergency ambulance immediately.',
      'Begin high-quality chest compressions immediately (100-120/min, 5-6 cm depth) without delay.'
    ],
    stgTitle: 'Cardiopulmonary Resuscitation in Primary Care',
    stgChapter: 'Ghana STG / AHA BLS Guidelines',
    stgKeyPoints: [
      'Every minute of delayed CPR reduces survival by 7-10%.',
      'Push hard and fast in center of chest with full recoil.'
    ],
    stgReferralCriteria: ['Immediate resuscitation and emergency mobile ICU transfer.'],
    baseComplaint: 'Sudden collapse in pharmacy waiting area with loss of consciousness and absent breathing.',
    baseFindings: [
      'Patient unresponsive on floor',
      'No carotid pulse palpable within 10 seconds',
      'Absent chest rise or infrequent agonal gasping'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Mr. Kofi Nkrumah',
        gender: 'male',
        ageGroup: 'adult',
        age: 58,
        skinTone: '#3e2723',
        expression: 'unconscious',
        scenarioContext: 'Clutched chest and collapsed forward onto floor while asking for antacids.',
        patientStatement: 'Patient is completely motionless, unresponsive, gray pallor, no normal breathing.',
        vitals: { heartRate: 0, bloodPressure: '0/0', respiratoryRate: 0, oxygenSaturation: 60, temperature: 36.4, gcsOrAvpu: 'Unresponsive' },
        medicalHistory: ['Type 2 Diabetes', 'Hyperlipidemia', 'Heavy smoker'],
        currentMeds: ['Metformin 500mg', 'Atorvastatin 20mg'],
        allergies: ['None'],
        twistSummary: 'Sudden ventricular fibrillation cardiac arrest.'
      },
      {
        variationIndex: 2,
        patientName: 'Madam Gladys',
        gender: 'female',
        ageGroup: 'elderly',
        age: 70,
        skinTone: '#8d5524',
        expression: 'unconscious',
        scenarioContext: 'Collapsed while seated in consultation chair.',
        patientStatement: 'Slumped out of chair onto floor; gray cyanosis, agonal snore.',
        vitals: { heartRate: 0, bloodPressure: '0/0', respiratoryRate: 2, oxygenSaturation: 58, temperature: 36.3, gcsOrAvpu: 'Unresponsive' },
        medicalHistory: ['Ischemic Heart Disease', 'Previous MI 4 years ago'],
        currentMeds: ['Aspirin', 'Bisoprolol 5mg'],
        allergies: ['None'],
        twistSummary: 'Elderly cardiac arrest with agonal gasping requiring immediate CPR.'
      },
      {
        variationIndex: 3,
        patientName: 'Coach Boadi',
        gender: 'male',
        ageGroup: 'adult',
        age: 46,
        skinTone: '#5c3826',
        expression: 'unconscious',
        scenarioContext: 'Ran into pharmacy sweating profusely, collapsed into cardiac arrest.',
        patientStatement: 'Unresponsive on back, cyanotic nailbeds, pulseless.',
        vitals: { heartRate: 0, bloodPressure: '0/0', respiratoryRate: 0, oxygenSaturation: 65, temperature: 37.4, gcsOrAvpu: 'Unresponsive' },
        medicalHistory: ['Hypertension'],
        currentMeds: ['Nifedipine 30mg'],
        allergies: ['None'],
        twistSummary: 'Exercise-triggered acute coronary occlusion arrest.'
      },
      {
        variationIndex: 4,
        patientName: 'Amina Haruna',
        gender: 'female',
        ageGroup: 'adult',
        age: 39,
        skinTone: '#c68642',
        expression: 'unconscious',
        scenarioContext: 'Sudden collapse during shopping; electric shock from exposed wire near fridge.',
        patientStatement: 'Shocked by faulty wire, flew back and became unresponsive.',
        vitals: { heartRate: 0, bloodPressure: '0/0', respiratoryRate: 0, oxygenSaturation: 62, temperature: 36.8, gcsOrAvpu: 'Unresponsive' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Electrocution-induced ventricular fibrillation arrest.'
      },
      {
        variationIndex: 5,
        patientName: 'Osei Tutu',
        gender: 'male',
        ageGroup: 'elderly',
        age: 65,
        skinTone: '#8d5524',
        expression: 'unconscious',
        scenarioContext: 'Complained of crushing retrosternal chest pain radiating to left arm before collapse.',
        patientStatement: 'Collapsed 30 seconds ago; unresponsive, pupils fixed.',
        vitals: { heartRate: 0, bloodPressure: '0/0', respiratoryRate: 0, oxygenSaturation: 64, temperature: 36.5, gcsOrAvpu: 'Unresponsive' },
        medicalHistory: ['Angina pectoris'],
        currentMeds: ['Glyceryl Trinitrate sublingual spray'],
        allergies: ['None'],
        twistSummary: 'STEMI progressing to cardiac arrest.'
      }
    ]
  },

  // 8. Metabolic - Severe Hypoglycemia
  {
    topicId: 'topic-metabolic-hypoglycemia',
    topicTitle: 'Acute Severe Hypoglycemia Management',
    category: 'metabolic',
    defaultDifficulty: 'intermediate',
    injuryType: 'hypoglycemia',
    defaultBodyRegion: 'head_face',
    timeLimitSeconds: 120,
    mustEscalateToEMS: false,
    requiredSupplyIds: ['oral_glucose_gel'],
    recommendedSequence: ['oral_glucose_gel'],
    prohibitedSupplyIds: [],
    criticalSafetyRules: [
      'Recognize neuroglycopenic & adrenergic signs: diaphoresis, tremor, confusion, tachycardia.',
      'If conscious and able to swallow: administer 15-20g rapid-acting oral glucose gel immediately.',
      'Re-check glucose in 15 minutes (Rule of 15).'
    ],
    stgTitle: 'Community Management of Hypoglycemic Crises',
    stgChapter: 'Ghana STG Chapter 19: Endocrine Disorders',
    stgKeyPoints: [
      'Severe hypoglycemia can rapidly induce permanent brain injury and coma.',
      'Oral glucose gel is absorbed rapidly via oral mucosa and upper gut.'
    ],
    stgReferralCriteria: ['Unconscious patient, recurrent hypoglycemia on long-acting sulfonylureas (Glibenclamide).'],
    baseComplaint: 'Intense shaking, cold sweats, hunger, dizziness, and mental confusion in diabetic patient.',
    baseFindings: [
      'Drenching cold diaphoresis with marked tremulousness',
      'Disoriented to time and place, slurred speech',
      'Point-of-care capillary blood glucose: 2.1 mmol/L (38 mg/dL)'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Mrs. Rebecca Akoto',
        gender: 'female',
        ageGroup: 'adult',
        age: 54,
        skinTone: '#8d5524',
        expression: 'confused',
        scenarioContext: 'Injected morning Insulin Glargine and skipped lunch to attend church.',
        patientStatement: 'Feel... so dizzy... shaking... can\'t think straight... where is my bag?',
        vitals: { heartRate: 116, bloodPressure: '138/86', respiratoryRate: 18, oxygenSaturation: 98, temperature: 36.3, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Type 1 Diabetes (20 years)'],
        currentMeds: ['Insulin Glargine 24U', 'Insulin Lispro TID'],
        allergies: ['None'],
        twistSummary: 'Insulin-induced hypoglycemia post-missed meal in conscious patient.'
      },
      {
        variationIndex: 2,
        patientName: 'Opanin Kwadwo',
        gender: 'male',
        ageGroup: 'elderly',
        age: 76,
        skinTone: '#3e2723',
        expression: 'confused',
        scenarioContext: 'Accidentally doubled Glibenclamide dose this morning.',
        patientStatement: 'Staggered into shop, profuse sweating, trembling hands, speech incoherent.',
        vitals: { heartRate: 110, bloodPressure: '142/88', respiratoryRate: 20, oxygenSaturation: 97, temperature: 36.2, gcsOrAvpu: 'Voice' },
        medicalHistory: ['Type 2 Diabetes', 'CKD Stage 3'],
        currentMeds: ['Glibenclamide 5mg BID', 'Metformin 500mg'],
        allergies: ['None'],
        twistSummary: 'Long-acting sulfonylurea accumulation in renal impairment requiring glucose + hospital transfer.'
      },
      {
        variationIndex: 3,
        patientName: 'Vida Ohenewaa',
        gender: 'female',
        ageGroup: 'adult',
        age: 31,
        skinTone: '#c68642',
        expression: 'confused',
        scenarioContext: 'Gestational diabetes on Metformin + insulin, intense morning exercise.',
        patientStatement: 'Hands trembling violently, cold sweat running down face, vision blurred.',
        vitals: { heartRate: 120, bloodPressure: '120/75', respiratoryRate: 20, oxygenSaturation: 99, temperature: 36.4, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Gestational Diabetes (28 weeks pregnancy)'],
        currentMeds: ['Insulin NPH 14U'],
        allergies: ['None'],
        twistSummary: 'Gestational hypoglycemia requiring urgent oral glucose.'
      },
      {
        variationIndex: 4,
        patientName: 'Master Kwaku',
        gender: 'male',
        ageGroup: 'child',
        age: 11,
        skinTone: '#5c3826',
        caregiverPresent: true,
        caregiverName: 'Mother (Abigail)',
        expression: 'distressed',
        scenarioContext: 'Type 1 diabetic child played continuous school inter-house football without extra snack.',
        patientStatement: 'My tummy aches... feel like fainting... (slumping against mother)',
        vitals: { heartRate: 122, bloodPressure: '98/60', respiratoryRate: 22, oxygenSaturation: 99, temperature: 36.5, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Type 1 Diabetes (diagnosed 2 years ago)'],
        currentMeds: ['Insulin Aspart with meals'],
        allergies: ['None'],
        twistSummary: 'Pediatric exercise-induced acute hypoglycemia.'
      },
      {
        variationIndex: 5,
        patientName: 'Bernard Koomson',
        gender: 'male',
        ageGroup: 'adult',
        age: 42,
        skinTone: '#8d5524',
        expression: 'confused',
        scenarioContext: 'Heavy alcohol consumption on empty stomach in diabetic on insulin.',
        patientStatement: 'Stumbling, slurred words, profound cold sweat, confused.',
        vitals: { heartRate: 114, bloodPressure: '128/80', respiratoryRate: 18, oxygenSaturation: 97, temperature: 36.1, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Type 2 Diabetes'],
        currentMeds: ['Mixtard 30/70'],
        allergies: ['None'],
        twistSummary: 'Alcohol-induced inhibition of hepatic gluconeogenesis.'
      }
    ]
  },

  // 9. Eye, Ear & Facial - Knocked-Out Permanent Tooth (Dental Avulsion)
  {
    topicId: 'topic-dental-avulsion',
    topicTitle: 'Dental Avulsion (Knocked-Out Permanent Tooth)',
    category: 'eye_ear_facial',
    defaultDifficulty: 'intermediate',
    injuryType: 'laceration',
    defaultBodyRegion: 'head_face',
    mustEscalateToEMS: false,
    requiredSupplyIds: ['gloves', 'tooth_milk_container', 'sterile_gauze', 'hospital_referral'],
    recommendedSequence: ['gloves', 'tooth_milk_container', 'sterile_gauze', 'hospital_referral'],
    prohibitedSupplyIds: ['scrub_knocked_tooth'],
    criticalSafetyRules: [
      'Handle tooth ONLY by the crown; NEVER touch or scrape the root.',
      'DO NOT scrub with soap, brush, or alcohol (destroys periodontal ligament cells).',
      'Store tooth immediately in cold cow\'s milk or buccal saliva and refer to dentist within 60 minutes.'
    ],
    stgTitle: 'Emergency Management of Avulsed Permanent Teeth',
    stgChapter: 'International Association of Dental Traumatology / Ghana STG',
    stgKeyPoints: [
      'Re-implantation success plummets after 60 minutes of dry storage.',
      'Cold milk has ideal osmolality and electrolytes to preserve PDL cells.'
    ],
    stgReferralCriteria: ['Immediate referral to emergency dental surgeon within golden hour.'],
    baseComplaint: 'Upper front permanent incisor knocked out of mouth following impact.',
    baseFindings: [
      'Empty bleeding maxillary central incisor socket',
      'Intact permanent incisor held in napkin',
      'Mild labial mucosal laceration with minor oozing'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Kofi Boakye',
        gender: 'male',
        ageGroup: 'adult',
        age: 19,
        skinTone: '#5c3826',
        expression: 'in_pain',
        scenarioContext: 'Elbow impact to face during basketball game 15 minutes ago.',
        patientStatement: 'I was driving to the hoop and an elbow hit my mouth! My front tooth flew right out on the court!',
        vitals: { heartRate: 90, bloodPressure: '124/78', respiratoryRate: 18, oxygenSaturation: 99, temperature: 36.8, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Fresh sports avulsion within golden 60-minute window.'
      },
      {
        variationIndex: 2,
        patientName: 'Selina Addo',
        gender: 'female',
        ageGroup: 'child',
        age: 10,
        skinTone: '#c68642',
        caregiverPresent: true,
        caregiverName: 'Mother (Grace)',
        expression: 'distressed',
        scenarioContext: 'Tripped on school stairs, hitting mouth against concrete step.',
        patientStatement: 'My front tooth came out! (crying with bloody lips)',
        vitals: { heartRate: 108, bloodPressure: '104/68', respiratoryRate: 20, oxygenSaturation: 99, temperature: 37.0, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Healthy child'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Pediatric permanent central incisor avulsion requiring parent education.'
      },
      {
        variationIndex: 3,
        patientName: 'David Mensah',
        gender: 'male',
        ageGroup: 'adult',
        age: 27,
        skinTone: '#8d5524',
        expression: 'in_pain',
        scenarioContext: 'Bicycle handlebars struck face after hitting pothole.',
        patientStatement: 'The tooth fell on the road! My friend wanted to scrub it with Dettol and a toothbrush!',
        vitals: { heartRate: 94, bloodPressure: '126/80', respiratoryRate: 18, oxygenSaturation: 98, temperature: 36.9, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Patient friend proposed scrubbing tooth (test prohibited hazard).'
      },
      {
        variationIndex: 4,
        patientName: 'Akua Mansa',
        gender: 'female',
        ageGroup: 'adult',
        age: 23,
        skinTone: '#3e2723',
        expression: 'in_pain',
        scenarioContext: 'Motorcycle passenger helmet strap struck upper jaw during emergency stop.',
        patientStatement: 'My upper incisor popped out clean into my hand.',
        vitals: { heartRate: 88, bloodPressure: '118/74', respiratoryRate: 16, oxygenSaturation: 99, temperature: 36.8, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Transit trauma avulsion requiring milk preservation.'
      },
      {
        variationIndex: 5,
        patientName: 'Yaw Ofori',
        gender: 'male',
        ageGroup: 'adult',
        age: 31,
        skinTone: '#5c3826',
        expression: 'in_pain',
        scenarioContext: 'Slip and fall in tiled hallway with direct impact to anterior maxilla.',
        patientStatement: 'Tooth came out completely whole, socket is bleeding slowly.',
        vitals: { heartRate: 86, bloodPressure: '122/76', respiratoryRate: 16, oxygenSaturation: 98, temperature: 36.7, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Clean avulsion requiring sterile gauze bite for hemostasis.'
      }
    ]
  },

  // 10. Toxicology - Accidental Kerosene/Hydrocarbon Ingestion
  {
    topicId: 'topic-toxicology-kerosene',
    topicTitle: 'Acute Hydrocarbon / Kerosene Poisoning Triage',
    category: 'toxicology',
    defaultDifficulty: 'advanced',
    injuryType: 'poisoning',
    defaultBodyRegion: 'head_face',
    mustEscalateToEMS: true,
    requiredSupplyIds: ['gloves', 'emergency_ambulance', 'hospital_referral'],
    recommendedSequence: ['gloves', 'emergency_ambulance', 'hospital_referral'],
    prohibitedSupplyIds: ['induce_vomiting'],
    criticalSafetyRules: [
      'CRITICAL SAFETY OVERRIDE: NEVER INDUCE VOMITING or give Ipecac/saltwater.',
      'Hydrocarbons have low viscosity and surface tension; vomiting causes fatal chemical aspiration pneumonitis.',
      'Keep patient calm, monitor breathing, and transfer immediately to hospital.'
    ],
    stgTitle: 'Management of Hydrocarbon & Corrosive Ingestions',
    stgChapter: 'Ghana STG Chapter 23: Toxicology',
    stgKeyPoints: [
      'Chemical pneumonitis is the leading cause of mortality in pediatric kerosene ingestions.',
      'Gastric emptying, lavage, or induced vomiting are strictly contraindicated.'
    ],
    stgReferralCriteria: ['All hydrocarbon ingestions require hospital admission for chest X-ray and 6-24 hour respiratory monitoring.'],
    baseComplaint: 'Accidental ingestion of kerosene stored in an unlabelled beverage bottle.',
    baseFindings: [
      'Pungent kerosene odor on breath and clothing',
      'Persistent dry coughing with tachypnea',
      'Intercostal indrawing and mild lip cyanosis'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Junior Yaw',
        gender: 'male',
        ageGroup: 'child',
        age: 3,
        skinTone: '#5c3826',
        caregiverPresent: true,
        caregiverName: 'Mother (Christiana)',
        expression: 'distressed',
        scenarioContext: 'Toddler drank from Sprite bottle containing lamp kerosene stored under kitchen sink.',
        patientStatement: 'He swallowed a gulp thinking it was water! My neighbor said to make him drink palm oil or stick a finger down his throat to vomit!',
        vitals: { heartRate: 134, bloodPressure: '95/60', respiratoryRate: 36, oxygenSaturation: 91, temperature: 37.4, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Complete immunizations'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Classic pediatric kerosene poisoning with neighbor advising induced vomiting (prohibited hazard).'
      },
      {
        variationIndex: 2,
        patientName: 'Little Maame',
        gender: 'female',
        ageGroup: 'child',
        age: 2,
        skinTone: '#c68642',
        caregiverPresent: true,
        caregiverName: 'Father (Kwame)',
        expression: 'distressed',
        scenarioContext: 'Swallowed petrol from motorcycle maintenance can in backyard.',
        patientStatement: 'She gagged and choked on the petrol! Please give her something to throw it up!',
        vitals: { heartRate: 140, bloodPressure: '90/55', respiratoryRate: 38, oxygenSaturation: 90, temperature: 37.5, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Gasoline/petrol ingestion with early chemical pneumonitis.'
      },
      {
        variationIndex: 3,
        patientName: 'Akwasi Mensah',
        gender: 'male',
        ageGroup: 'adult',
        age: 26,
        skinTone: '#8d5524',
        expression: 'in_pain',
        scenarioContext: 'Mechanic siphoning diesel fuel with garden hose accidentally aspirated into pharynx.',
        patientStatement: 'I was siphoning fuel from a diesel tank and accidentally swallowed and choked on it! Chest burning!',
        vitals: { heartRate: 104, bloodPressure: '128/82', respiratoryRate: 26, oxygenSaturation: 93, temperature: 37.1, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Adult occupational siphoning fuel aspiration.'
      },
      {
        variationIndex: 4,
        patientName: 'Master Emmanuel',
        gender: 'male',
        ageGroup: 'child',
        age: 4,
        skinTone: '#3e2723',
        caregiverPresent: true,
        caregiverName: 'Grandmother (Nana)',
        expression: 'distressed',
        scenarioContext: 'Drank turpentine paint thinner kept in Fanta bottle.',
        patientStatement: 'He coughed violently after drinking it. Grandmother wants to give raw egg and milk.',
        vitals: { heartRate: 130, bloodPressure: '96/60', respiratoryRate: 34, oxygenSaturation: 92, temperature: 37.2, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Mineral turpentine ingestion requiring hospital chest evaluation.'
      },
      {
        variationIndex: 5,
        patientName: 'Sister Yaa',
        gender: 'female',
        ageGroup: 'adult',
        age: 40,
        skinTone: '#5c3826',
        expression: 'in_pain',
        scenarioContext: 'Household cleaner containing pine oil and petroleum distillates accidentally ingested.',
        patientStatement: 'Took a swig in the dark mistaking it for cough syrup! Burning down esophagus!',
        vitals: { heartRate: 108, bloodPressure: '130/84', respiratoryRate: 24, oxygenSaturation: 94, temperature: 37.0, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Asthma'],
        currentMeds: ['Salbutamol inhaler'],
        allergies: ['None'],
        twistSummary: 'Petroleum solvent ingestion in asthmatic.'
      }
    ]
  },

  // 11. Bites & Stings - Venomous Snakebite
  {
    topicId: 'topic-venomous-snakebite',
    topicTitle: 'Venomous Snakebite (Carpet Viper) First Aid',
    category: 'bites_stings',
    defaultDifficulty: 'advanced',
    injuryType: 'bite_sting',
    defaultBodyRegion: 'right_leg',
    timeLimitSeconds: 120,
    mustEscalateToEMS: true,
    requiredSupplyIds: ['gloves', 'padded_splint', 'elastic_bandage', 'emergency_ambulance'],
    recommendedSequence: ['gloves', 'elastic_bandage', 'padded_splint', 'emergency_ambulance'],
    prohibitedSupplyIds: ['snakebite_tourniquet'],
    criticalSafetyRules: [
      'CRITICAL SAFETY: DO NOT apply tight arterial tourniquets (causes severe local ischemic gangrene).',
      'DO NOT cut, incise, or attempt to suck venom from wound with mouth.',
      'Immobilize the affected limb with a splint at heart level and arrange urgent antivenom transport.'
    ],
    stgTitle: 'Management of Snake Envenomation in West Africa',
    stgChapter: 'Ghana STG Chapter 23 / WHO African Snakebite Guidelines',
    stgKeyPoints: [
      'Echis ocellatus (Carpet Viper) causes local cytotoxic swelling and systemic consumption coagulopathy.',
      'Limb immobilization retards venom lymphatic dissemination.'
    ],
    stgReferralCriteria: ['All venomous snakebites require urgent 20-minute whole blood clotting test (20WBCT) and polyvalent antivenom.'],
    baseComplaint: 'Bitten by venomous snake on lower limb while walking through brush.',
    baseFindings: [
      'Two distinct puncture fang marks with active oozing of non-clotting blood',
      'Rapidly spreading tense painful edema up the lower leg',
      'Subcutaneous ecchymosis and dark purpura'
    ],
    variations: [
      {
        variationIndex: 1,
        patientName: 'Kofi Manu',
        gender: 'male',
        ageGroup: 'adult',
        age: 38,
        skinTone: '#5c3826',
        expression: 'in_pain',
        scenarioContext: 'Stepped on saw-scaled carpet viper on cocoa farm path at dusk.',
        patientStatement: 'A viper struck my right ankle in the grass! It is swelling fast. My friend is looking for rope to tie a tight tourniquet!',
        vitals: { heartRate: 112, bloodPressure: '110/70', respiratoryRate: 22, oxygenSaturation: 97, temperature: 37.1, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Viper bite with bystander attempting tourniquet (prohibited hazard).'
      },
      {
        variationIndex: 2,
        patientName: 'Abena Danso',
        gender: 'female',
        ageGroup: 'adult',
        age: 29,
        skinTone: '#8d5524',
        expression: 'in_pain',
        scenarioContext: 'Bitten on dorsum of foot while gathering firewood in brush.',
        patientStatement: 'The snake was camouflaged in the dry leaves. Two fang marks and burning throbbing pain!',
        vitals: { heartRate: 104, bloodPressure: '118/76', respiratoryRate: 20, oxygenSaturation: 98, temperature: 37.0, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Envenomation with progressive ascending edema.'
      },
      {
        variationIndex: 3,
        patientName: 'Kwabena Junior',
        gender: 'male',
        ageGroup: 'child',
        age: 8,
        skinTone: '#c68642',
        caregiverPresent: true,
        caregiverName: 'Father (Kwame)',
        expression: 'distressed',
        scenarioContext: 'Playing near stone wall behind house; snake struck right shin.',
        patientStatement: 'My leg is on fire daddy! (crying in severe pain)',
        vitals: { heartRate: 128, bloodPressure: '96/60', respiratoryRate: 26, oxygenSaturation: 97, temperature: 37.3, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Complete childhood vaccines'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Pediatric snake envenomation with high venom-to-body-weight ratio.'
      },
      {
        variationIndex: 4,
        patientName: 'Elder Osei',
        gender: 'male',
        ageGroup: 'elderly',
        age: 72,
        skinTone: '#3e2723',
        expression: 'in_pain',
        scenarioContext: 'Bitten on hand while weeding garden patch.',
        patientStatement: 'Struck between thumb and index finger. Arm is already swollen to the elbow.',
        vitals: { heartRate: 98, bloodPressure: '146/88', respiratoryRate: 20, oxygenSaturation: 96, temperature: 36.9, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Hypertension'],
        currentMeds: ['Enalapril 10mg'],
        allergies: ['None'],
        twistSummary: 'Upper extremity envenomation requiring immediate ring removal and splinting.'
      },
      {
        variationIndex: 5,
        patientName: 'Hawa Gariba',
        gender: 'female',
        ageGroup: 'adult',
        age: 33,
        skinTone: '#5c3826',
        expression: 'in_pain',
        scenarioContext: 'Night-time bite in unlit compound courtyard.',
        patientStatement: 'I stepped on something that bit my heel. Bleeding won\'t stop from the puncture wounds.',
        vitals: { heartRate: 110, bloodPressure: '108/68', respiratoryRate: 20, oxygenSaturation: 98, temperature: 37.0, gcsOrAvpu: 'Alert' },
        medicalHistory: ['Nil'],
        currentMeds: ['None'],
        allergies: ['None'],
        twistSummary: 'Systemic coagulopathy with oozing puncture wounds.'
      }
    ]
  }
];

// Helper to construct a full ClinicalCase from Topic and Variation
export function buildCaseFromTopicAndVariation(
  topic: ChallengeTopicDefinition, 
  variationIndex = 0,
  createdAtTimestamp?: number
): ClinicalCase {
  const variation = topic.variations[variationIndex % topic.variations.length];
  
  // Assemble available supplies: required + prohibited distractors + relevant general tools
  const targetSupplies = ALL_SUPPLIES.filter(s => 
    topic.requiredSupplyIds.includes(s.id) ||
    topic.prohibitedSupplyIds.includes(s.id) ||
    ['gloves', 'sterile_saline', 'sterile_gauze', 'elastic_bandage', 'oral_paracetamol', 'emergency_ambulance', 'hospital_referral'].includes(s.id)
  );

  const topicIndex = CHALLENGE_TOPICS.findIndex(t => t.topicId === topic.topicId);
  const baselineEpoch = 1700000000000 + (Math.max(0, topicIndex) * 10 + variationIndex) * 60000;

  return {
    id: `${topic.topicId}-var${variation.variationIndex}`,
    title: `${topic.topicTitle}: ${variation.patientName}`,
    category: topic.category,
    difficulty: topic.defaultDifficulty,
    timeLimitSeconds: topic.timeLimitSeconds,
    createdAt: createdAtTimestamp !== undefined ? createdAtTimestamp : baselineEpoch,
    patient: {
      name: variation.patientName,
      gender: variation.gender,
      ageGroup: variation.ageGroup,
      age: variation.age,
      skinTone: variation.skinTone,
      caregiverPresent: variation.caregiverPresent,
      caregiverName: variation.caregiverName,
      expression: variation.expression
    },
    presentingComplaint: `${variation.scenarioContext} ${topic.baseComplaint}`,
    patientStatement: variation.patientStatement,
    caregiverStatement: variation.caregiverPresent ? `Please help my child immediately!` : undefined,
    visibleFindings: [
      ...topic.baseFindings,
      `Clinical Variation: ${variation.twistSummary}`
    ],
    affectedBodyRegion: topic.defaultBodyRegion,
    injuryType: topic.injuryType,
    initialVitals: variation.vitals,
    medicalHistory: variation.medicalHistory,
    currentMedications: variation.currentMeds,
    knownAllergies: variation.allergies,
    availableSupplies: targetSupplies,
    rubric: {
      weights: {
        recognition: 0.20,
        clinicalImpression: 0.20,
        immediateManagement: 0.35,
        medicationSafety: 0.15,
        referralAndEscalation: 0.10
      },
      requiredSupplyIds: topic.requiredSupplyIds,
      recommendedSequence: topic.recommendedSequence,
      prohibitedSupplyIds: topic.prohibitedSupplyIds,
      mustEscalateToEMS: topic.mustEscalateToEMS,
      criticalSafetyRules: topic.criticalSafetyRules
    },
    expectedOutcomeSummary: `Standard Treatment Guideline execution for ${topic.topicTitle}. Appropriate protective equipment, procedural interventions in correct sequence, avoidance of contraindicated safety hazards, and timely escalation.`,
    stgReference: {
      guidelineTitle: topic.stgTitle,
      chapter: topic.stgChapter,
      keyPoints: topic.stgKeyPoints,
      referralCriteria: topic.stgReferralCriteria
    },
    educationalExplanations: {
      whyCorrect: `Following the Ghana STG and emergency protocols ensures prompt stabilization of ${topic.topicTitle}.`,
      commonPitfalls: topic.criticalSafetyRules.join(' '),
      safetyPearls: `Always assess vital signs and maintain airway, breathing, and circulation priority.`
    }
  };
}

// Full array of default cases (variation 1 of each topic, ordered chronologically)
export const CASE_LIBRARY: ClinicalCase[] = CHALLENGE_TOPICS.map((topic, idx) => 
  buildCaseFromTopicAndVariation(topic, 0, 1700000000000 + idx * 60000)
);

export const getCaseById = (id: string): ClinicalCase | undefined => {
  // Check default library first
  const found = CASE_LIBRARY.find(c => c.id === id);
  if (found) return found;

  // Check variations
  for (const topic of CHALLENGE_TOPICS) {
    for (let v = 0; v < topic.variations.length; v++) {
      const c = buildCaseFromTopicAndVariation(topic, v);
      if (c.id === id) return c;
    }
  }
  return undefined;
};

export const getCasesByCategory = (category: string): ClinicalCase[] => {
  if (category === 'all') return CASE_LIBRARY;
  return CASE_LIBRARY.filter(c => c.category === category);
};

// Generates all 5 variations for a specific challenge topic
export function getTopicVariations(topicId: string): ClinicalCase[] {
  const topic = CHALLENGE_TOPICS.find(t => t.topicId === topicId);
  if (!topic) return [CASE_LIBRARY[0]];
  return topic.variations.map((_, idx) => buildCaseFromTopicAndVariation(topic, idx));
}

// Helpers for calendar date keys
export function getDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getWeekKey(date: Date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// High acuity topics suitable for Hard and Super Hard challenges
const HIGH_ACUITY_TOPIC_IDS = [
  'topic-wound-arterial',
  'topic-acute-asthma',
  'topic-cardiac-arrest',
  'topic-acute-anaphylaxis',
  'topic-toxicology-kerosene',
  'topic-bites-snakebite',
  'topic-metabolic-seizure',
  'topic-pediatric-infant-choking',
  'topic-burns-chemical-eye',
  'topic-musculo-sprain'
];

/**
 * Daily Challenge:
 * Deterministically keyed to the calendar date string (e.g. "2026-11-02").
 * Difficulty: Strictly 'advanced' (Hard) or 'expert' (Super Hard).
 * Reward: Plenty of XP (+750 XP bonus) and unlocks the very rare badge 'rare_daily_titan'.
 * When date rolls over to next day, a brand new challenge for that date is generated automatically!
 */
export const getDailyChallengeCase = (date: Date = new Date()): ClinicalCase => {
  const dateKey = getDateKey(date);
  const seed = stringToSeed(dateKey);
  
  // Filter high-acuity topics for hard-to-super-hard daily challenges
  const eligibleTopics = CHALLENGE_TOPICS.filter(t => HIGH_ACUITY_TOPIC_IDS.includes(t.topicId));
  const topicPool = eligibleTopics.length > 0 ? eligibleTopics : CHALLENGE_TOPICS;
  
  const topicIndex = seed % topicPool.length;
  const variationIndex = (Math.floor(seed / 7)) % 5;
  const topic = topicPool[topicIndex];
  
  // Difficulty strictly hard (advanced) or super hard (expert)
  const isSuperHard = (seed % 2) === 1;
  const difficulty: 'advanced' | 'expert' = isSuperHard ? 'expert' : 'advanced';

  const baseCase = buildCaseFromTopicAndVariation(topic, variationIndex);

  return {
    ...baseCase,
    id: `daily-${dateKey}`,
    title: `[DAILY CRISIS • ${difficulty === 'expert' ? 'SUPER HARD' : 'HARD'}] ${topic.topicTitle}: ${baseCase.patient.name}`,
    difficulty,
    isDailyChallenge: true,
    bonusXp: isSuperHard ? 850 : 700,
    specialBadgeReward: 'rare_daily_titan',
    timeLimitSeconds: baseCase.timeLimitSeconds ? Math.min(baseCase.timeLimitSeconds, 75) : 80,
    createdAt: new Date(`${dateKey}T00:00:00`).getTime() || Date.now(),
    presentingComplaint: `⚡ [HIGH-STAKES DAILY CRISIS] ${baseCase.presentingComplaint}`,
    visibleFindings: [
      `High-stakes daily emergency simulation with zero tolerance for procedural oversights.`,
      ...baseCase.visibleFindings
    ]
  };
};

/**
 * Weekly Challenge:
 * Deterministically keyed to current year and ISO week (e.g. "2026-W45").
 * Difficulty: Strictly 'expert' (Super Hard).
 * Reward: Massive XP (+1500 XP bonus) and unlocks the legendary rare badge 'rare_weekly_oracle'.
 * Automatically replaces the old weekly challenge when the week rolls over!
 */
export const getWeeklyChallengeCase = (date: Date = new Date()): ClinicalCase => {
  const weekKey = getWeekKey(date);
  const seed = stringToSeed(weekKey);
  
  // Pick from apex emergency topics
  const apexTopics = CHALLENGE_TOPICS.filter(t => 
    t.injuryType === 'cardiac_arrest' || 
    t.injuryType === 'arterial_bleed' || 
    t.injuryType === 'anaphylaxis' || 
    t.injuryType === 'bite_sting' ||
    t.injuryType === 'asthma'
  );
  const pool = apexTopics.length > 0 ? apexTopics : CHALLENGE_TOPICS;
  const topic = pool[seed % pool.length];
  const variationIndex = (seed * 3) % 5;

  const baseCase = buildCaseFromTopicAndVariation(topic, variationIndex);

  return {
    ...baseCase,
    id: `weekly-${weekKey}`,
    title: `[WEEKLY CRUCIBLE • SUPER HARD] ${topic.topicTitle}: ${baseCase.patient.name}`,
    difficulty: 'expert',
    isWeeklyChallenge: true,
    bonusXp: 1500,
    specialBadgeReward: 'rare_weekly_oracle',
    timeLimitSeconds: 60, // 60s intense super hard limit
    createdAt: Date.now() - ((date.getDay() || 7) - 1) * 86400000,
    presentingComplaint: `🔥 [WEEKLY APEX CRUCIBLE - SUPER HARD] Multi-system acute clinical crisis. ${baseCase.presentingComplaint}`,
    visibleFindings: [
      `Critical poly-trauma / life-threat: Maximum guideline rigor with 60s rapid escalation window.`,
      ...baseCase.visibleFindings
    ]
  };
};

/**
 * Generates 5 new distinct case challenges on demand.
 * Distinct categories, random variations, realistic vitals, and chronological timestamps.
 */
export function generateBatch5Challenges(startFromTimestamp = Date.now()): ClinicalCase[] {
  // Diverse domains to choose from
  const candidateTopics = [...CHALLENGE_TOPICS].sort(() => 0.5 - Math.random());
  const selectedTopics = candidateTopics.slice(0, 5);
  
  // If fewer than 5 topics available, pad from full array
  while (selectedTopics.length < 5) {
    selectedTopics.push(CHALLENGE_TOPICS[selectedTopics.length % CHALLENGE_TOPICS.length]);
  }

  const generatedBatch: ClinicalCase[] = [];

  for (let i = 0; i < selectedTopics.length; i++) {
    const topic = selectedTopics[i];
    const variationIndex = Math.floor(Math.random() * topic.variations.length);
    const uniqueId = `batch-case-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`;
    const timestamp = startFromTimestamp + (i * 1000);
    
    // Vary difficulties: intermediate, advanced, expert
    const diffs: ('intermediate' | 'advanced' | 'expert')[] = ['intermediate', 'advanced', 'expert'];
    const assignedDiff = diffs[i % diffs.length];

    const base = buildCaseFromTopicAndVariation(topic, variationIndex, timestamp);

    generatedBatch.push({
      ...base,
      id: uniqueId,
      difficulty: assignedDiff,
      createdAt: timestamp,
      title: `Case #${i + 1} (${assignedDiff.toUpperCase()}): ${topic.topicTitle} - ${base.patient.name}`
    });
  }

  return generatedBatch;
}

// Random challenge picker (selects any random topic + random variation)
export const getRandomChallengeCase = (): ClinicalCase => {
  const topicIndex = Math.floor(Math.random() * CHALLENGE_TOPICS.length);
  const variationIndex = Math.floor(Math.random() * 5);
  return buildCaseFromTopicAndVariation(CHALLENGE_TOPICS[topicIndex], variationIndex, Date.now());
};

