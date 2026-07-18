import React, { useState, useEffect } from 'react';
import { ScreenType, UserProfile } from './types';
import HomeView from './components/HomeView';
import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView';
import ClinicalCaseView from './components/ClinicalCaseView';
import TopicExplainerView from './components/TopicExplainerView';
import MCQGeneratorView from './components/MCQGeneratorView';
import NotesSummarizerView from './components/NotesSummarizerView';
import VivaPracticeView from './components/VivaPracticeView';
import ProfileView from './components/ProfileView';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import { Heart, Flame, Award, LogIn, Menu, ShieldAlert } from 'lucide-react';

const DEFAULT_PROFILE: UserProfile = {
  email: 'student@university.edu',
  fullName: 'Cardiology Learner',
  role: 'student',
  institution: 'BS Cardiology Department',
  xp: 150,
  quizzesCompleted: 1,
  casesAnalyzed: 1,
  topicsExplored: 2,
  summariesCreated: 1,
  streakDays: 3
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  // Load state from localStorage on startup
  useEffect(() => {
    const storedAuth = localStorage.getItem('cardiocase_auth');
    const storedProfile = localStorage.getItem('cardiocase_profile');
    if (storedAuth === 'true') {
      setIsLoggedIn(true);
    }
    if (storedProfile) {
      try {
        setProfile(JSON.parse(storedProfile));
      } catch (e) {
        console.error('Failed to parse profile from local storage', e);
      }
    }
  }, []);

  // Save profile to localStorage whenever it changes
  const saveProfileState = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('cardiocase_profile', JSON.stringify(newProfile));
  };

  const handleLoginSuccess = (email: string, fullName: string, institution: string) => {
    setIsLoggedIn(true);
    localStorage.setItem('cardiocase_auth', 'true');
    const updated = {
      ...profile,
      email,
      fullName,
      institution: institution || 'Cardiology Institute',
      streakDays: profile.streakDays === 0 ? 1 : profile.streakDays
    };
    saveProfileState(updated);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('cardiocase_auth');
    setCurrentScreen('home');
  };

  // Helper actions to dynamically add study points and metrics
  const addStudyXp = (amount: number) => {
    const updated = {
      ...profile,
      xp: profile.xp + amount
    };
    saveProfileState(updated);
  };

  const incrementCases = () => {
    const updated = {
      ...profile,
      casesAnalyzed: profile.casesAnalyzed + 1
    };
    saveProfileState(updated);
  };

  const incrementQuizzes = () => {
    const updated = {
      ...profile,
      quizzesCompleted: profile.quizzesCompleted + 1
    };
    saveProfileState(updated);
  };

  const incrementTopics = () => {
    const updated = {
      ...profile,
      topicsExplored: profile.topicsExplored + 1
    };
    saveProfileState(updated);
  };

  const incrementSummaries = () => {
    const updated = {
      ...profile,
      summariesCreated: profile.summariesCreated + 1
    };
    saveProfileState(updated);
  };

  const handleResetTelemetry = () => {
    const initial = {
      ...DEFAULT_PROFILE,
      fullName: profile.fullName,
      email: profile.email,
      institution: profile.institution,
      xp: 0,
      quizzesCompleted: 0,
      casesAnalyzed: 0,
      topicsExplored: 0,
      summariesCreated: 0,
      streakDays: 1
    };
    saveProfileState(initial);
  };

  const handleModifyProfile = (fullName: string, institution: string) => {
    const updated = {
      ...profile,
      fullName,
      institution
    };
    saveProfileState(updated);
  };

  // Safe navigation guard - redirect unauthenticated users to login for protected medical modules
  const handleNavigation = (screen: ScreenType) => {
    const protectedScreens: ScreenType[] = [
      'dashboard',
      'clinical_case',
      'topic_explainer',
      'mcq_generator',
      'notes_summarizer',
      'viva_practice',
      'profile'
    ];

    if (protectedScreens.includes(screen) && !isLoggedIn) {
      setCurrentScreen('login');
    } else {
      setCurrentScreen(screen);
    }
  };

  // Render proper screen content
  const renderActiveScreenContent = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeView onNavigate={handleNavigation} isLoggedIn={isLoggedIn} />;
      case 'login':
        return <LoginView onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigation} />;
      case 'dashboard':
        return <DashboardView profile={profile} onNavigate={handleNavigation} />;
      case 'clinical_case':
        return <ClinicalCaseView onAddXp={addStudyXp} onIncrementCases={incrementCases} />;
      case 'topic_explainer':
        return <TopicExplainerView onAddXp={addStudyXp} onIncrementTopics={incrementTopics} />;
      case 'mcq_generator':
        return <MCQGeneratorView onAddXp={addStudyXp} onIncrementQuizzes={incrementQuizzes} />;
      case 'notes_summarizer':
        return <NotesSummarizerView onAddXp={addStudyXp} onIncrementSummaries={incrementSummaries} />;
      case 'viva_practice':
        return <VivaPracticeView onAddXp={addStudyXp} />;
      case 'profile':
        return (
          <ProfileView
            profile={profile}
            onResetStats={handleResetTelemetry}
            onModifyProfile={handleModifyProfile}
          />
        );
      default:
        return <HomeView onNavigate={handleNavigation} isLoggedIn={isLoggedIn} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50/50 text-slate-800 font-sans antialiased">
      {/* Desktop Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={handleNavigation}
        isLoggedIn={isLoggedIn}
        profile={profile}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0">
        {/* Mobile Header Bar */}
        <header className="flex justify-between items-center bg-white px-5 h-14 border-b border-slate-100 md:hidden sticky top-0 z-50 shadow-xs">
          <div onClick={() => handleNavigation('home')} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Heart className="w-4.5 h-4.5 fill-white text-blue-600 animate-pulse" />
            </div>
            <span className="font-extrabold text-slate-900 text-sm tracking-tight">CardioCase AI</span>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div
                onClick={() => handleNavigation('profile')}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-full border border-orange-100 text-orange-700 text-xs font-bold cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>{profile.streakDays}d</span>
              </div>
            ) : (
              <button
                id="btn-mobile-login-direct"
                onClick={() => handleNavigation('login')}
                className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* Dynamic page wrapper with custom animations */}
        <main className="flex-1 overflow-y-auto">
          {renderActiveScreenContent()}
        </main>

        {/* Global Footer info on simple landing */}
        {currentScreen === 'home' && (
          <footer className="py-6 border-t border-slate-150 bg-white text-center text-xs text-slate-400">
            <p className="font-medium">CardioCase AI Companion • Developed for Undergraduate Cardiology & Clinical Learners</p>
            <p className="mt-1">For educational purposes only. Always consult registered clinicians for medical advice.</p>
          </footer>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigation}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
