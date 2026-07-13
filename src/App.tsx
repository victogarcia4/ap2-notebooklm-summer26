/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Student, DistributionPolicy, AcademicSession } from './types';
import { defaultStudents } from './data/students';
import { hapsOutcomes } from './data/outcomes';

// Subcomponents
import Hero from './components/Hero';
import IntroVideo from './components/IntroVideo';
import ExplanationVideo from './components/ExplanationVideo';
import RosterMatrix from './components/RosterMatrix';
import SubmittedNotebooks from './components/SubmittedNotebooks';
import NotebookLMGuide from './components/NotebookLMGuide';
import Diagnostics from './components/Diagnostics';
import SyllabusMap from './components/SyllabusMap';
import RosterRelauncher from './components/RosterRelauncher';
import LearningContractModal from './components/LearningContractModal';

// Icons
import { GraduationCap, Award, BookOpen, Layers, BarChart3, Database, RefreshCw, Calendar, Sparkles } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [session, setSession] = useState<AcademicSession>("su26");
  const [activeTab, setActiveTab] = useState<'matrix' | 'notebooks' | 'guide' | 'stats' | 'map' | 'reloader'>("matrix");
  const [selectedStudentIdx, setSelectedStudentIdx] = useState(0);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [avatarError, setAvatarError] = useState(false);

  // Initialize students and randomize assignments on startup
  useEffect(() => {
    const saved = localStorage.getItem('biol2402_students');
    const savedSession = localStorage.getItem('biol2402_session');
    
    if (savedSession) {
      setSession(savedSession as AcademicSession);
    }

    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        initDefaultRoster("balanced");
      }
    } else {
      initDefaultRoster("balanced");
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg("");
    }, 3000);
  };

  const initDefaultRoster = (policy: DistributionPolicy) => {
    const assigned = runAllocation(defaultStudents, policy);
    setStudents(assigned);
    localStorage.setItem('biol2402_students', JSON.stringify(assigned));
  };

  // Main outcome allocation engine - Now 100% deterministic (no randomization)
  const runAllocation = (roster: Student[], policy?: DistributionPolicy): Student[] => {
    const studentList = JSON.parse(JSON.stringify(roster)) as Student[];
    
    (['exam1', 'exam2', 'exam3', 'exam4', 'exam5'] as const).forEach(examKey => {
      const outcomes = hapsOutcomes[examKey] || [];
      studentList.forEach((student, index) => {
        if (outcomes.length > 0) {
          student[examKey] = outcomes[index % outcomes.length];
        }
      });
    });
    
    return studentList;
  };

  const handleRandomize = (policy: DistributionPolicy) => {
    const updated = runAllocation(students, policy);
    setStudents(updated);
    localStorage.setItem('biol2402_students', JSON.stringify(updated));
    showToast("Successfully distributed learning outcomes deterministically (1 SLO per Exam per Student)!");
  };

  const handleImportRoster = (newRoster: Student[]) => {
    const assigned = runAllocation(newRoster, 'balanced');
    setStudents(assigned);
    localStorage.setItem('biol2402_students', JSON.stringify(assigned));
    setSelectedStudentIdx(0);
    setActiveTab('matrix');
    showToast(`Successfully imported and randomized ${newRoster.length} students!`);
  };

  const handleResetDefault = () => {
    initDefaultRoster('balanced');
    setSelectedStudentIdx(0);
    setActiveTab('matrix');
    showToast("Restored original class roster (28 enrolled).");
  };

  const handleSessionChange = (newSession: AcademicSession) => {
    setSession(newSession);
    localStorage.setItem('biol2402_session', newSession);
    showToast(`Updated academic term settings to ${newSession === 'su26' ? 'Summer 2026' : newSession === 'fa26' ? 'Fall 2026' : 'Spring 2027'}.`);
  };

  // Clipboard TSV export
  const handleCopyClipboard = () => {
    let tsv = "Student ID\tStudent Name\tAcademic Level\tExam 1 Outcome\tExam 2 Outcome\tExam 3 Outcome\tExam 4 Outcome\tExam 5 Outcome\n";
    students.forEach(s => {
      tsv += `${s.id}\t${s.name}\t${s.level}\t${s.exam1?.id || ""}\t${s.exam2?.id || ""}\t${s.exam3?.id || ""}\t${s.exam4?.id || ""}\t${s.exam5?.id || ""}\n`;
    });

    navigator.clipboard.writeText(tsv).then(() => {
      showToast("Roster Copied! Ready to paste into Excel or Sheets.");
    }).catch(() => {
      showToast("Clipboard copy failed. Try exporting CSV instead.");
    });
  };

  // CSV download
  const handleDownloadCSV = () => {
    let csv = "Student ID,Student Name,Level,Exam 1 L.O.,Exam 1 Description,Exam 2 L.O.,Exam 2 Description,Exam 3 L.O.,Exam 3 Description,Exam 4 L.O.,Exam 4 Description,Exam 5 L.O.,Exam 5 Description\n";
    students.forEach(s => {
      csv += `"${s.id}","${s.name}","${s.level}","${s.exam1?.id || ""}","${(s.exam1?.desc || "").replace(/"/g, '""')}","${s.exam2?.id || ""}","${(s.exam2?.desc || "").replace(/"/g, '""')}","${s.exam3?.id || ""}","${(s.exam3?.desc || "").replace(/"/g, '""')}","${s.exam4?.id || ""}","${(s.exam4?.desc || "").replace(/"/g, '""')}","${s.exam5?.id || ""}","${(s.exam5?.desc || "").replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `BIOL2402_HAPS_Assignments_${session}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV file download triggered successfully!");
  };

  const handleCopyMarkdown = () => {
    const student = students[selectedStudentIdx];
    if (!student) return;

    const md = `
# Mastery Learning Covenant
**Course:** Human Anatomy & Physiology II (BIOL 2402)
**Instructor:** Prof. Victor Garcia Martinez

## Student Profile
* **Name:** ${student.name}
* **ID:** ${student.id}
* **Level:** ${student.level}

## Assigned HAPS Learning Outcomes
1. **Lecture Exam 1 (Ch. 13-15):** \`${student.exam1?.id || ""}\` - ${student.exam1?.topic || ""}: ${student.exam1?.desc || ""}
2. **Lecture Exam 2 (Ch. 16, 19):** \`${student.exam2?.id || ""}\` - ${student.exam2?.topic || ""}: ${student.exam2?.desc || ""}
3. **Lecture Exam 3 (Ch. 17-18):** \`${student.exam3?.id || ""}\` - ${student.exam3?.topic || ""}: ${student.exam3?.desc || ""}
4. **Lecture Exam 4 (Ch. 20-21):** \`${student.exam4?.id || ""}\` - ${student.exam4?.topic || ""}: ${student.exam4?.desc || ""}
5. **Lecture Exam 5 (Ch. 22-24):** \`${student.exam5?.id || ""}\` - ${student.exam5?.topic || ""}: ${student.exam5?.desc || ""}

---
*Signed by Student and Instructor for Academic Term 2026.*
`;
    navigator.clipboard.writeText(md.trim()).then(() => {
      showToast("Markdown covenant copied to clipboard!");
    });
  };

  const handleOpenContract = (index: number) => {
    setSelectedStudentIdx(index);
    setIsContractOpen(true);
  };

  const handleShowOutcomeDetails = (examKey: string, index: number) => {
    setSelectedStudentIdx(index);
    setIsContractOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-sans text-gray-900 flex flex-col justify-between selection:bg-teal-700 selection:text-white relative">
      
      {/* Dynamic Toast Message */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-teal-900 text-white font-medium text-sm px-5 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2 border border-teal-800 animate-fade-in print:hidden">
          <Sparkles className="w-4 h-4 text-green-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Strict Style specifications from style_structure.md */}
      <Hero />

      {/* App Introduction Video */}
      <IntroVideo />

      {/* Professor's Guide & Audio Overview Video */}
      <ExplanationVideo />

      {/* Main Interactive Planner Deck Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full print:hidden">
        
        {/* Core Roster Header */}
        <header className="border-b-2 border-double border-gray-200 pb-6 mb-8">
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs tracking-widest uppercase mb-1.5">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span>Lone Star College System &bull; Human Anatomy &amp; Physiology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-950 font-normal leading-tight">
            BIOL 2402 &mdash; Human Anatomy &amp; Physiology II
          </h1>
          <p className="text-gray-600 text-sm sm:text-base italic mt-1 font-serif">
            {session === 'su26' ? 'Summer Course Learning Outcome Distribution Portal • Prof. Victor Garcia Martinez' :
             session === 'fa26' ? 'Fall Semester 16-Week Dynamic Learning Map • Prof. Victor Garcia Martinez' :
             'Spring Semester Accelerated Learning Deck • Prof. Victor Garcia Martinez'}
          </p>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enrolled Students</span>
            <span className="text-3xl font-serif font-normal text-teal-800 mt-1">{students.length}</span>
            <span className="text-xs text-gray-500 italic mt-2">BIOL 2402 {session.toUpperCase()}</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">HAPS Core Outcomes</span>
            <span className="text-3xl font-serif font-normal text-teal-800 mt-1">61</span>
            <span className="text-xs text-gray-500 italic mt-2">Mapped to Exams 1 - 5</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Assigned Outcomes</span>
            <span className="text-3xl font-serif font-normal text-teal-800 mt-1">{students.length * 5}</span>
            <span className="text-xs text-gray-500 italic mt-2">5 outcomes per student</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Distribution Balance</span>
            <span className="text-3xl font-serif font-normal text-teal-800 mt-1">100%</span>
            <span className="text-xs text-gray-500 italic mt-2">Perfect Balance Active</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap gap-2 border-b border-gray-200 mb-8 text-sm">
          {[
            { id: 'matrix', label: 'Roster & Outcomes Matrix', icon: <Layers className="w-4 h-4" /> },
            { id: 'notebooks', label: 'Notebook LM Repository', icon: <Database className="w-4 h-4" /> },
            { id: 'guide', label: 'NotebookLM Guide', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'stats', label: 'Distribution & Stats', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'map', label: 'Syllabus Chapters', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'reloader', label: 'Core Roster Relauncher', icon: <RefreshCw className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-1.5 px-4 py-3 font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-teal-700 text-teal-700 font-bold'
                  : 'border-transparent text-gray-500 hover:text-teal-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Dynamic Tab Contents */}
        <div className="min-h-[400px]">
          {activeTab === 'matrix' && (
            <RosterMatrix
              students={students}
              session={session}
              onSessionChange={handleSessionChange}
              onRandomize={handleRandomize}
              onOpenContract={handleOpenContract}
              onShowOutcomeDetails={handleShowOutcomeDetails}
              onBulkPrint={() => window.print()}
              onCopyClipboard={handleCopyClipboard}
              onDownloadCSV={handleDownloadCSV}
            />
          )}

          {activeTab === 'notebooks' && (
            <SubmittedNotebooks />
          )}

          {activeTab === 'guide' && (
            <NotebookLMGuide
              students={students}
              selectedStudentIdx={selectedStudentIdx}
            />
          )}

          {activeTab === 'stats' && (
            <Diagnostics students={students} />
          )}

          {activeTab === 'map' && (
            <SyllabusMap />
          )}

          {activeTab === 'reloader' && (
            <RosterRelauncher
              onImportRoster={handleImportRoster}
              onResetDefault={handleResetDefault}
            />
          )}
        </div>

      </main>

      {/* Mastery Learning Covenant Modal */}
      <LearningContractModal
        student={students[selectedStudentIdx] || null}
        isOpen={isContractOpen}
        onClose={() => setIsContractOpen(false)}
        onGeneratePrompts={() => {
          setIsContractOpen(false);
          setActiveTab('guide');
        }}
        onCopyMarkdown={handleCopyMarkdown}
      />

      {/* Absolute Physical Print Container - formatted only for physical printing */}
      <div className="hidden print:block space-y-12 w-full p-8 bg-white text-gray-900 select-all">
        {students.map((student) => (
          <div key={student.id} className="print-contract-page border-4 border-double border-gray-300 p-8 rounded-lg page-break-after-always bg-white">
            <div className="text-center border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-2xl font-serif text-teal-900 tracking-tight font-normal">
                Mastery Learning Covenant
              </h2>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">
                Human Anatomy &amp; Physiology II &bull; BIOL 2402
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 border border-dashed border-gray-200 p-4 rounded-lg mb-6 leading-relaxed">
              <div>
                <p className="text-gray-500 font-semibold uppercase text-[9px] tracking-wider mb-0.5">STUDENT SCHOLAR:</p>
                <p className="text-sm font-bold text-gray-900">{student.name}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold uppercase text-[9px] tracking-wider mb-0.5">STUDENT ID:</p>
                <p className="text-sm font-mono text-gray-900">{student.id}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold uppercase text-[9px] tracking-wider mb-0.5">ACADEMIC LEVEL:</p>
                <p className="text-sm font-medium text-gray-900">{student.level} &bull; Graded</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold uppercase text-[9px] tracking-wider mb-0.5">INSTITUTION &amp; SECTION:</p>
                <p className="text-sm font-medium text-gray-900">Lone Star College System &bull; SU26</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              This learning covenant defines the individual academic focus of the undergraduate scholar listed above. Under the pedagogical direction of <strong>Professor Victor Garcia Martinez</strong>, the student pledges to achieve maximum concept mastery over the following assigned standardized <strong>HAPS Learning Outcomes</strong> for each upcoming Lecture Exam:
            </p>

            <div className="space-y-4 border-t border-b border-gray-100 py-5">
              {[
                { label: "Lecture Exam 1", ch: "Ch. 13, 14, 15", lo: student.exam1 },
                { label: "Lecture Exam 2", ch: "Ch. 16, 19", lo: student.exam2 },
                { label: "Lecture Exam 3", ch: "Ch. 17, 18", lo: student.exam3 },
                { label: "Lecture Exam 4", ch: "Ch. 20, 21", lo: student.exam4 },
                { label: "Lecture Exam 5", ch: "Ch. 22, 23, 24", lo: student.exam5 }
              ].map((milestone, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 text-xs py-1.5 border-l-2 border-teal-600 pl-3">
                  <div className="col-span-3">
                    <p className="font-bold text-gray-900 leading-tight">{milestone.label}</p>
                    <p className="text-[10px] text-gray-500 font-medium leading-none">{milestone.ch}</p>
                  </div>
                  <div className="col-span-2 font-mono font-bold text-teal-800 text-[11px]">
                    {milestone.lo?.id}
                  </div>
                  <div className="col-span-7 text-gray-700 leading-normal">
                    <span className="font-semibold text-gray-800">{milestone.lo?.topic}:</span> {milestone.lo?.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12 pt-6 border-t border-dashed border-gray-200">
              <div className="text-center">
                <div className="border-b border-gray-400 h-10 mb-1"></div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">Student Signature</p>
              </div>
              <div className="text-center">
                <div className="border-b border-gray-400 h-10 mb-1 flex items-end justify-center">
                  <span className="font-condiment text-xl text-teal-700 font-semibold leading-none">
                    Victor Garcia Martinez
                  </span>
                </div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">Instructor Endorsement</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Beautifully Crafted Footer */}
      <footer className="mt-12 bg-white border-t border-gray-200 py-12 text-center text-xs text-gray-500 font-sans flex flex-col items-center gap-6 print:hidden">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-left bg-gray-50 border border-gray-200/60 p-6 rounded-xl shadow-xs max-w-xl w-full mx-4">
          {!avatarError ? (
            <img
              src="/VHGM traje azul.png"
              onError={() => setAvatarError(true)}
              alt="Dr. Victor Garcia Martinez"
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover border-2 border-teal-700 shadow-md select-none shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-teal-800 text-teal-50 font-serif font-bold text-2xl flex items-center justify-center border-2 border-teal-700 shadow-md select-none shrink-0">
              VGM
            </div>
          )}
          <div>
            <h4 className="font-serif text-lg font-bold text-gray-900 leading-tight">
              Dr. Victor Garcia Martinez, MSN, FNP-C, RN
            </h4>
            <p className="text-gray-500 text-xs mt-1 leading-normal font-sans">
              Nursing &amp; Biology Faculty &bull; Lone Star College System
            </p>
            <p className="text-teal-700 font-semibold text-xs mt-2">
              <a
                href="https://48hours.live"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline tracking-wide"
              >
                Built by Dr. Victor Garcia Martinez @ 48hours.live
              </a>
            </p>
          </div>
        </div>

        <p className="max-w-2xl px-6 leading-relaxed">
          &copy; 2026 Professor Victor Garcia Martinez. Developed for Lone Star College A&amp;P Instruction. Utilizing 2019 HAPS Standard Learning Outcomes. Core configuration parsed from <span className="font-mono bg-gray-100 px-1 border border-gray-200 rounded">BIOL 2402 SU 26.pdf</span> and <span className="font-mono bg-gray-100 px-1 border border-gray-200 rounded">HAPS LEARNING OUTCOMES - HAPS L.O..csv</span>.
        </p>
      </footer>

    </div>
  );
}
