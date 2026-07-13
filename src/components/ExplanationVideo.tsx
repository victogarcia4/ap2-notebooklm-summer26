/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Info, Copy, Check, ExternalLink, Lock, Video } from 'lucide-react';

export default function ExplanationVideo() {
  const [copied, setCopied] = useState(false);

  const handleCopyPasscode = () => {
    navigator.clipboard.writeText('+$2vz&RC');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-white border-y border-gray-200 py-16" id="zoom-explanation-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text and details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-teal-600 font-semibold text-sm tracking-wider uppercase">
              <Info className="w-5 h-5" />
              <span>Activity Guidance</span>
            </div>
            <h3 className="text-3xl font-serif text-gray-900 leading-tight">
              Professor's Video Guide:
              <br />
              <span className="text-teal-700 italic">How to master A&amp;P II using NotebookLM</span>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Watch Dr. Victor Garcia Martinez explain the rationale and structure of the 
              Learning Outcomes Distribution Activity. Learn how to transform standard 
              academic content into five expert, shareable learning deliverables.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">
                Learning Objectives:
              </p>
              <p className="text-amber-900 text-xs leading-relaxed">
                Understand the 5 primary deliverables: slides, flashcards, video summaries, 
                audios, and infographics, directly mapped to the 2026 HAPS syllabus standard.
              </p>
            </div>
          </div>

          {/* Interactive Player / Zoom Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-gray-800 flex flex-col group py-4">
              {/* Zoom Recording Header */}
              <div className="bg-slate-900/90 border-b border-gray-800 px-4 py-3 flex items-center justify-between text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-mono uppercase tracking-wider text-[10px] text-blue-400">Zoom Cloud Recording</span>
                </div>
                <div className="text-slate-500">Duration: ~40 mins</div>
              </div>

              {/* Video Player Mockup / Overlay */}
              <div className="flex-1 relative flex flex-col items-center justify-center p-6 text-center bg-radial from-slate-900 to-slate-950">
                {/* Background graphic representing video */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                <div className="relative z-10 flex flex-col items-center gap-4 max-w-sm">
                  {/* Icon Badge */}
                  <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Video className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-white font-medium text-base">A&amp;P II recorded explanation</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      This is the official recorded tutorial covering the Learning Outcomes Distribution.
                    </p>
                  </div>

                  {/* Passcode Copy Area */}
                  <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 shadow-inner">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 font-medium">
                        <Lock className="w-3 h-3 text-blue-400" />
                        Passcode Required:
                      </span>
                      <span className="font-mono text-slate-300 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800 select-all">
                        +$2vz&amp;RC
                      </span>
                    </div>

                    <button
                      onClick={handleCopyPasscode}
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-semibold py-2 px-4 rounded-lg border border-slate-700/50 transition-all cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400">Passcode Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Passcode</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Launch Button */}
                  <a
                    href="https://us02web.zoom.us/rec/play/Br6f0u-lfyUb-_Kb5nfVQFwMNehN7rqU7bdSdaopq9JJliukMCWlVQ15MlRGEz5Hr50CEWVZ8PxtMuPD.LZvqVX8Ni3uXGmdg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer group/btn"
                  >
                    <span>Launch Zoom Recording</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
