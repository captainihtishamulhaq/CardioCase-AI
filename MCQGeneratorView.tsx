import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SAMPLE_MCQS, generateCustomMCQs } from '../data';
import { MCQQuestion } from '../types';
import {
  ClipboardList,
  AlertTriangle,
  Award,
  ArrowRight,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';

interface MCQGeneratorViewProps {
  onAddXp: (amount: number) => void;
  onIncrementQuizzes: () => void;
}

export default function MCQGeneratorView({ onAddXp, onIncrementQuizzes }: MCQGeneratorViewProps) {
  const [quizTopic, setQuizTopic] = useState('');
  const [questions, setQuestions] = useState<MCQQuestion[]>(SAMPLE_MCQS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (optionIndex: number) => {
    if (submitted) return; // cannot change answer once submitted/reviewed
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let finalScore = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        finalScore += 1;
      }
    });
    setScore(finalScore);
    setSubmitted(true);
    onIncrementQuizzes();
    onAddXp(finalScore * 10); // 10 XP per correct answer!
  };

  const handleGenerateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTopic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateCustomMCQs(quizTopic);
      setQuestions(generated);
      setCurrentIndex(0);
      setSelectedAnswers({});
      setSubmitted(false);
      setScore(0);
      setIsGenerating(false);
      onAddXp(5); // bonus for custom gen
    }, 800);
  };

  const resetQuiz = () => {
    setQuestions(SAMPLE_MCQS);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setQuizTopic('');
  };

  const progressPct = ((Object.keys(selectedAnswers).length) / questions.length) * 100;

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
        {/* Left Grid column: Quiz Options / Progress */}
        <div className="lg:col-span-1 space-y-6">
          {/* Custom Generator */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 font-display">
              <Sparkles className="w-4.5 h-4.5 text-blue-600" />
              Generate Quiz
            </h3>
            <form onSubmit={handleGenerateCustom} className="space-y-4">
              <input
                type="text"
                placeholder="e.g. Arrhythmias, Shock"
                value={quizTopic}
                onChange={(e) => setQuizTopic(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                id="btn-mcq-custom-generate"
                type="submit"
                disabled={isGenerating}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs md:text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? 'Assembling MCQs...' : 'Generate 10 Questions'}
              </button>
            </form>

            <button
              id="btn-mcq-reset-core"
              onClick={resetQuiz}
              className="mt-3 w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-lg text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset to Core MCQ Block
            </button>
          </div>

          {/* Stepper tracker */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 font-display">
              Progress Tracker
            </h3>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((_, idx) => {
                const isSelected = selectedAnswers[idx] !== undefined;
                const isCurrent = currentIndex === idx;
                let stepColor = 'bg-slate-50 text-slate-500 border-slate-100';

                if (submitted) {
                  const isCorrect = selectedAnswers[idx] === questions[idx].correctIndex;
                  stepColor = isCorrect
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                    : 'bg-rose-100 border-rose-300 text-rose-800 font-bold';
                } else if (isCurrent) {
                  stepColor = 'bg-blue-600 text-white border-blue-600 scale-105 shadow-md';
                } else if (isSelected) {
                  stepColor = 'bg-blue-50 text-blue-700 border-blue-200';
                }

                return (
                  <button
                    id={`btn-mcq-step-${idx}`}
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-8 h-8 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${stepColor}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Grid column: Active Question */}
        <div className="lg:col-span-3 space-y-6">
          {!submitted ? (
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-xs text-slate-400">
                  {Object.keys(selectedAnswers).length} of {questions.length} answered
                </span>
              </div>

              {/* Question text */}
              <h2 className="text-base md:text-lg font-bold text-slate-800 leading-normal mb-6">
                {questions[currentIndex]?.question}
              </h2>

              {/* Options list */}
              <div className="space-y-3.5 mb-8">
                {questions[currentIndex]?.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentIndex] === idx;
                  return (
                    <button
                      id={`btn-mcq-opt-${idx}`}
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs md:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold shadow-2xs'
                          : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Control row */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                <div className="flex gap-2">
                  <button
                    id="btn-mcq-prev"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-600 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    id="btn-mcq-next"
                    onClick={handleNext}
                    disabled={currentIndex === questions.length - 1}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-600 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  >
                    Next
                  </button>
                </div>

                {Object.keys(selectedAnswers).length === questions.length ? (
                  <button
                    id="btn-mcq-submit-quiz"
                    onClick={calculateScore}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-100 cursor-pointer"
                  >
                    Submit & Grade Quiz
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 font-semibold">
                    Answer all questions to grade
                  </span>
                )}
              </div>
            </div>
          ) : (
            // Quiz Results & Comprehensive Rationale Review
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md text-center"
              >
                <div className="inline-flex p-4 bg-blue-50 rounded-full text-blue-600 mb-4">
                  <Award className="w-10 h-10 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Quiz Completed!</h2>
                <p className="text-slate-500 text-sm mt-1 mb-6">
                  You scored <strong className="text-slate-800">{score} out of {questions.length}</strong> correct.
                </p>

                <div className="inline-block px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100 text-blue-800 text-sm font-semibold">
                  You earned <span className="text-lg font-bold text-blue-700">+{score * 10} XP</span> for your medical telemetry.
                </div>

                <div className="mt-6">
                  <button
                    id="btn-mcq-retake"
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Retake or Generate New Quiz
                  </button>
                </div>
              </motion.div>

              {/* Rationale feedback list */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 font-display">
                  <Info className="w-4 h-4 text-blue-500" />
                  Detailed Question Rationale & Review
                </h3>

                {questions.map((q, idx) => {
                  const userAnswer = selectedAnswers[idx];
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div
                      key={q.id || idx}
                      className={`p-6 rounded-2xl border bg-white shadow-xs ${
                        isCorrect ? 'border-emerald-100' : 'border-rose-100'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <span className="text-xs font-bold text-slate-400">
                          Question {idx + 1}
                        </span>
                        {isCorrect ? (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-100">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            Correct
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-rose-100">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            Incorrect
                          </span>
                        )}
                      </div>

                      <p className="text-slate-800 font-semibold text-sm mb-4">
                        {q.question}
                      </p>

                      <div className="space-y-2 mb-4">
                        {q.options.map((opt, optIdx) => {
                          let optStyle = 'bg-slate-50 text-slate-600 border-slate-100';

                          if (optIdx === q.correctIndex) {
                            optStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium';
                          } else if (optIdx === userAnswer && !isCorrect) {
                            optStyle = 'bg-rose-50 text-rose-800 border-rose-200';
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${optStyle}`}
                            >
                              <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-100/50">
                        <p className="text-xs text-slate-700 leading-relaxed">
                          <strong className="text-blue-700 font-semibold">Educational Explanation: </strong>
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
