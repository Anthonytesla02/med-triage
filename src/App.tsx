import React, { useState, useEffect } from 'react';
import { 
  CaseCategory, 
  CaseEvaluationResult, 
  ClinicalCase, 
  DifficultyLevel, 
  IdentityProfile 
} from './types/clinical';
import { 
  INITIAL_IDP_PROFILE, 
  updateProfileWithResult 
} from './game/rules';
import { CASE_LIBRARY } from './data/caseLibrary';
import { ChallengeDashboard } from './components/challenge/ChallengeDashboard';
import { SimulationView } from './components/challenge/SimulationView';
import { DebriefView } from './components/challenge/DebriefView';
import { LearningTab } from './components/learning/LearningTab';
import { ProfileTab } from './components/profile/ProfileTab';
import { 
  Activity, 
  BookOpen, 
  ShieldAlert, 
  Trophy, 
  User, 
  Sparkles, 
  Zap, 
  Flame, 
  ArrowRight 
} from 'lucide-react';

const STORAGE_PROFILE_KEY = 'pharm_emerg_idp_profile_v2';
const STORAGE_SESSION_KEY = 'pharm_emerg_in_flight_case';

export default function App() {
  // Navigation state
  const [activeTab, setActiveTab] = useState<'challenge' | 'learning' | 'profile'>('challenge');
  const [simState, setSimState] = useState<'dashboard' | 'simulating' | 'debrief'>('dashboard');

  // IDP Profile State (persisted in localStorage)
  const [profile, setProfile] = useState<IdentityProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved IDP profile:', e);
    }
    return INITIAL_IDP_PROFILE;
  });

  // Active Simulation State
  const [activeCase, setActiveCase] = useState<ClinicalCase | null>(null);
  const [lastResult, setLastResult] = useState<CaseEvaluationResult | null>(null);
  const [hasUnfinishedSession, setHasUnfinishedSession] = useState<boolean>(() => {
    return Boolean(localStorage.getItem(STORAGE_SESSION_KEY));
  });
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }
  }, [profile]);

  // Support ?autostart=1 query param as per Ultra Mode instructions!
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      const firstCase = CASE_LIBRARY[0];
      handleStartCase(firstCase);
    }
  }, []);

  const handleStartCase = (clinicalCase: ClinicalCase) => {
    setActiveCase(clinicalCase);
    setSimState('simulating');
    setLastResult(null);
    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify({ caseId: clinicalCase.id }));
      setHasUnfinishedSession(true);
    } catch (e) {
      console.warn('Session save failed:', e);
    }
  };

  const handleResumeSession = () => {
    try {
      const saved = localStorage.getItem(STORAGE_SESSION_KEY);
      if (saved) {
        const { caseId } = JSON.parse(saved);
        const found = CASE_LIBRARY.find(c => c.id === caseId) || CASE_LIBRARY[0];
        handleStartCase(found);
      }
    } catch (e) {
      handleStartCase(CASE_LIBRARY[0]);
    }
  };

  const handleFinishCase = (result: CaseEvaluationResult) => {
    if (!activeCase) return;

    // Update IDP Profile with evaluation result
    const updatedProfile = updateProfileWithResult(
      profile,
      result,
      activeCase.id,
      activeCase.title,
      activeCase.category
    );
    setProfile(updatedProfile);
    setLastResult(result);
    setSimState('debrief');

    // Clear in-flight session
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      setHasUnfinishedSession(false);
    } catch (e) {
      console.warn('Error clearing session:', e);
    }
  };

  const handleRetryCase = () => {
    if (activeCase) {
      handleStartCase(activeCase);
    }
  };

  const handleNextCase = () => {
    if (!activeCase) {
      setSimState('dashboard');
      return;
    }
    const currentIndex = CASE_LIBRARY.findIndex(c => c.id === activeCase.id);
    const nextIndex = (currentIndex + 1) % CASE_LIBRARY.length;
    handleStartCase(CASE_LIBRARY[nextIndex]);
  };

  const handleGenerateAiCase = async (category: CaseCategory, difficulty: DifficultyLevel) => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/generate-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, difficulty })
      });
      const data = await res.json();
      if (data.case) {
        handleStartCase(data.case);
      }
    } catch (e) {
      console.warn('AI generation API failed, picking from library:', e);
      const filtered = CASE_LIBRARY.filter(c => c.category === category);
      handleStartCase(filtered[0] || CASE_LIBRARY[0]);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* App Navigation Header (visible unless active in simulation canvas) */}
      {simState !== 'simulating' && (
        <header className="sticky top-0 z-40 w-full max-w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 overflow-hidden">
            {/* Logo & Title */}
            <div 
              onClick={() => { setActiveTab('challenge'); setSimState('dashboard'); }}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 shrink"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition shrink-0">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-black text-sm sm:text-lg text-white tracking-tight truncate">PharmEmerg</span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.2 rounded-md shrink-0">
                    2D Sim
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 hidden md:block truncate">
                  Pharmacy Trauma & Emergency Clinical Simulator
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-0.5 sm:gap-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 shrink-0" aria-label="Main Navigation">
              <button
                onClick={() => { setActiveTab('challenge'); setSimState('dashboard'); }}
                className={`px-2.5 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
                  activeTab === 'challenge'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
                aria-current={activeTab === 'challenge' ? 'page' : undefined}
              >
                <Activity className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xs:inline sm:inline">Challenge</span>
              </button>

              <button
                onClick={() => setActiveTab('learning')}
                className={`px-2.5 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
                  activeTab === 'learning'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
                aria-current={activeTab === 'learning' ? 'page' : undefined}
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xs:inline sm:inline">Learning</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-2.5 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
                aria-current={activeTab === 'profile' ? 'page' : undefined}
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Identity Profile</span>
                <span className="md:hidden">IDP</span>
              </button>
            </nav>

            {/* Quick Profile Summary Badge */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 px-2 sm:px-3 py-1.5 rounded-2xl cursor-pointer transition shrink-0"
            >
              <div className="flex flex-col text-right">
                <span className="text-[10px] sm:text-[11px] font-bold text-white leading-tight">
                  Lvl {profile.level}
                </span>
                <span className="text-[9px] sm:text-[10px] text-amber-400 font-mono font-bold leading-tight">
                  {profile.currentXp} XP
                </span>
              </div>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center text-xs font-bold shrink-0">
                {profile.username.charAt(0)}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-6 overflow-x-hidden">
        {/* TAB 1: CHALLENGE TAB */}
        {activeTab === 'challenge' && (
          <>
            {simState === 'dashboard' && (
              <ChallengeDashboard
                profile={profile}
                onStartCase={handleStartCase}
                hasUnfinishedSession={hasUnfinishedSession}
                onResumeSession={handleResumeSession}
                onGenerateAiCase={handleGenerateAiCase}
                isGeneratingAi={isGeneratingAi}
              />
            )}

            {simState === 'simulating' && activeCase && (
              <SimulationView
                clinicalCase={activeCase}
                profile={profile}
                onFinishCase={handleFinishCase}
                onExit={() => setSimState('dashboard')}
              />
            )}

            {simState === 'debrief' && activeCase && lastResult && (
              <DebriefView
                clinicalCase={activeCase}
                result={lastResult}
                profile={profile}
                onRetry={handleRetryCase}
                onNextCase={handleNextCase}
                onReturnDashboard={() => setSimState('dashboard')}
                onOpenGuidelines={() => setActiveTab('learning')}
              />
            )}
          </>
        )}

        {/* TAB 2: LEARNING TAB */}
        {activeTab === 'learning' && (
          <LearningTab />
        )}

        {/* TAB 3: IDENTITY PROFILE TAB */}
        {activeTab === 'profile' && (
          <ProfileTab
            profile={profile}
            onResetProfile={() => setProfile(INITIAL_IDP_PROFILE)}
          />
        )}
      </main>
    </div>
  );
}
