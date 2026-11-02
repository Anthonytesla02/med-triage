import React, { useState } from 'react';
import { BodyRegion, ClinicalCase, PatientConditionState } from '../../types/clinical';
import { 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  Activity, 
  Heart,
  Droplets,
  Layers,
  User,
  Focus
} from 'lucide-react';

interface Patient2DSceneProps {
  clinicalCase: ClinicalCase;
  conditionState: PatientConditionState;
  selectedRegion: BodyRegion | null;
  onSelectRegion: (region: BodyRegion) => void;
  appliedSuppliesOnRegions: Record<string, string[]>;
  isSeizing?: boolean;
  isWheezing?: boolean;
  hasAngioedema?: boolean;
}

export const Patient2DScene: React.FC<Patient2DSceneProps> = ({
  clinicalCase,
  conditionState,
  selectedRegion,
  onSelectRegion,
  appliedSuppliesOnRegions,
  isSeizing = false,
  isWheezing = false,
  hasAngioedema = false
}) => {
  const { patient, affectedBodyRegion, injuryType } = clinicalCase;
  const isFemale = patient.gender === 'female';
  const isChild = patient.ageGroup === 'child';
  const isElderly = patient.ageGroup === 'elderly';
  const skin = patient.skinTone || '#9c6644';

  // Toggle between Focused Body Part and Full Patient Avatar
  const [viewMode, setViewMode] = useState<'focused' | 'full'>('focused');

  const isRegionAffected = (region: BodyRegion) => region === affectedBodyRegion;
  const isRegionSelected = (region: BodyRegion) => region === selectedRegion;

  // Active treatment indicators on affected region
  const affectedSupplies = appliedSuppliesOnRegions[affectedBodyRegion] || [];
  const allApplied = Object.values(appliedSuppliesOnRegions).flat();
  const isIrrigated = affectedSupplies.includes('sterile_saline') || conditionState === 'irrigated';
  const hasPressure = affectedSupplies.includes('direct_pressure') || conditionState === 'pressure_applied';
  const isDressed = affectedSupplies.includes('elastic_bandage') || affectedSupplies.includes('adhesive_plaster') || conditionState === 'dressed';
  const isTourniquetApplied = affectedSupplies.includes('arterial_tourniquet');
  const isSplinted = affectedSupplies.includes('padded_splint') || conditionState === 'splinted';
  const isCooled = affectedSupplies.includes('cool_water') || conditionState === 'cooled';
  const isBurnCovered = affectedSupplies.includes('burn_cling_film') || affectedSupplies.includes('hydrogel_burn_sheet') || conditionState === 'covered';
  const isCushioned = (appliedSuppliesOnRegions['head_face'] || []).includes('head_cushion');
  const isNosePinched = allApplied.includes('nose_pinch');
  const hasToothInMilk = allApplied.includes('tooth_milk_container');
  const hasCpr = allApplied.includes('cpr_compressions');
  const hasHeimlich = allApplied.includes('heimlich_thrusts');

  // Friendly label for the focused body part
  const getBodyPartTitle = () => {
    switch (affectedBodyRegion) {
      case 'right_hand':
      case 'left_hand':
        return 'Hand, Wrist & Fingers';
      case 'right_arm':
      case 'left_arm':
        return 'Upper Limb & Forearm';
      case 'right_leg':
      case 'left_leg':
        return 'Lower Limb, Ankle & Foot';
      case 'head_face':
        return 'Head, Face & Airway';
      case 'chest':
        return 'Thorax & Cardiorespiratory Zone';
      case 'abdomen':
        return 'Abdominal & Visceral Zone';
      default:
        return 'Affected Anatomical Region';
    }
  };

  return (
    <div className="relative w-full max-w-full h-full min-h-[440px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Background Clinical Grid with Soft Lighting */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-28 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Scene HUD Header with Responsive Tabs */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 z-10 text-xs">
        {/* Patient Badge */}
        <div className="flex items-center gap-2 bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold text-white truncate max-w-[120px] sm:max-w-none">{patient.name}</span>
          <span className="text-slate-400 text-[11px] shrink-0">
            ({patient.age}y, {patient.gender}{isElderly ? ' • Geriatric' : isChild ? ' • Peds' : ''})
          </span>
        </div>

        {/* View Mode Tabs: Focused Specific Body Part vs Full Body */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('focused')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'focused'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Focus className="w-3.5 h-3.5" />
            <span>Specific Body Part</span>
          </button>
          <button
            onClick={() => setViewMode('full')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'full'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Full Body</span>
          </button>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-1.5">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
            {affectedBodyRegion.replace('_', ' ')}
          </span>
          {isDressed && (
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-1 rounded-lg text-[10px] font-bold">
              ✓ Dressed
            </span>
          )}
          {isTourniquetApplied && (
            <span className="bg-orange-500/20 text-orange-300 border border-orange-500/40 px-2 py-1 rounded-lg text-[10px] font-bold">
              ✓ TQ Applied
            </span>
          )}
        </div>
      </div>

      {/* Main 2D Interactive Stage */}
      <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[300px]">
        {/* VIEW 1: CASE-STUDY SPECIFIC ISOLATED BODY PART */}
        {viewMode === 'focused' && (
          <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in">
            <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-slate-900/90 border border-cyan-500/30 px-3 py-1 rounded-full mb-2 shadow-sm flex items-center gap-1.5">
              <Focus className="w-3 h-3" />
              <span>Isolated Anatomical Focus: {getBodyPartTitle()}</span>
            </div>

            {/* HAND / WRIST ISOLATED VIEW */}
            {(affectedBodyRegion === 'right_hand' || affectedBodyRegion === 'left_hand') && (
              <svg viewBox="0 0 320 280" className="w-full max-w-[340px] max-h-[260px] drop-shadow-2xl">
                <defs>
                  <radialGradient id="handBurnRadial" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#ea580c" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="handSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={skin} />
                    <stop offset="100%" stopColor="#3d2110" stopOpacity="0.7" />
                  </linearGradient>
                </defs>

                {/* Forearm & Wrist */}
                <path d="M120 260 L120 180 Q120 160 110 140 L210 140 Q200 160 200 180 L200 260 Z" fill="url(#handSkinGrad)" stroke="#1e293b" strokeWidth="2" />
                <path d="M130 190 Q160 200 190 190" stroke="#ffffff25" strokeWidth="2" fill="none" />

                {/* Palm Base */}
                <path d="M100 145 C95 105 105 75 125 70 C135 68 145 75 155 70 C165 65 175 68 185 70 C205 75 220 100 215 145 Z" fill="url(#handSkinGrad)" stroke="#1e293b" strokeWidth="2" />

                {/* Fingers */}
                {/* Thumb */}
                <path d="M102 140 C85 130 65 110 75 90 C85 75 100 95 112 115 Z" fill={skin} stroke="#1e293b" strokeWidth="2" />
                <path d="M78 86 Q84 82 88 88" stroke="#ffffff40" strokeWidth="1.5" fill="none" />

                {/* Index Finger */}
                <path d="M115 75 L118 20 C120 12 132 12 134 20 L136 72 Z" fill={skin} stroke="#1e293b" strokeWidth="2" />
                <ellipse cx="126" cy="22" rx="4" ry="3" fill="#ffffff35" />

                {/* Middle Finger */}
                <path d="M138 70 L142 10 C144 2 158 2 160 10 L162 70 Z" fill={skin} stroke="#1e293b" strokeWidth="2" />
                <ellipse cx="151" cy="12" rx="4" ry="3" fill="#ffffff35" />

                {/* Ring Finger */}
                <path d="M164 72 L168 22 C170 14 182 14 184 22 L186 74 Z" fill={skin} stroke="#1e293b" strokeWidth="2" />
                <ellipse cx="176" cy="24" rx="4" ry="3" fill="#ffffff35" />

                {/* Little Finger */}
                <path d="M188 78 L194 40 C196 32 206 32 208 40 L206 88 Z" fill={skin} stroke="#1e293b" strokeWidth="2" />
                <ellipse cx="201" cy="42" rx="3" ry="2.5" fill="#ffffff35" />

                {/* Palmar Creases */}
                <path d="M120 120 Q150 140 185 115" stroke="#2a1608" strokeWidth="2" fill="none" />
                <path d="M135 95 Q165 105 195 90" stroke="#2a1608" strokeWidth="2" fill="none" />

                {/* REAL-TIME INJURY OVERLAYS ON HAND */}
                {/* Thermal / Chemical Burn */}
                {(injuryType === 'burn_thermal' || injuryType === 'burn_chemical') && (
                  <g>
                    <ellipse cx="155" cy="115" rx="35" ry="25" fill="url(#handBurnRadial)" />
                    {!isBurnCovered && (
                      <g>
                        <circle cx="145" cy="110" r="7" fill="#facc15" stroke="#b45309" strokeWidth="1.5" className="animate-pulse" />
                        <circle cx="165" cy="118" r="5" fill="#fde047" stroke="#b45309" strokeWidth="1" />
                        <circle cx="152" cy="125" r="4" fill="#facc15" stroke="#b45309" strokeWidth="1" />
                      </g>
                    )}
                    {isCooled && !isBurnCovered && (
                      <path d="M130 100 Q155 110 180 100" stroke="#38bdf8" strokeWidth="3" fill="none" />
                    )}
                    {isBurnCovered && (
                      <g>
                        <rect x="120" y="90" width="70" height="50" rx="8" fill="#38bdf8" fillOpacity="0.45" stroke="#bae6fd" strokeWidth="2" />
                        <text x="155" y="120" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">BURN SHEET</text>
                      </g>
                    )}
                  </g>
                )}

                {/* Laceration / Cut on Hand */}
                {injuryType === 'laceration' && (
                  <g>
                    {!isDressed && !hasPressure && (
                      <g>
                        <path d="M135 105 Q155 120 175 110" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" fill="none" />
                        <circle cx="160" cy="125" r="3.5" fill="#dc2626" className="animate-ping" />
                      </g>
                    )}
                    {isIrrigated && !isDressed && (
                      <circle cx="155" cy="115" r="22" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4,4" fill="none" />
                    )}
                    {hasPressure && !isDressed && (
                      <g>
                        <rect x="130" y="98" width="50" height="34" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
                        <text x="155" y="118" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="black">PRESSURE</text>
                      </g>
                    )}
                    {isDressed && (
                      <g>
                        <rect x="115" y="85" width="80" height="60" rx="8" fill="#f1f5f9" stroke="#0284c7" strokeWidth="2.5" />
                        <path d="M120 95 L190 135 M120 115 L190 155" stroke="#0284c7" strokeWidth="2" />
                        <text x="155" y="120" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="black">BANDAGED</text>
                      </g>
                    )}
                  </g>
                )}

                {/* Sprain / Swelling on Wrist */}
                {injuryType === 'sprain_fracture' && (
                  <g>
                    {!isSplinted && (
                      <g className="animate-pulse">
                        <ellipse cx="160" cy="180" rx="42" ry="22" fill="#818cf8" fillOpacity="0.4" stroke="#6366f1" strokeWidth="2" strokeDasharray="3,3" />
                        <text x="160" y="184" textAnchor="middle" fill="#e0e7ff" fontSize="9" fontWeight="bold">LIGAMENT EDEMA</text>
                      </g>
                    )}
                    {isSplinted && (
                      <g>
                        <rect x="110" y="145" width="100" height="70" rx="8" fill="#3b82f6" fillOpacity="0.4" stroke="#60a5fa" strokeWidth="2.5" />
                        <line x1="115" y1="165" x2="205" y2="165" stroke="#ffffff" strokeWidth="2" />
                        <line x1="115" y1="190" x2="205" y2="190" stroke="#ffffff" strokeWidth="2" />
                        <text x="160" y="182" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black">SPLINTED</text>
                      </g>
                    )}
                  </g>
                )}
              </svg>
            )}

            {/* LOWER LIMB / ANKLE / FOOT ISOLATED VIEW */}
            {(affectedBodyRegion === 'right_leg' || affectedBodyRegion === 'left_leg') && (
              <svg viewBox="0 0 320 280" className="w-full max-w-[340px] max-h-[260px] drop-shadow-2xl">
                <defs>
                  <radialGradient id="legBleedRadial" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#b91c1c" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Thigh / Knee / Lower Leg Profile */}
                <path d="M90 20 L160 20 L150 110 L140 210 L190 240 C195 255 185 265 170 265 L100 265 C90 265 85 255 90 240 L105 170 L95 110 Z" fill={skin} stroke="#1e293b" strokeWidth="2" />
                {/* Patella & Shin outline */}
                <path d="M150 110 Q145 130 135 155" stroke="#ffffff25" strokeWidth="2" fill="none" />
                {/* Ankle malleolus */}
                <circle cx="120" cy="235" r="6" fill="#2a1608" opacity="0.3" />

                {/* ARTERIAL TOURNIQUET */}
                {isTourniquetApplied && (
                  <g transform="translate(85, 40)">
                    <rect x="0" y="0" width="75" height="22" rx="4" fill="#ea580c" stroke="#7c2d12" strokeWidth="2" />
                    <rect x="28" y="-6" width="16" height="34" rx="3" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
                    <text x="36" y="15" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black">TQ</text>
                  </g>
                )}

                {/* Arterial Spurting Bleed */}
                {injuryType === 'arterial_bleed' && !isTourniquetApplied && (
                  <g className="animate-pulse">
                    <circle cx="125" cy="150" r="24" fill="url(#legBleedRadial)" />
                    <path d="M125 145 Q80 120 60 135" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M125 152 Q75 145 55 160" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <circle cx="55" cy="135" r="3" fill="#ef4444" className="animate-ping" />
                  </g>
                )}

                {/* Venomous Snakebite Fang Marks */}
                {injuryType === 'bite_sting' && (
                  <g>
                    <ellipse cx="125" cy="165" rx="28" ry="32" fill="#581c87" fillOpacity="0.4" stroke="#a855f7" strokeWidth="1.5" />
                    <circle cx="120" cy="160" r="3" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                    <circle cx="130" cy="160" r="3" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                    <line x1="120" y1="163" x2="120" y2="175" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                    <line x1="130" y1="163" x2="130" y2="177" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                    <text x="125" y="195" textAnchor="middle" fill="#e9d5ff" fontSize="8" fontWeight="bold">VENOMOUS PUNCTURES</text>
                  </g>
                )}

                {/* Laceration with Healing & Bandaging */}
                {injuryType === 'laceration' && (
                  <g>
                    <circle cx="125" cy="160" r="22" fill="url(#legBleedRadial)" />
                    {!isDressed && !hasPressure && (
                      <path d="M120 145 L130 175" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                    )}
                    {isIrrigated && !isDressed && (
                      <circle cx="125" cy="160" r="18" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" fill="none" />
                    )}
                    {hasPressure && !isDressed && (
                      <g>
                        <rect x="110" y="145" width="30" height="30" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
                        <text x="125" y="163" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="black">PRESSURE</text>
                      </g>
                    )}
                    {isDressed && (
                      <g>
                        <rect x="100" y="135" width="48" height="50" rx="6" fill="#f1f5f9" stroke="#0284c7" strokeWidth="2.5" />
                        <path d="M102 145 L146 165 M102 160 L146 180" stroke="#0284c7" strokeWidth="1.5" />
                        <text x="124" y="162" textAnchor="middle" fill="#0369a1" fontSize="8" fontWeight="black">DRESSED</text>
                      </g>
                    )}
                  </g>
                )}

                {/* Splint on Leg / Ankle */}
                {isSplinted && (
                  <g>
                    <rect x="90" y="110" width="65" height="140" rx="8" fill="#3b82f6" fillOpacity="0.4" stroke="#60a5fa" strokeWidth="2.5" />
                    <line x1="92" y1="135" x2="153" y2="135" stroke="#ffffff" strokeWidth="2.5" />
                    <line x1="92" y1="175" x2="153" y2="175" stroke="#ffffff" strokeWidth="2.5" />
                    <line x1="92" y1="215" x2="153" y2="215" stroke="#ffffff" strokeWidth="2.5" />
                    <text x="122" y="179" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black">SPLINTED</text>
                  </g>
                )}
              </svg>
            )}

            {/* HEAD / FACE / AIRWAY ISOLATED VIEW */}
            {affectedBodyRegion === 'head_face' && (
              <svg viewBox="0 0 320 280" className="w-full max-w-[340px] max-h-[260px] drop-shadow-2xl">
                {/* Head Base */}
                <ellipse cx="160" cy="130" rx="70" ry="85" fill={skin} stroke="#1e293b" strokeWidth="2" />
                {/* Hair */}
                <path d="M90 120 C90 50 230 50 230 120 C220 80 100 80 90 120 Z" fill="#1e1b4b" />
                {/* Ears */}
                <ellipse cx="88" cy="135" rx="8" ry="16" fill={skin} stroke="#1e293b" strokeWidth="1.5" />
                <ellipse cx="232" cy="135" rx="8" ry="16" fill={skin} stroke="#1e293b" strokeWidth="1.5" />

                {/* Eyes */}
                <g>
                  <ellipse cx="130" cy="120" rx="9" ry="6" fill="#0f172a" />
                  <ellipse cx="190" cy="120" rx="9" ry="6" fill="#0f172a" />
                  <circle cx="133" cy="118" r="2.5" fill="#ffffff" />
                  <circle cx="193" cy="118" r="2.5" fill="#ffffff" />
                  <path d="M120 108 L140 112 M180 112 L200 108" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* Nose */}
                <path d="M160 115 L156 150 L166 150" stroke="#3d2110" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Mouth & Airway */}
                {isNosePinched ? (
                  <g>
                    <ellipse cx="160" cy="175" rx="14" ry="8" fill="#7f1d1d" />
                    <rect x="152" y="140" width="16" height="18" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                    <text x="160" y="152" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold">PINCH</text>
                  </g>
                ) : patient.expression === 'gasping' ? (
                  <ellipse cx="160" cy="175" rx="16" ry="12" fill="#7f1d1d" stroke="#1e293b" strokeWidth="2" />
                ) : (
                  <path d="M145 175 Q160 182 175 175" stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                )}

                {/* Epistaxis active bleeding drops */}
                {injuryType === 'epistaxis' && !isNosePinched && (
                  <g>
                    <ellipse cx="160" cy="154" rx="4" ry="3" fill="#dc2626" />
                    <path d="M158 155 L158 185 M162 155 L162 180" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="158" cy="190" r="3" fill="#dc2626" className="animate-ping" />
                  </g>
                )}

                {/* Knocked-Out Permanent Tooth Container */}
                {hasToothInMilk && (
                  <g transform="translate(220, 160)">
                    <rect x="0" y="0" width="36" height="46" rx="6" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M10 14 L26 14 L22 30 L14 30 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
                    <text x="18" y="40" textAnchor="middle" fill="#0284c7" fontSize="8" fontWeight="bold">MILK</text>
                  </g>
                )}

                {/* Cyanosis Choking Blue Lips */}
                {injuryType === 'choking' && (
                  <g>
                    <ellipse cx="160" cy="175" rx="16" ry="10" fill="#2563eb" opacity="0.6" />
                    <text x="160" y="210" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">CYANOTIC AIRWAY</text>
                  </g>
                )}

                {/* Seizure Cushion Pillow */}
                {isCushioned && (
                  <g transform="translate(100, 30)">
                    <rect x="0" y="0" width="120" height="30" rx="10" fill="#6366f1" fillOpacity="0.5" stroke="#818cf8" strokeWidth="2" />
                    <text x="60" y="20" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">HEAD CUSHIONED</text>
                  </g>
                )}
              </svg>
            )}

            {/* CHEST & RESPIRATORY ISOLATED VIEW */}
            {affectedBodyRegion === 'chest' && (
              <svg viewBox="0 0 320 280" className="w-full max-w-[340px] max-h-[260px] drop-shadow-2xl">
                {/* Thoracic rib cage & sternum */}
                <path d="M80 60 C80 60 160 50 240 60 L230 220 C200 230 120 230 90 220 Z" fill="#0369a1" stroke="#1e293b" strokeWidth="2" />
                <line x1="160" y1="70" x2="160" y2="180" stroke="#ffffff40" strokeWidth="3" />
                <path d="M110 80 Q160 100 210 80 M110 110 Q160 130 210 110 M110 140 Q160 160 210 140" stroke="#ffffff25" strokeWidth="2" fill="none" />

                {/* CPR Compressions Indicator */}
                {hasCpr && (
                  <g className="animate-ping">
                    <circle cx="160" cy="140" r="24" fill="#ef4444" fillOpacity="0.4" stroke="#dc2626" strokeWidth="2.5" />
                    <text x="160" y="144" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black">CPR COMPRESSIONS</text>
                  </g>
                )}

                {/* Asthma Wheezing Waves */}
                {isWheezing && (
                  <g className="animate-pulse">
                    <circle cx="160" cy="130" r="35" stroke="#facc15" strokeWidth="3" strokeDasharray="4,4" fill="none" />
                    <text x="160" y="134" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">BRONCHOSPASM</text>
                  </g>
                )}

                {/* Anaphylaxis Hives */}
                {(hasAngioedema || injuryType === 'anaphylaxis') && (
                  <g fill="#ef4444" opacity="0.85">
                    <circle cx="120" cy="95" r="4" />
                    <circle cx="140" cy="140" r="5" />
                    <circle cx="180" cy="110" r="4.5" />
                    <circle cx="200" cy="155" r="5" />
                  </g>
                )}
              </svg>
            )}

            {/* UPPER LIMB / ARM ISOLATED VIEW */}
            {(affectedBodyRegion === 'right_arm' || affectedBodyRegion === 'left_arm') && (
              <svg viewBox="0 0 320 280" className="w-full max-w-[340px] max-h-[260px] drop-shadow-2xl">
                {/* Arm / Forearm Vector */}
                <path d="M120 20 L180 20 L170 140 L160 250 L120 250 L130 140 Z" fill={skin} stroke="#1e293b" strokeWidth="2" />
                <line x1="145" y1="130" x2="155" y2="150" stroke="#ffffff25" strokeWidth="2" />

                {/* Splint on Arm */}
                {isSplinted && (
                  <g>
                    <rect x="115" y="100" width="60" height="130" rx="8" fill="#3b82f6" fillOpacity="0.4" stroke="#60a5fa" strokeWidth="2.5" />
                    <line x1="117" y1="130" x2="173" y2="130" stroke="#ffffff" strokeWidth="2" />
                    <line x1="117" y1="170" x2="173" y2="170" stroke="#ffffff" strokeWidth="2" />
                    <line x1="117" y1="210" x2="173" y2="210" stroke="#ffffff" strokeWidth="2" />
                    <text x="145" y="174" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black">SPLINTED</text>
                  </g>
                )}

                {/* Laceration / Fracture on Forearm */}
                {injuryType === 'laceration' && !isDressed && (
                  <g>
                    <path d="M140 140 L150 170" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="145" cy="155" r="3" fill="#dc2626" className="animate-ping" />
                  </g>
                )}
                {injuryType === 'laceration' && isDressed && (
                  <g>
                    <rect x="120" y="130" width="50" height="50" rx="6" fill="#f1f5f9" stroke="#0284c7" strokeWidth="2" />
                    <text x="145" y="158" textAnchor="middle" fill="#0369a1" fontSize="8" fontWeight="black">BANDAGED</text>
                  </g>
                )}
              </svg>
            )}

            {/* ABDOMEN ISOLATED VIEW */}
            {affectedBodyRegion === 'abdomen' && (
              <svg viewBox="0 0 320 280" className="w-full max-w-[340px] max-h-[260px] drop-shadow-2xl">
                <rect x="90" y="50" width="140" height="180" rx="16" fill={skin} stroke="#1e293b" strokeWidth="2" />
                <circle cx="160" cy="140" r="5" fill="#2a1608" opacity="0.6" />
                {hasHeimlich && (
                  <g className="animate-pulse">
                    <rect x="125" y="90" width="70" height="30" rx="6" fill="#f97316" fillOpacity="0.8" stroke="#ea580c" strokeWidth="2" />
                    <text x="160" y="108" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black">HEIMLICH THRUSTS</text>
                  </g>
                )}
              </svg>
            )}
          </div>
        )}

        {/* VIEW 2: FULL BODY SCHEMATIC AVATAR */}
        {viewMode === 'full' && (
          <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in">
            {/* Interactive Full Avatar SVG with Clickable Regions */}
            <svg
              viewBox="0 0 240 380"
              className={`w-full max-w-[260px] max-h-[300px] drop-shadow-2xl transition-all duration-300 ${isSeizing ? 'animate-[wiggle_0.12s_ease-in-out_infinite]' : ''}`}
              role="img"
              aria-label="Interactive 2D full body patient anatomy"
            >
              {/* Head & Face */}
              <g
                className="cursor-pointer group"
                onClick={() => onSelectRegion('head_face')}
              >
                <rect x="110" y="55" width="20" height="15" rx="4" fill={skin} />
                <ellipse cx="120" cy="34" rx={isChild ? "22" : "25"} ry={isChild ? "25" : "28"} fill={skin} className={isRegionSelected('head_face') ? 'stroke-cyan-400 stroke-[3]' : 'stroke-slate-700/60 stroke-1'} />
                <path d="M96 32 C96 12 144 12 144 32 Z" fill="#1e1b4b" />
                <ellipse cx="112" cy="32" rx="3" ry="2" fill="#0f172a" />
                <ellipse cx="128" cy="32" rx="3" ry="2" fill="#0f172a" />
                <ellipse cx="120" cy="46" rx="4" ry="2" fill="#7f1d1d" />
                {isRegionAffected('head_face') && (
                  <circle cx="120" cy="34" r="28" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" fill="none" className="animate-pulse" />
                )}
              </g>

              {/* Chest */}
              <g
                className="cursor-pointer group"
                onClick={() => onSelectRegion('chest')}
              >
                <path d="M82 70 L158 70 L152 140 L88 140 Z" fill={isFemale ? "#0284c7" : "#0369a1"} className={isRegionSelected('chest') ? 'stroke-cyan-400 stroke-[3]' : 'stroke-slate-700/60 stroke-1'} />
                {isRegionAffected('chest') && (
                  <circle cx="120" cy="105" r="24" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" fill="none" className="animate-pulse" />
                )}
              </g>

              {/* Abdomen */}
              <g
                className="cursor-pointer group"
                onClick={() => onSelectRegion('abdomen')}
              >
                <rect x="90" y="140" width="60" height="35" rx="4" fill={skin} className={isRegionSelected('abdomen') ? 'stroke-cyan-400 stroke-[3]' : 'stroke-slate-700/60 stroke-1'} />
              </g>

              {/* Right Arm */}
              <g
                className="cursor-pointer group"
                onClick={() => onSelectRegion('right_arm')}
              >
                <path d="M82 70 L58 130 L70 134 L88 80 Z" fill={skin} className={isRegionSelected('right_arm') ? 'stroke-cyan-400 stroke-[3]' : 'stroke-slate-700/60 stroke-1'} />
                <path d="M58 130 L48 185 L60 188 L70 134 Z" fill={skin} />
              </g>

              {/* Left Arm */}
              <g
                className="cursor-pointer group"
                onClick={() => onSelectRegion('left_arm')}
              >
                <path d="M158 70 L182 130 L170 134 L152 80 Z" fill={skin} className={isRegionSelected('left_arm') ? 'stroke-cyan-400 stroke-[3]' : 'stroke-slate-700/60 stroke-1'} />
                <path d="M182 130 L192 185 L180 188 L170 134 Z" fill={skin} />
              </g>

              {/* Right Hand */}
              <g
                className="cursor-pointer group"
                onClick={() => onSelectRegion('right_hand')}
              >
                <ellipse cx="50" cy="198" rx="8" ry="11" fill={skin} className={isRegionSelected('right_hand') ? 'stroke-cyan-400 stroke-[3]' : 'stroke-slate-700/60 stroke-1'} />
                {isRegionAffected('right_hand') && (
                  <circle cx="50" cy="198" r="14" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" fill="none" className="animate-pulse" />
                )}
              </g>

              {/* Left Hand */}
              <g
                className="cursor-pointer group"
                onClick={() => onSelectRegion('left_hand')}
              >
                <ellipse cx="190" cy="198" rx="8" ry="11" fill={skin} className={isRegionSelected('left_hand') ? 'stroke-cyan-400 stroke-[3]' : 'stroke-slate-700/60 stroke-1'} />
                {isRegionAffected('left_hand') && (
                  <circle cx="190" cy="198" r="14" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" fill="none" className="animate-pulse" />
                )}
              </g>

              {/* Right Leg */}
              <g
                className="cursor-pointer group"
                onClick={() => onSelectRegion('right_leg')}
              >
                <path d="M94 175 L80 250 L104 250 L116 175 Z" fill={skin} className={isRegionSelected('right_leg') ? 'stroke-cyan-400 stroke-[3]' : 'stroke-slate-700/60 stroke-1'} />
                <path d="M80 250 L76 330 L98 330 L104 250 Z" fill={skin} />
                <ellipse cx="86" cy="336" rx="12" ry="6" fill="#1e293b" />
                {isRegionAffected('right_leg') && (
                  <circle cx="90" cy="285" r="18" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" fill="none" className="animate-pulse" />
                )}
              </g>

              {/* Left Leg */}
              <g
                className="cursor-pointer group"
                onClick={() => onSelectRegion('left_leg')}
              >
                <path d="M146 175 L160 250 L136 250 L124 175 Z" fill={skin} className={isRegionSelected('left_leg') ? 'stroke-cyan-400 stroke-[3]' : 'stroke-slate-700/60 stroke-1'} />
                <path d="M160 250 L164 330 L142 330 L136 250 Z" fill={skin} />
                <ellipse cx="154" cy="336" rx="12" ry="6" fill="#1e293b" />
                {isRegionAffected('left_leg') && (
                  <circle cx="150" cy="285" r="18" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" fill="none" className="animate-pulse" />
                )}
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Patient Statement & Dialog Footer */}
      <div className="w-full bg-slate-900/95 border border-slate-800 rounded-xl p-2.5 z-10 flex items-start gap-2.5 shadow-xl">
        <div className="w-7 h-7 rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
          <Activity className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-0.5">
            Patient Statement
          </div>
          <p className="text-xs text-slate-200 italic line-clamp-2 font-serif leading-tight">
            "{clinicalCase.patientStatement}"
          </p>
        </div>
      </div>
    </div>
  );
};
