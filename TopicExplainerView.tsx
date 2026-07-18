import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SAMPLE_TOPICS, generateCustomTopicExplanation } from '../data';
import { TopicExplanation } from '../types';
import {
  BookOpen,
  Search,
  Sparkles,
  HelpCircle,
  Activity,
  AlertTriangle,
  Lightbulb,
  Award
} from 'lucide-react';

interface TopicExplainerViewProps {
  onAddXp: (amount: number) => void;
  onIncrementTopics: () => void;
}

export default function TopicExplainerView({ onAddXp, onIncrementTopics }: TopicExplainerViewProps) {
  const [topicInput, setTopicInput] = useState('');
  const [activeTopic, setActiveTopic] = useState<TopicExplanation | null>(SAMPLE_TOPICS['atrial fibrillation']);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleTopicSelect = (topicKey: string) => {
    setActiveTopic(SAMPLE_TOPICS[topicKey]);
    setTopicInput('');
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;

    setIsSimulating(true);
    setTimeout(() => {
      const generated = generateCustomTopicExplanation(topicInput);
      setActiveTopic(generated);
      setIsSimulating(false);
      onAddXp(15);
      onIncrementTopics();
    }, 700);
  };

  const triggerPrebuiltXp = () => {
    onAddXp(10);
    onIncrementTopics();
    alert('Study review recorded! +10 XP added to your credentials.');
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
        {/* Left column: Topic Selection & Custom Search */}
        <div className="space-y-6 lg:col-span-1">
          {/* Quick Pre-builts */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 font-display">
              <BookOpen className="w-4.5 h-4.5 text-blue-600" />
              High-Yield Revision
            </h3>
            <div className="space-y-2.5">
              {Object.keys(SAMPLE_TOPICS).map((k) => (
                <button
                  id={`btn-topic-select-${k.replace(/\s+/g, '-')}`}
                  key={k}
                  onClick={() => handleTopicSelect(k)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-xs md:text-sm font-semibold transition-all border flex items-center justify-between cursor-pointer ${
                    activeTopic?.topic.toLowerCase().includes(k)
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="capitalize">{SAMPLE_TOPICS[k].topic}</span>
                  <Activity className="w-4 h-4 opacity-50" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Explainer */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 font-display">
              <Sparkles className="w-4.5 h-4.5 text-blue-600" />
              Explain Any Topic
            </h3>
            <form onSubmit={handleCustomSearch} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Tetralogy of Fallot"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
              </div>
              <button
                id="btn-topic-custom-explain"
                type="submit"
                disabled={isSimulating}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSimulating ? 'AI Compiling Factsheet...' : 'Explain with AI'}
              </button>
            </form>
          </div>
        </div>

        {/* Right column: Explainer Sheets */}
        <div className="lg:col-span-2">
          {activeTopic ? (
            <motion.div
              key={activeTopic.topic}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden"
            >
              {/* Factsheet Header */}
              <div className="p-6 bg-linear-to-r from-blue-50 to-indigo-50/50 border-b border-slate-200 flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Cardiovascular Factsheet
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2 font-display">
                    {activeTopic.topic}
                  </h2>
                </div>
                <button
                  id="btn-topic-claim-xp"
                  onClick={triggerPrebuiltXp}
                  className="px-3.5 py-2 bg-white text-blue-600 hover:text-blue-700 border border-slate-200 rounded-xl font-semibold text-xs transition-all flex items-center gap-1 cursor-pointer hover:bg-slate-50 shrink-0 shadow-xs"
                >
                  <Award className="w-4 h-4 text-yellow-500" />
                  Mark Reviewed (+10 XP)
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Definition */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Medical Definition
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed p-4 bg-blue-50/20 border border-blue-100/50 rounded-2xl">
                    {activeTopic.definition}
                  </p>
                </div>

                {/* Grid for Causes and Symptoms */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Etiology/Causes */}
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Etiology & Causes
                    </h4>
                    <ul className="space-y-2">
                      {activeTopic.causes.map((c, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Signs/Symptoms */}
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Clinical Presentation
                    </h4>
                    <ul className="space-y-2">
                      {activeTopic.symptoms.map((s, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Diagnostics */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Diagnostic Criteria & Evaluation
                  </h4>
                  <div className="space-y-2">
                    {activeTopic.diagnosis.map((d, i) => (
                      <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5 shadow-2xs">
                        <span className="text-blue-600 font-bold mt-0.5">{i + 1}.</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Management Overview */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Management Overview
                  </h4>
                  <div className="space-y-2.5">
                    {activeTopic.management.map((m, i) => (
                      <div key={i} className="p-3.5 bg-slate-50/60 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mnemonics */}
                {activeTopic.mnemonics && activeTopic.mnemonics.length > 0 && (
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-blue-700">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      High-Yield Mnemonics
                    </h4>
                    <div className="space-y-4">
                      {activeTopic.mnemonics.map((mnem, i) => (
                        <div key={i} className="p-4 bg-yellow-50/40 border border-yellow-100 rounded-2xl">
                          <span className="text-xs font-bold text-yellow-800 uppercase tracking-wider">
                            {mnem.phrase}
                          </span>
                          <div className="grid sm:grid-cols-2 gap-2 mt-3">
                            {mnem.expansion.map((ex, exI) => (
                              <div key={exI} className="text-xs text-slate-700 flex gap-2">
                                <strong className="text-blue-600 font-semibold w-6 shrink-0">{ex.key}</strong>
                                <span>{ex.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="h-64 bg-slate-50 rounded-3xl flex flex-col items-center justify-center border border-slate-200 border-dashed text-slate-400">
              <BookOpen className="w-12 h-12 mb-3" />
              <span>Search or select a topic to view its detailed revision sheets.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
