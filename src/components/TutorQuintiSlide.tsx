/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, MessageCircle, Maximize2, Minimize2 } from 'lucide-react';
import { InteractiveSlide } from '../types';

interface TutorQuintiSlideProps {
  slide: InteractiveSlide;
}

export default function TutorQuintiSlide({ slide }: TutorQuintiSlideProps) {
  const tutorUrl = "https://lenilsonxavier-dev.github.io/Quintin/";
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div className={`h-full flex flex-col text-white bg-gradient-to-br ${slide.colorTheme} overflow-hidden relative`}>
      {/* Header section - hide if maximized for maximum space */}
      {!isMaximized && (
        <div className="flex items-center justify-between p-4 md:px-8 md:py-4 bg-black/10 backdrop-blur-md border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black">{slide.title}</h2>
              <p className="text-[10px] md:text-xs text-white/70 font-semibold">{slide.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMaximized(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition flex items-center gap-1.5 text-xs font-bold text-amber-200"
              title="Maximizar tela"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Maximizar</span>
            </button>
          </div>
        </div>
      )}

      {/* Embedded Tutor Quinti Frame */}
      <div className={`flex-1 relative bg-white overflow-hidden transition-all duration-300 ${
        isMaximized 
          ? 'absolute inset-0 z-40 rounded-none' 
          : 'm-4 rounded-2xl shadow-2xl border-2 border-white/20'
      }`}>
        <iframe 
          src={tutorUrl}
          title="Tutor Quinti"
          className="w-full h-full border-none"
          allow="microphone"
        />
        
        {/* Floating minimize button when maximized */}
        {isMaximized && (
          <button
            onClick={() => setIsMaximized(false)}
            className="absolute top-4 right-4 z-50 bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-extrabold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-2xl border border-slate-700/80 hover:scale-105 active:scale-95 transition cursor-pointer text-xs"
          >
            <Minimize2 className="w-4 h-4" />
            <span>Voltar ao Slide</span>
          </button>
        )}

        {/* Overlay tip when small and not maximized */}
        {!isMaximized && (
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none md:hidden">
            <div className="bg-slate-900/80 backdrop-blur p-2 rounded-lg text-[9px] text-center text-white/80 border border-white/10">
              Dica: Role dentro do quadro para ver mais!
            </div>
          </div>
        )}
      </div>

      {/* Footer tip - hide if maximized for maximum space */}
      {!isMaximized && (
        <div className="px-6 pb-4 flex items-center justify-center gap-2 text-[10px] text-white/60 font-medium shrink-0">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>O Quinti é seu parceiro de estudos inteligente!</span>
        </div>
      )}
    </div>
  );
}
