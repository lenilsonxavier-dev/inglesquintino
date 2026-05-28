/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Bot, MessageCircle, Maximize2, ExternalLink } from 'lucide-react';
import { InteractiveSlide } from '../types';

interface TutorQuintiSlideProps {
  slide: InteractiveSlide;
}

export default function TutorQuintiSlide({ slide }: TutorQuintiSlideProps) {
  const tutorUrl = "https://lenilsonxavier-dev.github.io/Quintin/";

  return (
    <div className={`h-full flex flex-col text-white bg-gradient-to-br ${slide.colorTheme} overflow-hidden`}>
      {/* Header section */}
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
        <a 
          href={tutorUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 hover:bg-white/10 rounded-lg transition"
          title="Abrir em nova aba"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      {/* Embedded Tutor Quinti */}
      <div className="flex-1 relative bg-white m-4 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
        <iframe 
          src={tutorUrl}
          title="Tutor Quinti"
          className="w-full h-full border-none"
          allow="microphone"
        />
        
        {/* Overlay tip when small */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-none md:hidden">
          <div className="bg-slate-900/80 backdrop-blur p-2 rounded-lg text-[9px] text-center text-white/80 border border-white/10">
            Dica: Role dentro do quadro para ver mais!
          </div>
        </div>
      </div>

      {/* Footer tip */}
      <div className="px-6 pb-4 flex items-center justify-center gap-2 text-[10px] text-white/60 font-medium shrink-0">
        <MessageCircle className="w-3.5 h-3.5" />
        <span>O Quinti é seu parceiro de estudos inteligente!</span>
      </div>
    </div>
  );
}
