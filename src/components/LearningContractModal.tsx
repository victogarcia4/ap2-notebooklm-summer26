/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Student } from '../types';
import { Printer, Copy, Headphones, X } from 'lucide-react';

interface LearningContractModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onGeneratePrompts: () => void;
  onCopyMarkdown: () => void;
}

export default function LearningContractModal({
  student,
  isOpen,
  onClose,
  onGeneratePrompts,
  onCopyMarkdown
}: LearningContractModalProps) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-amber-50/10 border border-gray-200 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl bg-white p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Actions Header */}
        <div className="flex gap-2 justify-end mb-6 border-b border-gray-100 pb-4 print:hidden">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2 rounded shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Contract</span>
          </button>
          <button
            onClick={onCopyMarkdown}
            className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded shadow-sm transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy MD</span>
          </button>
        </div>

        {/* Contract Sheet */}
        <div className="border-4 border-double border-gray-200 p-6 bg-white rounded-lg select-all">
          <div className="text-center border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-teal-900 tracking-tight font-normal">
              Mastery Learning Covenant
            </h2>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">
              Human Anatomy &amp; Physiology II &bull; BIOL 2402
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-gray-50 border border-dashed border-gray-200 p-4 rounded-lg mb-6 leading-relaxed">
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

          {/* Outcomes list inside modal */}
          <div className="space-y-4 border-t border-b border-gray-100 py-5">
            {[
              { label: "Lecture Exam 1", ch: "Ch. 13, 14, 15", lo: student.exam1 },
              { label: "Lecture Exam 2", ch: "Ch. 16, 19", lo: student.exam2 },
              { label: "Lecture Exam 3", ch: "Ch. 17, 18", lo: student.exam3 },
              { label: "Lecture Exam 4", ch: "Ch. 20, 21", lo: student.exam4 },
              { label: "Lecture Exam 5", ch: "Ch. 22, 23, 24", lo: student.exam5 }
            ].map((milestone, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs py-1.5 border-l-2 border-teal-600 pl-3">
                <div className="sm:col-span-3">
                  <p className="font-bold text-gray-900 leading-tight">{milestone.label}</p>
                  <p className="text-[10px] text-gray-500 font-medium leading-none">{milestone.ch}</p>
                </div>
                <div className="sm:col-span-2 font-mono font-bold text-teal-800 text-[11px]">
                  {milestone.lo?.id}
                </div>
                <div className="sm:col-span-7 text-gray-700 leading-normal">
                  <span className="font-semibold text-gray-800">{milestone.lo?.topic}:</span> {milestone.lo?.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Custom navigation button */}
          <div className="text-center mt-6 print:hidden">
            <button
              onClick={onGeneratePrompts}
              className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 font-semibold bg-teal-50 hover:bg-teal-100/80 px-4 py-2 rounded-lg border border-teal-100 transition-colors cursor-pointer"
            >
              <Headphones className="w-4 h-4 text-teal-600" />
              <span>Generate NotebookLM Prompts for this Student</span>
            </button>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 mt-10 pt-6 border-t border-dashed border-gray-200">
            <div className="text-center">
              <div className="border-b border-gray-400 h-10 mb-1"></div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">Student Signature</p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-400 h-10 mb-1 flex items-end justify-center">
                <span className="font-condiment text-xl text-teal-700 font-semibold leading-none select-none">
                  Victor Garcia Martinez
                </span>
              </div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">Instructor Endorsement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
