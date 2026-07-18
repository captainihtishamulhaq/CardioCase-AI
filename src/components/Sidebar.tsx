import React from 'react';
import {
  Heart,
  LayoutDashboard,
  Brain,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  User,
  LogOut,
  LogIn,
  Home
} from 'lucide-react';
import { ScreenType, UserProfile } from '../types';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isLoggedIn: boolean;
  profile: UserProfile | null;
  onLogout: () => void;
}

export default function Sidebar({ currentScreen, onNavigate, isLoggedIn, profile, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home Landing', icon: <Home className="w-5 h-5" />, authRequired: false },
    { id: 'dashboard', label: 'Core Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, authRequired: true },
    { id: 'clinical_case', label: 'AI Clinical Case', icon: <Brain className="w-5 h-5" />, authRequired: true },
    { id: 'topic_explainer', label: 'AI Topic Explainer', icon: <BookOpen className="w-5 h-5" />, authRequired: true },
    { id: 'mcq_generator', label: 'MCQ Generator', icon: <ClipboardList className="w-5 h-5" />, authRequired: true },
    { id: 'notes_summarizer', label: 'Notes Summarizer', icon: <FileText className="w-5 h-5" />, authRequired: true },
    { id: 'viva_practice', label: 'Viva Practice', icon: <GraduationCap className="w-5 h-5" />, authRequired: true },
    { id: 'profile', label: 'My Study Profile', icon: <User className="w-5 h-5" />, authRequired: true },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 hidden md:flex flex-col justify-between shrink-0">
      {/* Upper header section */}
      <div className="p-6">
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-95 transition-opacity"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-100">
            <Heart className="w-5 h-5 animate-pulse fill-white text-blue-600" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-base leading-none block font-display">CardioCase</span>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">AI STUDY LAB</span>
          </div>
        </div>

        {/* Menu Navigation items */}
        <nav className="mt-8 space-y-1">
          {menuItems.map((item) => {
            if (item.authRequired && !isLoggedIn) return null;

            const isActive = currentScreen === item.id;
            return (
              <button
                id={`btn-sidebar-${item.id}`}
                key={item.id}
                onClick={() => onNavigate(item.id as ScreenType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600 rounded-l-none'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile area */}
      <div className="p-4 border-t border-slate-200">
        {isLoggedIn && profile ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-2 bg-slate-50/50 rounded-xl border border-slate-100">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0 border border-blue-200">
                {profile.fullName.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate leading-none mb-0.5">{profile.fullName}</p>
                <p className="text-[10px] text-slate-400 truncate">{profile.email}</p>
              </div>
            </div>
            <button
              id="btn-sidebar-logout"
              onClick={onLogout}
              className="w-full py-2 bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-500 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        ) : (
          <button
            id="btn-sidebar-login"
            onClick={() => onNavigate('login')}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-50 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            Sign In / Register
          </button>
        )}
      </div>
    </aside>
  );
}
