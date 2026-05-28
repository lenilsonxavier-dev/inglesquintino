/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import InteractiveCarousel from './components/InteractiveCarousel';
import { Sparkles, HelpCircle, GraduationCap } from 'lucide-react';

export default function App() {
  const [studentName, setStudentName] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-4 relative overflow-hidden selection:bg-amber-400 selection:text-slate-950">
      
      {/* Immersive Playful Floating Background Graphics */}
      <div className="absolute top-10 left-[10%] w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-[5%] w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-[80%] w-24 h-24 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Diagonal background lines to look like school paper or tech grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.015)_1.5px,transparent_1.5px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />

      {/* Persistent App Header */}
      <header className="w-full max-w-4xl flex items-center justify-between py-2 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-amber-400 p-1.5 rounded-lg text-slate-900 shadow">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-sans font-black text-sm tracking-tight text-white block">
              INGLÊS LEGAL — 2026
            </span>
            <span className="text-[10px] text-slate-400 block font-semibold">
              Prof. Lenilson (Teacher Leno) • EMEF Quintino Bocaiúva
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-indigo-950/80 border border-indigo-400/20 px-3 py-1 rounded-full text-[10px] md:text-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span className="text-indigo-200 font-bold select-none">Inglês Divertido & Lúdico</span>
        </div>
      </header>

      {/* Main Educational Carousel Screen */}
      <main className="w-full flex-1 flex items-center justify-center py-4 relative z-10">
        <InteractiveCarousel 
          studentName={studentName}
          setStudentName={setStudentName}
        />
      </main>

      {/* Tactile Help Tip & Values Strip */}
      <footer className="w-full max-w-4xl text-center py-2 border-t border-white/5 text-[11px] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-2 relative z-10">
        <div className="flex items-center gap-1.5 justify-center">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span><b>Dica de Ouro:</b> Clique nos Cards e Paletes para ouvir a pronúncia em inglês! 🇺🇸🗣️</span>
        </div>
        <div className="font-extrabold text-[9px] md:text-[10px] bg-white/5 px-3 py-1 rounded-full tracking-wider text-slate-300 uppercase">
          🌿 Amor • Justiça • Esperança • Apoio • Empatia 🤝
        </div>
      </footer>
    </div>
  );
}
