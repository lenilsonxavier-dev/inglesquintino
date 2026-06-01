/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, GraduationCap, Home, Play, Sparkles } from 'lucide-react';
import { SLIDES_DATA } from '../data';
import WelcomeSlide from './WelcomeSlide';
import VocabularySlides from './VocabularySlides';
import QuizGame from './QuizGame';
import AulasSlide from './AulasSlide';
import TutorQuintiSlide from './TutorQuintiSlide';

interface InteractiveCarouselProps {
  studentName: string;
  setStudentName: (name: string) => void;
}

export default function InteractiveCarousel({ studentName, setStudentName }: InteractiveCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = SLIDES_DATA[activeIndex];

  const handleNext = () => {
    if (activeIndex < SLIDES_DATA.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const jumpToSlide = (index: number) => {
    // Only allow jump if student has at least entered their name
    if (studentName.trim() || index === 0) {
      setActiveIndex(index);
    }
  };

  const handleResetAll = () => {
    setStudentName('');
    setActiveIndex(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 p-2 md:p-4">
      {/* Consolidated Premium Header */}
      <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-slate-800 shadow-xl gap-3">
        {/* Left Section: Class & Teacher Info */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-400 p-2 rounded-xl text-slate-900 shadow-md shrink-0">
            <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="text-left font-semibold">
            <span className="font-sans font-black text-sm md:text-base tracking-tight text-white block">
              QUINTI — 2026
            </span>
            <span className="text-xs md:text-sm text-slate-400 block font-bold leading-tight">
              Prof. Lenilson (Teacher Leno) • EMEF Quintino Bocaiúva
            </span>
          </div>
        </div>

        {/* Right Section: Student Progress & Shortcuts */}
        <div className="flex items-center justify-between sm:justify-end gap-2 md:gap-3 border-t border-slate-800/60 pt-2 sm:border-t-0 sm:pt-0">
          <button
            onClick={() => jumpToSlide(0)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-extrabold px-3 py-2 rounded-xl border border-slate-700/50 cursor-pointer transition text-xs md:text-sm shadow-sm active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Início</span>
          </button>
          
          <div className="flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-500/20 px-3 py-2 rounded-xl text-xs md:text-sm">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
            <span className="text-indigo-200 font-extrabold truncate max-w-[120px] sm:max-w-[150px]">
              {studentName ? `Aluno(a): ${studentName} 🎓` : 'Quinti!'}
            </span>
          </div>

          <div className="text-xs md:text-sm font-black bg-slate-800 px-3 py-2 rounded-xl border border-slate-750 text-slate-300 shrink-0">
            Slide {activeIndex + 1} / {SLIDES_DATA.length}
          </div>
        </div>
      </header>

      {/* Main Active Slide Display Frame with Transitions */}
      <div className="h-[520px] md:h-[580px] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl relative border-4 border-slate-700/60 transition-all flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.4 }}
            className="flex-1 min-h-0"
          >
            {activeSlide.type === 'welcome' && (
              <WelcomeSlide
                studentName={studentName}
                setStudentName={setStudentName}
                onStart={handleNext}
              />
            )}

            {activeSlide.type === 'aulas' && (
              <AulasSlide slide={activeSlide} />
            )}

            {activeSlide.type === 'tutor' && (
              <TutorQuintiSlide slide={activeSlide} />
            )}

            {activeSlide.type !== 'welcome' && activeSlide.type !== 'quiz' && activeSlide.type !== 'aulas' && activeSlide.type !== 'tutor' && (
              <VocabularySlides
                slide={activeSlide}
                studentName={studentName}
                onComplete={handleNext}
              />
            )}

            {activeSlide.type === 'quiz' && (
              <QuizGame
                studentName={studentName}
                onResetAll={handleResetAll}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Core Controls Bar (Always visible below slides if student initiated) */}
      {studentName.trim() && (
        <div className="flex items-center justify-between bg-slate-800/80 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 shadow gap-2">
          {/* Previous control button */}
          <button
            id="carousel-prev"
            disabled={activeIndex === 0}
            onClick={handlePrev}
            className={`flex items-center justify-center p-2 rounded-xl transition ${
              activeIndex === 0
                ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-white hover:bg-slate-600 cursor-pointer active:scale-95'
            }`}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Quick chapter navigate dots indicators */}
          <div className="flex gap-1.5 md:gap-2.5 overflow-x-auto py-1 scrollbar-none">
            {SLIDES_DATA.map((slide, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;

              return (
                <button
                  key={slide.id}
                  onClick={() => jumpToSlide(idx)}
                  className={`relative flex items-center justify-center h-9 px-3.5 rounded-full transition-all text-xs md:text-sm font-black tracking-tight shrink-0 border-b-2 ${
                    isActive
                      ? 'bg-amber-400 text-slate-900 border-amber-600 font-extrabold scale-105 shadow'
                      : isPast
                      ? 'bg-emerald-600/30 text-emerald-300 border-emerald-800'
                      : 'bg-slate-700/50 text-slate-400 border-slate-800 hover:bg-slate-750'
                  }`}
                >
                  {slide.type === 'welcome' && 'Início'}
                  {slide.type === 'greetings' && '1. Hello'}
                  {slide.type === 'colors' && '2. Cores'}
                  {slide.type === 'school' && '3. Escola'}
                  {slide.type === 'animals' && '4. Selva'}
                  {slide.type === 'feelings' && '5. Humor'}
                  {slide.type === 'values' && '6. Amor'}
                  {slide.type === 'aulas' && '7. Aulas'}
                  {slide.type === 'tutor' && '8. Tutor'}
                  {slide.type === 'quiz' && '9. Quiz'}
                </button>
              );
            })}
          </div>

          {/* Next control button */}
          <button
            id="carousel-next"
            disabled={activeIndex === SLIDES_DATA.length - 1}
            onClick={handleNext}
            className={`flex items-center justify-center p-2 rounded-xl transition ${
              activeIndex === SLIDES_DATA.length - 1
                ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-white hover:bg-slate-600 cursor-pointer active:scale-95'
            }`}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
