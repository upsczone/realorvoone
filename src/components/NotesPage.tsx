import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  Share2,
  GraduationCap,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ExamNote, SubjectType } from '../types';

export const NotesPage: React.FC = () => {
  const { goBack, notes, selectedNote, setSelectedNote, showToast, theme, navigateTo } = useApp();
  const isDark = theme === 'dark';

  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const subjectList: string[] = [
    'All',
    'Quantitative Aptitude',
    'General Intelligence & Reasoning',
    'General Awareness',
    'General Science'
  ];

  const filteredNotes = selectedSubject === 'All' 
    ? notes 
    : notes.filter(n => n.subject === selectedSubject);

  const activeNote = selectedNote && filteredNotes.some(n => n.id === selectedNote.id)
    ? selectedNote 
    : filteredNotes[0] || notes[0];

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-5xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
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

      {/* Prominent Banner linking to Courses Page */}
      <div 
        onClick={() => navigateTo('courses')}
        className={`p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${
          isDark 
            ? 'bg-gradient-to-r from-amber-500/15 via-indigo-600/15 to-transparent border-amber-500/40 hover:border-amber-400' 
            : 'bg-gradient-to-r from-amber-100 via-indigo-50 to-white border-amber-300 hover:border-amber-400 shadow-md'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-extrabold tracking-tight">
                Structured Video Courses & Chapter Lessons
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                NEW
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Access masterclasses with video player, detailed lesson notes, formula banks & connected practice tests.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-sm transition-all group-hover:translate-x-1 shrink-0">
          <span>Explore Courses</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex items-center justify-between gap-4 ${
        isDark ? 'bg-[#111726] border-cyan-500/30' : 'bg-white border-cyan-200 shadow-md'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">High-Yield Revision Notes</h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Handcrafted formula banks, Indian Polity summaries & General Science cheat sheets
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('Note saved to offline reading collection!')}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-colors shadow-md cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save Offline</span>
        </button>
      </div>

      {/* Subject Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {subjectList.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedSubject === sub
                ? 'bg-cyan-600 text-white shadow-sm'
                : isDark 
                ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800' 
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Notes List & Note Viewer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Notes Selector */}
        <div className="md:col-span-4 space-y-2">
          {filteredNotes.length === 0 ? (
            <div className={`p-6 text-center rounded-2xl border text-xs ${
              isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
            }`}>
              No revision notes available in this subject category.
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeNote && activeNote.id === note.id
                    ? 'bg-cyan-500/10 border-cyan-500 ring-1 ring-cyan-500 text-cyan-500'
                    : isDark ? 'bg-[#111726] border-slate-800 text-slate-300 hover:bg-slate-850' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-500 font-bold block mb-1">
                  {note.readTime} · {note.subject}
                </span>
                <h3 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug">
                  {note.title}
                </h3>
              </div>
            ))
          )}
        </div>

        {/* Note Full Content */}
        {activeNote && (
          <div className={`md:col-span-8 p-6 sm:p-8 rounded-3xl border space-y-6 ${
            isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div>
              <span className="text-xs font-mono text-cyan-500 font-bold block mb-1">
                {activeNote.subject} · {activeNote.exam}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {activeNote.title}
              </h2>
              <p className={`text-xs mt-3 leading-relaxed p-4 rounded-2xl border ${
                isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                {activeNote.summary}
              </p>
            </div>

            {/* Key Exam Points */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Essential Exam Principles & Pointers
              </h3>
              <div className="space-y-2.5">
                {activeNote.keyPoints.map((point, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs leading-relaxed ${
                    isDark ? 'bg-slate-900/50 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula Sheet if present */}
            {activeNote.formulaList && (
              <div className={`p-5 rounded-2xl border ${
                isDark ? 'bg-slate-950 border-cyan-500/30' : 'bg-cyan-50/50 border-cyan-200'
              }`}>
                <span className="text-xs font-bold text-cyan-500 font-mono block mb-2">
                  Rapid Memory Formula Bank:
                </span>
                <div className="space-y-2 font-mono text-xs">
                  {activeNote.formulaList.map((formula, fIdx) => (
                    <div key={fIdx} className={`p-2 rounded-lg ${
                      isDark ? 'bg-slate-900 text-indigo-300' : 'bg-white text-indigo-700 border border-slate-200'
                    }`}>
                      • {formula}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
