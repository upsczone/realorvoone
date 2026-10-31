import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Settings, 
  Sun, 
  Moon, 
  Smartphone, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Save,
  Target,
  Clock,
  HelpCircle,
  Sparkles,
  Server,
  Key,
  RefreshCw,
  Globe,
  Check
} from 'lucide-react';
import { ExamType } from '../types';

export const SettingsPage: React.FC = () => {
  const { 
    goBack, 
    theme,
    themePreference, 
    setTheme, 
    user, 
    userPhone, 
    updateUserName, 
    submitPhoneNumber, 
    setTargetExam,
    openOnboardingGuide,
    apiBaseUrl,
    partnerApiKey,
    updatePartnerApiKey,
    apiStatus,
    partnerMe,
    syncWithApi,
    isSyncingApi,
    showToast 
  } = useApp();

  const isDark = theme === 'dark';
  const [nameInput, setNameInput] = useState(user.name);
  const [phoneInput, setPhoneInput] = useState(userPhone?.replace('+91 ', '') || '');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState(partnerApiKey || '');
  const [isTestingKey, setIsTestingKey] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      updateUserName(nameInput.trim());
    }
  };

  const handleUpdatePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);
    const res = submitPhoneNumber(phoneInput);
    if (!res.success) {
      setPhoneError(res.message);
    }
  };

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-3xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* Back button */}
      <button
        onClick={goBack}
        className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex items-center gap-3.5 ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-md'
      }`}>
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 flex items-center justify-center shrink-0">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">App Settings & Preferences</h1>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Manage appearance themes, exam targets, and student credentials
          </p>
        </div>
      </div>

      {/* 1. Theme Switcher Section (as explicitly requested: "Add light theme also and add theme switcher in setting") */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Appearance & Theme Switcher
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Select your preferred visual style for night study or bright daytime reading
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-500 uppercase">
            Active: {theme} ({themePreference === 'auto' ? 'Auto Time-based' : 'Manual'})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Auto Time-based Theme Option */}
          <div
            onClick={() => {
              setTheme('auto');
              showToast('Theme set to Auto (Day/Night Time-based)');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
              themePreference === 'auto'
                ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/40 text-amber-500 font-bold'
                : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-xs sm:text-sm">Auto (Time-based)</strong>
              <span className="text-[10px] sm:text-[11px] opacity-80">06:00-18:00 Light / Night Dark</span>
            </div>
          </div>

          {/* Dark Theme Option */}
          <div
            onClick={() => {
              setTheme('dark');
              showToast('Theme set to Dark Mode');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
              themePreference === 'dark'
                ? 'bg-indigo-600/15 border-indigo-500 ring-2 ring-indigo-500 text-white font-bold'
                : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-xs sm:text-sm">Dark Theme</strong>
              <span className="text-[10px] sm:text-[11px] opacity-80">Deep obsidian & slate</span>
            </div>
          </div>

          {/* Light Theme Option */}
          <div
            onClick={() => {
              setTheme('light');
              showToast('Theme set to Light Mode');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
              themePreference === 'light'
                ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-600 text-slate-950 font-bold'
                : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-indigo-600 shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-xs sm:text-sm">Light Theme</strong>
              <span className="text-[10px] sm:text-[11px] opacity-80">Clean white & high-contrast</span>
            </div>
          </div>
        </div>
      </div>

      {/* App Setup Guide / Onboarding Tour Card */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold">First-Time App Setup Guide</h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Re-open the interactive guide to review exam selection, 1-attempt rule, 01 rapid practice marking & mistake book.
            </p>
          </div>
        </div>

        <button
          onClick={openOnboardingGuide}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Setup Guide</span>
        </button>
      </div>

      {/* 2. Target Exam Switcher */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Selected Target Exam
        </h3>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Currently preparing for: <strong className="text-indigo-500">{user.targetExam}</strong>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(['SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD', 'RRB NTPC', 'RRB Group D'] as ExamType[]).map((exam) => (
            <button
              key={exam}
              onClick={() => setTargetExam(exam)}
              className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                user.targetExam === exam
                  ? 'bg-indigo-600 text-white font-bold border-indigo-500 shadow-md'
                  : isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <span>{exam}</span>
              {user.targetExam === exam && <CheckCircle2 className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Profile Information */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Student Profile
        </h3>

        <form onSubmit={handleSaveName} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs border focus:outline-hidden ${
                  isDark ? 'bg-slate-950 border-slate-750 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>

        {/* Mobile Number Update / Verification */}
        <form onSubmit={handleUpdatePhone} className="space-y-2 pt-2 border-t border-slate-750">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-slate-400">
              Verified Mobile Number
            </label>
            {userPhone && (
              <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <div className={`flex items-center flex-1 rounded-xl border overflow-hidden ${
              isDark ? 'bg-slate-950 border-slate-750' : 'bg-slate-50 border-slate-300'
            }`}>
              <span className="px-3 text-xs text-slate-400 border-r border-slate-700">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="10-digit unique mobile number"
                className="w-full px-3 py-2 text-xs bg-transparent focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
            >
              Update
            </button>
          </div>

          {phoneError && (
            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{phoneError}</span>
            </p>
          )}
        </form>
      </div>

      {/* 4. UPSC Zone Partner API (FastAPI Backend) */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                UPSC Zone Partner API
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                FastAPI Engine · Base URL: <code className="font-mono text-amber-500">{apiBaseUrl}</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full font-mono uppercase ${
              apiStatus === 'connected'
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                : apiStatus === 'unauthorized'
                ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30'
                : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
            }`}>
              {apiStatus === 'connected' ? '● Live API Connected' : apiStatus === 'unauthorized' ? '● Needs Valid Key' : '● API Ready'}
            </span>
          </div>
        </div>

        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Authenticate with your <code className="font-mono text-amber-500">uzk_</code> Partner API key to fetch real-time Test Series, Current Affairs, NCERT & GS Courses directly from the UPSC Zone FastAPI backend.
        </p>

        {/* API Key Form */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsTestingKey(true);
            await updatePartnerApiKey(apiKeyInput);
            setIsTestingKey(false);
          }}
          className="space-y-3 pt-2 border-t border-slate-750"
        >
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-500" />
              <span>Partner API Key (uzk_...)</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="uzk_partner_live_key_..."
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-mono border focus:outline-hidden ${
                  isDark ? 'bg-slate-950 border-slate-750 text-amber-400' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isTestingKey}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>{isTestingKey ? 'Verifying...' : 'Save & Connect'}</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await syncWithApi();
                    showToast('Refreshed data from api.upsczone.in');
                  }}
                  disabled={isSyncingApi}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                  title="Force re-fetch from API"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingApi ? 'animate-spin text-amber-500' : ''}`} />
                  <span className="hidden sm:inline">Sync</span>
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Account Details if connected */}
        {partnerMe && (
          <div className={`p-4 rounded-2xl border text-xs font-mono space-y-1.5 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Account:</span>
              <strong className="text-white">{partnerMe.name} ({partnerMe.company})</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Plan / Status:</span>
              <span className="text-emerald-500 font-bold">{partnerMe.plan} · {partnerMe.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Usage Calls:</span>
              <span>{partnerMe.total_calls} calls (Limit: {partnerMe.rate_limit_per_min}/min)</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
