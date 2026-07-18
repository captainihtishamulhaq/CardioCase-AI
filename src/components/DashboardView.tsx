import React from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  User,
  HeartPulse,
  Flame,
  Award,
  BookMarked,
  ArrowRight
} from 'lucide-react';
import { ScreenType, UserProfile } from '../types';

interface DashboardViewProps {
  profile: UserProfile;
  onNavigate: (screen: ScreenType) => void;
}

export default function DashboardView({ profile, onNavigate }: DashboardViewProps) {
  const cards = [
    {
      id: 'clinical_case',
      icon: <Brain className="w-7 h-7 text-rose-500" />,
      bgIcon: "bg-rose-50",
      title: 'AI Clinical Case',
      description: 'Enter cardiopulmonary symptoms to analyze differential diagnoses, diagnostic plans, and clinical red flags.',
      badge: 'Interactive Cases',
      badgeColor: 'bg-rose-100 text-rose-700',
      stat: `${profile.casesAnalyzed} Cases Analyzed`
    },
    {
      id: 'topic_explainer',
      icon: <BookOpen className="w-7 h-7 text-blue-500" />,
      bgIcon: "bg-blue-50",
      title: 'AI Topic Explainer',
      description: 'Input any complex cardiac disease or pathway to get definitions, etiology, symptoms, and mnemonics.',
      badge: 'Quick Revision',
      badgeColor: 'bg-blue-100 text-blue-700',
      stat: `${profile.topicsExplored} Topics Explored`
    },
    {
      id: 'mcq_generator',
      icon: <ClipboardList className="w-7 h-7 text-emerald-500" />,
      bgIcon: "bg-emerald-50",
      title: 'MCQ Generator',
      description: 'Generate high-yield mock board quizzes with 10 questions. Get instantaneous score feedback and rationale.',
      badge: 'Practice Exam',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      stat: `${profile.quizzesCompleted} Quizzes Taken`
    },
    {
      id: 'notes_summarizer',
      icon: <FileText className="w-7 h-7 text-amber-500" />,
      bgIcon: "bg-amber-50",
      title: 'Notes Summarizer',
      description: 'Paste unstructured cardiology lecture notes or slides to organize them into neat high-yield exam outlines.',
      badge: 'Study Deck',
      badgeColor: 'bg-amber-100 text-amber-700',
      stat: `${profile.summariesCreated} Summaries Made`
    },
    {
      id: 'viva_practice',
      icon: <GraduationCap className="w-7 h-7 text-purple-500" />,
      bgIcon: "bg-purple-50",
      title: 'Viva Practice',
      description: 'Simulate the oral viva voce exam. Answer cardiac panel questions and receive structured rubric grading.',
      badge: 'Oral Exam Prep',
      badgeColor: 'bg-purple-100 text-purple-700',
      stat: 'Interactive Verbal Prep'
    },
    {
      id: 'profile',
      icon: <User className="w-7 h-7 text-indigo-500" />,
      bgIcon: "bg-indigo-50",
      title: 'Profile & Statistics',
      description: 'Review your total study XP, weekly metrics progress, institution registration, and learning achievement badges.',
      badge: 'Milestones',
      badgeColor: 'bg-indigo-100 text-indigo-700',
      stat: `${profile.xp} Total XP`
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Welcome banner */}
      <div className="bg-linear-to-r from-blue-700 to-indigo-800 rounded-3xl p-6 md:p-8 text-white mb-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-6">
          <HeartPulse className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-semibold tracking-wider uppercase mb-1">
            {profile.institution}
          </p>
          <h1 className="text-2xl md:text-3.5xl font-extrabold tracking-tight mb-2 font-display">
            Welcome, {profile.fullName}!
          </h1>
          <p className="text-blue-100/90 max-w-xl text-sm md:text-base mb-6 font-medium">
            Your study telemetry looks strong. Work on a Viva exam prep session or review a clinical case to extend your daily streak.
          </p>

          {/* Quick Stat Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
              </div>
              <div>
                <p className="text-xs text-blue-200">Study Streak</p>
                <p className="font-bold text-sm md:text-base">{profile.streakDays} Days Active</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-blue-200">Total Study XP</p>
                <p className="font-bold text-sm md:text-base">{profile.xp} XP</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <p className="text-xs text-blue-200">Cases Solved</p>
                <p className="font-bold text-sm md:text-base">{profile.casesAnalyzed} Solved</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <BookMarked className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-blue-200">Quizzes Taken</p>
                <p className="font-bold text-sm md:text-base">{profile.quizzesCompleted} Finished</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 font-display">
          <HeartPulse className="w-5 h-5 text-blue-600 animate-pulse" />
          Interactive Cardiology Core Modules
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              onClick={() => onNavigate(card.id as ScreenType)}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 ${card.bgIcon} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    {card.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between mt-4">
                <span className="text-xs font-semibold text-slate-400">
                  {card.stat}
                </span>
                <span className="text-blue-600 text-xs font-bold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Open Module
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
