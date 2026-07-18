import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SAMPLE_VIVA, generateCustomVivaQuestions } from '../data';
import { VivaQuestion } from '../types';
import {
  GraduationCap,
  AlertTriangle,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  RefreshCw,
  TrendingUp,
  Flame
} from 'lucide-react';

interface VivaPracticeViewProps {
  onAddXp: (amount: number) => void;
}

export default function VivaPracticeView({ onAddXp }: VivaPracticeViewProps) {
  const [topicInterest, setTopicInterest] = useState('');
  const [questions, setQuestions] = useState<VivaQuestion[]>(SAMPLE_VIVA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<{
    score: number;
    matchedKeywords: string[];
    missedKeywords: string[];
    evaluation: string;
    tips: string;
  } | null>(null);

  const handleGenerateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInterest.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateCustomVivaQuestions(topicInterest);
      setQuestions(generated);
      setCurrentIndex(0);
      setUserAnswer('');
      setActiveFeedback(null);
      setIsGenerating(false);
      onAddXp(5);
    }, 700);
  };

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;

    const currentQ = questions[currentIndex];
    const textLower = userAnswer.toLowerCase();
    
    // Calculate matched keywords
    const matched: string[] = [];
    const missed: string[] = [];
    
    currentQ.expectedKeywords.forEach((kw) => {
      if (textLower.includes(kw.toLowerCase())) {
        matched.push(kw);
      } else {
        missed.push(kw);
      }
    });

    // Score based on matching keyword ratio
    const ratio = matched.length / currentQ.expectedKeywords.length;
    let score = Math.round(ratio * 10);
    if (score < 1) score = 2; // base score for trying

    let evaluation = '';
    let tips = '';

    if (score >= 8) {
      evaluation = 'Excellent clinical verbal reasoning! You successfully addressed all core cardiac pathophysiological concepts.';
      tips = 'Perfect high-yield preparation. During the live viva, maintain this calm pace and speak with clear anatomical references.';
    } else if (score >= 5) {
      evaluation = 'Good diagnostic understanding, but you missed a few key critical medical terms or precise keywords.';
      tips = `Try to explicitly mention: ${missed.join(', ')} to secure top-tier marks on this topic.`;
    } else {
      evaluation = 'Your response is too brief or lacks the vital cardiovascular vocabulary expected by the examiners.';
      tips = `Revise this clinical mechanism. Specifically study and outline: ${missed.join(', ')}.`;
    }

    setActiveFeedback({
      score,
      matchedKeywords: matched,
      missedKeywords: missed,
      evaluation,
      tips
    });

    onAddXp(score * 5); // 5 XP per score point!
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setActiveFeedback(null);
    }
  };

  const resetPractice = () => {
    setQuestions(SAMPLE_VIVA);
    setCurrentIndex(0);
    setUserAnswer('');
    setActiveFeedback(null);
    setTopicInterest('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-8">
      {/* Disclaimer Header */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">EDUCATIONAL ONLY DISCLAIMER:</span> For Educational Purposes Only. This application does not provide medical diagnosis or treatment.
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left column: Topic Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 font-display">
              <Sparkles className="w-4.5 h-4.5 text-blue-600" />
              Viva Topic Interest
            </h3>
            <form onSubmit={handleGenerateCustom} className="space-y-4">
              <input
                type="text"
                placeholder="e.g. Rheumatic, Valves"
                value={topicInterest}
                onChange={(e) => setTopicInterest(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                id="btn-viva-custom-generate"
                type="submit"
                disabled={isGenerating}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs md:text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? 'Summoning Examiners...' : 'Summon Panel Questions'}
              </button>
            </form>

            <button
              id="btn-viva-reset"
              onClick={resetPractice}
              className="mt-3 w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-lg text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset to Core Viva Set
            </button>
          </div>

          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 flex flex-col items-center text-center">
            <TrendingUp className="w-8 h-8 text-indigo-500 mb-2" />
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Board Viva Tip</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Medical external examiners check for precise pathophysiological keywords. Prioritize stating molecular structures and hemodynamic terms.
            </p>
          </div>
        </div>

        {/* Right column: active oral question panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                Examiner Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-400">Oral Board Simulation</span>
            </div>

            {/* Question Text */}
            <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 mb-6">
              <p className="text-slate-800 font-bold text-sm md:text-base leading-relaxed">
                "{questions[currentIndex]?.question}"
              </p>
            </div>

            {/* Answer Field */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Speak or Type your clinical answer below:
              </label>
              <textarea
                placeholder="Type your explanation using appropriate cardiological terminology. Hit Evaluate once you are ready for grading..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                rows={6}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all resize-none"
              />

              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <button
                  id="btn-viva-evaluate"
                  onClick={handleEvaluate}
                  disabled={!userAnswer.trim()}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-45 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-100 cursor-pointer"
                >
                  Evaluate Answer
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    id="btn-viva-next"
                    onClick={handleNext}
                    className="px-4 py-2 hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Next Question
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 font-semibold">Final Panel Question reached</span>
                )}
              </div>
            </div>
          </div>

          {/* Grading Evaluation Box */}
          {activeFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-800 text-base font-display">Viva Rubric Evaluation</h3>
                  <p className="text-xs text-slate-400">Grading rubric based on key concepts matching</p>
                </div>
                {/* Score */}
                <div className="text-center bg-purple-50 px-4 py-2 rounded-2xl border border-purple-100">
                  <span className="text-[10px] font-bold text-purple-700 uppercase block tracking-wider">Score</span>
                  <span className="text-xl font-black text-purple-800">{activeFeedback.score}/10</span>
                </div>
              </div>

              {/* Matched / Missed Keywords indicators */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                {/* Matched */}
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <span className="font-bold text-emerald-800 block mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Keywords Addressed
                  </span>
                  {activeFeedback.matchedKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {activeFeedback.matchedKeywords.map((kw, idx) => (
                        <span key={idx} className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-[11px]">No exact expected medical terms hit.</span>
                  )}
                </div>

                {/* Missed */}
                <div className="p-3 bg-rose-50/30 rounded-xl border border-rose-100">
                  <span className="font-bold text-rose-800 block mb-1.5 flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Keywords Missed
                  </span>
                  {activeFeedback.missedKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {activeFeedback.missedKeywords.map((kw, idx) => (
                        <span key={idx} className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-emerald-700 text-[11px] font-semibold">Perfect! Stated all critical terms.</span>
                  )}
                </div>
              </div>

              {/* Feedback rationale */}
              <div className="space-y-2">
                <p className="text-xs text-slate-700 font-medium">
                  <strong className="text-slate-900 font-bold">Feedback: </strong> {activeFeedback.evaluation}
                </p>
                <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100/50 text-xs text-purple-950">
                  <strong className="font-bold">Clinical Prep Tip: </strong> {activeFeedback.tips}
                </div>
              </div>

              {/* Reference Model Answer disclosure */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <details className="cursor-pointer group">
                  <summary className="font-bold text-slate-700 flex justify-between items-center">
                    <span>Reveal High-Yield Model Answer</span>
                    <span className="text-[10px] text-slate-400 group-open:hidden">(Click to view)</span>
                  </summary>
                  <p className="text-slate-600 mt-2 leading-relaxed p-3 bg-white border border-slate-50 rounded-lg">
                    {questions[currentIndex]?.modelAnswer}
                  </p>
                </details>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
