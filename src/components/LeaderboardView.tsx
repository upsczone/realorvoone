import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TOP_STUDENTS_LEADERBOARD } from '../data/mockData';
import { Trophy, Medal, Crown, Timer, Target, Sparkles, UserCheck } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { user, theme } = useApp();
  const isDark = theme === 'dark';
  const [filterExam, setFilterExam] = useState<'All' | 'SSC' | 'Railway'>('All');

  const filteredStudents = TOP_STUDENTS_LEADERBOARD.filter((s) => {
    if (filterExam === 'SSC') return s.exam.startsWith('SSC');
    if (filterExam === 'Railway') return s.exam.startsWith('RRB');
    return true;
  });

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>All India Live Standing</span>
            <span>·</span>
            <span>Weekly Exam Sprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            All India Leaderboard
          </h1>
        </div>

        {/* Filter buttons */}
        <div className={`flex items-center p-1 rounded-xl self-start sm:self-auto text-xs border ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {(['All', 'SSC', 'Railway'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterExam(cat)}
              className={`px-3 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                filterExam === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? 'All Exams' : `${cat} Only`}
            </button>
          ))}
        </div>
      </div>

      {/* User's Current Live Standing Card */}
      <div className={`p-4 sm:p-5 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDark 
          ? 'bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 border-indigo-500/40' 
          : 'bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border-indigo-200'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-500 font-extrabold font-mono text-xl shrink-0">
            #14
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base">{user.name}</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-indigo-500/20 text-indigo-500 rounded-sm">
                You
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Target: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{user.targetExam}</strong> · Top 2% Percentile (94.6%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
          <div>
            <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Score</span>
            <span className="font-bold text-amber-500 text-sm">38.5 / 50</span>
          </div>
          <div>
            <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Accuracy</span>
            <span className="font-bold text-emerald-500 text-sm">87.0%</span>
          </div>
          <div>
            <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Time</span>
            <span className={`font-bold text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>23m 40s</span>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {filteredStudents.slice(0, 3).map((st, i) => {
          const rankColors = [
            isDark 
              ? 'from-amber-500/20 to-[#111726] border-amber-500/40 text-amber-400' 
              : 'from-amber-50 to-white border-amber-300 text-amber-700 shadow-sm', // Rank 1 Gold
            isDark 
              ? 'from-slate-400/20 to-[#111726] border-slate-400/40 text-slate-300' 
              : 'from-slate-100 to-white border-slate-300 text-slate-700 shadow-sm', // Rank 2 Silver
            isDark 
              ? 'from-amber-700/20 to-[#111726] border-amber-700/40 text-amber-600' 
              : 'from-orange-50 to-white border-orange-300 text-orange-700 shadow-sm'  // Rank 3 Bronze
          ];

          return (
            <div 
              key={st.rank}
              className={`p-4 rounded-3xl bg-gradient-to-b ${rankColors[i]} border text-center flex flex-col items-center justify-between shadow-lg`}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <div className={`w-14 h-14 rounded-full overflow-hidden ring-2 ring-indigo-500/40 flex items-center justify-center font-bold text-lg ${
                    isDark ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'
                  }`}>
                    {st.name.charAt(0)}
                  </div>
                  <span className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border text-xs font-bold font-mono flex items-center justify-center ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                  }`}>
                    #{st.rank}
                  </span>
                </div>
                <h3 className={`font-bold text-sm line-clamp-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{st.name}</h3>
                <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{st.exam}</span>
              </div>

              <div className={`w-full mt-4 pt-3 border-t flex items-center justify-around text-xs font-mono ${
                isDark ? 'border-slate-800/80' : 'border-slate-200'
              }`}>
                <div>
                  <span className={`text-[10px] block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Marks</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{st.score}</span>
                </div>
                <div>
                  <span className={`text-[10px] block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Accuracy</span>
                  <span className="font-bold text-emerald-500">{st.accuracy}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ranks 4 to 10 Table */}
      <div className={`rounded-3xl border overflow-hidden shadow-xl ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-md'
      }`}>
        <div className={`px-5 py-3.5 border-b flex items-center justify-between text-xs font-semibold ${
          isDark ? 'border-slate-800 text-slate-400 bg-slate-900/40' : 'border-slate-200 text-slate-500 bg-slate-50'
        }`}>
          <span>Rank & Student</span>
          <div className="flex items-center gap-8">
            <span className="hidden sm:inline">Exam</span>
            <span>Accuracy</span>
            <span>Score</span>
          </div>
        </div>

        <div className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
          {filteredStudents.map((st) => (
            <div 
              key={st.rank}
              className={`px-5 py-3.5 flex items-center justify-between transition-colors text-sm ${
                isDark ? 'hover:bg-slate-850/50' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`w-7 text-xs font-mono font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  #{st.rank}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-indigo-500 ${
                  isDark ? 'bg-slate-800' : 'bg-indigo-50'
                }`}>
                  {st.name.charAt(0)}
                </div>
                <div>
                  <span className={`font-semibold text-xs sm:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{st.name}</span>
                  <span className={`text-[11px] block sm:hidden ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{st.exam}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs">
                <span className={`hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{st.exam}</span>
                <span className="text-emerald-500 font-semibold">{st.accuracy}%</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{st.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
