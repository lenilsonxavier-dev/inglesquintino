/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle, AlertTriangle, RefreshCw, Printer, Volume2, Sparkles, Star } from 'lucide-react';
import { QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../data';
import { speakEnglish } from '../utils/speech';

const mascotImage = '/src/assets/images/teacher_leno_mascot_1779979514957.png';

interface QuizGameProps {
  studentName: string;
  onResetAll: () => void;
}

export default function QuizGame({ studentName, onResetAll }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersState, setAnswersState] = useState<{ [key: string]: string }>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questObj: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const speakQuestionAndOptions = () => {
    // Speak question
    speakEnglish(questObj.question, () => {
      // Speak correct answer or options if needed, but speaking the question is perfect
    });
  };

  const handleConfirmAnswer = () => {
    if (!selectedOption || isAnswered) return;

    const isCorrect = selectedOption === questObj.correctAnswer;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      speakEnglish('Correct! Great job!');
    } else {
      speakEnglish('Oh, nice try!');
    }

    setAnswersState(prev => ({
      ...prev,
      [questObj.id]: selectedOption
    }));
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOption('');
    setIsAnswered(false);
    setShowHint(false);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowCertificate(true);
    }
  };

  const printCertificate = () => {
    window.print();
  };

  const currentAnswerCorrect = answersState[questObj.id] === questObj.correctAnswer;

  return (
    <div className="flex flex-col h-full bg-slate-900 border-x-4 border-b-4 border-slate-700/80 rounded-b-3xl text-white p-4 md:p-6 overflow-y-auto">
      <AnimatePresence mode="wait">
        {!showCertificate ? (
          // --- trivia panel interface ---
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col h-full justify-between gap-4"
          >
            {/* Top Indicator */}
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-indigo-300">
                Pergunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
              </span>
              <div className="flex gap-1">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      i === currentQuestionIndex
                        ? 'bg-amber-400'
                        : i < currentQuestionIndex
                        ? answersState[QUIZ_QUESTIONS[i].id] === QUIZ_QUESTIONS[i].correctAnswer
                          ? 'bg-emerald-500'
                          : 'bg-red-500'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-black text-amber-300">{correctCount} ★ Acertos</span>
            </div>

            {/* Question card */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 p-5 rounded-2xl border-2 border-indigo-500/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={speakQuestionAndOptions}
                  className="bg-slate-800 hover:bg-slate-700 text-indigo-250 p-1.5 rounded-lg border border-slate-700"
                  title="Ouvir em Inglês"
                >
                  <Volume2 className="w-4 h-4 text-amber-300" />
                </button>
              </div>

              <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase. tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block">
                Categoria: {questObj.category}
              </span>

              <h3 className="text-lg md:text-xl font-black text-white leading-tight mt-1">
                {questObj.question}
              </h3>
            </div>

            {/* Options layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {questObj.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const showAsCorrect = isAnswered && option === questObj.correctAnswer;
                const showAsIncorrect = isAnswered && isSelected && option !== questObj.correctAnswer;

                let btnStyles = 'bg-slate-800 hover:bg-slate-750 border-slate-700';
                if (isSelected && !isAnswered) {
                  btnStyles = 'bg-indigo-600 border-indigo-400 font-bold';
                } else if (showAsCorrect) {
                  btnStyles = 'bg-emerald-600 border-emerald-400 text-white font-extrabold shadow-lg shadow-emerald-950/20';
                } else if (showAsIncorrect) {
                  btnStyles = 'bg-rose-600 border-rose-400 text-white font-bold';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(option)}
                    className={`p-3.5 rounded-xl border-2 text-left transition text-sm flex items-center justify-between ${btnStyles} ${
                      isAnswered ? 'cursor-not-allowed' : 'cursor-pointer active:scale-98'
                    }`}
                  >
                    <span>{option}</span>
                    {showAsCorrect && <CheckCircle className="w-5 h-5 text-white shrink-0 ml-2" />}
                    {showAsIncorrect && <AlertTriangle className="w-5 h-5 text-white shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions Area */}
            <div className="flex flex-col gap-2 mt-2 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-750">
              <div className="flex items-center justify-between gap-2.5">
                <button
                  onClick={() => setShowHint(true)}
                  className="bg-slate-700 hover:bg-slate-650 border border-slate-600 text-slate-300 font-extrabold text-xs px-4 py-2 rounded-full cursor-pointer"
                >
                  💡 Dica do Professor Leno
                </button>

                {!isAnswered ? (
                  <button
                    id="confirm-btn"
                    disabled={!selectedOption}
                    onClick={handleConfirmAnswer}
                    className={`px-6 py-2.5 rounded-full font-black text-xs md:text-sm shadow-lg border-b-4 transition ${
                      selectedOption
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-900 border-amber-600 cursor-pointer active:scale-95'
                        : 'bg-slate-600 text-slate-400 border-slate-750 cursor-not-allowed opacity-50'
                    }`}
                  >
                    Confirmar Resposta
                  </button>
                ) : (
                  <button
                    id="next-btn"
                    onClick={handleNext}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs md:text-sm px-6 py-2.5 rounded-full border-b-4 border-emerald-700 shadow-lg cursor-pointer active:scale-95"
                  >
                    {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Próxima Pergunta ✓' : 'Ver Meu Certificado! 🎉'}
                  </button>
                )}
              </div>

              {/* Collapsible mascot tip dialogue */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 pt-2 border-t border-slate-700 flex gap-2.5 items-start text-xs text-indigo-205"
                  >
                    <img 
                      src={mascotImage}
                      alt="Leno" 
                      className="w-10 h-10 object-contain rounded-full bg-slate-700 border border-indigo-400"
                      referrerPolicy="no-referrer"
                    />
                    <div className="bg-slate-900 p-2.5 rounded-lg text-slate-300 flex-1 leading-relaxed border border-slate-700 text-left">
                      <b className="text-amber-400 block font-black">Dica da Corujinha:</b>
                      {questObj.hint}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          // --- print-friendly Certificate UI interface ---
          <motion.div
            key="certificate"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-between h-full bg-slate-850 p-4 md:p-6 border border-slate-700 rounded-2xl relative shadow-2xl overflow-y-auto"
          >
            {/* Confetti Visual effect */}
            <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-purple-500 to-pink-500 animate-pulse" />

            <div className="text-center w-full max-w-lg mt-2">
              <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce mt-4 drop-shadow" />
              <h2 className="text-2xl md:text-3xl font-black text-amber-300 tracking-tight mt-1">
                Parabéns, {studentName}! 🎉
              </h2>
              <p className="text-xs text-slate-300">
                Você concluiu todos os desafios do Inglês Legal!
              </p>
            </div>

            {/* Print Area Container (This is styled elegantly for actual standard physical printing too!) */}
            <div 
              id="printable-diploma"
              className="w-full max-w-md bg-white border-8 border-amber-400 p-4 rounded-xl text-slate-900 text-center my-4 font-sans relative shadow-inner print:border-amber-400 print:bg-white print:p-8"
            >
              {/* Star ribbons */}
              <div className="absolute top-2 left-2 text-yellow-400 flex gap-0.5"><Star className="w-4 h-4 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
              <div className="absolute top-2 right-2 text-yellow-400 flex gap-0.5"><Star className="w-4 h-4 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
              <div className="absolute bottom-2 right-2 opacity-10">🦉</div>

              <span className="text-[10px] tracking-widest uppercase font-black text-slate-500 block">
                EMEF Quintino Bocaiúva — Osasco
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none mt-1">
                CERTIFICADO DE SUPER ESTUDANTE
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto my-3" />
              
              <p className="text-xs text-slate-600 uppercase font-bold tracking-wider">Concedido com orgulho a:</p>
              <p className="text-xl font-extrabold text-blue-600 underline decoration-amber-400 my-1">{studentName || 'Super Aluno'}</p>
              
              <p className="text-[10px] md:text-xs text-slate-600 px-3 py-1 bg-slate-100 rounded-lg inline-block leading-normal">
                Pelo excelente desempenho nos jogos interativos do **Inglês Legal** em 2026!
                Demonstrou dedicação no vocabulário de saudações, cores, animais, sentimentos e valores.
              </p>

              <div className="flex justify-between items-end mt-4 pt-3 border-t border-slate-200">
                <div className="text-[9px] text-slate-500 text-left">
                  <p>Aproveitamento:</p>
                  <p className="font-extrabold text-slate-800">{correctCount} de {QUIZ_QUESTIONS.length} acertos ({(correctCount/QUIZ_QUESTIONS.length * 100).toFixed(0)}%)</p>
                </div>
                <div className="text-right">
                  <p className="text-xs italic text-slate-800 font-serif">Lenilson Xavier</p>
                  <div className="w-20 h-0.5 bg-slate-400 mx-auto" />
                  <p className="text-[7px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">Professor (Teacher Leno)</p>
                </div>
              </div>
            </div>

            {/* Diploma Actions / Print */}
            <div className="flex gap-2.5 w-full justify-center">
              <button
                id="print-certificate-btn"
                onClick={printCertificate}
                className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer border-b-4 border-blue-800 transition active:scale-95"
              >
                <Printer className="w-4 h-4" />
                Imprimir / Salvar PDF
              </button>
              <button
                id="restart-all-btn"
                onClick={onResetAll}
                className="bg-slate-700 hover:bg-slate-650 text-slate-300 font-extrabold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer border border-slate-600 transition active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Recomeçar Aventura
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
