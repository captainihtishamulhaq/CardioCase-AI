import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SAMPLE_CASES, generateCustomClinicalCase } from '../data';
import { ClinicalCase } from '../types';
import {
  Brain,
  Search,
  Activity,
  AlertTriangle,
  Stethoscope,
  ChevronRight,
  ClipboardCheck,
  Award,
  Sparkles
} from 'lucide-react';

interface ClinicalCaseViewProps {
  onAddXp: (amount: number) => void;
  onIncrementCases: () => void;
}

export default function ClinicalCaseView({ onAddXp, onIncrementCases }: ClinicalCaseViewProps) {
  const [symptomsInput, setSymptomsInput] = useState('');
  const [activeCase, setActiveCase] = useState<ClinicalCase | null>(SAMPLE_CASES[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleCaseSelect = (caseObj: ClinicalCase) => {
    setActiveCase(caseObj);
    setSymptomsInput('');
  };

  const handleCustomAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomsInput.trim()) return;

    setIsSimulating(true);
    setTimeout(() => {
      const generated = generateCustomClinicalCase(symptomsInput);
      setActiveCase(generated);
      setIsSimulating(false);
      onAddXp(20);
      onIncrementCases();
    }, 800);
  };

  const triggerPrebuiltXp = () => {
    onAddXp(10);
    onIncrementCases();
    alert('Study points collected! +10 XP added to your telemetry.');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-8">
      {/* Disclaimer Header */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">EDUCATIONAL ONLY DISCLAIMER:</span> For Educational Purposes Only. This application does not provide medical diagnosis or treatment.
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Side: Inputs */}
        <div className="space-y-6 lg:col-span-1">
          {/* Preset templates */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 font-display">
              <ClipboardCheck className="w-4.5 h-4.5 text-blue-600" />
              High-Yield Cases
            </h3>
            <div className="space-y-3">
              {SAMPLE_CASES.map((c) => (
                <button
                  id={`btn-case-select-${c.id}`}
                  key={c.id}
                  onClick={() => handleCaseSelect(c)}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs md:text-sm transition-all border flex flex-col gap-1.5 cursor-pointer ${
                    activeCase?.id === c.id
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold line-clamp-1">{c.title}</span>
                  <span className={`text-[10px] ${activeCase?.id === c.id ? 'text-blue-100' : 'text-slate-400'} line-clamp-1`}>
                    {c.demographics}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Symptoms Input */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 font-display">
              <Stethoscope className="w-4.5 h-4.5 text-blue-600" />
              Analyze Custom Symptoms
            </h3>
            <form onSubmit={handleCustomAnalyze} className="space-y-4">
              <textarea
                placeholder="Describe patient demographics and symptoms (e.g., '62-year-old male with sudden substernal tightness and cold sweat during exercise...')"
                value={symptomsInput}
                onChange={(e) => setSymptomsInput(e.target.value)}
                rows={4}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
              />
              <button
                id="btn-case-custom-analyze"
                type="submit"
                disabled={isSimulating}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSimulating ? (
                  <span>Generating AI Analysis...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate AI Case Analysis
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Output */}
        <div className="lg:col-span-2">
          {activeCase ? (
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 bg-linear-to-r from-blue-50 to-indigo-50/50 border-b border-slate-200 flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Educational Interactive Case
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2 font-display">
                    {activeCase.title}
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm mt-1">
                    {activeCase.demographics}
                  </p>
                </div>
                <button
                  id="btn-case-claim-xp"
                  onClick={triggerPrebuiltXp}
                  className="px-3.5 py-2 bg-white text-blue-600 hover:text-blue-700 border border-slate-200 rounded-xl font-semibold text-xs transition-all flex items-center gap-1 cursor-pointer hover:bg-slate-50 shrink-0"
                >
                  <Award className="w-4 h-4 text-yellow-500" />
                  Claim +10 XP
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Presenting Symptoms */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Presenting Clinical History
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed p-4 bg-slate-50/60 rounded-2xl border border-slate-200">
                    "{activeCase.symptoms}"
                  </p>
                </div>

                {/* Differential Diagnosis (Educational Only) */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Differential Diagnosis (Educational Exercise Only)
                  </h4>
                  <div className="space-y-3">
                    {activeCase.differentials.map((diff, index) => {
                      const probColors =
                        diff.probability === 'High'
                          ? 'bg-rose-50 text-rose-700 border-rose-100'
                          : diff.probability === 'Moderate'
                          ? 'bg-amber-50 text-amber-700 border-amber-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100';

                      return (
                        <div
                          key={index}
                          className="p-4 border border-slate-200 rounded-2xl bg-white shadow-xs"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-sm text-slate-800">
                              {diff.diagnosis}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${probColors}`}>
                              {diff.probability} Probability
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            {diff.rationale}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Suggested Investigations */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Recommended Diagnostics & Investigations
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {activeCase.investigations.map((inv, index) => (
                      <div
                        key={index}
                        className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-slate-800">
                              {inv.test}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                                inv.priority === 'Immediate'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {inv.priority}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                            <span className="font-semibold text-slate-600">Expected Findings:</span> {inv.expectedFindings}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning points & Red flags */}
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                  {/* Learning points */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 text-blue-700">
                      <Activity className="w-4 h-4" />
                      Key Study Points
                    </h4>
                    <ul className="space-y-2">
                      {activeCase.learningPoints.map((pt, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                          <span className="text-blue-500 font-bold mt-0.5 shrink-0">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Red flags */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 text-red-700">
                      <AlertTriangle className="w-4 h-4" />
                      Clinical Warning Red Flags
                    </h4>
                    <ul className="space-y-2">
                      {activeCase.redFlags.map((rf, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                          <span className="text-red-500 font-bold mt-0.5 shrink-0">!</span>
                          <span>{rf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-64 bg-slate-50 rounded-3xl flex flex-col items-center justify-center border border-slate-200 border-dashed text-slate-400">
              <Brain className="w-12 h-12 mb-3" />
              <span>Select or describe a case symptoms on the left to start analyzing.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
