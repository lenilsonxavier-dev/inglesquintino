/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import mascotImage from '../assets/images/teacher_leno_mascot_1779979514957.png';

interface WelcomeSlideProps {
  studentName: string;
  setStudentName: (name: string) => void;
  onStart: () => void;
}

export default function WelcomeSlide({ studentName, setStudentName, onStart }: WelcomeSlideProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim()) {
      onStart();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-3 sm:p-5 md:p-6 text-center bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl overflow-hidden relative shadow-2xl border-4 border-amber-300">
      {/* Decorative Floating Sparkles */}
      <div className="absolute top-4 left-4 animate-bounce duration-1000">
        <Sparkles className="w-8 h-8 text-amber-200" />
      </div>
      <div className="absolute top-12 right-6 animate-pulse">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <div className="absolute bottom-16 left-6 animate-pulse">
        <Sparkles className="w-10 h-10 text-orange-200" />
      </div>

      {/* Top Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <span className="bg-white/30 backdrop-blur-md text-slate-800 text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/40 shadow-sm inline-block">
          🏫 EMEF Quintino Bocaiúva — Osasco
        </span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mt-1.5 md:mt-2.5 drop-shadow-md tracking-tight">
          Inglês Legal! 🌟
        </h1>
        <p className="text-amber-100 font-bold text-xs md:text-sm mt-1 bg-black/10 inline-block px-3 py-0.5 rounded-full backdrop-blur-sm">
          "Sorria, você está aprendendo!" 😄
        </p>
      </motion.div>

      {/* Mascot Box */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="relative my-1.5 sm:my-3"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-full blur opacity-40 animate-pulse"></div>
        <img 
          src={mascotImage}
          alt="Mascote do Professor Leno" 
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-full border-4 border-white shadow-xl bg-white/10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 right-2 bg-white text-slate-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-lg border-2 border-orange-400">
          Hi! I am Leno Owl! 🦉
        </div>
      </motion.div>

      {/* Inputs and Actions */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm bg-white/20 p-4 rounded-xl border border-white/20 backdrop-blur-md shadow-inner"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className="text-white font-black text-base sm:text-lg md:text-xl text-center block mb-0.5 leading-snug drop-shadow-sm animate-pulse">
            Qual é seu nome pequena campeã, pequeno campeão? 👇
          </label>
          <input
            id="student-name-input"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Digite seu nome para jogar..."
            maxLength={25}
            className="w-full bg-white text-slate-800 font-bold placeholder-slate-400 rounded-xl px-4 py-2 border-3 border-transparent focus:border-amber-400 focus:ring-0 outline-none transition shadow text-center text-base"
            required
          />
          <button
            id="start-adventure-button"
            type="submit"
            disabled={!studentName.trim()}
            className={`w-full font-black text-white py-2.5 px-5 rounded-xl text-base shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all outline-none border-b-4 ${
              studentName.trim()
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-700 hover:from-green-400 hover:to-emerald-500 cursor-pointer'
                : 'bg-slate-400 border-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            Vamos Começar!
            <ArrowRight className="w-4 h-4 font-extrabold animate-pulse" />
          </button>
        </form>
      </motion.div>

      {/* Decorative Footer info */}
      <span className="text-white/80 text-[9px] md:text-xs font-semibold mt-1">
        Desenvolvido pelo Prof. Lenilson Xavier (Teacher Leno) • 2026
      </span>
    </div>
  );
}
