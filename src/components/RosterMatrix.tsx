/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Student, DistributionPolicy, AcademicSession } from '../types';
import { hapsOutcomes } from '../data/outcomes';
import { Search, RotateCcw, Clipboard, Download, Printer, Filter, Settings, Award } from 'lucide-react';

interface RosterMatrixProps {
  students: Student[];
  onRandomize: (policy: DistributionPolicy) => void;
  onOpenContract: (index: number) => void;
  onShowOutcomeDetails: (examKey: string, index: number) => void;
  onBulkPrint: () => void;
  onCopyClipboard: () => void;
  onDownloadCSV: () => void;
  session: AcademicSession;
  onSessionChange: (session: AcademicSession) => void;
}

export default function RosterMatrix({
  students,
  onRandomize,
  onOpenContract,
  onShowOutcomeDetails,
  onBulkPrint,
  onCopyClipboard,
  onDownloadCSV,
  session,
  onSessionChange
}: RosterMatrixProps) {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [policy, setPolicy] = useState<DistributionPolicy>("balanced");

  // Local handler for randomization
  const handleRandomize = () => {
    onRandomize(policy);
  };

  const filteredStudents = students.filter(student => {
    const query = search.toLowerCase();
    const matchesQuery = 
      student.name.toLowerCase().includes(query) ||
      student.id.includes(query) ||
      (student.exam1?.id.toLowerCase() || "").includes(query) ||
      (student.exam2?.id.toLowerCase() || "").includes(query) ||
      (student.exam3?.id.toLowerCase() || "").includes(query) ||
      (student.exam4?.id.toLowerCase() || "").includes(query) ||
      (student.exam5?.id.toLowerCase() || "").includes(query);

    const matchesLevel = levelFilter === "all" || student.level === levelFilter;
    const matchesGrade = gradeFilter === "all" || student.gradeBasis === gradeFilter;

    return matchesQuery && matchesLevel && matchesGrade;
  });

  return (
    <div className="space-y-8">
      {/* Allocation & Planner Control Deck */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-serif text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-teal-600" />
          <span>Allocation &amp; Planner Control Deck</span>
        </h3>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRandomize}
            className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs py-3 px-5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Deterministic Assignments</span>
          </button>
          
          <button
            onClick={onCopyClipboard}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs py-3 px-5 rounded-lg transition-colors cursor-pointer"
          >
            <Clipboard className="w-4 h-4" />
            <span>Copy Spreadsheet Ready Roster</span>
          </button>

          <button
            onClick={onDownloadCSV}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs py-3 px-5 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV File</span>
          </button>

          <button
            onClick={onBulkPrint}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs py-3 px-5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Bulk Print Learning Contracts</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-5 border-t border-gray-100">
          <div className="flex flex-col gap-2 bg-teal-50/50 border border-teal-100 rounded-lg p-3 text-xs text-teal-800">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Deterministic Assignment Rule</span>
            <p className="leading-relaxed">
              Assignments are fixed deterministically (1 SLO per Exam per Student) by sequentially cycling through the HAPS standard syllabus. Randomization is disabled to ensure equitable assessment.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Academic Session
            </label>
            <select
              value={session}
              onChange={(e) => onSessionChange(e.target.value as AcademicSession)}
              className="px-3 py-2 border border-gray-300 rounded bg-white outline-none text-sm focus:border-teal-500 text-gray-800"
            >
              <option value="su26">2026 Summer Session II (Active)</option>
              <option value="fa26">2026 Fall Standard</option>
              <option value="sp27">2027 Spring Accelerated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Roster & Outcomes List */}
      <div>
        {/* Filter bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search student name, ID or assigned outcome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg outline-none text-sm focus:border-teal-500 text-gray-800"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-teal-500 text-gray-800"
            >
              <option value="all">All Academic Levels</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>

            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-teal-500 text-gray-800"
            >
              <option value="all">All Grade Bases</option>
              <option value="Graded">Graded</option>
              <option value="Audit">Audit/Other</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setLevelFilter("all");
                setGradeFilter("all");
              }}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs font-semibold text-gray-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Matrix table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-teal-50/40 text-teal-900 border-b border-gray-200 font-semibold text-xs uppercase tracking-wider">
                  <th className="p-4 w-[60px]">Seq</th>
                  <th className="p-4 w-[110px]">Student ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4 w-[110px]">Level</th>
                  <th className="p-4">Exam 1</th>
                  <th className="p-4">Exam 2</th>
                  <th className="p-4">Exam 3</th>
                  <th className="p-4">Exam 4</th>
                  <th className="p-4">Exam 5</th>
                  <th className="p-4 text-center w-[120px]">Contract</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
                {filteredStudents.map((student, idx) => {
                  const levelClass = student.level.toLowerCase();
                  return (
                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-semibold text-gray-400">{idx + 1}</td>
                      <td className="p-4 font-mono text-xs text-gray-500">{student.id}</td>
                      <td className="p-4 font-medium text-gray-900">{student.name}</td>
                      <td className="p-4">
                        <span className={`inline-block text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                          levelClass === 'freshman' ? 'bg-emerald-50 text-emerald-700' :
                          levelClass === 'sophomore' ? 'bg-indigo-50 text-indigo-700' :
                          levelClass === 'junior' ? 'bg-purple-50 text-purple-700' :
                          levelClass === 'instructor' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' :
                          'bg-rose-50 text-rose-700'
                        }`}>
                          {student.level}
                        </span>
                      </td>
                      <td className="p-4">
                        {student.exam1 && (
                          <span
                            onClick={() => onShowOutcomeDetails('exam1', idx)}
                            title={student.exam1.desc}
                            className="block text-[11px] font-semibold text-teal-800 bg-teal-50/60 border border-teal-100 rounded px-2 py-1 cursor-pointer hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all truncate max-w-[140px]"
                          >
                            {student.exam1.id}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {student.exam2 && (
                          <span
                            onClick={() => onShowOutcomeDetails('exam2', idx)}
                            title={student.exam2.desc}
                            className="block text-[11px] font-semibold text-teal-800 bg-teal-50/60 border border-teal-100 rounded px-2 py-1 cursor-pointer hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all truncate max-w-[140px]"
                          >
                            {student.exam2.id}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {student.exam3 && (
                          <span
                            onClick={() => onShowOutcomeDetails('exam3', idx)}
                            title={student.exam3.desc}
                            className="block text-[11px] font-semibold text-teal-800 bg-teal-50/60 border border-teal-100 rounded px-2 py-1 cursor-pointer hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all truncate max-w-[140px]"
                          >
                            {student.exam3.id}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {student.exam4 && (
                          <span
                            onClick={() => onShowOutcomeDetails('exam4', idx)}
                            title={student.exam4.desc}
                            className="block text-[11px] font-semibold text-teal-800 bg-teal-50/60 border border-teal-100 rounded px-2 py-1 cursor-pointer hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all truncate max-w-[140px]"
                          >
                            {student.exam4.id}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {student.exam5 && (
                          <span
                            onClick={() => onShowOutcomeDetails('exam5', idx)}
                            title={student.exam5.desc}
                            className="block text-[11px] font-semibold text-teal-800 bg-teal-50/60 border border-teal-100 rounded px-2 py-1 cursor-pointer hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all truncate max-w-[140px]"
                          >
                            {student.exam5.id}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => onOpenContract(idx)}
                          className="inline-flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors cursor-pointer"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Review</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={10} className="p-12 text-center text-gray-500 font-serif text-base">
                      No matching student or outcome found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
