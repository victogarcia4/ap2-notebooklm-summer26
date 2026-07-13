import { Student } from '../types';
import { hapsOutcomes } from '../data/outcomes';
import { BarChart3, Heart, Wind, Apple, Droplet, Dna } from 'lucide-react';

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
    { key: 'exam1', title: "Volume I: Endocrine, Blood, Cardio", icon: <Heart className="w-5 h-5 text-white" />, color: 'bg-[#F472B6]' },
    { key: 'exam2', title: "Volume II: Lymphatic & Respiratory", icon: <Wind className="w-5 h-5 text-white" />, color: 'bg-[#8B5CF6]' },
    { key: 'exam3', title: "Volume III: Digestive & Nutrition", icon: <Apple className="w-5 h-5 text-white" />, color: 'bg-[#FBBF24]' },
    { key: 'exam4', title: "Volume IV: Urinary & Fluids", icon: <Droplet className="w-5 h-5 text-white" />, color: 'bg-[#34D399]' },
    { key: 'exam5', title: "Volume V: Reproduction & Genetics", icon: <Dna className="w-5 h-5 text-white" />, color: 'bg-[#F472B6]' }
  ] as const;

  return (
    <div className="space-y-8 text-[#1E293B]">
      
      {/* Intro pop card */}
      <div className="bg-white border-4 border-[#1E293B] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#1E293B]">
        <h2 className="text-2xl sm:text-3xl font-display font-black text-[#1E293B] flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-[#8B5CF6]" />
          <span>Outcome Distribution Frequency Dashboard</span>
        </h2>
        <p className="text-[#64748B] text-sm font-bold mt-2 leading-relaxed">
          To ensure uniform teaching coverage, this diagnostics dashboard highlights the distribution frequency of outcomes. Under the Balanced Coverage Policy, the standard deviation is minimal.
        </p>
      </div>

      {/* Grid of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {examsConfig.map(exam => {
          const { outcomesList, frequencies } = getFrequencies(exam.key);
          const maxCount = Math.max(...Object.values(frequencies), 1);

          return (
            <div key={exam.key} className="bg-white border-4 border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[6px_6px_0px_0px_#1E293B] transition-all">
              
              {/* Header */}
              <h3 className="text-base font-display font-black text-[#1E293B] border-b-4 border-[#1E293B] pb-3 mb-5 flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full ${exam.color} border-2 border-[#1E293B] flex items-center justify-center pop-shadow-sm`}>
                  {exam.icon}
                </div>
                <span>{exam.title}</span>
              </h3>

              {/* Chart elements */}
              <div className="space-y-4">
                {outcomesList.map(lo => {
                  const count = frequencies[lo.id] || 0;
                  const percent = (count / maxCount) * 100;

                  return (
                    <div key={lo.id} className="flex items-center gap-4 text-xs font-bold">
                      
                      {/* Outcome ID tag */}
                      <div className="w-24 font-mono font-black text-[#8B5CF6] truncate bg-gray-100 px-2 py-1 rounded border-2 border-[#1E293B]" title={`${lo.id}: ${lo.desc}`}>
                        {lo.id}
                      </div>
                      
                      {/* Bar outer */}
                      <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden border-2 border-[#1E293B] relative">
                        <div
                          className={`${exam.color} h-full rounded-full border-r-2 border-[#1E293B] transition-all duration-500 ease-out`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      {/* Count value */}
                      <div className="w-8 text-right font-mono font-black text-sm text-[#F472B6]">
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
