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
    <div className="flex flex-col items-center justify-between h-full p-4 md:p-8 text-center bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl overflow-hidden relative shadow-2xl border-4 border-amber-300">
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
        <span className="bg-white/30 backdrop-blur-md text-slate-800 text-xs md:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/40 shadow-sm inline-block">
          🏫 EMEF Quintino Bocaiúva — Osasco
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-3 drop-shadow-md tracking-tight">
          Inglês Legal! 🌟
        </h1>
        <p className="text-amber-100 font-bold text-sm md:text-base mt-2 bg-black/10 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
          "Sorria, você está aprendendo!" 😄
        </p>
      </motion.div>

      {/* Mascot Box */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="relative my-4"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-full blur opacity-40 animate-pulse"></div>
        <img 
          src={mascotImage}
          alt="Mascote do Professor Leno" 
          className="w-48 h-48 md:w-56 md:h-56 object-contain rounded-full border-4 border-white shadow-xl bg-white/10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 right-2 bg-white text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-orange-400">
          Hi! I am Leno Owl! 🦉
        </div>
      </motion.div>

      {/* Inputs and Actions */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm bg-white/20 p-5 rounded-2xl border border-white/20 backdrop-blur-md shadow-inner"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-white font-extrabold text-sm md:text-base text-left block">
            Qual é o seu nome, pequeno campeão? 👇
          </label>
          <input
            id="student-name-input"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Digite seu nome para jogar..."
            maxLength={25}
            className="w-full bg-white text-slate-800 font-bold placeholder-slate-400 rounded-xl px-4 py-3 border-3 border-transparent focus:border-amber-400 focus:ring-0 outline-none transition shadow text-center text-lg"
            required
          />
          <button
            id="start-adventure-button"
            type="submit"
            disabled={!studentName.trim()}
            className={`w-full font-black text-white py-3.5 px-6 rounded-xl text-lg shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all outline-none border-b-4 ${
              studentName.trim()
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-700 hover:from-green-400 hover:to-emerald-500 cursor-pointer'
                : 'bg-slate-400 border-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            Vamos Começar!
            <ArrowRight className="w-5 h-5 font-extrabold animate-pulse" />
          </button>
        </form>
      </motion.div>

      {/* Decorative Footer info */}
      <span className="text-white/80 text-[10px] md:text-xs font-semibold mt-2">
        Desenvolvido pelo Prof. Lenilson Xavier (Teacher Leno) • 2026
      </span>
    </div>
  );
}
