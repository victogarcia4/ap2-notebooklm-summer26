/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Play, Pause, Sparkles, BookOpen, Layers, HelpCircle, Video } from 'lucide-react';

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="bg-[#FBFAF6] border-t border-gray-200 py-16" id="intro-video-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Video Player Column */}
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800 group aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/Notebook LM explanation.mp4"
                poster="/Screenshot_Intro.png"
                preload="metadata"
                controls
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Play Overlay (visible only when paused and not playing) */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex items-center justify-center cursor-pointer transition-all hover:bg-slate-950/30"
                  onClick={togglePlay}
                >
                  <div className="w-16 h-16 rounded-full bg-teal-700 hover:bg-teal-600 text-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 active:scale-95">
                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-teal-700 font-semibold text-sm tracking-wider uppercase">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span>App Introduction</span>
            </div>
            
            <h3 className="text-3xl font-serif text-gray-900 leading-tight">
              Introducing NotebookLM:
              <br />
              <span className="text-teal-750 italic">The AI Study Revolution</span>
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              Watch this video tutorial to learn how to harness the power of NotebookLM for Human Anatomy &amp; Physiology II. Discover how to upload resources, interact with the AI tutor, and map HAPS Learning Outcomes to master course content.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">AI-Powered Source Grounding</h4>
                  <p className="text-xs text-gray-500">Every response is synthesized directly from your verified textbooks and class syllabus files.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Custom Study Formats</h4>
                  <p className="text-xs text-gray-500">Generate interactive study guides, flashcards, and custom quizzes with ease.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
