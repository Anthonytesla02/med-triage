import React, { useState } from 'react';
import { STG_GUIDELINES, STGChapter } from '../../data/stgGuidelines';
import { DRUG_DATABASE } from '../../data/drugList';
import { DrugMonograph } from '../../types/clinical';
import { 
  BookOpen, 
  FileText, 
  Pill, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const LearningTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'cases' | 'stg' | 'drugs'>('cases');
  const [selectedChapter, setSelectedChapter] = useState<STGChapter>(STG_GUIDELINES[0]);
  const [drugSearchQuery, setDrugSearchQuery] = useState<string>('');
  const [selectedDrug, setSelectedDrug] = useState<DrugMonograph>(DRUG_DATABASE[0]);

  // Case study interactive state
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const writtenCases = [
    {
      id: 'case-written-01',
      title: 'Written Case 1: Triage of Facial Chemical Burn in a Tailor',
      scenario: 'A 29-year-old tailor rushes into your community pharmacy after an accidental splash of industrial fabric bleaching solvent onto his right cheek and periorbital area 10 minutes ago. He is screaming in agony, clutching a cloth over his face.',
      questions: [
        {
          prompt: 'What is the absolute immediate first step the pharmacist must take?',
          options: [
            'Immediately wipe the chemical off with a dry dry towel and apply hydrocortisone cream.',
            'Immediately irrigate the facial burn copiously with clean running water for at least 15-20 minutes, safeguarding the unaffected eye.',
            'Neutralize the chemical by applying mild vinegar or household lemon juice onto the skin.',
            'Dispense oral tramadol for analgesia and ask him to wait in the seating area.'
          ],
          correctIndex: 1,
          explanation: 'Standard Treatment Guidelines dictate immediate continuous low-pressure irrigation with clean running water or saline for a minimum of 15 to 20 minutes. Chemical neutralizing agents (acids/bases) generate exothermic heat that worsens thermal and chemical tissue destruction.'
        },
        {
          prompt: 'Which clinical feature makes urgent hospital emergency transfer mandatory in this scenario?',
          options: [
            'The patient feels an intense burning sensation.',
            'Chemical involvement of the face and periorbital/ocular zone.',
            'The patient does not have his health insurance card.',
            'The injury occurred during working hours.'
          ],
          correctIndex: 1,
          explanation: 'All chemical burns and all burns involving the face, eyes, hands, feet, or genitalia meet strict criteria for urgent specialized hospital referral to prevent permanent corneal blindness or severe cicatricial contracture.'
        }
      ]
    },
    {
      id: 'case-written-02',
      title: 'Written Case 2: Unconscious Seizing Customer in the Pharmacy',
      scenario: 'A 42-year-old known epileptic customer suddenly falls to the pharmacy floor with generalized tonic-clonic convulsions. A well-meaning bystander grabs a metal teaspoon from their tea flask and attempts to pry open the patient’s teeth.',
      questions: [
        {
          prompt: 'How should the pharmacist immediately intervene regarding the bystander’s action?',
          options: [
            'Help the bystander hold the patient down and force the spoon between the molars.',
            'Immediately stop the bystander, explain that nothing should ever be placed in the mouth, and place a soft jacket beneath the patient’s head.',
            'Pour water down the patient\'s throat to calm the seizure.',
            'Administer two oral sodium valproate tablets immediately.'
          ],
          correctIndex: 1,
          explanation: 'Placing objects into the mouth of a convulsing patient is a dangerous myth that fractures teeth, lacerates the tongue, and causes life-threatening airway obstruction. Limbs must never be restrained. The head should be cushioned and the seizure duration timed.'
        },
        {
          prompt: 'What should be done the instant the convulsive jerking stops?',
          options: [
            'Perform immediate cardiac chest compressions.',
            'Turn the patient gently onto their side into the Recovery Position to keep the airway clear of saliva and vomitus.',
            'Encourage the patient to stand up immediately and walk around.',
            'Offer sweet hot tea.'
          ],
          correctIndex: 1,
          explanation: 'Once active convulsive contractions cease, placing the patient in the lateral recovery position maintains an open airway and allows secretions to drain freely, preventing fatal post-ictal aspiration pneumonia.'
        }
      ]
    }
  ];

  const currentCase = writtenCases[currentCaseIndex];

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qIdx]: true }));
  };

  const filteredDrugs = DRUG_DATABASE.filter(d => 
    d.genericName.toLowerCase().includes(drugSearchQuery.toLowerCase()) ||
    d.brandNames.some(b => b.toLowerCase().includes(drugSearchQuery.toLowerCase())) ||
    d.drugClass.toLowerCase().includes(drugSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Learning Tab Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Clinical Education & Knowledge Base
            </span>
          </div>
          <h1 className="text-2xl font-black text-white">Clinical Learning Hub</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Explore written clinical case studies, authoritative Standard Treatment Guidelines (Ghana STG), and verified emergency medication monographs.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('cases')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'cases' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Case Studies</span>
          </button>

          <button
            onClick={() => setActiveSubTab('stg')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'stg' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>STG Protocols</span>
          </button>

          <button
            onClick={() => setActiveSubTab('drugs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'drugs' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Drug Formulary</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Written Case Studies */}
      {activeSubTab === 'cases' && (
        <div className="space-y-6">
          {/* Case Navigation Header */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400">Case {currentCaseIndex + 1} of {writtenCases.length}</span>
              <span className="text-xs text-slate-400">|</span>
              <h2 className="text-sm font-bold text-white">{currentCase.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentCaseIndex(prev => (prev > 0 ? prev - 1 : writtenCases.length - 1));
                  setUserAnswers({});
                  setShowExplanation({});
                }}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
              >
                Previous Case
              </button>
              <button
                onClick={() => {
                  setCurrentCaseIndex(prev => (prev < writtenCases.length - 1 ? prev + 1 : 0));
                  setUserAnswers({});
                  setShowExplanation({});
                }}
                className="px-3 py-1.5 text-xs rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold cursor-pointer"
              >
                Next Case
              </button>
            </div>
          </div>

          {/* Scenario Text Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
              Clinical Scenario Presentation
            </span>
            <p className="text-sm text-slate-200 leading-relaxed font-serif">
              "{currentCase.scenario}"
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {currentCase.questions.map((q, qIdx) => {
              const selectedOpt = userAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={qIdx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <span>{q.prompt}</span>
                  </h3>

                  {/* Options */}
                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40';

                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 font-medium';
                        } else if (optIdx === selectedOpt) {
                          btnStyle = 'bg-red-950/60 border-red-500/60 text-red-200';
                        } else {
                          btnStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          disabled={isAnswered}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                        >
                          <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1 leading-normal">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Clinical Rationale Feedback */}
                  {showExplanation[qIdx] && (
                    <div className={`p-3.5 rounded-xl border text-xs space-y-1 animate-fade-in ${
                      isCorrect ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-red-950/30 border-red-500/40 text-red-200'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5">
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                        <span>{isCorrect ? 'Correct Clinical Decision!' : 'Incorrect Clinical Decision'}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px] pt-1">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: Standard Treatment Guidelines (STG) */}
      {activeSubTab === 'stg' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chapter Selector */}
          <div className="lg:col-span-4 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              STG Guideline Chapters
            </h2>
            <div className="space-y-1.5">
              {STG_GUIDELINES.map(chapter => (
                <button
                  key={chapter.id}
                  onClick={() => setSelectedChapter(chapter)}
                  className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1 cursor-pointer ${
                    selectedChapter.id === chapter.id
                      ? 'bg-cyan-950/80 border-cyan-500/60 shadow-md text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-cyan-400">
                    {chapter.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-semibold leading-tight">{chapter.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Chapter Content */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                Official Clinical Protocol
              </span>
              <h2 className="text-xl font-black text-white mt-1">{selectedChapter.title}</h2>
              <div className="text-xs text-slate-400 mt-0.5">Source: {selectedChapter.source}</div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {selectedChapter.overview}
              </p>
            </div>

            {/* Protocol Steps */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                First Aid & Emergency Management Protocol
              </h3>
              <div className="space-y-2 text-xs">
                {selectedChapter.firstAidProtocol.map((step, idx) => (
                  <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-slate-200">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Contraindications & Red Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-red-950/30 border border-red-500/30 p-4 rounded-2xl space-y-2">
                <span className="font-bold text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Prohibited & Hazardous Practices:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {selectedChapter.contraindicationsAndWarnings.map((warn, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{warn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-2xl space-y-2">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Hospital Referral Criteria:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {selectedChapter.referralCriteria.map((ref, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Emergency Drug Formulary */}
      {activeSubTab === 'drugs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Drug Search & List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={drugSearchQuery}
                onChange={(e) => setDrugSearchQuery(e.target.value)}
                placeholder="Search generic, brand, or drug class..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {filteredDrugs.map(drug => (
                <button
                  key={drug.id}
                  onClick={() => setSelectedDrug(drug)}
                  className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1 cursor-pointer ${
                    selectedDrug.id === drug.id
                      ? 'bg-purple-950/80 border-purple-500/60 shadow-md text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{drug.genericName}</span>
                    <span className="text-[10px] text-purple-400 font-mono">{drug.brandNames[0]}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate">{drug.drugClass}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Drug Monograph */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">
                Official Drug Monograph
              </span>
              <h2 className="text-xl font-black text-white mt-1">{selectedDrug.genericName}</h2>
              <div className="text-slate-400 text-xs">
                Class: <strong className="text-slate-200">{selectedDrug.drugClass}</strong>
              </div>
              <div className="text-slate-400 text-xs">
                Common Brands: <strong className="text-slate-200">{selectedDrug.brandNames.join(', ')}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-cyan-300 block mb-1">Adult Dosage & Route:</span>
                <p className="text-slate-300 leading-relaxed">{selectedDrug.adultDose}</p>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-cyan-300 block mb-1">Pediatric Dosage:</span>
                <p className="text-slate-300 leading-relaxed">{selectedDrug.pediatricDose || 'See specialized pediatric protocol.'}</p>
              </div>
            </div>

            {/* Contraindications */}
            <div className="bg-red-950/30 border border-red-500/30 p-3.5 rounded-xl space-y-1.5">
              <span className="font-bold text-red-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Contraindications:
              </span>
              <ul className="space-y-1 text-slate-300">
                {selectedDrug.contraindications.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>

            {/* Major Interactions */}
            <div className="bg-amber-950/30 border border-amber-500/30 p-3.5 rounded-xl space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Clinically Significant Interactions:
              </span>
              <div className="space-y-2">
                {selectedDrug.majorInteractions.map((inter, i) => (
                  <div key={i} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white mb-1">
                      <span>{inter.interactingDrug}</span>
                      <span className="uppercase text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                        {inter.severity}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-tight mb-1">{inter.effect}</p>
                    <div className="text-[10px] text-cyan-400 font-semibold">Management: {inter.management}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Administration Pearls */}
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200">Pharmacist Administration Pearl:</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">{selectedDrug.administrationPearls}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
