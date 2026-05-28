/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Speaks the given English text using the browser's Speech Synthesis API.
 * Uses an English voice matches if available.
 */
export function speakEnglish(text: string, callback?: (speaking: boolean) => void): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('Speech synthesis not supported in this browser.');
    if (callback) callback(false);
    return;
  }

  // Cancel any ongoing speaking
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85; // slightly slower for children to understand better

  // Try to find a premium or natural English voice
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(voice => 
    voice.lang.startsWith('en') && 
    (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Microsoft'))
  ) || voices.find(voice => voice.lang.startsWith('en'));

  if (enVoice) {
    utterance.voice = enVoice;
  }

  utterance.onstart = () => {
    if (callback) callback(true);
  };

  utterance.onend = () => {
    if (callback) callback(false);
  };

  utterance.onerror = () => {
    if (callback) callback(false);
  };

  window.speechSynthesis.speak(utterance);
}
