/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student } from '../types';
import { hapsOutcomes } from '../data/outcomes';
import { BarChart, Heart, Wind, Apple, Droplet, Dna, Info } from 'lucide-react';

interface DiagnosticsProps {
  students: Student[];
}

export default function Diagnostics({ students }: DiagnosticsProps) {
  // Compute frequencies for a given exam key
  const getFrequencies = (examKey: 'exam1' | 'exam2' | 'exam3' | 'exam4' | 'exam5') => {
    const outcomesList = hapsOutcomes[examKey] || [];
    const frequencies: Record<string, number> = {};

    // Initialize counts
    outcomesList.forEach(lo => {
      frequencies[lo.id] = 0;
    });

    // Count students
    students.forEach(s => {
      const outcome = s[examKey];
      if (outcome) {
        frequencies[outcome.id] = (frequencies[outcome.id] || 0) + 1;
      }
    });

    return { outcomesList, frequencies };
  };

  const examsConfig = [
    { key: 'exam1', title: "Exam 1: Endocrine, Blood, Cardio", icon: <Heart className="w-5 h-5 text-red-600" /> },
    { key: 'exam2', title: "Exam 2: Lymphatic & Respiratory", icon: <Wind className="w-5 h-5 text-blue-600" /> },
    { key: 'exam3', title: "Exam 3: Digestive & Nutrition", icon: <Apple className="w-5 h-5 text-emerald-600" /> },
    { key: 'exam4', title: "Exam 4: Urinary & Fluids", icon: <Droplet className="w-5 h-5 text-sky-600" /> },
    { key: 'exam5', title: "Exam 5: Reproduction & Genetics", icon: <Dna className="w-5 h-5 text-indigo-600" /> }
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-gray-950 flex items-center gap-2">
          <BarChart className="w-6 h-6 text-teal-700" />
          <span>Outcome Distribution Frequency Dashboard</span>
        </h2>
        <p className="text-gray-600 text-sm italic mt-1">
          To ensure uniform teaching coverage, this diagnostics dashboard highlights the distribution frequency of outcomes. Under the Balanced Coverage Policy, the standard deviation is minimal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {examsConfig.map(exam => {
          const { outcomesList, frequencies } = getFrequencies(exam.key);
          const maxCount = Math.max(...Object.values(frequencies), 1);

          return (
            <div key={exam.key} className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm">
              <h3 className="text-base font-serif text-gray-900 font-bold border-b border-gray-100 pb-3 mb-4 flex items-center gap-2.5">
                {exam.icon}
                <span>{exam.title}</span>
              </h3>

              <div className="space-y-3.5">
                {outcomesList.map(lo => {
                  const count = frequencies[lo.id] || 0;
                  const percent = (count / maxCount) * 100;

                  return (
                    <div key={lo.id} className="flex items-center gap-3 text-xs">
                      <div className="w-32 font-mono font-bold text-gray-700 truncate" title={`${lo.id}: ${lo.desc}`}>
                        {lo.id}
                      </div>
                      
                      {/* Bar outer */}
                      <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden border border-gray-200/50">
                        <div
                          className="bg-teal-700 h-full rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="w-6 text-right font-bold text-teal-900">
                        {count}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
