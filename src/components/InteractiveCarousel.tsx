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
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 p-2 md:p-4">
      {/* Dynamic Mini Header */}
      <div className="flex justify-between items-center bg-slate-800/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/80 shadow">
        <button
          onClick={() => jumpToSlide(0)}
          className="flex items-center gap-1.5 text-xs text-amber-300 font-extrabold cursor-pointer hover:text-amber-200 transition"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Início</span>
        </button>
        
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          <span className="text-white text-xs font-black tracking-wide shrink-0">
            {studentName ? `Aluno(a): ${studentName} 🎓` : 'Inglês Legal!'}
          </span>
        </div>

        <div className="text-xs font-black text-slate-300">
          Slide {activeIndex + 1} / {SLIDES_DATA.length}
        </div>
      </div>

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

            {activeSlide.type !== 'welcome' && activeSlide.type !== 'quiz' && (
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
                  className={`relative flex items-center justify-center h-7 px-2.5 rounded-full transition-all text-[10px] font-black tracking-tight shrink-0 border-b-2 ${
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
                  {slide.type === 'quiz' && '7. Quiz'}
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
