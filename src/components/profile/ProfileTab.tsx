import React from 'react';
import { IdentityProfile } from '../../types/clinical';
import { BADGE_DEFINITIONS } from '../../game/rules';
import { 
  Trophy, 
  Award, 
  Flame, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Calendar,
  Lock,
  RotateCcw
} from 'lucide-react';

interface ProfileTabProps {
  profile: IdentityProfile;
  onResetProfile?: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ profile, onResetProfile }) => {
  const successRate = profile.casesCompleted > 0
    ? Math.round((profile.casesSuccessful / profile.casesCompleted) * 100)
    : 100;

  return (
    <div className="space-y-6 pb-12">
      {/* Profile Hero Header */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950/80 border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-cyan-950/40 text-2xl font-black">
              {profile.username.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">{profile.username}</h1>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Level {profile.level}
                </span>
              </div>
              <div className="text-sm font-semibold text-cyan-400 mt-0.5">{profile.rankTitle}</div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> {profile.streakDays} Day Streak
                </span>
                <span>•</span>
                <span>Identity Profile (IDP) Verified</span>
              </div>
            </div>
          </div>

          {/* XP Summary Pill */}
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-2xl p-4 sm:text-right shrink-0">
            <div className="text-xs text-slate-400">Total Experience Points</div>
            <div className="text-2xl font-black text-amber-400 font-mono flex items-center sm:justify-end gap-1.5 mt-0.5">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>{profile.currentXp} XP</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {profile.xpToNextLevel} XP needed for Level {profile.level + 1}
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Competence Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] text-slate-400 font-medium block">Cases Completed</span>
          <div className="text-2xl font-black text-white font-mono mt-1">{profile.casesCompleted}</div>
          <span className="text-[10px] text-slate-400">{profile.casesAttempted} Total Attempts</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] text-slate-400 font-medium block">Clinical Success Rate</span>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{successRate}%</div>
          <span className="text-[10px] text-slate-400">{profile.casesSuccessful} Successful</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] text-slate-400 font-medium block">Average Score</span>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{profile.averageScore}%</div>
          <span className="text-[10px] text-slate-400">Across All Rubrics</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] text-slate-400 font-medium block">Safety Violations</span>
          <div className="text-2xl font-black text-rose-400 font-mono mt-1">{profile.totalCriticalErrors}</div>
          <span className="text-[10px] text-slate-400">Critical Overrides</span>
        </div>
      </div>

      {/* Category Mastery Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Clinical Domain Mastery
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-amber-300">Trauma & Wound Care Procedures</span>
              <span className="text-white font-mono">{profile.categoryMastery.trauma}%</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${profile.categoryMastery.trauma}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-red-300">Acute Medical Emergencies (Asthma, Anaphylaxis, Seizures)</span>
              <span className="text-white font-mono">{profile.categoryMastery.acute_emergency}%</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${profile.categoryMastery.acute_emergency}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-purple-300">Pharmaceutical Emergencies & Drug Interactions</span>
              <span className="text-white font-mono">{profile.categoryMastery.pharma_emergency}%</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${profile.categoryMastery.pharma_emergency}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Clinical Achievements Showcase
            </h2>
            <span className="text-xs text-slate-400">
              {profile.unlockedBadges.length} of {BADGE_DEFINITIONS.length} unlocked
            </span>
          </div>
          <Trophy className="w-5 h-5 text-amber-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {BADGE_DEFINITIONS.map(badge => {
            const isUnlocked = profile.unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border transition flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-slate-950/80 border-amber-500/40 shadow-lg shadow-amber-950/20'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isUnlocked 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}>
                      {isUnlocked ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                    </div>
                    {isUnlocked && (
                      <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/40">
                        Unlocked
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white">{badge.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-tight">{badge.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Challenge History Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Challenge History Log ({profile.history.length})
        </h2>
        {profile.history.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs italic">
            No challenges recorded yet. Launch your first simulation in the Challenge tab!
          </div>
        ) : (
          <div className="space-y-2 overflow-x-auto">
            {profile.history.map(item => (
              <div
                key={item.id}
                className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-xl flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="font-bold text-white truncate max-w-sm sm:max-w-md">
                    {item.caseTitle}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-2">
                    <span className="capitalize text-cyan-400">{item.category.replace('_', ' ')}</span>
                    <span>•</span>
                    <span>{new Date(item.completedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="font-mono font-bold text-sm text-white">{item.score}%</div>
                    <div className="text-[10px] text-amber-400 font-semibold">+{item.xpEarned} XP</div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                    item.score >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    item.score >= 50 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {item.patientOutcome.replace('_', ' ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
