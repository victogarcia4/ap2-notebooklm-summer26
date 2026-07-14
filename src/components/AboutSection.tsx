import React from 'react';
import { Sparkles, GraduationCap, Award, BookOpen, Layers } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about-section" className="relative bg-[#FFFDF5] py-24 border-b-4 border-[#1E293B] overflow-hidden">
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#1E293B 1px, transparent 1px)',
        backgroundSize: '16px 16px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Badge Row (Tactile buttons that wobble on hover) */}
        <div className="flex flex-wrap justify-center items-center gap-4 pb-16 border-b-4 border-dashed border-[#1E293B] mb-16">
          <div className="flex items-center gap-2.5 bg-white border-2 border-[#1E293B] px-5 py-2.5 rounded-full shadow-[2px_2px_0px_0px_#1E293B] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#1E293B] transition-all group cursor-default">
            <GraduationCap className="w-5 h-5 text-[#8B5CF6] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-display font-extrabold tracking-wide text-[#1E293B] uppercase">Lone Star System</span>
          </div>

          <div className="flex items-center gap-2.5 bg-white border-2 border-[#1E293B] px-5 py-2.5 rounded-full shadow-[2px_2px_0px_0px_#1E293B] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#1E293B] transition-all group cursor-default">
            <Award className="w-5 h-5 text-[#F472B6] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-display font-extrabold tracking-wide text-[#1E293B] uppercase">HAPS Core Outcome Standards</span>
          </div>

          <div className="flex items-center gap-2.5 bg-white border-2 border-[#1E293B] px-5 py-2.5 rounded-full shadow-[2px_2px_0px_0px_#1E293B] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#1E293B] transition-all group cursor-default">
            <Layers className="w-5 h-5 text-[#FBBF24] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-display font-extrabold tracking-wide text-[#1E293B] uppercase">Balanced Matrix Allocations</span>
          </div>

          <div className="flex items-center gap-2.5 bg-white border-2 border-[#1E293B] px-5 py-2.5 rounded-full shadow-[2px_2px_0px_0px_#1E293B] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#1E293B] transition-all group cursor-default">
            <BookOpen className="w-5 h-5 text-[#34D399] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-display font-extrabold tracking-wide text-[#1E293B] uppercase">NotebookLM Prompts Loaded</span>
          </div>
        </div>

        {/* Descriptive Text Content in a Sticker Panel */}
        <div className="max-w-3xl mx-auto space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B5CF6] border-2 border-[#1E293B] rounded-full text-white text-xs font-bold tracking-wide pop-shadow-sm rotate-[-1deg]">
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>INNOVATIVE PEDAGOGY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-[#1E293B] leading-none">
            A New Era of <br />
            <span className="bg-[#34D399] px-2.5 py-1 inline-block border-2 border-[#1E293B] rotate-[1.5deg] mt-1">
              Concept Mastery
            </span>
          </h2>

          <p className="text-[#1E293B] leading-relaxed text-sm sm:text-base font-medium">
            The BIOL 2402 Study Portal represents a bespoke design-centric approach to Human Anatomy &amp; Physiology instruction. Developed under the pedagogical direction of Dr. Victor Garcia Martinez, the portal distributes standard HAPS Learning Outcomes across five key lecture exams with mathematical precision.
          </p>

          <div className="space-y-4 text-left">
            {/* Card 1: Sticker styled */}
            <div className="p-5 bg-white rounded-2xl border-4 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] flex gap-4 hover:translate-y-[-2px] transition-transform">
              <div className="w-10 h-10 rounded-full bg-[#8B5CF6] border-2 border-[#1E293B] flex items-center justify-center text-white shrink-0 font-display font-extrabold">
                1
              </div>
              <div>
                <h4 className="font-display font-extrabold text-[#1E293B] text-base">Personalized Learning Covenants</h4>
                <p className="text-xs text-[#64748B] mt-1 font-semibold">
                  Every student receives a tailored distribution of five outcomes. It is a signed covenant to encourage individualized research and ultimate concept mastery.
                </p>
              </div>
            </div>

            {/* Card 2: Sticker styled */}
            <div className="p-5 bg-white rounded-2xl border-4 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] flex gap-4 hover:translate-y-[-2px] transition-transform">
              <div className="w-10 h-10 rounded-full bg-[#F472B6] border-2 border-[#1E293B] flex items-center justify-center text-white shrink-0 font-display font-extrabold">
                2
              </div>
              <div>
                <h4 className="font-display font-extrabold text-[#1E293B] text-base">Bespoke Multimedia Deliverables</h4>
                <p className="text-xs text-[#64748B] mt-1 font-semibold">
                  Students convert study materials into slides, flashcards, video summaries, audios, and infographic dashboards, creating shareable learning libraries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
