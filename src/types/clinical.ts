export type CaseCategory = 
  | 'trauma' 
  | 'musculoskeletal'
  | 'burns_environmental'
  | 'acute_emergency' 
  | 'cardiac_circulation'
  | 'metabolic'
  | 'pharma_emergency'
  | 'toxicology'
  | 'eye_ear_facial'
  | 'bites_stings'
  | 'pediatric';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type BodyRegion = 
  | 'head_face' 
  | 'eye_ear'
  | 'chest' 
  | 'abdomen' 
  | 'right_arm' 
  | 'left_arm' 
  | 'right_hand' 
  | 'left_hand' 
  | 'right_leg' 
  | 'left_leg';

export type PatientConditionState = 
  | 'initial'
  | 'irrigated'
  | 'pressure_applied'
  | 'dressed'
  | 'cooled'
  | 'covered'
  | 'splinted'
  | 'reliever_given'
  | 'epinephrine_given'
  | 'glucose_given'
  | 'naloxone_given'
  | 'cpr_active'
  | 'heimlich_performed'
  | 'eye_flushed'
  | 'nose_pinched'
  | 'recovery_positioned'
  | 'stabilized'
  | 'deteriorating'
  | 'critical_failure';

export type PatientOutcome =
  | 'full_recovery'
  | 'appropriate_improvement'
  | 'partial_improvement'
  | 'persistent_symptoms'
  | 'deterioration'
  | 'emergency_escalation'
  | 'treatment_failure';

export interface PatientAvatarConfig {
  gender: 'male' | 'female';
  ageGroup: 'child' | 'adult' | 'elderly';
  skinTone: string;
  name: string;
  age: number;
  weightKg?: number;
  caregiverPresent?: boolean;
  caregiverType?: 'mother' | 'father' | 'relative';
  caregiverName?: string;
  expression: 'distressed' | 'in_pain' | 'gasping' | 'confused' | 'unconscious' | 'relieved';
}

export interface VitalSigns {
  heartRate: number; // bpm
  bloodPressure: string; // e.g. "120/80"
  respiratoryRate: number; // breaths/min
  oxygenSaturation: number; // %
  temperature: number; // °C
  gcsOrAvpu: 'Alert' | 'Voice' | 'Pain' | 'Unresponsive';
}

export interface SupplyItem {
  id: string;
  name: string;
  category: 'ppe' | 'wound_care' | 'burn_care' | 'medication' | 'airway_support' | 'procedure';
  description: string;
  iconName: string;
  targetRegionAllowed?: BodyRegion[];
  isHarmful?: boolean; // For distractor items (butter, ice, hydrogen peroxide, etc.)
  harmfulRationale?: string;
}

export interface AppliedAction {
  id: string;
  supplyId: string;
  supplyName: string;
  targetRegion?: BodyRegion;
  timestampSeconds: number;
  medicationDetails?: {
    drugName: string;
    dose: string;
    route: string;
    frequency: string;
  };
  isEssential: boolean;
  isHarmful: boolean;
  isContraindicated: boolean;
  clinicalFeedback: string;
}

export interface ClinicalRubric {
  weights: {
    recognition: number; // e.g. 0.20
    clinicalImpression: number; // e.g. 0.15
    immediateManagement: number; // e.g. 0.30
    medicationSafety: number; // e.g. 0.20
    referralAndEscalation: number; // e.g. 0.15
  };
  requiredSupplyIds: string[];
  recommendedSequence: string[]; // sequence of supply IDs or action keys
  prohibitedSupplyIds: string[]; // critical safety hazards (e.g. 'butter', 'ice', 'hydrogen_peroxide', 'antihistamine_alone_in_anaphylaxis')
  mustEscalateToEMS: boolean;
  tetanusEvaluationRequired?: boolean;
  criticalSafetyRules: string[];
}

export interface ClinicalCase {
  id: string;
  title: string;
  category: CaseCategory;
  difficulty: DifficultyLevel;
  timeLimitSeconds?: number; // e.g. 120 for acute asthma/anaphylaxis, undefined for untimed
  patient: PatientAvatarConfig;
  presentingComplaint: string;
  patientStatement: string;
  caregiverStatement?: string;
  visibleFindings: string[];
  affectedBodyRegion: BodyRegion;
  injuryType: 
    | 'laceration' 
    | 'abrasion' 
    | 'puncture' 
    | 'epistaxis'
    | 'arterial_bleed'
    | 'sprain_fracture'
    | 'burn_thermal' 
    | 'burn_chemical' 
    | 'asthma' 
    | 'anaphylaxis' 
    | 'seizure' 
    | 'choking'
    | 'cardiac_arrest'
    | 'hypoglycemia'
    | 'drug_reaction' 
    | 'overdose'
    | 'poisoning'
    | 'eye_injury'
    | 'bite_sting';
  initialVitals: VitalSigns;
  medicalHistory: string[];
  currentMedications: string[];
  knownAllergies: string[];
  availableSupplies: SupplyItem[];
  rubric: ClinicalRubric;
  expectedOutcomeSummary: string;
  stgReference: {
    guidelineTitle: string;
    chapter: string;
    keyPoints: string[];
    referralCriteria: string[];
  };
  educationalExplanations: {
    whyCorrect: string;
    commonPitfalls: string;
    safetyPearls: string;
  };
}

export interface CaseEvaluationResult {
  score: number; // 0 - 100
  performanceBand: 'critical_failure' | 'partial_success' | 'successful_with_deficiencies' | 'flawless';
  patientOutcome: PatientOutcome;
  patientOutcomeDescription: string;
  criticalSafetyErrors: string[];
  isCriticalOverride: boolean;
  actionsPerformed: AppliedAction[];
  omittedEssentialActions: string[];
  unnecessaryInterventions: string[];
  sequencingErrors: string[];
  xpEarned: number;
  timeTakenSeconds: number;
  unlockedBadges: string[];
  categoryMasteryDelta: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'general' | 'trauma' | 'emergency' | 'pharma';
  unlockedAt?: string;
}

export interface IdentityProfile {
  username: string;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  rankTitle: string;
  casesAttempted: number;
  casesCompleted: number;
  casesSuccessful: number;
  totalCriticalErrors: number;
  averageScore: number;
  streakDays: number;
  lastActiveDate: string;
  categoryMastery: Record<string, number>;
  unlockedBadges: string[]; // badge IDs
  history: {
    id: string;
    caseId: string;
    caseTitle: string;
    category: CaseCategory;
    score: number;
    patientOutcome: PatientOutcome;
    xpEarned: number;
    completedAt: string;
    criticalErrors: number;
  }[];
}

export interface DrugMonograph {
  id: string;
  genericName: string;
  brandNames: string[];
  drugClass: string;
  indications: string[];
  adultDose: string;
  pediatricDose?: string;
  routes: string[];
  frequencies: string[];
  contraindications: string[];
  majorInteractions: {
    interactingDrug: string;
    severity: 'mild' | 'moderate' | 'severe' | 'life_threatening';
    effect: string;
    management: string;
  }[];
  adverseEffects: string[];
  administrationPearls: string;
  emergencyProtocol?: string;
}
