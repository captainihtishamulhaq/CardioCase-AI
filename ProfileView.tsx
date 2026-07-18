import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import {
  User,
  GraduationCap,
  Flame,
  Award,
  BookMarked,
  Brain,
  History,
  CheckCircle,
  FileText,
  Trash2,
  RefreshCw,
  Mail,
  School
} from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  onResetStats: () => void;
  onModifyProfile: (fullName: string, institution: string) => void;
}

export default function ProfileView({ profile, onResetStats, onModifyProfile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [fullNameInput, setFullNameInput] = React.useState(profile.fullName);
  const [institutionInput, setInstitutionInput] = React.useState(profile.institution);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onModifyProfile(fullNameInput, institutionInput);
    setIsEditing(false);
  };

  const achievements = [
    {
      title: 'First Responders',
      desc: 'Investigated first complex clinical case.',
      completed: profile.casesAnalyzed > 0,
      icon: <Brain className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50'
    },
    {
      title: 'MCQ Master',
      desc: 'Completed 3 high-yield quizzes successfully.',
      completed: profile.quizzesCompleted >= 3,
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50'
    },
    {
      title: 'Active Intern',
      desc: 'Maintained a 5-day continuous study streak.',
      completed: profile.streakDays >= 5,
      icon: <Flame className="w-5 h-5 text-orange-600" />,
      bg: 'bg-orange-50'
    },
    {
      title: 'Academic Registrar',
      desc: 'Generated and reviewed custom note outlines.',
      completed: profile.summariesCreated > 0,
      icon: <FileText className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center relative overflow-hidden">
            {/* Background color glow */}
            <div className="absolute top-0 inset-x-0 h-24 bg-linear-to-r from-blue-500 to-indigo-600" />
            
            <div className="relative pt-6 flex flex-col items-center">
              {/* Profile Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-white p-1 border-4 border-white shadow-md mb-4 flex items-center justify-center text-slate-800">
                <div className="w-full h-full bg-blue-50 rounded-xl flex items-center justify-center text-2xl font-bold text-blue-700">
                  {profile.fullName.substring(0, 2).toUpperCase()}
                </div>
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="w-full space-y-3 mt-2 text-left">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullNameInput}
                      onChange={(e) => setFullNameInput(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Institution</label>
                    <input
                      type="text"
                      required
                      value={institutionInput}
                      onChange={(e) => setInstitutionInput(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      id="btn-profile-save"
                      type="submit"
                      className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      id="btn-profile-cancel"
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 font-display">{profile.fullName}</h3>
                  <p className="text-slate-500 text-xs flex items-center justify-center gap-1">
                    <School className="w-3.5 h-3.5 text-slate-400" />
                    {profile.institution}
                  </p>
                  <p className="text-[11px] text-blue-600 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full inline-block uppercase tracking-wider">
                    BS Cardiology Student
                  </p>

                  <div className="pt-4">
                    <button
                      id="btn-profile-edit"
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Edit Profile Info
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 mt-6 pt-5 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {profile.email}
              </span>
            </div>
          </div>

          {/* Critical Study Reset */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-display">Administration</h4>
            <button
              id="btn-profile-reset-stats"
              onClick={() => {
                if (confirm('Are you sure you want to reset all of your Cardiology study telemetry and XP stats?')) {
                  onResetStats();
                }
              }}
              className="w-full py-2.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Reset Study Telemetry
            </button>
          </div>
        </div>

        {/* Right Column: Statistics & Achievements */}
        <div className="md:col-span-2 space-y-6">
          {/* Bento-style stats counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">XP Points</span>
              <span className="text-xl font-bold text-slate-800 block mt-1">{profile.xp}</span>
              <span className="text-[10px] text-blue-500 font-semibold">Total Level Up</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Study Streak</span>
              <span className="text-xl font-bold text-orange-600 block mt-1 flex items-center gap-1">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                {profile.streakDays}
              </span>
              <span className="text-[10px] text-slate-400">Continuous Days</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cases Reviewed</span>
              <span className="text-xl font-bold text-slate-800 block mt-1">{profile.casesAnalyzed}</span>
              <span className="text-[10px] text-rose-500 font-semibold">Diagnostics Analyzed</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Summaries</span>
              <span className="text-xl font-bold text-slate-800 block mt-1">{profile.summariesCreated}</span>
              <span className="text-[10px] text-amber-500 font-semibold">Slide Decks Made</span>
            </div>
          </div>

          {/* Learning Milestone Achievements */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2 font-display">
              <Award className="w-5 h-5 text-yellow-500" />
              Academic Study Badges
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                    ach.completed
                      ? 'bg-slate-50/60 border-slate-200'
                      : 'bg-slate-50/20 border-slate-200/50 opacity-60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${ach.bg}`}>
                    {ach.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-slate-800 flex items-center gap-1.5">
                      {ach.title}
                      {ach.completed && <CheckCircle className="w-4 h-4 text-blue-600 inline shrink-0" />}
                    </h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed mt-1">
                      {ach.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual study timeline graph placeholder */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 font-display">
              <History className="w-5 h-5 text-blue-600" />
              Syllabus Study Breakdown
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Visual analytics telemetry representing topics and cardiovascular parameters revised.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Cardiac Arrhythmias & Electrophysiology</span>
                  <span className="font-bold text-slate-800">80% Competency</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Valvular Heart Diseases & Murmurs</span>
                  <span className="font-bold text-slate-800">55% Competency</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '55%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Heart Failure Pathophysiology & GDMT</span>
                  <span className="font-bold text-slate-800">90% Competency</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
