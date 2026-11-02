import { 
  AppliedAction, 
  CaseEvaluationResult, 
  CaseCategory, 
  ClinicalCase, 
  IdentityProfile, 
  PatientOutcome 
} from '../types/clinical';

export const LEVEL_TIERS = [
  { level: 1, title: 'Pharmacy Intern', minXp: 0 },
  { level: 2, title: 'Junior Community Pharmacist', minXp: 300 },
  { level: 3, title: 'Triage & First Aid Specialist', minXp: 800 },
  { level: 4, title: 'Senior Trauma Care Pharmacist', minXp: 1600 },
  { level: 5, title: 'Acute Emergency Specialist', minXp: 2800 },
  { level: 6, title: 'Master Clinical Fellow', minXp: 4500 },
  { level: 7, title: 'Director of Emergency Pharmacy', minXp: 7000 }
];

export function calculateLevelFromXp(xp: number): { level: number; title: string; xpToNextLevel: number } {
  let currentTier = LEVEL_TIERS[0];
  let nextTier = LEVEL_TIERS[1];

  for (let i = 0; i < LEVEL_TIERS.length; i++) {
    if (xp >= LEVEL_TIERS[i].minXp) {
      currentTier = LEVEL_TIERS[i];
      nextTier = LEVEL_TIERS[i + 1] || { level: currentTier.level, title: currentTier.title, minXp: currentTier.minXp + 2000 };
    }
  }

  const xpToNextLevel = Math.max(0, nextTier.minXp - xp);
  return {
    level: currentTier.level,
    title: currentTier.title,
    xpToNextLevel
  };
}

export function evaluateCasePerformance(
  clinicalCase: ClinicalCase,
  actions: AppliedAction[],
  timeTakenSeconds: number,
  escalatedToEMS: boolean,
  currentProfile?: IdentityProfile
): CaseEvaluationResult {
  const { rubric, category, difficulty, timeLimitSeconds } = clinicalCase;
  const criticalSafetyErrors: string[] = [];
  const sequencingErrors: string[] = [];
  const unnecessaryInterventions: string[] = [];

  const appliedSupplyIds = new Set<string>();
  for (const action of actions) {
    appliedSupplyIds.add(action.supplyId);
    if (action.isHarmful || action.isContraindicated) {
      const rationale = action.clinicalFeedback || 'Clinically hazardous or contraindicated intervention.';
      if (!criticalSafetyErrors.includes(rationale)) {
        criticalSafetyErrors.push(rationale);
      }
    }
    // Check prohibited supplies in case rubric
    if (rubric.prohibitedSupplyIds.includes(action.supplyId)) {
      const err = `Applied prohibited supply: ${action.supplyName}. Contraindicated in this clinical scenario.`;
      if (!criticalSafetyErrors.includes(err)) {
        criticalSafetyErrors.push(err);
      }
    }
  }

  // Check omitted essential supplies
  const omittedEssentialActions: string[] = [];
  for (const reqId of rubric.requiredSupplyIds) {
    if (reqId === 'emergency_ambulance') {
      if (!appliedSupplyIds.has('emergency_ambulance') && !escalatedToEMS) {
        omittedEssentialActions.push('Activate EMS / Emergency Ambulance dispatch');
      }
    } else if (!appliedSupplyIds.has(reqId)) {
      omittedEssentialActions.push(reqId);
    }
  }

  // Mandatory EMS escalation check
  if (rubric.mustEscalateToEMS && !escalatedToEMS && !appliedSupplyIds.has('emergency_ambulance')) {
    criticalSafetyErrors.push('Critical Omission: Failed to escalate life-threatening clinical presentation to Emergency Medical Services (EMS).');
  }

  // Clinical Safety Rules & Specific Invariants:
  // 1. Poisoning / Hydrocarbons: NEVER induce vomiting
  if (clinicalCase.injuryType === 'poisoning' || clinicalCase.category === 'toxicology') {
    if (appliedSupplyIds.has('induce_vomiting')) {
      criticalSafetyErrors.push('CRITICAL SAFETY FAILURE: Inducing vomiting in hydrocarbon/kerosene or corrosive ingestion causes fatal pulmonary chemical pneumonitis.');
    }
  }

  // 2. Epistaxis: NEVER tilt head back
  if (clinicalCase.injuryType === 'epistaxis') {
    if (appliedSupplyIds.has('tilt_head_back')) {
      criticalSafetyErrors.push('CRITICAL ERROR: Tilting head backwards during nosebleed causes blood swallowing, nausea, and aspiration airway obstruction.');
    }
  }

  // 3. Snakebite: NEVER apply tourniquet or incise
  if (clinicalCase.injuryType === 'bite_sting' || clinicalCase.category === 'bites_stings') {
    if (appliedSupplyIds.has('snakebite_tourniquet')) {
      criticalSafetyErrors.push('CRITICAL SAFETY HAZARD: Tourniquets in snake envenomation cause localized gangrene, ischemic necrosis, and sudden systemic bolus upon release.');
    }
  }

  // 4. Knocked-out Tooth: NEVER scrub root with brush
  if (appliedSupplyIds.has('scrub_knocked_tooth')) {
    criticalSafetyErrors.push('CRITICAL ERROR: Scrubbing the root of an avulsed tooth destroys viable periodontal ligament progenitor cells, preventing replantation.');
  }

  // 5. Burns: NEVER apply ice or butter
  if (clinicalCase.injuryType === 'burn_thermal' || clinicalCase.injuryType === 'burn_chemical' || clinicalCase.category === 'burns_environmental') {
    if (appliedSupplyIds.has('ice_pack')) {
      criticalSafetyErrors.push('Critical Error: Applied ice directly to thermal burn, causing severe vasoconstrictive ischemia and frostbite necrosis.');
    }
    if (appliedSupplyIds.has('butter_ointment')) {
      criticalSafetyErrors.push('Critical Error: Applied household butter/paste, trapping latent heat and introducing bacterial contamination.');
    }
  }

  // 6. Seizure: Check for mouth objects or limb restraint
  if (clinicalCase.injuryType === 'seizure') {
    if (appliedSupplyIds.has('mouth_gag_spoon')) {
      criticalSafetyErrors.push('Critical Hazard: Attempted to insert an object into seizing patient\'s mouth, risking tooth fracture and fatal airway obstruction.');
    }
    if (appliedSupplyIds.has('limb_restraint')) {
      criticalSafetyErrors.push('Critical Hazard: Forcibly restrained convulsive limbs, risking muscle rupture and bone dislocation.');
    }
  }

  // 7. Anaphylaxis: Must give Epinephrine, not oral antihistamine alone
  if (clinicalCase.injuryType === 'anaphylaxis') {
    const hasEpi = appliedSupplyIds.has('epinephrine_adult') || appliedSupplyIds.has('epinephrine_pediatric');
    const hasCetirizineOnly = appliedSupplyIds.has('oral_cetirizine') && !hasEpi;
    if (hasCetirizineOnly) {
      criticalSafetyErrors.push('Critical Safety Failure: Administered oral antihistamine alone for impending airway anaphylactic shock without first-line IM Epinephrine.');
    }
    if (!hasEpi) {
      criticalSafetyErrors.push('Critical Omission: First-line Intramuscular Epinephrine was not administered.');
    }
  }

  // 8. Asthma: Avoid flat position or NSAIDs
  if (clinicalCase.injuryType === 'asthma') {
    if (appliedSupplyIds.has('recumbent_legs_elevated')) {
      criticalSafetyErrors.push('Critical Error: Placed dyspneic asthmatic flat, compressing respiratory mechanics.');
    }
    if (appliedSupplyIds.has('oral_ibuprofen')) {
      criticalSafetyErrors.push('Critical Hazard: Administered oral NSAID (Ibuprofen) to a severe reactive asthmatic, triggering catastrophic bronchospasm.');
    }
  }

  // Sequencing Checks
  const actionOrder = actions.map(a => a.supplyId);
  const glovesIndex = actionOrder.indexOf('gloves');
  const salineIndex = actionOrder.indexOf('sterile_saline');
  const dressingIndex = Math.max(actionOrder.indexOf('elastic_bandage'), actionOrder.indexOf('adhesive_plaster'), actionOrder.indexOf('burn_cling_film'));

  if (glovesIndex > 1 && glovesIndex > salineIndex && salineIndex !== -1) {
    sequencingErrors.push('Infection control error: Contacted wound bed before donning examination gloves.');
  }
  if (salineIndex !== -1 && dressingIndex !== -1 && salineIndex > dressingIndex) {
    sequencingErrors.push('Sequencing error: Cleansed wound after placing dressing.');
  }

  // Score Calculation
  const totalRequired = rubric.requiredSupplyIds.length;
  const fulfilledRequired = rubric.requiredSupplyIds.filter(reqId => {
    if (reqId === 'emergency_ambulance') {
      return appliedSupplyIds.has('emergency_ambulance') || escalatedToEMS;
    }
    return appliedSupplyIds.has(reqId);
  }).length;

  let scoreRatio = totalRequired > 0 ? (fulfilledRequired / totalRequired) : 1;
  const sequencePenalty = Math.min(0.20, sequencingErrors.length * 0.10);
  scoreRatio = Math.max(0, scoreRatio - sequencePenalty);

  let score = Math.round(scoreRatio * 100);

  if (timeLimitSeconds && timeTakenSeconds > timeLimitSeconds) {
    score = Math.max(0, score - 15);
  }

  // CRITICAL SAFETY OVERRIDE
  const isCriticalOverride = criticalSafetyErrors.length > 0;
  if (isCriticalOverride) {
    score = Math.min(45, score);
  }

  // Performance Band
  let performanceBand: CaseEvaluationResult['performanceBand'];
  if (score < 50 || isCriticalOverride) {
    performanceBand = 'critical_failure';
  } else if (score < 80) {
    performanceBand = 'partial_success';
  } else if (score < 100) {
    performanceBand = 'successful_with_deficiencies';
  } else {
    performanceBand = 'flawless';
  }

  // Patient Outcome
  let patientOutcome: PatientOutcome;
  let patientOutcomeDescription: string;

  if (performanceBand === 'critical_failure') {
    patientOutcome = 'treatment_failure';
    patientOutcomeDescription = `Simulated clinical deterioration: ${criticalSafetyErrors[0] || 'Essential immediate interventions were omitted, resulting in adverse patient outcome.'}`;
  } else if (performanceBand === 'partial_success') {
    patientOutcome = 'partial_improvement';
    patientOutcomeDescription = 'Patient stabilized partially with persistent symptoms. Important clinical steps were missed, requiring extended observation and corrective management.';
  } else if (performanceBand === 'successful_with_deficiencies') {
    patientOutcome = rubric.mustEscalateToEMS ? 'emergency_escalation' : 'appropriate_improvement';
    patientOutcomeDescription = 'Patient showed good clinical improvement and stabilization, with minor technical omissions identified during debriefing.';
  } else {
    patientOutcome = rubric.mustEscalateToEMS ? 'emergency_escalation' : 'full_recovery';
    patientOutcomeDescription = 'Flawless clinical management: All protocols followed in correct sequence without safety infractions. Excellent patient recovery and stabilization.';
  }

  // XP Calculation
  let baseXp = 100;
  if (difficulty === 'intermediate') baseXp = 180;
  if (difficulty === 'advanced') baseXp = 260;
  if (difficulty === 'expert') baseXp = 350;

  let xpEarned = 0;
  if (performanceBand === 'flawless') {
    xpEarned = baseXp + 50;
  } else if (performanceBand === 'successful_with_deficiencies') {
    xpEarned = Math.round(baseXp * 0.85);
  } else if (performanceBand === 'partial_success') {
    xpEarned = Math.round(baseXp * 0.50);
  } else {
    xpEarned = 25;
  }

  // Achievement Badges
  const unlockedBadges: string[] = [];
  const existingBadges = new Set(currentProfile?.unlockedBadges || []);

  if (appliedSupplyIds.has('gloves') && !sequencingErrors.some(e => e.includes('Infection control')) && !existingBadges.has('badge_clean_hands')) {
    unlockedBadges.push('badge_clean_hands');
  }

  if (category === 'trauma' && performanceBand === 'flawless' && !existingBadges.has('badge_wound_specialist')) {
    unlockedBadges.push('badge_wound_specialist');
  }

  if (timeLimitSeconds && timeTakenSeconds <= timeLimitSeconds && score >= 80 && !existingBadges.has('badge_rapid_responder')) {
    unlockedBadges.push('badge_rapid_responder');
  }

  if (category === 'pharma_emergency' && score >= 80 && !existingBadges.has('badge_interaction_hunter')) {
    unlockedBadges.push('badge_interaction_hunter');
  }

  if (clinicalCase.injuryType === 'cardiac_arrest' && appliedSupplyIds.has('cpr_compressions') && !existingBadges.has('badge_cardiac_lifesaver')) {
    unlockedBadges.push('badge_cardiac_lifesaver');
  }

  if (appliedSupplyIds.has('arterial_tourniquet') && !isCriticalOverride && !existingBadges.has('badge_tourniquet_master')) {
    unlockedBadges.push('badge_tourniquet_master');
  }

  if (appliedSupplyIds.has('tooth_milk_container') && !appliedSupplyIds.has('scrub_knocked_tooth') && !existingBadges.has('badge_tooth_rescuer')) {
    unlockedBadges.push('badge_tooth_rescuer');
  }

  if (criticalSafetyErrors.length === 0 && !existingBadges.has('badge_zero_critical_errors')) {
    unlockedBadges.push('badge_zero_critical_errors');
  }

  if (omittedEssentialActions.length === 0 && !existingBadges.has('badge_no_shortcuts')) {
    unlockedBadges.push('badge_no_shortcuts');
  }

  if (score === 100 && criticalSafetyErrors.length === 0 && !existingBadges.has('badge_perfect_run')) {
    unlockedBadges.push('badge_perfect_run');
  }

  const categoryMasteryDelta = score >= 80 ? 5 : (score >= 50 ? 2 : 0);

  return {
    score,
    performanceBand,
    patientOutcome,
    patientOutcomeDescription,
    criticalSafetyErrors,
    isCriticalOverride,
    actionsPerformed: actions,
    omittedEssentialActions,
    unnecessaryInterventions,
    sequencingErrors,
    xpEarned,
    timeTakenSeconds,
    unlockedBadges,
    categoryMasteryDelta
  };
}

export function updateProfileWithResult(
  profile: IdentityProfile,
  result: CaseEvaluationResult,
  caseId: string,
  caseTitle: string,
  category: CaseCategory
): IdentityProfile {
  const newTotalXp = profile.currentXp + result.xpEarned;
  const levelInfo = calculateLevelFromXp(newTotalXp);

  const newAttempted = profile.casesAttempted + 1;
  const newCompleted = profile.casesCompleted + 1;
  const isSuccess = result.score >= 70 && !result.isCriticalOverride;
  const newSuccessful = isSuccess ? profile.casesSuccessful + 1 : profile.casesSuccessful;
  const newCriticalErrors = profile.totalCriticalErrors + result.criticalSafetyErrors.length;

  const previousTotalScore = profile.averageScore * profile.casesCompleted;
  const newAverageScore = Math.round((previousTotalScore + result.score) / newCompleted);

  const currentCategoryScore = profile.categoryMastery[category] || 0;
  const newCategoryScore = Math.min(100, Math.max(0, currentCategoryScore + result.categoryMasteryDelta));

  const updatedBadges = Array.from(new Set([...profile.unlockedBadges, ...result.unlockedBadges]));

  const historyItem = {
    id: `hist-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    caseId,
    caseTitle,
    category,
    score: result.score,
    patientOutcome: result.patientOutcome,
    xpEarned: result.xpEarned,
    completedAt: new Date().toISOString(),
    criticalErrors: result.criticalSafetyErrors.length
  };

  return {
    ...profile,
    currentXp: newTotalXp,
    level: levelInfo.level,
    rankTitle: levelInfo.title,
    xpToNextLevel: levelInfo.xpToNextLevel,
    casesAttempted: newAttempted,
    casesCompleted: newCompleted,
    casesSuccessful: newSuccessful,
    totalCriticalErrors: newCriticalErrors,
    averageScore: newAverageScore,
    categoryMastery: {
      ...profile.categoryMastery,
      [category]: newCategoryScore
    },
    unlockedBadges: updatedBadges,
    history: [historyItem, ...profile.history.slice(0, 49)]
  };
}

export const INITIAL_IDP_PROFILE: IdentityProfile = {
  username: 'Clinical Pharmacist',
  level: 1,
  currentXp: 120,
  xpToNextLevel: 180,
  rankTitle: 'Pharmacy Intern',
  casesAttempted: 1,
  casesCompleted: 1,
  casesSuccessful: 1,
  totalCriticalErrors: 0,
  averageScore: 92,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  categoryMastery: {
    trauma: 25,
    acute_emergency: 15,
    pharma_emergency: 10,
    musculoskeletal: 20,
    burns_environmental: 15,
    cardiac_circulation: 10,
    metabolic: 10,
    toxicology: 10,
    eye_ear_facial: 10,
    bites_stings: 10,
    pediatric: 15
  },
  unlockedBadges: ['badge_clean_hands'],
  history: [
    {
      id: 'hist-init-01',
      caseId: 'topic-wound-laceration-var1',
      caseTitle: 'Acute Lacerations and Hemorrhage Control: Kwame Mensah',
      category: 'trauma',
      score: 92,
      patientOutcome: 'full_recovery',
      xpEarned: 120,
      completedAt: new Date(Date.now() - 86400000).toISOString(),
      criticalErrors: 0
    }
  ]
};

export const BADGE_DEFINITIONS = [
  {
    id: 'badge_clean_hands',
    title: 'Clean Hands',
    description: 'Donned PPE gloves prior to any wound blood contact with zero infection control breaches.',
    iconName: 'Shield',
    category: 'trauma'
  },
  {
    id: 'badge_wound_specialist',
    title: 'Wound Specialist',
    description: 'Achieved flawless 100% score on a trauma laceration or burn challenge.',
    iconName: 'Award',
    category: 'trauma'
  },
  {
    id: 'badge_rapid_responder',
    title: 'Rapid Responder',
    description: 'Diagnosed and safely stabilized a timed acute emergency before the countdown timer expired.',
    iconName: 'Zap',
    category: 'emergency'
  },
  {
    id: 'badge_cardiac_lifesaver',
    title: 'Cardiac Lifesaver',
    description: 'Delivered high-quality CPR compressions during a sudden cardiac arrest collapse.',
    iconName: 'HeartCrack',
    category: 'emergency'
  },
  {
    id: 'badge_tourniquet_master',
    title: 'Tourniquet Master',
    description: 'Rapidly applied a life-saving windlass arterial tourniquet in catastrophic hemorrhage.',
    iconName: 'CircleDot',
    category: 'trauma'
  },
  {
    id: 'badge_tooth_rescuer',
    title: 'Tooth Rescuer',
    description: 'Safely preserved an avulsed permanent tooth in cold milk without root damage.',
    iconName: 'Milk',
    category: 'general'
  },
  {
    id: 'badge_interaction_hunter',
    title: 'Interaction Hunter',
    description: 'Correctly intercepted a life-threatening drug-drug interaction and prevented fatal toxicity.',
    iconName: 'Search',
    category: 'pharma'
  },
  {
    id: 'badge_zero_critical_errors',
    title: 'Zero Critical Errors',
    description: 'Completed a clinical challenge with absolutely zero safety or procedural hazards.',
    iconName: 'CheckCircle',
    category: 'general'
  },
  {
    id: 'badge_no_shortcuts',
    title: 'No Shortcuts',
    description: 'Executed every mandatory clinical guideline step without omitting essential care.',
    iconName: 'ListChecks',
    category: 'general'
  },
  {
    id: 'badge_perfect_run',
    title: 'Perfect Run',
    description: 'Attained a 100% flawless score under full rubric evaluation.',
    iconName: 'Trophy',
    category: 'general'
  }
];
