import React from 'react';
import { motion } from 'motion/react';
import { Heart, Brain, FileText, GraduationCap, ClipboardList, BookOpen, ChevronRight, Activity } from 'lucide-react';
import { ScreenType } from '../types';

interface HomeViewProps {
  onNavigate: (screen: ScreenType) => void;
  isLoggedIn: boolean;
}

export default function HomeView({ onNavigate, isLoggedIn }: HomeViewProps) {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-blue-600" />,
      title: 'AI Clinical Case Analyzer',
      description: 'Enter symptoms to study potential differentials, suggested clinical diagnostics, and critical safety red flags.'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      title: 'AI Topic Explainer',
      description: 'Receive detailed medical definitions, causes, management plans, and highly memorable cardiac mnemonics.'
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
      title: 'Interactive MCQ Generator',
      description: 'Practice with custom-generated multiple-choice questions, complete with immediate, thorough explanations.'
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: 'Lecture Notes Summarizer',
      description: 'Transform complex cardiology slide notes into neat outlines, high-yield bullet points, and key exam tips.'
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      title: 'Viva Practice Simulator',
      description: 'Test your clinical verbal reasoning skills against simulated oral exam panels with instant evaluation feedback.'
    },
    {
      icon: <Activity className="w-6 h-6 text-blue-600" />,
      title: 'Student Profile & Stats',
      description: 'Track your study milestones, completed mock quizzes, cases investigated, and view your active daily streak.'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-16">
      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-6 shadow-sm"
        >
          <Heart className="w-4 h-4 text-red-500 animate-pulse fill-red-500" />
          BS Cardiology & Medical Study Companion
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 font-display"
        >
          CardioCase <span className="text-blue-600">AI</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-medium"
        >
          Your AI-powered Cardiology Study Companion. Accelerate your cardiovascular clinical reasoning, master exam-style MCQs, and excel in your clinical viva preparations.
        </motion.p>

        {/* Pulsing ECG Design element */}
        <div className="flex justify-center items-center mb-10">
          <div className="relative w-48 h-12 flex items-center justify-center">
            <svg className="w-full h-full text-blue-400 stroke-2 fill-none" viewBox="0 0 200 40">
              <path
                d="M 0 20 L 40 20 L 50 10 L 60 30 L 70 20 L 100 20 L 110 0 L 120 40 L 130 20 L 160 20 L 170 15 L 180 25 L 190 20 L 200 20"
                strokeDasharray="400"
                strokeDashoffset="0"
                className="animate-[dash_3s_linear_infinite]"
              />
            </svg>
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button
            id="btn-home-get-started"
            onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'login')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all hover:translate-y-[-2px] flex items-center justify-center gap-2 cursor-pointer"
          >
            Get Started Studying
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {!isLoggedIn && (
            <button
              id="btn-home-login-direct"
              onClick={() => onNavigate('login')}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold shadow-sm transition-all cursor-pointer"
            >
              Sign In to Save Stats
            </button>
          )}
        </motion.div>
      </div>

      {/* Grid Features */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">High-Yield Study Tools</h2>
          <p className="text-slate-500 mt-2">Everything BS Cardiology and clinical students need to master the curriculum</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group hover:border-blue-500/50"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cardiology Target Audience Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-20 p-8 bg-linear-to-r from-blue-600 to-indigo-700 rounded-3xl text-white text-center shadow-xl relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 opacity-10 translate-x-12 translate-y-[-12px]">
          <Heart className="w-64 h-64" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-3">Designed for the Cardiology Cohort</h3>
        <p className="text-blue-100 max-w-2xl mx-auto mb-6">
          Tailored to the rigorous academic demands of medical schools, Board examinations, and Bachelor of Science in Cardiology curricula.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold">
          <span className="px-3 py-1.5 bg-white/10 rounded-full border border-white/20">Anatomy & Physiology</span>
          <span className="px-3 py-1.5 bg-white/10 rounded-full border border-white/20">ECG Interpretation</span>
          <span className="px-3 py-1.5 bg-white/10 rounded-full border border-white/20">Pharmacology</span>
          <span className="px-3 py-1.5 bg-white/10 rounded-full border border-white/20">Clinical Reasoning</span>
        </div>
      </motion.div>
    </div>
  );
}
