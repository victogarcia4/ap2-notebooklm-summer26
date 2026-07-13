/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, GraduationCap, Map } from 'lucide-react';

export default function SyllabusMap() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-gray-950 flex items-center gap-2">
          <Map className="w-6 h-6 text-teal-700" />
          <span>Syllabus Chapter &amp; Exam Blueprint</span>
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          The HAPS Learning Outcomes (A&amp;P II) correspond to your specific textbook outline. Below is how the outcome categories align with your 5 Lecture Exams:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Exam 1 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Lecture Exam 1
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
              Blood &amp; Cardio-Endocrine System
            </h3>
            <ul className="text-xs text-gray-600 space-y-2 list-none pl-0">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Chapter 13:</strong> Endocrine System (Module J)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Chapter 14:</strong> Blood (Module K)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Chapter 15:</strong> Cardiovascular System: Heart &amp; Vessels (Modules L, M)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Exam 2 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Lecture Exam 2
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
              Fluid Transport &amp; Ventilation
            </h3>
            <ul className="text-xs text-gray-600 space-y-2 list-none pl-0">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Chapter 16:</strong> Lymphatic System &amp; Immunity (Module N)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Chapter 19:</strong> Respiratory System (Module O)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Exam 3 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Lecture Exam 3
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
              Alimentation &amp; Metabolism
            </h3>
            <ul className="text-xs text-gray-600 space-y-2 list-none pl-0">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Chapter 17:</strong> Digestive System (Module P)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Chapter 18:</strong> Nutrition &amp; Metabolism (Module Q)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Exam 4 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Lecture Exam 4
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
              Renal &amp; Acid-Base Regulation
            </h3>
            <ul className="text-xs text-gray-600 space-y-2 list-none pl-0">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Chapter 21:</strong> Urinary System (Module R)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Chapter 20:</strong> Water, Electrolytes, &amp; Acid-Base (Module S)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Exam 5 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between lg:col-span-2">
          <div>
            <div className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Lecture Exam 5
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
              Reproduction, Embryogenesis &amp; Genetics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="text-xs text-gray-600 space-y-2 list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Chapter 22:</strong> Reproductive System (Module T - Spermatogenesis / Oogenesis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Chapter 23:</strong> Pregnancy, Embryological &amp; Fetal Development (Module T - Fertilization, Gastrulation &amp; Organogenesis)</span>
                </li>
              </ul>
              <ul className="text-xs text-gray-600 space-y-2 list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Chapter 24:</strong> Genetics and Genomics (Module T - Alleles, Punnett Calculations)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
