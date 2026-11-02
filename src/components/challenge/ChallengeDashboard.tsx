import React, { useState } from 'react';
import { 
  CaseCategory, 
  ClinicalCase, 
  DifficultyLevel, 
  IdentityProfile 
} from '../../types/clinical';
import { 
  CHALLENGE_TOPICS, 
  buildCaseFromTopicAndVariation,
  getDailyChallengeCase, 
  getWeeklyChallengeCase,
  getRandomChallengeCase
} from '../../data/caseLibrary';
import { 
  Play, 
  Clock, 
  Sparkles, 
  Zap, 
  Trophy, 
  Activity, 
  Flame, 
  ArrowRight, 
  Calendar, 
  RotateCcw, 
  Users, 
  Dices, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Check, 
  ShieldAlert,
  FlameKindling,
  HeartPulse,
  Brain,
  Syringe,
  Bug,
  Baby,
  SmilePlus,
  Stethoscope,
  Filter
} from 'lucide-react';

interface ChallengeDashboardProps {
  profile: IdentityProfile;
  onStartCase: (c: ClinicalCase) => void;
  hasUnfinishedSession?: boolean;
  onResumeSession?: () => void;
  onGenerateAiCase: (category: CaseCategory, difficulty: DifficultyLevel) => void;
  isGeneratingAi?: boolean;
}

// Emergency domain categorization mapping for clean fold accordions
interface DomainGroup {
  id: string;
  category: CaseCategory;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const DOMAIN_GROUPS: DomainGroup[] = [
  {
    id: 'trauma',
    category: 'trauma',
    title: '1. Wounds, Cuts & Bleeding',
    description: 'First aid, wound assessment, puncture wounds, and arterial hemorrhage control',
    icon: Stethoscope,
    color: 'from-amber-600/30 to-amber-950/40 border-amber-500/40 text-amber-300'
  },
  {
    id: 'musculoskeletal',
    category: 'musculoskeletal',
    title: '2. Musculoskeletal Injuries',
    description: 'Bones, joints, sprains, open/closed fractures, and padded immobilization splints',
    icon: Activity,
    color: 'from-blue-600/30 to-blue-950/40 border-blue-500/40 text-blue-300'
  },
  {
    id: 'burns_environmental',
    category: 'burns_environmental',
    title: '3. Burns & Environmental Injuries',
    description: 'Thermal scalds, chemical splashes, electrical burns, and heat exhaustion',
    icon: FlameKindling,
    color: 'from-orange-600/30 to-orange-950/40 border-orange-500/40 text-orange-300'
  },
  {
    id: 'acute_emergency',
    category: 'acute_emergency',
    title: '4. Breathing & Airway Emergencies',
    description: 'Airway obstruction, foreign body choking, acute asthma attack, and bronchodilators',
    icon: Layers,
    color: 'from-cyan-600/30 to-cyan-950/40 border-cyan-500/40 text-cyan-300'
  },
  {
    id: 'cardiac_circulation',
    category: 'cardiac_circulation',
    title: '5. Cardiac & Circulation Emergencies',
    description: 'Cardiac arrest, myocardial infarction, sudden syncope, and hypovolemic shock',
    icon: HeartPulse,
    color: 'from-rose-600/30 to-rose-950/40 border-rose-500/40 text-rose-300'
  },
  {
    id: 'metabolic',
    category: 'metabolic',
    title: '6. Metabolic & Acute Medical',
    description: 'Hypoglycemia, severe hyperglycemia, febrile convulsions, and generalized seizures',
    icon: Brain,
    color: 'from-violet-600/30 to-violet-950/40 border-violet-500/40 text-violet-300'
  },
  {
    id: 'adverse_drug_reactions',
    category: 'acute_emergency',
    title: '7. Adverse Drug Reactions & Anaphylaxis',
    description: 'Medication allergies, urticaria, facial angioedema, and stat epinephrine dosing',
    icon: Syringe,
    color: 'from-fuchsia-600/30 to-fuchsia-950/40 border-fuchsia-500/40 text-fuchsia-300'
  },
  {
    id: 'toxicology',
    category: 'toxicology',
    title: '8. Poisoning & Toxic Exposures',
    description: 'Kerosene ingestion, caustic bleaching liquids, organophosphates, and charcoal',
    icon: ShieldAlert,
    color: 'from-emerald-600/30 to-emerald-950/40 border-emerald-500/40 text-emerald-300'
  },
  {
    id: 'eye_ear_facial',
    category: 'eye_ear_facial',
    title: '9. Eye, Ear, Dental & Facial Trauma',
    description: 'Chemical eye burns, epistaxis nosebleeds, dental avulsion, and facial lacerations',
    icon: SmilePlus,
    color: 'from-teal-600/30 to-teal-950/40 border-teal-500/40 text-teal-300'
  },
  {
    id: 'bites_stings',
    category: 'bites_stings',
    title: '10. Animal Bites & Venomous Injuries',
    description: 'Venomous snakebites, scorpion stings, canine bite wounds, and rabies prophylaxis',
    icon: Bug,
    color: 'from-purple-600/30 to-purple-950/40 border-purple-500/40 text-purple-300'
  },
  {
    id: 'pediatric',
    category: 'pediatric',
    title: '11. Pediatric Emergencies',
    description: 'Infant foreign body airway obstruction, febrile convulsions, and weight-based care',
    icon: Baby,
    color: 'from-pink-600/30 to-pink-950/40 border-pink-500/40 text-pink-300'
  }
];

export const ChallengeDashboard: React.FC<ChallengeDashboardProps> = ({
  profile,
  onStartCase,
  hasUnfinishedSession,
  onResumeSession,
  onGenerateAiCase,
  isGeneratingAi = false
}) => {
  // Top Level Dashboard Tabs
  const [dashboardTab, setDashboardTab] = useState<'matrix_folds' | 'featured' | 'archive'>('matrix_folds');

  // Filters
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [hideCompleted, setHideCompleted] = useState<boolean>(true);

  // Active variation selected per topic
  const [activeVariationMap, setActiveVariationMap] = useState<Record<string, number>>({});

  // Folds (Accordions) state: record of domainId -> isOpen boolean
  // Initially expand the first 2 domains, collapse others for a clean compact screen
  const [openFolds, setOpenFolds] = useState<Record<string, boolean>>({
    trauma: true,
    musculoskeletal: true,
    burns_environmental: false,
    acute_emergency: false,
    cardiac_circulation: false,
    metabolic: false,
    adverse_drug_reactions: false,
    toxicology: false,
    eye_ear_facial: false,
    bites_stings: false,
    pediatric: false
  });

  const dailyCase = getDailyChallengeCase();
  const weeklyCase = getWeeklyChallengeCase();

  // Helper to check if a specific variation is completed
  const isVariationCompleted = (topicId: string, varIndex: number) => {
    return profile.history.some(h => 
      h.caseId === `${topicId}-var${varIndex + 1}` ||
      (varIndex === 0 && h.caseId === topicId)
    );
  };

  // Helper to check if a topic has any completed runs
  const isTopicCompleted = (topicId: string) => {
    return profile.history.some(h => h.caseId.includes(topicId));
  };

  const completedTopicsCount = CHALLENGE_TOPICS.filter(t => isTopicCompleted(t.topicId)).length;

  const successRate = profile.casesCompleted > 0 
    ? Math.round((profile.casesSuccessful / profile.casesCompleted) * 100) 
    : 100;

  const toggleFold = (domainId: string) => {
    setOpenFolds(prev => ({
      ...prev,
      [domainId]: !prev[domainId]
    }));
  };

  const handleExpandAllFolds = (expand: boolean) => {
    const updated: Record<string, boolean> = {};
    DOMAIN_GROUPS.forEach(g => {
      updated[g.id] = expand;
    });
    setOpenFolds(updated);
  };

  const handleSelectVariation = (topicId: string, varIndex: number) => {
    setActiveVariationMap(prev => ({ ...prev, [topicId]: varIndex }));
  };

  const handleLaunchTopic = (topic: typeof CHALLENGE_TOPICS[0]) => {
    const varIndex = activeVariationMap[topic.topicId] !== undefined ? activeVariationMap[topic.topicId] : 0;
    const clinicalCase = buildCaseFromTopicAndVariation(topic, varIndex);
    onStartCase(clinicalCase);
  };

  const handleLaunchRandomVariation = (topic: typeof CHALLENGE_TOPICS[0]) => {
    const randomVar = Math.floor(Math.random() * 5);
    setActiveVariationMap(prev => ({ ...prev, [topic.topicId]: randomVar }));
    const clinicalCase = buildCaseFromTopicAndVariation(topic, randomVar);
    onStartCase(clinicalCase);
  };

  const handleLaunchRandomInDomain = (domainGroup: DomainGroup) => {
    const matching = CHALLENGE_TOPICS.filter(t => t.category === domainGroup.category);
    if (matching.length === 0) return;
    const pickedTopic = matching[Math.floor(Math.random() * matching.length)];
    const randomVar = Math.floor(Math.random() * 5);
    onStartCase(buildCaseFromTopicAndVariation(pickedTopic, randomVar));
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-6 pb-12">
      {/* Hero Progression Banner (Bounded, zero overflow) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950/80 border border-slate-700/80 p-4 sm:p-7 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-3 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0">
                <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                Level {profile.level} • {profile.rankTitle}
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {profile.streakDays} Day Streak
              </span>
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0">
                <Layers className="w-3.5 h-3.5" />
                11 Domains • 5 Variations Each
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Pharmacy Emergency & Trauma Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Step into active 2D simulation. Don PPE, examine isolated anatomical injuries, halt arterial spurts, apply conforming bandages and padded splints, and resolve acute medical crises under clinical Standard Treatment Guidelines.
            </p>

            {/* XP Progress Bar */}
            <div className="max-w-md space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-400">Level Progress</span>
                <span className="text-white font-mono font-bold">{profile.currentXp} XP <span className="text-slate-500">({profile.xpToNextLevel} to Lvl {profile.level + 1})</span></span>
              </div>
              <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${Math.min(100, (profile.currentXp % 1000) / 10)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Launcher Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            {hasUnfinishedSession && (
              <button
                onClick={onResumeSession}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-xl transition flex items-center justify-center gap-2 cursor-pointer animate-pulse"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Resume Active Case</span>
              </button>
            )}

            <button
              onClick={() => onStartCase(buildCaseFromTopicAndVariation(CHALLENGE_TOPICS[0], 0))}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xl shadow-cyan-950/50 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Quick Challenge</span>
            </button>

            <button
              onClick={() => onStartCase(getRandomChallengeCase())}
              className="bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs px-3.5 py-2 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Dices className="w-3.5 h-3.5 text-amber-400" />
              <span>Surprise Random Challenge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-black text-white font-mono">{profile.casesCompleted}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Cases Completed</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{successRate}%</div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Success Rate</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">{CHALLENGE_TOPICS.length * 5}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Total Variations</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">11</div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Clinical Domains</div>
        </div>
      </div>

      {/* DASHBOARD TABS BAR */}
      <div className="w-full max-w-full flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setDashboardTab('matrix_folds')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              dashboardTab === 'matrix_folds'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Emergency Domains & Folds</span>
          </button>

          <button
            onClick={() => setDashboardTab('featured')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              dashboardTab === 'featured'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Daily & Featured Cases</span>
          </button>

          <button
            onClick={() => setDashboardTab('archive')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              dashboardTab === 'archive'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Completed Archive ({completedTopicsCount})</span>
          </button>
        </div>

        {/* Global Fold Controls (Only on Folds Tab) */}
        {dashboardTab === 'matrix_folds' && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => handleExpandAllFolds(true)}
              className="text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 text-[11px] font-semibold transition cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => handleExpandAllFolds(false)}
              className="text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 text-[11px] font-semibold transition cursor-pointer"
            >
              Collapse All
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setHideCompleted(!hideCompleted)}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                hideCompleted
                  ? 'bg-slate-900 border-slate-700 text-slate-300'
                  : 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
              }`}
            >
              {hideCompleted ? <EyeOff className="w-3 h-3 text-slate-400" /> : <Eye className="w-3 h-3 text-emerald-400" />}
              <span>{hideCompleted ? `Hide Completed (${completedTopicsCount})` : 'Show All'}</span>
            </button>
          </div>
        )}
      </div>

      {/* TAB CONTENT 1: EMERGENCY DOMAIN FOLDS (ACCORDIONS) */}
      {dashboardTab === 'matrix_folds' && (
        <div className="space-y-4">
          {/* Difficulty & Category Filter Bar (Wrapping, zero overflow) */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Tier:
              </span>
              {[
                { id: 'all', label: 'All Tiers' },
                { id: 'beginner', label: 'Beginner' },
                { id: 'intermediate', label: 'Intermediate' },
                { id: 'advanced', label: 'Advanced' },
                { id: 'expert', label: 'Expert' }
              ].map(diff => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                    selectedDifficulty === diff.id
                      ? 'bg-slate-700 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* RENDER THE 11 DOMAIN FOLDS */}
          <div className="space-y-3">
            {DOMAIN_GROUPS.map((domain) => {
              const domainTopics = CHALLENGE_TOPICS.filter(t => t.category === domain.category);
              if (domainTopics.length === 0) return null;

              // Filter out completed topics if hideCompleted is active
              const visibleTopics = domainTopics.filter(t => {
                if (selectedDifficulty !== 'all' && t.defaultDifficulty !== selectedDifficulty) return false;
                if (hideCompleted && isTopicCompleted(t.topicId)) return false;
                return true;
              });

              const completedInDomain = domainTopics.filter(t => isTopicCompleted(t.topicId)).length;
              const isAllDomainCompleted = completedInDomain === domainTopics.length;
              const isOpen = Boolean(openFolds[domain.id]);

              return (
                <div
                  key={domain.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all"
                >
                  {/* FOLD HEADER (Click to expand/collapse) */}
                  <div
                    onClick={() => toggleFold(domain.id)}
                    className="p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2.5 rounded-xl border ${domain.color} shrink-0`}>
                        <domain.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                            {domain.title}
                          </h3>
                          {isAllDomainCompleted ? (
                            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Mastered ({completedInDomain}/{domainTopics.length})
                            </span>
                          ) : (
                            <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-700">
                              {visibleTopics.length} available • {completedInDomain}/{domainTopics.length} done
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {domain.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunchRandomInDomain(domain);
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Dices className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="hidden sm:inline">Surprise Domain Case</span>
                      </button>

                      <div className="p-1 rounded-lg bg-slate-800/60 text-slate-400">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* FOLD BODY (Cases Grid) */}
                  {isOpen && (
                    <div className="p-3 sm:p-4 pt-0 border-t border-slate-800/80">
                      {visibleTopics.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-400 space-y-2">
                          <p>All challenges in this domain have been completed and hidden from the active list.</p>
                          <button
                            onClick={() => setHideCompleted(false)}
                            className="text-cyan-400 hover:underline font-semibold"
                          >
                            Click to show completed challenges
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
                          {visibleTopics.map(topic => {
                            const currentVarIndex = activeVariationMap[topic.topicId] !== undefined ? activeVariationMap[topic.topicId] : 0;
                            const currentVar = topic.variations[currentVarIndex] || topic.variations[0];
                            const hasPlayed = isTopicCompleted(topic.topicId);
                            const currentVarDone = isVariationCompleted(topic.topicId, currentVarIndex);

                            return (
                              <div
                                key={topic.topicId}
                                className="bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition group space-y-3"
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between gap-1 text-[10px]">
                                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-semibold capitalize">
                                      {topic.defaultDifficulty}
                                    </span>
                                    {hasPlayed && (
                                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Done
                                      </span>
                                    )}
                                  </div>

                                  <div>
                                    <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition line-clamp-1">
                                      {topic.topicTitle}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold mt-0.5">
                                      <Users className="w-3 h-3 shrink-0" />
                                      <span className="truncate">{currentVar.patientName} ({currentVar.age}y, {currentVar.gender})</span>
                                    </div>
                                  </div>

                                  <p className="text-[11px] text-slate-300 line-clamp-2 italic font-serif leading-tight">
                                    "{currentVar.patientStatement}"
                                  </p>

                                  {/* 5 Variation Picker Pills */}
                                  <div className="pt-1">
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                                      <span>Variation (1 of 5):</span>
                                      <button
                                        type="button"
                                        onClick={() => handleLaunchRandomVariation(topic)}
                                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-semibold"
                                      >
                                        <Dices className="w-3 h-3" />
                                        <span>Random</span>
                                      </button>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      {topic.variations.map((v, idx) => {
                                        const varDone = isVariationCompleted(topic.topicId, idx);
                                        return (
                                          <button
                                            key={v.variationIndex}
                                            type="button"
                                            onClick={() => handleSelectVariation(topic.topicId, idx)}
                                            className={`flex-1 py-1 rounded text-[11px] font-bold transition cursor-pointer flex items-center justify-center gap-0.5 ${
                                              currentVarIndex === idx
                                                ? 'bg-cyan-600 text-white shadow-sm'
                                                : varDone
                                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                                                : 'bg-slate-800 text-slate-400 hover:text-white'
                                            }`}
                                          >
                                            <span>V{idx + 1}</span>
                                            {varDone && <Check className="w-2.5 h-2.5 text-emerald-400" />}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                                  <div className="text-[11px] text-slate-400">
                                    {topic.timeLimitSeconds ? (
                                      <span className="flex items-center gap-1 text-red-400 font-semibold">
                                        <Clock className="w-3 h-3" /> {topic.timeLimitSeconds}s Timed
                                      </span>
                                    ) : (
                                      <span>Untimed</span>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => handleLaunchTopic(topic)}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer shadow-sm"
                                  >
                                    <span>{currentVarDone ? 'Replay' : 'Launch'}</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: FEATURED & QUICK CASES */}
      {dashboardTab === 'featured' && (
        <div className="space-y-5 animate-fade-in">
          {/* Daily & Weekly Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Daily Challenge */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Today's Random Daily Challenge
                  </span>
                  <span className="text-amber-400 font-bold text-xs flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> +200 XP
                  </span>
                </div>
                <h2 className="font-bold text-white text-base">{dailyCase.title}</h2>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{dailyCase.presentingComplaint}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="capitalize text-slate-300 font-medium">{dailyCase.difficulty}</span>
                  {dailyCase.timeLimitSeconds && (
                    <span className="flex items-center gap-1 text-red-400 font-semibold">
                      <Clock className="w-3 h-3" /> {dailyCase.timeLimitSeconds}s
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onStartCase(dailyCase)}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-950/40"
                >
                  <span>Play Today's Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Weekly Challenge */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/90 border border-purple-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> Weekly Master Scenario
                  </span>
                  <span className="text-purple-400 font-bold text-xs flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> +350 XP
                  </span>
                </div>
                <h2 className="font-bold text-white text-base">{weeklyCase.title}</h2>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{weeklyCase.presentingComplaint}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="capitalize text-slate-300 font-medium">{weeklyCase.difficulty}</span>
                  {weeklyCase.timeLimitSeconds && (
                    <span className="flex items-center gap-1 text-red-400 font-semibold">
                      <Clock className="w-3 h-3" /> {weeklyCase.timeLimitSeconds}s Timed
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onStartCase(weeklyCase)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-950/40"
                >
                  <span>Play Weekly Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Case Synthesizer Box */}
          <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-indigo-400 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>AI Clinical Simulation Engine</span>
              </div>
              <h3 className="font-bold text-white text-base">Generate Novel Dynamic Trauma Case</h3>
              <p className="text-xs text-slate-400 max-w-lg">
                Create an on-demand bespoke case with randomized patient vitals, complex poly-trauma, and unique contraindications.
              </p>
            </div>

            <button
              onClick={() => onGenerateAiCase('trauma', 'intermediate')}
              disabled={isGeneratingAi}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-lg shadow-indigo-950/50 cursor-pointer shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGeneratingAi ? 'Synthesizing...' : 'Generate AI Case'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: COMPLETED ARCHIVE */}
      {dashboardTab === 'archive' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Completed Clinical Challenges</h3>
              <p className="text-xs text-slate-400">Review your past scores, times, and replay to perfect your clinical mastery</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              {profile.casesCompleted} Total Runs
            </span>
          </div>

          {profile.history.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400 space-y-2">
              <Trophy className="w-10 h-10 mx-auto text-slate-600" />
              <p className="font-bold text-slate-300">No completed challenges recorded yet.</p>
              <p>Complete any clinical scenario to archive your score and debrief results here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {profile.history.map((record) => (
                <div
                  key={record.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{new Date(record.completedAt).toLocaleDateString()}</span>
                      <span className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                        record.score >= 90 ? 'bg-emerald-500/20 text-emerald-300' :
                        record.score >= 70 ? 'bg-blue-500/20 text-blue-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        Score: {record.score}%
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm line-clamp-1">{record.caseTitle}</h4>
                    <div className="text-[10px] text-cyan-400 capitalize">{record.category.replace('_', ' ')}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-mono text-[11px]">+{record.xpEarned} XP earned</span>
                    <button
                      onClick={() => {
                        const found = CHALLENGE_TOPICS.find(t => record.caseId.includes(t.topicId));
                        if (found) {
                          onStartCase(buildCaseFromTopicAndVariation(found, 0));
                        } else {
                          onStartCase(CHALLENGE_TOPICS[0].variations[0] ? buildCaseFromTopicAndVariation(CHALLENGE_TOPICS[0], 0) : getRandomChallengeCase());
                        }
                      }}
                      className="text-cyan-400 hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Replay</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
