import { BookOpen, GraduationCap, Map, Sparkles } from 'lucide-react';

export default function SyllabusMap() {
  const cards = [
    {
      vol: "Volume I",
      exam: "Exam 1",
      title: "Blood & Cardio-Endocrine",
      color: "bg-[#8B5CF6]",
      textColor: "text-white",
      chapters: [
        { num: "Chapter 13", name: "Endocrine System (Module J)" },
        { num: "Chapter 14", name: "Blood (Module K)" },
        { num: "Chapter 15", name: "Cardiovascular System: Heart & Vessels (Modules L, M)" }
      ]
    },
    {
      vol: "Volume II",
      exam: "Exam 2",
      title: "Fluid Transport & Ventilation",
      color: "bg-[#F472B6]",
      textColor: "text-white",
      chapters: [
        { num: "Chapter 16", name: "Lymphatic System & Immunity (Module N)" },
        { num: "Chapter 19", name: "Respiratory System (Module O)" }
      ]
    },
    {
      vol: "Volume III",
      exam: "Exam 3",
      title: "Alimentation & Metabolism",
      color: "bg-[#FBBF24]",
      textColor: "text-[#1E293B]",
      chapters: [
        { num: "Chapter 17", name: "Digestive System (Module P)" },
        { num: "Chapter 18", name: "Nutrition & Metabolism (Module Q)" }
      ]
    },
    {
      vol: "Volume IV",
      exam: "Exam 4",
      title: "Renal & Acid-Base Regulation",
      color: "bg-[#34D399]",
      textColor: "text-[#1E293B]",
      chapters: [
        { num: "Chapter 21", name: "Urinary System (Module R)" },
        { num: "Chapter 20", name: "Water, Electrolytes, & Acid-Base (Module S)" }
      ]
    },
    {
      vol: "Volume V",
      exam: "Exam 5",
      title: "Reproduction & Genetics",
      color: "bg-[#8B5CF6]",
      textColor: "text-white",
      fullWidth: true,
      chapters: [
        { num: "Chapter 22", name: "Reproductive System (Module T - Spermatogenesis / Oogenesis)" },
        { num: "Chapter 23", name: "Pregnancy, Embryological & Fetal Development (Module T)" },
        { num: "Chapter 24", name: "Genetics and Genomics (Module T - Alleles, Punnett Calculations)" }
      ]
    }
  ];

  return (
    <div className="space-y-8 text-[#1E293B]">
      
      {/* Intro pop card */}
      <div className="bg-white border-4 border-[#1E293B] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#1E293B]">
        <h2 className="text-2xl sm:text-3xl font-display font-black text-[#1E293B] flex items-center gap-2">
          <Map className="w-6 h-6 text-[#8B5CF6]" />
          <span>Syllabus Chapter &amp; Exam Blueprint</span>
        </h2>
        <p className="text-[#64748B] text-sm font-bold mt-2 leading-relaxed">
          The HAPS Learning Outcomes (A&amp;P II) correspond to your specific textbook outline. Below is how the outcome categories align with your 5 Lecture Exams:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-white border-4 border-[#1E293B] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[6px_6px_0px_0px_#1E293B] hover:translate-y-[-1px] transition-all flex flex-col justify-between ${
              card.fullWidth ? 'lg:col-span-2' : ''
            }`}
          >
            <div>
              {/* Badge */}
              <div className={`inline-block text-[10px] font-display font-black uppercase tracking-wider px-3 py-1 border-2 border-[#1E293B] rounded-full mb-4 pop-shadow-sm ${card.color} ${card.textColor}`}>
                {card.vol} &bull; {card.exam}
              </div>

              <h3 className="text-xl font-display font-black text-[#1E293B] mb-4">
                {card.title}
              </h3>

              <div className={`${card.fullWidth ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-3.5'}`}>
                {card.chapters.map((ch, cidx) => (
                  <div key={cidx} className="flex items-start gap-2.5 text-xs font-semibold">
                    <div className="w-5 h-5 rounded-full border-2 border-[#1E293B] bg-[#FFFDF5] flex items-center justify-center text-[10px] text-[#8B5CF6] font-black shrink-0 shadow-sm mt-0.5">
                      ✓
                    </div>
                    <div>
                      <p className="text-[#1E293B] font-black font-display">{ch.num}</p>
                      <p className="text-[#64748B] text-[11px] leading-tight">{ch.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
