import React from 'react';
import {
  Home,
  Brain,
  ClipboardList,
  GraduationCap,
  User,
  LayoutDashboard
} from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isLoggedIn: boolean;
}

export default function BottomNav({ currentScreen, onNavigate, isLoggedIn }: BottomNavProps) {
  const navItems = [
    {
      id: isLoggedIn ? 'dashboard' : 'home',
      label: isLoggedIn ? 'Dashboard' : 'Home',
      icon: isLoggedIn ? <LayoutDashboard className="w-5 h-5" /> : <Home className="w-5 h-5" />
    },
    {
      id: 'clinical_case',
      label: 'AI Case',
      icon: <Brain className="w-5 h-5" />,
      authRequired: true
    },
    {
      id: 'mcq_generator',
      label: 'MCQs',
      icon: <ClipboardList className="w-5 h-5" />,
      authRequired: true
    },
    {
      id: 'viva_practice',
      label: 'Viva',
      icon: <GraduationCap className="w-5 h-5" />,
      authRequired: true
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      authRequired: true
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 h-16 px-4 flex items-center justify-around z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        if (item.authRequired && !isLoggedIn) return null;

        const isActive = currentScreen === item.id;
        return (
          <button
            id={`btn-bottom-nav-${item.id}`}
            key={item.id}
            onClick={() => onNavigate(item.id as ScreenType)}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 cursor-pointer transition-all ${
              isActive ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className={isActive ? 'scale-105' : 'scale-100'}>{item.icon}</span>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
