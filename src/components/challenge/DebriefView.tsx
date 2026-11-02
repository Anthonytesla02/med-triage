import React from 'react';
import { CaseEvaluationResult, ClinicalCase, IdentityProfile } from '../../types/clinical';
import { BADGE_DEFINITIONS } from '../../game/rules';
import { 
  Trophy, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  BookOpen, 
  Award, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';

interface DebriefViewProps {
  clinicalCase: ClinicalCase;
  result: CaseEvaluationResult;
  profile: IdentityProfile;
  onRetry: () => void;
  onNextCase: () => void;
  onReturnDashboard: () => void;
  onOpenGuidelines?: () => void;
}

export const DebriefView: React.FC<DebriefViewProps> = ({
  clinicalCase,
  result,
  profile,
  onRetry,
  onNextCase,
  onReturnDashboard,
  onOpenGuidelines
}) => {
  const isFlawless = result.performanceBand === 'flawless';
  const isCriticalFailure = result.performanceBand === 'critical_failure' || result.isCriticalOverride;

  const unlockedBadgeObjects = BADGE_DEFINITIONS.filter(b => 
    result.unlockedBadges.includes(b.id)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto space-y-6">
        {/* Top Header Card */}
        <div className={`rounded-2xl p-6 border shadow-2xl relative overflow-hidden backdrop-blur-md ${
          isCriticalFailure 
            ? 'bg-gradient-to-br from-red-950/80 via-slate-900 to-slate-900 border-red-500/40 shadow-red-950/50' 
            : isFlawless
            ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 border-emerald-500/40 shadow-emerald-950/50'
            : 'bg-gradient-to-br from-cyan-950/80 via-slate-900 to-slate-900 border-cyan-500/40 shadow-cyan-950/50'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                  isCriticalFailure ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                  isFlawless ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}>
                  {result.performanceBand.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 capitalize">{clinicalCase.difficulty} Challenge</span>
              </div>

              <h1 className="text-2xl font-black text-white tracking-tight">
                {isCriticalFailure ? 'Critical Safety Intervention Required' :
                 isFlawless ? 'Flawless Clinical Management!' :
                 'Challenge Completed'}
              </h1>
              <p className="text-sm text-slate-300 max-w-xl">
                {result.patientOutcomeDescription}
              </p>
            </div>

            {/* Score Radial Dial */}
            <div className="relative flex flex-col items-center justify-center shrink-0">
              <div className="w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center bg-slate-950/80 shadow-inner border-slate-700">
                <span className={`text-3xl font-black font-mono ${
                  isCriticalFailure ? 'text-red-400' :
                  isFlawless ? 'text-emerald-400' :
                  result.score >= 80 ? 'text-cyan-400' : 'text-amber-400'
                }`}>
                  {result.score}%
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Score</span>
              </div>
            </div>
          </div>

          {/* XP & Rewards Bar */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-xl font-bold">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>+{result.xpEarned} XP Earned</span>
              </div>
              <div className="text-slate-400">
                Time Elapsed: <strong className="text-white">{result.timeTakenSeconds}s</strong>
              </div>
              <div className="text-slate-400">
                Category Mastery: <strong className="text-cyan-300">+{result.categoryMasteryDelta}%</strong>
              </div>
            </div>

            <div className="text-slate-400 text-xs">
              Current Rank: <strong className="text-white">{profile.rankTitle} (Lvl {profile.level})</strong>
            </div>
          </div>
        </div>

        {/* Unlocked Achievements Banner */}
        {unlockedBadgeObjects.length > 0 && (
          <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
              <h2 className="font-bold text-white text-sm">New Achievement Badge Unlocked!</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {unlockedBadgeObjects.map(badge => (
                <div key={badge.id} className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">{badge.title}</div>
                    <div className="text-[11px] text-slate-300 leading-tight">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Critical Safety Errors Section */}
        {result.criticalSafetyErrors.length > 0 && (
          <div className="bg-red-950/40 border border-red-500/40 rounded-2xl p-4 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Critical Safety Infractions & Overrides ({result.criticalSafetyErrors.length})</span>
            </div>
            <p className="text-xs text-slate-300">
              In clinical medicine and emergency pharmacy practice, critical errors jeopardize patient survival and override numerical points:
            </p>
            <ul className="space-y-1.5 mt-2">
              {result.criticalSafetyErrors.map((err, idx) => (
                <li key={idx} className="bg-red-900/30 border border-red-700/40 p-2.5 rounded-xl text-xs text-red-200 flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Procedure & Clinical Audit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Actions Executed */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Actions Performed ({result.actionsPerformed.length})
            </h2>
            {result.actionsPerformed.length === 0 ? (
              <div className="text-xs text-slate-500 italic">No interventions recorded.</div>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {result.actionsPerformed.map((act, i) => (
                  <div key={i} className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-200 mb-0.5">
                      <span>{act.supplyName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{act.timestampSeconds}s</span>
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {act.clinicalFeedback}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Omissions & Sequencing Critique */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Clinical Recommendations & Omissions
            </h2>
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 text-xs">
              {result.omittedEssentialActions.length === 0 && result.sequencingErrors.length === 0 ? (
                <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-xl text-emerald-200 text-xs">
                  ✓ Comprehensive protocol execution! No required steps were omitted.
                </div>
              ) : (
                <>
                  {result.omittedEssentialActions.map((omit, idx) => (
                    <div key={idx} className="bg-amber-950/30 border border-amber-500/30 p-2.5 rounded-xl text-amber-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <div>
                        <strong>Omitted Requirement:</strong> {omit.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                  {result.sequencingErrors.map((seq, idx) => (
                    <div key={idx} className="bg-purple-950/30 border border-purple-500/30 p-2.5 rounded-xl text-purple-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                      <div>{seq}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Standard Treatment Guidelines (STG) Clinical Pearl Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{clinicalCase.stgReference.guidelineTitle}</h3>
                <span className="text-[11px] text-slate-400">{clinicalCase.stgReference.chapter}</span>
              </div>
            </div>
            {onOpenGuidelines && (
              <button
                onClick={onOpenGuidelines}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
              >
                View Full STG →
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-cyan-300 block mb-1">Key Clinical Principles:</span>
              <ul className="space-y-1 text-slate-300">
                {clinicalCase.stgReference.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-amber-300 block mb-1">Hospital Transfer Criteria:</span>
              <ul className="space-y-1 text-slate-300">
                {clinicalCase.stgReference.referralCriteria.map((point, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={onRetry}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry This Case</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onReturnDashboard}
              className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition cursor-pointer"
            >
              Challenge Hub
            </button>
            <button
              onClick={onNextCase}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-900/30 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Next Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
