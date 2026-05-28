/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, CheckCircle, Sparkles, Smile, RotateCcw, AlertCircle, ShoppingBag, HelpCircle } from 'lucide-react';
import { InteractiveSlide, VocabularyItem } from '../types';
import { speakEnglish } from '../utils/speech';

interface VocabularySlidesProps {
  slide: InteractiveSlide;
  studentName: string;
  onComplete: () => void;
}

export default function VocabularySlides({ slide, studentName, onComplete }: VocabularySlidesProps) {
  const [activeWord, setActiveWord] = useState<VocabularyItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // --- 1. GREETINGS DIALOGUE GAME STATE ---
  const [greetingsScore, setGreetingsScore] = useState(0);
  const [dialStep, setDialStep] = useState(0);
  const [greetingsCompleted, setGreetingsCompleted] = useState(false);
  const [greetingsFeedback, setGreetingsFeedback] = useState('');

  // --- 2. COLORS PAINTING GAME STATE ---
  const [selectedColor, setSelectedColor] = useState<string>('bg-slate-300');
  const [selectedColorName, setSelectedColorName] = useState<string>('Cinza');
  const [owlColors, setOwlColors] = useState<{ [key: string]: string }>({
    head: 'fill-slate-250',
    wings: 'fill-slate-300',
    belly: 'fill-slate-100',
    feet: 'fill-orange-300',
    beak: 'fill-yellow-400',
    glasses: 'fill-slate-400',
  });
  const [colorsCompleted, setColorsCompleted] = useState(false);

  // --- 3. SCHOOL BAG SORTING GAME STATE ---
  const [targetSchoolObject, setTargetSchoolObject] = useState<VocabularyItem | null>(null);
  const [packedObjects, setPackedObjects] = useState<string[]>([]);
  const [schoolFeedback, setSchoolFeedback] = useState<string>('');
  const [schoolCompleted, setSchoolCompleted] = useState(false);

  // --- 4. ANIMALS FINDER GAME STATE ---
  const [animalHint, setAnimalHint] = useState<string>('');
  const [animalAnswer, setAnimalAnswer] = useState<string>('');
  const [activeAnimalSound, setActiveAnimalSound] = useState<string>('');
  const [discoveredAnimals, setDiscoveredAnimals] = useState<string[]>([]);
  const [animalsCompleted, setAnimalsCompleted] = useState(false);

  // --- 5. FEELINGS SCENARIOS STATE ---
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [feelingsScore, setFeelingsScore] = useState(0);
  const [feelingsFeedback, setFeelingsFeedback] = useState('');
  const [feelingsCompleted, setFeelingsCompleted] = useState(false);

  // --- 6. VALUES SCRAMBLER STATE ---
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  const [scrambledValue, setScrambledValue] = useState<string[]>([]);
  const [userValueSpelling, setUserValueSpelling] = useState<string[]>([]);
  const [valuesFeedback, setValuesFeedback] = useState('');
  const [spelledValuesCount, setSpelledValuesCount] = useState<string[]>([]);
  const [valuesCompleted, setValuesCompleted] = useState(false);

  // Reset states when slide changes
  useEffect(() => {
    setActiveWord(null);
    setIsSpeaking(false);
    
    // Reset specific states
    if (slide.type === 'greetings') {
      setDialStep(0);
      setGreetingsCompleted(false);
      setGreetingsScore(0);
    } else if (slide.type === 'colors') {
      setSelectedColor('bg-blue-500');
      setSelectedColorName('Blue');
      setColorsCompleted(false);
    } else if (slide.type === 'school') {
      const items = slide.vocabList || [];
      if (items.length > 0) {
        setTargetSchoolObject(items[0]);
      }
      setPackedObjects([]);
      setSchoolFeedback('');
      setSchoolCompleted(false);
    } else if (slide.type === 'animals') {
      setDiscoveredAnimals([]);
      setAnimalsCompleted(false);
      setupAnimalRound();
    } else if (slide.type === 'feelings') {
      setCurrentScenarioIndex(0);
      setFeelingsScore(0);
      setFeelingsFeedback('');
      setFeelingsCompleted(false);
    } else if (slide.type === 'values') {
      setCurrentValueIndex(0);
      setUserValueSpelling([]);
      setValuesFeedback('');
      setSpelledValuesCount([]);
      setValuesCompleted(false);
      if (slide.vocabList && slide.vocabList.length > 0) {
        setupValueScrambler(0);
      }
    }
  }, [slide.id]);

  const handleSpeak = (text: string, vocabItem?: VocabularyItem) => {
    if (vocabItem) setActiveWord(vocabItem);
    setIsSpeaking(true);
    speakEnglish(text, (speaking) => {
      setIsSpeaking(speaking);
    });
  };

  // ==========================================
  // GAME HANDLERS
  // ==========================================

  // --- 1. GREETINGS LOGIC ---
  const handleGreetingsOption = (option: string) => {
    if (dialStep === 0) {
      if (option === `My name is ${studentName || 'Kid'}`) {
        handleSpeak(`Hello, nice to meet you, ${studentName || 'Kid'}!`);
        setGreetingsScore(prev => prev + 1);
        setGreetingsFeedback('Excelente! Você se apresentou perfeitamente! 🤝');
        setTimeout(() => {
          setDialStep(1);
          setGreetingsFeedback('');
        }, 2200);
      } else {
        setGreetingsFeedback('Ops! Para responder "Qual é o seu nome?", nós falamos nosso nome! Tente de novo! 🤗');
      }
    } else if (dialStep === 1) {
      if (option === 'Thank you!') {
        handleSpeak('Thank you!');
        setGreetingsScore(prev => prev + 1);
        setGreetingsFeedback('Incrível! Ser grato é muito legal! ❤️');
        setTimeout(() => {
          setGreetingsCompleted(true);
          onComplete();
        }, 2200);
      } else {
        setGreetingsFeedback('Ops! Quando alguém é gentil ou te ajuda, dizemos "Obrigado" (Thank you!). Tente de novo!');
      }
    }
  };

  // --- 2. COLORS LOGIC (Coloring Mascot) ---
  const handleSelectColor = (vocab: VocabularyItem) => {
    if (vocab.color) {
      setSelectedColor(vocab.color);
      setSelectedColorName(vocab.english);
      handleSpeak(vocab.english);
    }
  };

  const handlePaintPart = (part: string) => {
    // Translate CSS bg class to fill SVG class
    let fillClass = 'fill-slate-350';
    if (selectedColor === 'bg-red-500') fillClass = 'fill-red-500';
    else if (selectedColor === 'bg-blue-500') fillClass = 'fill-blue-500';
    else if (selectedColor === 'bg-yellow-400') fillClass = 'fill-yellow-400';
    else if (selectedColor === 'bg-green-500') fillClass = 'fill-green-500';
    else if (selectedColor === 'bg-purple-500') fillClass = 'fill-purple-500';
    else if (selectedColor === 'bg-orange-500') fillClass = 'fill-orange-500';
    else if (selectedColor === 'bg-pink-400') fillClass = 'fill-pink-400';

    setOwlColors(prev => ({
      ...prev,
      [part]: fillClass
    }));

    // Trigger feedback sound
    handleSpeak(selectedColorName);

    // Track coloring progress
    const coloredCount = Object.keys(owlColors).length;
    if (coloredCount >= 4 && !colorsCompleted) {
      // Allow completion once painted several parts
      setColorsCompleted(true);
    }
  };

  // --- 3. SCHOOL BAG LOGIC ---
  const handleSchoolItemClick = (vocab: VocabularyItem) => {
    if (schoolCompleted) return;

    if (targetSchoolObject && vocab.english === targetSchoolObject.english) {
      handleSpeak(vocab.english);
      const updatedPacked = [...packedObjects, vocab.english];
      setPackedObjects(updatedPacked);
      setSchoolFeedback(`Ótimo! Você guardou o ${vocab.portuguese}! 🎒✨`);

      // Find next school object not packed yet
      const nextTargets = (slide.vocabList || []).filter(item => !updatedPacked.includes(item.english));
      if (nextTargets.length > 0) {
        setTimeout(() => {
          setTargetSchoolObject(nextTargets[0]);
          setSchoolFeedback('');
        }, 1200);
      } else {
        // All packed
        setSchoolFeedback('Uau! Sua mochila está pronta para as aulas do Teacher Leno! 🎒✨🏆');
        setSchoolCompleted(true);
        setTimeout(() => {
          onComplete();
        }, 3000);
      }
    } else {
      setSchoolFeedback(`Ops! Esse é o ${vocab.portuguese}. O Teacher Leno pediu o ${targetSchoolObject?.portuguese}! Que tal tentar de novo? 🙂`);
    }
  };

  // --- 4. ANIMALS JUNGLE ADVENTURE LOGIC ---
  const animalSounds: { [key: string]: { sound: string; hint: string } } = {
    Dog: { sound: 'Woof! Woof!', hint: 'Ele late, é o melhor amigo dos humanos! 🐶' },
    Cat: { sound: 'Meow! Meow!', hint: 'Ela gosta de subir nos muros e ronronar! 🐱' },
    Lion: { sound: 'Roar! Roar!', hint: 'É o rei da selva, orgulhoso e forte! 🦁' },
    Monkey: { sound: 'Ooh ooh! Aah aah!', hint: 'Ele adora pular de galho em galho e comer bananas! 🐒' },
    Bird: { sound: 'Tweet! Tweet!', hint: 'Ele voa alto no céu azul cantando melodias! 🐦' },
    Butterfly: { sound: 'Flap! Flap!', hint: 'Ela tem lindas asas coloridas e poliniza as flores! 🦋' }
  };

  const setupAnimalRound = () => {
    const list = slide.vocabList || [];
    if (list.length === 0) return;
    
    // Pick an animal not successfully guessed in this round list
    const pool = list.filter(item => !discoveredAnimals.includes(item.english));
    if (pool.length > 0) {
      const selected = pool[Math.floor(Math.random() * pool.length)];
      setAnimalAnswer(selected.english);
      setActiveAnimalSound(animalSounds[selected.english]?.sound || '');
      setAnimalHint(animalSounds[selected.english]?.hint || '');
    } else {
      // Reset or compile
      setAnimalsCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleAnimalSelect = (vocab: VocabularyItem) => {
    if (vocab.english === animalAnswer) {
      handleSpeak(vocab.english);
      setDiscoveredAnimals(prev => [...prev, vocab.english]);
      setAnimalHint(`Muito bem! Acertou o ${vocab.portuguese}! 🎉`);
      
      const newDiscovered = [...discoveredAnimals, vocab.english];
      if (newDiscovered.length >= 3) {
        setAnimalsCompleted(true);
        setTimeout(() => {
          onComplete();
        }, 2200);
      } else {
        setTimeout(() => {
          // Trigger next animal guess
          const pool = (slide.vocabList || []).filter(item => !newDiscovered.includes(item.english));
          if (pool.length > 0) {
            const selected = pool[Math.floor(Math.random() * pool.length)];
            setAnimalAnswer(selected.english);
            setActiveAnimalSound(animalSounds[selected.english]?.sound || '');
            setAnimalHint(animalSounds[selected.english]?.hint || '');
          }
        }, 1500);
      }
    } else {
      setAnimalHint(`Quase! Essa é a imitação de outro animal. Vamos ouvir o som de novo e tentar o ${vocab.portuguese}!`);
    }
  };

  // --- 5. FEELINGS SCENARIOS LOGIC ---
  const scenarioCards = [
    {
      text: 'Hoje é dia de brincar com todos os amigos no parquinho de Osasco! Como você se sente?',
      correct: 'Happy',
      hint: 'É uma sensação excelente de alegria e sorrisos! 😃'
    },
    {
      text: 'Você passou a noite acordado estudando e jogando videogame, agora está com muito sono na cadeira. Como se sente?',
      correct: 'Tired',
      hint: 'Seus olhos estão pesados, você quer tirar um cochilo! 😴'
    },
    {
      text: 'Incrível! Você ganhou a medalha de ouro de campeão de inglês na escola! O coração bate forte!',
      correct: 'Excited',
      hint: 'É uma felicidade extrema, com muita energia e comemoração! 🤩'
    },
    {
      text: 'Seus lápis coloridos caíram no ralo ou seu brinquedo preferido quebrou. Como você se sente?',
      correct: 'Sad',
      hint: 'Dá vontade de ficar quietinho ou às vezes chorar um pouco. 😢'
    }
  ];

  const handleFeelingSelect = (selectedName: string) => {
    const current = scenarioCards[currentScenarioIndex];
    if (selectedName === current.correct) {
      handleSpeak(selectedName);
      setFeelingsScore(prev => prev + 1);
      setFeelingsFeedback('Exatamente! Esse sentimento combina perfeitamente! 🌟💖');
      
      setTimeout(() => {
        if (currentScenarioIndex < scenarioCards.length - 1) {
          setCurrentScenarioIndex(prev => prev + 1);
          setFeelingsFeedback('');
        } else {
          setFeelingsFeedback('Sensacional! Você é nota 10 identificando emoções! 🏆');
          setFeelingsCompleted(true);
          setTimeout(() => {
            onComplete();
          }, 2000);
        }
      }, 1500);
    } else {
      setFeelingsFeedback(`Hum... não deu. Pense bem: ${current.hint}`);
    }
  };

  // --- 6. VALUES SCRAMBLER LOGIC ---
  const setupValueScrambler = (index: number) => {
    if (!slide.vocabList || slide.vocabList.length === 0) return;
    const valueItem = slide.vocabList[index];
    const letters = valueItem.english.toUpperCase().split('');
    
    // Scramble letters keeping track of indices
    const scrambled = [...letters].sort(() => Math.random() - 0.5);
    setScrambledValue(scrambled);
    setUserValueSpelling([]);
    setValuesFeedback('');
  };

  const handleLetterClick = (letter: string, index: number) => {
    if (!slide.vocabList) return;
    const currentWord = slide.vocabList[currentValueIndex].english.toUpperCase();
    const updatedSpelling = [...userValueSpelling, letter];
    setUserValueSpelling(updatedSpelling);

    // Remove letter from scrambled pool at this specific index
    const updatedScrambled = [...scrambledValue];
    updatedScrambled.splice(index, 1);
    setScrambledValue(updatedScrambled);

    const currentAssembled = updatedSpelling.join('');
    
    // Check if the spelled substring matches correct spelling
    if (currentWord.startsWith(currentAssembled)) {
      if (currentAssembled === currentWord) {
        // Complete word spell!
        handleSpeak(slide.vocabList[currentValueIndex].english);
        const valueObj = slide.vocabList[currentValueIndex];
        const updatedSpelledCount = [...spelledValuesCount, valueObj.english];
        setSpelledValuesCount(updatedSpelledCount);
        
        setValuesFeedback(`Parabéns! Você soletrou "${valueObj.english}" (${valueObj.portuguese})! ✨`);

        setTimeout(() => {
          if (currentValueIndex < slide.vocabList!.length - 1) {
            const nextIdx = currentValueIndex + 1;
            setCurrentValueIndex(nextIdx);
            setupValueScrambler(nextIdx);
          } else {
            setValuesFeedback('Lindo! Você espalhou amor, empatia, justiça e apoio por toda a escola! ❤️');
            setValuesCompleted(true);
            setTimeout(() => {
              onComplete();
            }, 2500);
          }
        }, 2200);
      }
    } else {
      setValuesFeedback('Ops, ordem incorreta! Vamos tentar novamente esta palavra? ↩️');
      // Reset spelling of current word after short delay
      setTimeout(() => {
        setupValueScrambler(currentValueIndex);
      }, 1200);
    }
  };


  // ==========================================
  // RENDER INTERACTIVE INTERFACES DETAILED
  // ==========================================

  return (
    <div className="flex flex-col h-full bg-slate-900 border-x-4 border-b-4 border-slate-700/80 rounded-b-3xl text-white p-4 md:p-6 overflow-y-auto">
      
      {/* Slide Info & Title */}
      <div className="mb-4 text-center">
        <h2 className="text-xl md:text-2xl font-black text-amber-300 drop-shadow flex items-center justify-center gap-2">
          {slide.title}
        </h2>
        <p className="text-xs md:text-sm text-slate-300 mt-1">{slide.description}</p>
      </div>

      <div className="flex-1 min-h-[300px]">
        {/* ====================================
            1. GREETINGS INTERACTIVE DIALOGUE GAME
            ==================================== */}
        {slide.type === 'greetings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
            {/* Left Box: Vocabulary Clicker */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 shadow-lg">
              <h3 className="text-sm font-bold text-slate-400 mb-3 text-center uppercase tracking-wider">
                🗣️ Dicionário de Cumprimentos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {slide.vocabList?.map((vocab, i) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSpeak(vocab.english, vocab)}
                    key={i}
                    className={`flex items-center gap-2 p-3 text-left rounded-xl transition-all border ${
                      activeWord?.english === vocab.english && isSpeaking
                        ? 'bg-blue-500 border-blue-300 animate-pulse'
                        : 'bg-slate-700/50 hover:bg-slate-700 border-slate-600'
                    }`}
                  >
                    <span className="text-2xl">{vocab.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-sm text-white truncate">{vocab.english}</div>
                      <div className="text-[10px] text-slate-300 truncate">{vocab.portuguese}</div>
                    </div>
                    <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right Box: Leno Owl Chat Game */}
            <div className="bg-gradient-to-tr from-indigo-900 to-indigo-950 p-4 rounded-2xl border-2 border-indigo-400/30 flex flex-col justify-between h-full min-h-[250px]">
              <div>
                <h3 className="text-xs font-black tracking-widest text-indigo-300 uppercase mb-3 text-center">
                  💬 Desafio: Converse com a Coruja Leno!
                </h3>
                
                {/* Dialogue Area */}
                <div className="flex flex-col gap-3 mt-1">
                  {/* Leno Question */}
                  <div className="flex gap-2 items-start">
                    <span className="text-2xl pt-1">🦉</span>
                    <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 max-w-[85%] text-xs md:text-sm shadow-md">
                      <p className="font-black text-indigo-300 text-left">Teacher Leno:</p>
                      <p className="text-white mt-1">
                        {dialStep === 0 ? "Hello Kid! What is your name?" : "Excellent! Now tell me, how do you say 'Thank you' in English when somebody helps you?"}
                      </p>
                    </div>
                  </div>

                  {/* Feedback Message */}
                  {greetingsFeedback && (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-center text-xs text-amber-300 font-bold bg-white/5 py-1.5 px-3 rounded-full border border-amber-500/20 shadow-sm"
                    >
                      {greetingsFeedback}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Interaction Buttons Option */}
              <div className="flex flex-col gap-2 mt-4">
                {dialStep === 0 ? (
                  <>
                    <button
                      id="opt-dial-name-success"
                      onClick={() => handleGreetingsOption(`My name is ${studentName || 'Kid'}`)}
                      className="w-full text-slate-800 font-extrabold bg-amber-400 hover:bg-amber-300 p-2.5 rounded-xl text-xs md:text-sm border-b-4 border-amber-600 transition active:scale-95 text-left flex items-center justify-between"
                    >
                      <span>💬 Hello! My name is <b>{studentName || 'Kid'}</b>.</span>
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      id="opt-dial-name-fail"
                      onClick={() => handleGreetingsOption('Thank you!')}
                      className="w-full text-white font-extrabold bg-slate-700 hover:bg-slate-600 p-2.5 rounded-xl text-xs md:text-sm border-b-4 border-slate-900 transition active:scale-95 text-left"
                    >
                      💬 Thank you!
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      id="opt-dial-thanks-success"
                      onClick={() => handleGreetingsOption('Thank you!')}
                      className="w-full text-slate-800 font-extrabold bg-amber-400 hover:bg-amber-300 p-2.5 rounded-xl text-xs md:text-sm border-b-4 border-amber-600 transition active:scale-95 text-left flex items-center justify-between"
                    >
                      <span>💬 Thank you!</span>
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      id="opt-dial-thanks-fail"
                      onClick={() => handleGreetingsOption('Goodbye!')}
                      className="w-full text-white font-extrabold bg-slate-700 hover:bg-slate-600 p-2.5 rounded-xl text-xs md:text-sm border-b-4 border-slate-900 transition active:scale-95 text-left"
                    >
                      💬 Goodbye!
                    </button>
                  </>
                )}
                {greetingsCompleted && (
                  <div className="bg-emerald-500/20 text-emerald-300 text-xs text-center font-extrabold py-2 rounded-lg border border-emerald-500 mt-2">
                    ✓ Saudações Completadas! 🦉✨ Prossiga para a próxima aventura!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ====================================
            2. COLORS SLIDE (Digital Coloring Book)
            ==================================== */}
        {slide.type === 'colors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
            {/* Color Palette Buckets Selector */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm font-bold text-slate-400 mb-3 text-center uppercase tracking-wider">
                  🎨 Paleta de Baldes de Tinta Mágica
                </h3>
                <p className="text-xs text-slate-300 text-center mb-4">
                  Selecione uma cor e depois clique nas partes do Teacher Leno para pintá-lo!
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {slide.vocabList?.map((vocab, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectColor(vocab)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl transition border-2 ${
                        selectedColorName === vocab.english 
                          ? 'border-white bg-slate-700 shadow-lg scale-105' 
                          : 'border-transparent bg-slate-750 hover:bg-slate-700'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${vocab.color} shadow-inner flex items-center justify-center border border-white/20`}>
                        <span className="text-base font-bold text-white drop-shadow">🖌️</span>
                      </div>
                      <span className="font-extrabold text-xs text-white mt-1.5">{vocab.english}</span>
                      <span className="text-[10px] text-slate-300">{vocab.portuguese}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-slate-700/40 p-2 rounded-xl border border-slate-600 text-center text-xs mt-3">
                Cor selecionada: <span className="font-extrabold text-amber-300">{selectedColorName}</span> • Toque no elemento que quer pintar ao lado!
              </div>
            </div>

            {/* Coloring SVG Canvas Area */}
            <div className="bg-slate-850 p-4 rounded-2xl border-2 border-slate-600 flex flex-col items-center justify-center h-full relative">
              
              {/* Mascot Vector Outline coloring */}
              <div className="w-52 h-52 relative border-2 border-dashed border-slate-500 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden p-2">
                <svg viewBox="0 0 100 100" className="w-full h-full cursor-pointer">
                  {/* Feathers / Background Halo */}
                  <polygon points="50,5 95,50 50,95 5,50" className="fill-slate-700/20 strokes-slate-500" />
                  
                  {/* Feet */}
                  <ellipse cx="37" cy="88" rx="8" ry="4" className={`${owlColors.feet} stroke-slate-800 transition-colors cursor-pointer`} onClick={() => handlePaintPart('feet')} />
                  <ellipse cx="63" cy="88" rx="8" ry="4" className={`${owlColors.feet} stroke-slate-800 transition-colors cursor-pointer`} onClick={() => handlePaintPart('feet')} />

                  {/* Wings */}
                  <path d="M 15,40 C 5,50 5,70 20,75 Z" className={`${owlColors.wings} stroke-slate-800 transition-colors cursor-pointer`} onClick={() => handlePaintPart('wings')} />
                  <path d="M 85,40 C 95,50 95,70 80,75 Z" className={`${owlColors.wings} stroke-slate-800 transition-colors cursor-pointer`} onClick={() => handlePaintPart('wings')} />

                  {/* Body/Head main */}
                  <ellipse cx="50" cy="50" rx="32" ry="36" className={`${owlColors.head} stroke-slate-800 transition-colors cursor-pointer`} onClick={() => handlePaintPart('head')} />

                  {/* Belly Panel */}
                  <ellipse cx="50" cy="62" rx="20" ry="18" className={`${owlColors.belly} stroke-slate-800 transition-colors cursor-pointer`} onClick={() => handlePaintPart('belly')} />

                  {/* Eyes (Glass frame and Eyes) */}
                  <circle cx="38" cy="38" r="9" className="fill-white stroke-slate-800" />
                  <circle cx="62" cy="38" r="9" className="fill-white stroke-slate-800" />
                  <circle cx="38" cy="38" r="4" className="fill-slate-900" />
                  <circle cx="62" cy="38" r="4" className="fill-slate-900" />

                  {/* Glasses frame connector (clicks colors) */}
                  <rect x="42" y="36" width="16" height="4" className={`${owlColors.glasses} stroke-slate-800 cursor-pointer`} onClick={() => handlePaintPart('glasses')} />

                  {/* Beak */}
                  <polygon points="50,42 45,51 55,51" className={`${owlColors.beak} stroke-slate-800 cursor-pointer`} onClick={() => handlePaintPart('beak')} />
                </svg>
                
                {colorsCompleted && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-2 text-center backdrop-blur-sm">
                    <Sparkles className="w-8 h-8 text-yellow-300 animate-spin" />
                    <span className="font-extrabold text-sm text-yellow-250 mt-1">Uau, ficou lindo! 🦉🌈</span>
                    <button
                      onClick={() => onComplete()}
                      className="mt-2 bg-emerald-500 hover:bg-emerald-400 font-bold text-xs text-white px-3 py-1.5 rounded-full shadow border-b-2 border-emerald-700"
                    >
                      Ir para Mochila!
                    </button>
                  </div>
                )}
              </div>
              <div className="text-[10px] text-slate-400 mt-2 italic text-center">
                Dica: Toque na Cabeça, Barriga, Asas, Óculos ou Pés do mascote para colorir.
              </div>
            </div>
          </div>
        )}

        {/* ====================================
            3. BACKPACK PACKING GAME (school)
            ==================================== */}
        {slide.type === 'school' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
            {/* Shelf/Objects Container */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm font-bold text-slate-400 mb-3 text-center uppercase tracking-wider">
                  📖 Prateleira de Materiais Escolares
                </h3>

                {/* Target Box Notification */}
                {targetSchoolObject && !schoolCompleted ? (
                  <div className="bg-slate-900 p-3 rounded-xl border-l-4 border-amber-400 mb-4 flex items-center justify-between shadow-inner">
                    <div className="text-xs">
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Ache e Toque no:</p>
                      <p className="text-amber-300 text-lg font-black">{targetSchoolObject.english}</p>
                      <p className="text-slate-400">Em Português: {targetSchoolObject.portuguese}</p>
                    </div>
                    <button 
                      onClick={() => handleSpeak(targetSchoolObject.english)}
                      className="bg-slate-800 border hover:bg-slate-700 text-white p-2 rounded-full cursor-pointer"
                    >
                      <Volume2 className="w-5 h-5 text-amber-300" />
                    </button>
                  </div>
                ) : (
                  <div className="bg-emerald-800/30 p-3 rounded-xl border border-emerald-500 mb-4 text-center">
                    <p className="text-emerald-400 font-bold text-sm">🎉 Tudo Organizado e Guardado!</p>
                  </div>
                )}

                {/* Grid of Materials */}
                <div className="grid grid-cols-3 gap-2">
                  {slide.vocabList?.map((vocab, i) => {
                    const isPacked = packedObjects.includes(vocab.english);
                    return (
                      <button
                        key={i}
                        onClick={() => handleSchoolItemClick(vocab)}
                        disabled={isPacked || schoolCompleted}
                        className={`p-3 rounded-xl transition flex flex-col items-center justify-center relative border-b-4 ${
                          isPacked
                            ? 'bg-slate-900/60 border-slate-900 opacity-30 cursor-not-allowed'
                            : 'bg-slate-700/70 border-slate-900 hover:bg-slate-650'
                        }`}
                      >
                        <span className="text-3xl">{vocab.icon}</span>
                        <span className="font-extrabold text-xs text-white mt-1">{vocab.english}</span>
                        {isPacked && (
                          <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5 text-white">
                            <CheckCircle className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedbacks */}
              <div className="text-xs text-center font-bold text-amber-200 mt-2 bg-black/15 py-1.5 px-2 rounded-lg">
                {schoolFeedback || 'Aguardando você guardar materiais na mochila...'}
              </div>
            </div>

            {/* Virtual Backpack Animation Target */}
            <div className="bg-gradient-to-b from-purple-900/80 to-indigo-950 p-4 rounded-2xl border-2 border-purple-400/40 flex flex-col items-center justify-center h-full min-h-[250px] relative">
              <ShoppingBag className="w-24 h-24 text-pink-400 animate-pulse" />
              <div className="font-extrabold text-center mt-3 text-sm">
                Minha Mochila Escolar 🎒
              </div>
              <p className="text-[10px] text-purple-200 mt-1 max-w-[80%] text-center">
                Guardado: {packedObjects.length} de {slide.vocabList?.length} objetos!
              </p>

              {/* Grid of things inside bag */}
              <div className="flex flex-wrap gap-1 justify-center mt-3">
                {packedObjects.map((obj, idx) => {
                  const matched = slide.vocabList?.find(v => v.english === obj);
                  return (
                    <span key={idx} className="bg-white/10 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {matched?.icon} {obj}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ====================================
            4. JUNGLE ANIMAL CHOOSE GAME (animals)
            ==================================== */}
        {slide.type === 'animals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
            {/* Find matching animal panels */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm font-bold text-slate-400 mb-2 text-center uppercase tracking-wider">
                  🦁 Que som de animal é esse?
                </h3>
                
                {/* Animal sound projection */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700 mb-4 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                  <div className="absolute top-1 left-2 text-xs text-slate-500 font-bold uppercase">Clue / Pista:</div>
                  <div className="text-3xl text-emerald-400 font-extrabold animate-bounce mt-2">
                    "{activeAnimalSound}"
                  </div>
                  <p className="text-xs text-slate-300 font-bold mt-2 bg-white/5 py-1 px-3 rounded-full">
                    {animalHint}
                  </p>
                </div>

                {/* Sound triggers & guess board */}
                <div className="grid grid-cols-3 gap-2">
                  {slide.vocabList?.map((vocab, i) => {
                    const isPassed = discoveredAnimals.includes(vocab.english);
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnimalSelect(vocab)}
                        disabled={isPassed || animalsCompleted}
                        className={`p-3 rounded-xl border-b-4 text-center transition flex flex-col items-center ${
                          isPassed
                            ? 'bg-slate-900/40 border-slate-950 opacity-45 cursor-not-allowed'
                            : 'bg-slate-700 hover:bg-slate-650 border-slate-900'
                        }`}
                      >
                        <span className="text-3xl">{vocab.icon}</span>
                        <span className="font-extrabold text-xs text-white mt-1">{vocab.english}</span>
                        <span className="text-[9px] text-slate-400">{vocab.portuguese}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="text-[10px] text-center text-slate-400 italic mt-3">
                Acerte pelo menos 3 animais para completar a fase dos Animais!
              </div>
            </div>

            {/* Animal Jungle Card deck layout */}
            <div className="bg-gradient-to-tr from-cyan-900 to-teal-900 p-4 rounded-2xl border-2 border-cyan-400/30 flex flex-col justify-between h-full min-h-[250px]">
              <div>
                <h3 className="text-xs font-black tracking-widest text-cyan-200 uppercase mb-3 text-center">
                  🌳 Animais Encontrados na Floresta:
                </h3>
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {slide.vocabList?.slice(0, 4).map((vocab, idx) => {
                    const discovered = discoveredAnimals.includes(vocab.english);
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center gap-2 p-2 rounded-xl border ${
                          discovered 
                            ? 'bg-emerald-500/20 border-emerald-400 text-white' 
                            : 'bg-slate-800/80 border-slate-700 text-slate-500'
                        }`}
                      >
                        <span className="text-2xl">{discovered ? vocab.icon : '❓'}</span>
                        <div className="text-left">
                          <p className="font-bold text-xs">{discovered ? vocab.english : '???'}</p>
                          <p className="text-[10px] text-slate-400">{discovered ? vocab.portuguese : 'Desconhecido'}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {animalsCompleted ? (
                <div className="bg-emerald-500/20 text-emerald-300 font-extrabold text-xs text-center py-2.5 rounded-xl border border-emerald-500 mt-4">
                  ✓ Excelente! Animais Descorbertos! Vamos em frente! 🦁🌳
                </div>
              ) : (
                <div className="text-cyan-200 font-medium text-xs text-center mt-4">
                  Progresso: {discoveredAnimals.length} de 3 necessários.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ====================================
            5. FEELINGS EMOTIONS ADVENTURE (feelings)
            ==================================== */}
        {slide.type === 'feelings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
            {/* Left box: scenario statement */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-orange-500/20 text-orange-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    Situação {currentScenarioIndex + 1} de {scenarioCards.length}
                  </span>
                  <span className="text-xs text-amber-300 font-bold">Acertos: {feelingsScore}</span>
                </div>
                
                <h3 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                  🎭 O cenário se passa na sua mente:
                </h3>

                <div className="bg-slate-900 p-4 rounded-xl border-l-4 border-rose-500 min-h-[90px] flex items-center justify-center text-center shadow-inner">
                  <p className="text-white text-xs md:text-sm font-bold leading-relaxed">
                    {scenarioCards[currentScenarioIndex].text}
                  </p>
                </div>

                {feelingsFeedback && (
                  <div className={`mt-3 p-2 text-center rounded-lg text-xs font-extrabold ${
                    feelingsFeedback.includes('Exatamente') || feelingsFeedback.includes('Sensacional')
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {feelingsFeedback}
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-400 italic mt-3 text-center">
                Leia o cenário e clique no balão de sentimentos que mais combina à direita!
              </div>
            </div>

            {/* Right box: Clickable balloons representing feeling emoticons */}
            <div className="bg-gradient-to-tr from-pink-950 to-rose-955 p-4 rounded-2xl border-2 border-pink-400/30 flex flex-col justify-between h-full min-h-[250px]">
              <h3 className="text-xs font-black tracking-widest text-pink-300 uppercase mb-3 text-center">
                🎈 Balões dos Sentimentos
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {slide.vocabList?.map((vocab, i) => (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleFeelingSelect(vocab.english)}
                    disabled={feelingsCompleted}
                    key={i}
                    className="bg-slate-800 hover:bg-slate-700/80 text-white rounded-xl p-2.5 border border-slate-650 shadow flex flex-col items-center justify-center transition active:scale-95"
                  >
                    <span className="text-3xl select-none animate-pulse">{vocab.icon}</span>
                    <span className="font-extrabold text-xs text-white mt-1">{vocab.english}</span>
                    <span className="text-[10px] text-slate-400">{vocab.portuguese}</span>
                  </motion.button>
                ))}
              </div>
              
              {feelingsCompleted && (
                <button
                  onClick={() => onComplete()}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 font-extrabold text-xs py-2 rounded-xl text-white border-b-4 border-emerald-700 mt-3"
                >
                  Continuar para os Valores! ♥️
                </button>
              )}
            </div>
          </div>
        )}

        {/* ====================================
            6. LENILSONS' VALUES SCRAMBLER (values)
            ==================================== */}
        {slide.type === 'values' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
            {/* Scramble Spelling Board Box */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm font-bold text-slate-400 mb-2 text-center uppercase tracking-wider">
                  ✍️ Monte o Valor do Inglês Legal
                </h3>
                
                {slide.vocabList && slide.vocabList[currentValueIndex] && (
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-750 mb-3 text-center">
                    <p className="text-slate-400 text-[10px] font-bold uppercase">Palavra em Português:</p>
                    <p className="text-teal-400 text-lg font-black">{slide.vocabList[currentValueIndex].portuguese} {slide.vocabList[currentValueIndex].icon}</p>
                  </div>
                )}

                {/* Spell area (bubbly) */}
                <div className="flex justify-center gap-1.5 h-12 items-center bg-slate-900/60 rounded-xl mb-3 border-2 border-dashed border-slate-600">
                  {userValueSpelling.length === 0 ? (
                    <span className="text-xs text-slate-500 italic font-bold">Toque nas esferas abaixo para soletrar...</span>
                  ) : (
                    userValueSpelling.map((letter, idx) => (
                      <span key={idx} className="bg-teal-500 text-slate-900 font-black text-lg w-8 h-8 flex items-center justify-center rounded-lg shadow-sm border border-white/20 select-none">
                        {letter}
                      </span>
                    ))
                  )}
                </div>

                {/* Letter buttons options (scrambled) */}
                <div className="flex justify-center gap-2 flex-wrap">
                  {scrambledValue.map((letter, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLetterClick(letter, idx)}
                      className="bg-gradient-to-b from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-900 font-black text-base w-9 h-9 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl border-b-4 border-orange-600 transition active:scale-95"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset current spelling button */}
              <button
                onClick={() => setupValueScrambler(currentValueIndex)}
                className="mt-3 flex items-center justify-center gap-1 text-slate-400 hover:text-white text-xs font-bold bg-white/5 py-1.5 px-3 rounded-full border border-slate-700 w-fit mx-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Refazer Palavra
              </button>
            </div>

            {/* Value cards display list */}
            <div className="bg-gradient-to-tr from-rose-950 to-red-950 p-4 rounded-2xl border-2 border-red-400/30 flex flex-col justify-between h-full min-h-[250px]">
              <div>
                <h3 className="text-xs font-black tracking-widest text-red-200 uppercase mb-3 text-center">
                  ❤️ Valores do Professor Leno Unidoss:
                </h3>

                <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                  {slide.vocabList?.map((vocab, i) => {
                    const solved = spelledValuesCount.includes(vocab.english);
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-xl flex items-center justify-between text-xs transition border ${
                          solved
                            ? 'bg-rose-500/20 border-rose-400/50 text-white'
                            : 'bg-slate-800/80 border-slate-750 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{vocab.icon}</span>
                          <div>
                            <p className="font-extrabold">{vocab.english}</p>
                            <p className="text-[10px] text-slate-400">{vocab.portuguese}</p>
                          </div>
                        </div>
                        {solved && (
                          <span className="text-[9px] bg-emerald-500 text-slate-900 font-extrabold px-1.5 py-0.5 rounded-full">
                            ✓ Resolvido!
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {valuesFeedback && (
                <div className="text-xs text-center font-extrabold text-amber-200 bg-black/30 p-2 rounded-xl mt-3">
                  {valuesFeedback}
                </div>
              )}

              {valuesCompleted && (
                <button
                  onClick={() => onComplete()}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 font-extrabold text-xs py-2 rounded-xl text-white border-b-4 border-emerald-700 mt-3"
                >
                  Ir para o Desafio Final! 🎉🎮
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
