import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SAMPLE_SUMMARIES, generateCustomNotesSummary } from '../data';
import { NotesSummary } from '../types';
import {
  FileText,
  AlertTriangle,
  Award,
  Sparkles,
  BookmarkCheck,
  Lightbulb,
  CornerDownRight,
  ClipboardList
} from 'lucide-react';

interface NotesSummarizerViewProps {
  onAddXp: (amount: number) => void;
  onIncrementSummaries: () => void;
}

export default function NotesSummarizerView({ onAddXp, onIncrementSummaries }: NotesSummarizerViewProps) {
  const [pastedNotes, setPastedNotes] = useState('');
  const [activeSummary, setActiveSummary] = useState<NotesSummary | null>(SAMPLE_SUMMARIES['coronary artery disease']);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSelectPrebuilt = (key: string) => {
    setActiveSummary(SAMPLE_SUMMARIES[key]);
    setPastedNotes('');
  };

  const handleCustomSummarize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedNotes.trim()) return;

    setIsSummarizing(true);
    setTimeout(() => {
      const generated = generateCustomNotesSummary(pastedNotes);
      setActiveSummary(generated);
      setIsSummarizing(false);
      onAddXp(20);
      onIncrementSummaries();
    }, 700);
  };

  const triggerPrebuiltXp = () => {
    onAddXp(10);
    onIncrementSummaries();
    alert('Lecture summary completed! +10 XP added to your telemetry.');
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
        {/* Left Grid: paste input or selection */}
        <div className="space-y-6 lg:col-span-1">
          {/* Prebuilt decks */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 font-display">
              <ClipboardList className="w-4.5 h-4.5 text-blue-600" />
              Pre-made Lecture Slides
            </h3>
            <div className="space-y-3">
              {Object.keys(SAMPLE_SUMMARIES).map((k) => (
                <button
                  id={`btn-lecture-select-${k.replace(/\s+/g, '-')}`}
                  key={k}
                  onClick={() => handleSelectPrebuilt(k)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs md:text-sm font-semibold transition-all flex flex-col gap-1.5 cursor-pointer ${
                    activeSummary?.title.toLowerCase().includes(k)
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold capitalize">{k}</span>
                  <span className={`text-[10px] ${activeSummary?.title.toLowerCase().includes(k) ? 'text-blue-100' : 'text-slate-400'}`}>
                    High-yield board syllabus
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Paste Input */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 font-display">
              <Sparkles className="w-4.5 h-4.5 text-blue-600" />
              Paste Lecture Slides
            </h3>
            <form onSubmit={handleCustomSummarize} className="space-y-4">
              <textarea
                placeholder="Paste unstructured notes, slide transcripts, or clinical syllabus guidelines here..."
                value={pastedNotes}
                onChange={(e) => setPastedNotes(e.target.value)}
                rows={6}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
              />
              <button
                id="btn-lecture-custom-summarize"
                type="submit"
                disabled={isSummarizing}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSummarizing ? 'Processing notes...' : 'Summarize Lecture'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Grid: Output Sheet */}
        <div className="lg:col-span-2">
          {activeSummary ? (
            <motion.div
              key={activeSummary.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden"
            >
              {/* Output Header */}
              <div className="p-6 bg-linear-to-r from-blue-50 to-indigo-50/50 border-b border-slate-200 flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Syllabus Summary Outline
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2 font-display">
                    {activeSummary.title}
                  </h2>
                </div>
                <button
                  id="btn-lecture-claim-xp"
                  onClick={triggerPrebuiltXp}
                  className="px-3.5 py-2 bg-white text-blue-600 hover:text-blue-700 border border-slate-200 rounded-xl font-semibold text-xs transition-all flex items-center gap-1 cursor-pointer hover:bg-slate-50 shrink-0 shadow-xs"
                >
                  <Award className="w-4 h-4 text-yellow-500" />
                  Mark Read (+10 XP)
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Executive Summary */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <FileText className="w-4 h-4 text-blue-500" />
                    Executive Summary
                  </h4>
                  <p className="text-slate-700 text-xs md:text-sm leading-relaxed p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    {activeSummary.summary}
                  </p>
                </div>

                {/* Key Points */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-blue-700">
                    <BookmarkCheck className="w-4 h-4 text-blue-600" />
                    Key Bullet Highlights
                  </h4>
                  <div className="space-y-2">
                    {activeSummary.keyPoints.map((pt, i) => (
                      <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2 shadow-2xs">
                        <CornerDownRight className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exam Tips */}
                {activeSummary.examTips && activeSummary.examTips.length > 0 && (
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-amber-700">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      High-Yield Exam Tips
                    </h4>
                    <div className="space-y-3">
                      {activeSummary.examTips.map((tip, i) => (
                        <div key={i} className="p-4 bg-amber-50/40 border border-amber-100 rounded-2xl text-xs text-amber-900 leading-relaxed">
                          <span className="font-bold text-amber-800">TIP #{i + 1}: </span>
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="h-64 bg-slate-50 rounded-3xl flex flex-col items-center justify-center border border-slate-200 border-dashed text-slate-400">
              <FileText className="w-12 h-12 mb-3" />
              <span>Paste lecture slides or select a pre-made deck on the left.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
