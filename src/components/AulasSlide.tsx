/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Download, BookOpen, Presentation } from 'lucide-react';
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
        {/* Card 1: Visualizar no Site */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex flex-col items-center text-center group"
        >
          <div className="bg-blue-400/30 p-3 rounded-xl mb-4 group-hover:bg-blue-400/50 transition-colors">
            <Presentation className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">Visualizar Slides</h3>
          <p className="text-white/70 text-sm mb-6">Acesse o portal de aulas para ver todos os slides online.</p>
          <a
            href={aulasUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-full bg-white text-blue-600 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition shadow-lg"
          >
            Abrir Portal <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Card 2: Download */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex flex-col items-center text-center group"
        >
          <div className="bg-cyan-400/30 p-3 rounded-xl mb-4 group-hover:bg-cyan-400/50 transition-colors">
            <Download className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">Baixar Material</h3>
          <p className="text-white/70 text-sm mb-6">Baixe os arquivos para estudar mesmo sem internet.</p>
          <a
            href={aulasUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition shadow-lg border-b-4 border-cyan-700"
          >
            Download Slides <Download className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      <div className="mt-auto text-center">
        <p className="text-white/60 text-[10px] md:text-xs">
          Nota: O download é feito através do portal oficial no Google Sites.
        </p>
      </div>
    </div>
  );
}
