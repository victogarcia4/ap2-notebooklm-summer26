/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import { Sparkles, Copy, CheckCircle, Info } from 'lucide-react';

interface NotebookLMGuideProps {
  students: Student[];
  selectedStudentIdx: number;
}

export default function NotebookLMGuide({ students, selectedStudentIdx }: NotebookLMGuideProps) {
  const [studentIndex, setStudentIndex] = useState(0);
  const [examKey, setExamKey] = useState<'exam1' | 'exam2' | 'exam3' | 'exam4' | 'exam5'>("exam1");
  const [format, setFormat] = useState("presentation");
  const [copied, setCopied] = useState(false);

  // Sync selected student index from parent state
  useEffect(() => {
    if (selectedStudentIdx >= 0 && selectedStudentIdx < students.length) {
      setStudentIndex(selectedStudentIdx);
    }
  }, [selectedStudentIdx, students]);

  const activeStudent = students[studentIndex];
  const activeOutcome = activeStudent ? activeStudent[examKey] : null;

  const generatedPrompt = activeOutcome
    ? `"Using the selected sources, generate a(n) ${format} of this specific learning outcome: [${activeOutcome.id} - ${activeOutcome.topic}: ${activeOutcome.desc}]"`
    : "";

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Step Guide List */}
      <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Step Guide Header */}
        <div className="bg-teal-900 text-white rounded-xl p-6 text-center">
          <h2 className="text-xl sm:text-2xl font-serif text-white tracking-tight flex items-center justify-center gap-2">
            <span>🎧 Notebook LM Creator Guide</span>
          </h2>
          <p className="text-xs text-teal-200 uppercase tracking-widest font-semibold mt-1">
            Turn Learning Outcomes into Multimedia Tools
          </p>
        </div>

        {/* Intro */}
        <p className="text-gray-600 text-sm leading-relaxed text-center italic">
          "Hello everyone! Ready to build your own <strong>Notebook LM tools</strong>? Follow this roadmap to create and submit your project successfully. 🚀"
        </p>

        {/* Phase 1 */}
        <div className="border border-teal-100 bg-teal-50/20 p-5 rounded-lg space-y-3">
          <h3 className="text-teal-900 font-serif text-lg flex items-center gap-2">
            <span className="bg-teal-900 text-white text-xs font-bold rounded-full w-5 h-5 inline-flex items-center justify-center">1</span>
            <span>Phase 1: The Setup (Step-by-Step)</span>
          </h3>
          <ul className="text-xs text-gray-700 space-y-2 list-disc pl-5 leading-relaxed">
            <li>
              <strong>Find Your LO:</strong> Locate your assigned Learning Outcome (1, 2, 3, or 4) for the active exam category.
            </li>
            <li>
              <strong>Rename:</strong> Create a new Notebook LM and rename it with your specific LO. Just copy and paste it!
            </li>
          </ul>
        </div>

        {/* Phase 2 */}
        <div className="border border-teal-100 bg-teal-50/20 p-5 rounded-lg space-y-3">
          <h3 className="text-teal-900 font-serif text-lg flex items-center gap-2">
            <span className="bg-teal-900 text-white text-xs font-bold rounded-full w-5 h-5 inline-flex items-center justify-center">2</span>
            <span>Phase 2: Add Sources &amp; Script</span>
          </h3>
          <p className="text-xs font-semibold text-gray-800">
            Steps 3 &amp; 4: Upload Materials
          </p>
          <ul className="text-xs text-gray-700 space-y-1 list-disc pl-5 leading-relaxed mb-2">
            <li>Upload files from "BIOL material" that match your specific LO.</li>
            <li>Add 2-3 public YouTube links (e.g., Khan Academy, Amoeba Sisters, or Crash Course).</li>
          </ul>

          <p className="text-xs font-semibold text-gray-800 pt-1">
            Steps 5 &amp; 6: Customize AI Prompts ✍️
          </p>
          <p className="text-xs text-gray-700 leading-relaxed mb-2">
            Copy and paste this base template into Notebook LM for each tool (presentation, flashcards, video, audio, infographic):
          </p>
          <div className="bg-white border border-dashed border-teal-700 p-4 rounded text-xs text-rose-700 font-mono italic">
            "Using the selected sources, generate a(n) [presentation, flashcards, video, audio, infographic] of this specific learning outcome: [---paste your LO here---]"
          </div>
        </div>

        {/* Phase 3 */}
        <div className="border border-red-100 bg-red-50/20 p-5 rounded-lg space-y-3">
          <h3 className="text-red-900 font-serif text-lg flex items-center gap-2">
            <span className="bg-red-950 text-white text-xs font-bold rounded-full w-5 h-5 inline-flex items-center justify-center">3</span>
            <span>Phase 3: Generate &amp; Submit (Action Required)</span>
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong>Step 7:</strong> Select the "shorter version" to generate your items. Ensure content focuses strictly on your LO!
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-white border border-red-200 text-red-800 p-4 rounded-lg text-center font-bold text-xs space-y-1">
              <p className="uppercase text-[9px] text-gray-400">Step 8</p>
              <p className="font-serif font-normal text-sm text-red-950">🔗 Share Public Link</p>
              <p className="font-normal text-[10px] text-gray-500 font-sans mt-1">Anyone with link</p>
            </div>
            <div className="bg-white border border-red-200 text-red-800 p-4 rounded-lg text-center font-bold text-xs space-y-1">
              <p className="uppercase text-[9px] text-gray-400">Step 9</p>
              <p className="font-serif font-normal text-sm text-red-950">📥 Upload to Dropbox</p>
              <p className="font-normal text-[10px] text-gray-500 font-sans mt-1">Submit link for grade</p>
            </div>
          </div>
        </div>

        {/* Closing Note */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-center">
          <p className="text-sm font-semibold text-teal-900 font-serif">
            Keep Going! Thanks for your hard work on this creative project! ✨
          </p>
        </div>

      </div>

      {/* Interactive Prompt Builder Card */}
      <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
        <h3 className="text-xl font-serif text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
          <span>Class Roster Prompt Builder</span>
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Select a student and desired deliverable format below. The utility will automatically locate the HAPS Learning Outcome mapped to that student and pre-generate your exact Notebook LM ready script.
        </p>

        {activeStudent ? (
          <div className="space-y-4">
            {/* Student Dropdown */}
            <div className="flex flex-col gap-1 text-xs">
              <label className="font-bold text-gray-700">Select Student:</label>
              <select
                value={studentIndex}
                onChange={(e) => setStudentIndex(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none bg-white text-gray-800"
              >
                {students.map((student, idx) => (
                  <option key={student.id} value={idx}>
                    {student.name} ({student.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Exam category */}
            <div className="flex flex-col gap-1 text-xs">
              <label className="font-bold text-gray-700">Target Milestone / Exam:</label>
              <select
                value={examKey}
                onChange={(e) => setExamKey(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none bg-white text-gray-800"
              >
                <option value="exam1">Lecture Exam 1 (Endocrine, Blood, Cardio)</option>
                <option value="exam2">Lecture Exam 2 (Lymphatic, Respiratory)</option>
                <option value="exam3">Lecture Exam 3 (Digestive, Metabolism)</option>
                <option value="exam4">Lecture Exam 4 (Urinary, Acid-Base)</option>
                <option value="exam5">Lecture Exam 5 (Reproduction, Genetics)</option>
              </select>
            </div>

            {/* Deliverable format */}
            <div className="flex flex-col gap-1 text-xs">
              <label className="font-bold text-gray-700">Notebook LM Deliverable Format:</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none bg-white text-gray-800"
              >
                <option value="presentation">presentation</option>
                <option value="flashcards">flashcards</option>
                <option value="video">video summary</option>
                <option value="audio podcast">audio podcast</option>
                <option value="infographic text">infographic blueprint</option>
              </select>
            </div>

            {/* Live Prompt display box */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                YOUR CUSTOM GENERATED SCRIPT:
              </p>
              <div className="relative bg-gray-900 text-teal-100 rounded-lg p-4 font-mono text-xs break-words leading-relaxed min-h-[120px] select-all">
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded px-2.5 py-1 text-[10px] tracking-wide transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
                <span className="block pr-24 mt-2">
                  {generatedPrompt}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-100 p-8 rounded-lg text-center text-gray-500 text-xs">
            <Info className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p>No roster students loaded to generate custom prompts.</p>
          </div>
        )}

      </div>
    </div>
  );
}
