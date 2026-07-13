import React from 'react';
import { Sparkles, GraduationCap, Award, BookOpen, Layers, Target, ChevronRight } from 'lucide-react';

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

        {/* Responsive Bento-style Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Descriptive Text Content in a Sticker Panel */}
          <div className="lg:col-span-6 space-y-8">
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

            <div className="space-y-4">
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

          {/* Right Column: Visual Bento Grid with Images */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            
            {/* Large Image Card with hard border and offset shadow */}
            <div className="col-span-12 relative group rounded-2xl overflow-hidden border-4 border-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B] hover:shadow-[8px_8px_0px_0px_#1E293B] transition-all">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85"
                alt="Active Study Collaboration"
                className="w-full h-80 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/90 via-[#1E293B]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[10px] text-[#34D399] uppercase tracking-widest font-extrabold block mb-1">
                  COLLABORATIVE ACADEMICS
                </span>
                <p className="text-white text-lg font-display font-black leading-snug">
                  Transforming standard guidelines into highly structured knowledge repositories.
                </p>
              </div>
            </div>

            {/* Small Image Card with offset shadow */}
            <div className="col-span-12 md:col-span-7 relative group rounded-2xl overflow-hidden border-4 border-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B] hover:shadow-[8px_8px_0px_0px_#1E293B] transition-all">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85"
                alt="Student Study Portal Details"
                className="w-full h-48 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Accent Card - pure geometric, bright amber with a hard shadow */}
            <div className="col-span-12 md:col-span-5 bg-[#FBBF24] rounded-2xl p-6 flex flex-col justify-between text-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B] border-4 border-[#1E293B] hover:translate-y-[-2px] transition-transform">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#1E293B] flex items-center justify-center text-[#1E293B] pop-shadow-sm">
                <Target className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <div className="mt-8">
                <span className="text-[36px] font-display font-black leading-none block mb-1">2026</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#1E293B] font-extrabold">
                  Academic Term Core
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
