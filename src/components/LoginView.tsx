import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ShieldAlert, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { ScreenType } from '../types';

interface LoginViewProps {
  onLoginSuccess: (email: string, fullName: string, institution: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onContinueAsGuest: () => void;
}

export default function LoginView({ onLoginSuccess, onNavigate, onContinueAsGuest }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('Harvard Medical School');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide a valid student email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (isRegistering) {
      if (!fullName) {
        setError('Please provide your full name.');
        return;
      }
      onLoginSuccess(email, fullName, institution);
    } else {
      // Direct login simulation
      const defaultName = email.split('@')[0].toUpperCase().replace('.', ' ');
      onLoginSuccess(email, defaultName || 'Cardiology Student', institution || 'General Medical Academy');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-50 rounded-2xl mb-4 text-blue-600">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {isRegistering ? 'Create Student Account' : 'Welcome Back'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {isRegistering
              ? 'Join our medical cohort to track your clinical metrics'
              : 'Sign in to access your dashboard & save milestones'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs flex items-start gap-2 mb-6">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegistering && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                  <div className="absolute left-3 top-3.5 text-slate-400">
                    <span className="text-xs font-semibold">User</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Institution / School
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BS Cardiology Dept, KEMU"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <div className="absolute left-3 top-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              {!isRegistering && (
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotStatus('idle');
                    setShowForgotModal(true);
                  }}
                  className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <div className="absolute left-3 top-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          <button
            id="btn-login-submit"
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md shadow-blue-100 flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px] cursor-pointer"
          >
            {isRegistering ? 'Create Free Student Account' : 'Secure Log In'}
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isRegistering && (
            <button
              id="btn-login-guest"
              type="button"
              onClick={onContinueAsGuest}
              className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl font-semibold shadow-sm flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px] cursor-pointer mt-3"
            >
              Continue as Guest
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            {isRegistering ? 'Already have an account?' : 'New BS Cardiology or Med learner?'}
            <button
              type="button"
              onClick={() => {
                setError('');
                setIsRegistering(!isRegistering);
              }}
              className="text-blue-600 hover:underline font-bold ml-1.5 cursor-pointer"
            >
              {isRegistering ? 'Sign In' : 'Register Now'}
            </button>
          </p>
        </div>
      </motion.div>

      {/* Forgot Password Modal Simulator */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">Simulate Password Reset</h3>
            <p className="text-slate-500 text-sm mb-4">
              Enter your email to receive a simulated credentials recovery packet.
            </p>

            {forgotStatus === 'success' ? (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-4 text-emerald-800 text-sm">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Reset simulation success!
                </div>
                <p className="text-xs">
                  We simulated sending a password reset link to <strong className="break-all">{forgotEmail}</strong>. In production, this integrates with SMTP or Firebase Auth.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="student@university.edu"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (forgotEmail) setForgotStatus('success');
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all"
                >
                  Send Reset Link
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setShowForgotModal(false);
                setForgotStatus('idle');
              }}
              className="mt-2 w-full text-center py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold border border-transparent hover:border-slate-100 rounded-lg"
            >
              Close Window
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
