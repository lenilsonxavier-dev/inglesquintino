/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, BookOpen, Presentation } from 'lucide-react';
import { InteractiveSlide } from '../types';

interface AulasSlideProps {
  slide: InteractiveSlide;
}

export default function AulasSlide({ slide }: AulasSlideProps) {
  const aulasUrl = "https://sites.google.com/view/ingleslegal/nossas-aulas-2%C2%BA-bim";

  return (
    <div className={`h-full flex flex-col p-6 md:p-10 text-white bg-gradient-to-br ${slide.colorTheme}`}>
      <div className="flex flex-col items-center text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/20 p-4 rounded-3xl backdrop-blur-md mb-4 shadow-xl border border-white/20"
        >
          <BookOpen className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-black mb-2 drop-shadow-sm">{slide.title}</h2>
        <p className="text-white/90 font-bold bg-black/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
          {slide.subtitle}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center max-w-xl mx-auto w-full">
        {/* Centered Single Portal Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 flex flex-col items-center text-center group w-full shadow-2xl"
        >
          <div className="bg-amber-400/30 p-4 rounded-2xl mb-5 group-hover:bg-amber-400/50 transition-colors">
            <Presentation className="w-10 h-10 text-amber-300" />
          </div>
          <h3 className="text-2xl font-black mb-3 text-amber-300 drop-shadow">Abrir o Portal</h3>
          <p className="text-white/80 text-sm md:text-base mb-8 max-w-sm leading-relaxed">
            Acesse o conteúdo completo de <b>Slides</b> e o <b>Livro do Estudante</b> para estudar e acompanhar todas as aulas com o Teacher Leno! 🎒📖✨
          </p>
          <a
            href={aulasUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-amber-400 text-slate-950 font-extrabold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-amber-300 active:scale-95 transition shadow-xl border-b-4 border-amber-600 text-base md:text-lg cursor-pointer"
          >
            Abrir o Portal: Slides e Livro do Estudante <ExternalLink className="w-5 h-5 shrink-0" />
          </a>
        </motion.div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/60 text-xs font-medium">
          Acesso seguro e direto para o portal oficial do Google Sites.
        </p>
      </div>
    </div>
  );
}
