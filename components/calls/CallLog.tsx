'use client';

import { useEffect, useState } from 'react';

const words = ['NIGERIA', 'KONTAGORA', 'GISTME', 'MINNA'];

const scrambleWord = (word: string) => {
  const chars = word.split('');
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
};

export function WordScramble() {
  const [target, setTarget] = useState('NIGERIA');
  const [scrambled, setScrambled] = useState('');
  const [answer, setAnswer] = useState('');
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setScrambled(scrambleWord(target));
  }, [target]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const nextWord = () => {
    const next = words[Math.floor(Math.random() * words.length)];
    setTarget(next);
    setAnswer('');
    setTimeLeft(30);
  };

  const checkAnswer = () => {
    if (answer.toUpperCase() === target) {
      setPoints((prev) => prev + 10);
      nextWord();
    }
  };

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Word Scramble</h3>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span>Time: {timeLeft}s</span>
        <span>Points: {points}</span>
      </div>
      <div className="mb-4 rounded-2xl bg-[#111b21] px-4 py-6 text-center text-3xl font-bold tracking-[0.5em] text-white">
        {scrambled}
      </div>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type the correct word" className="w-full rounded-2xl border border-[#dfe8eb] bg-white px-4 py-3 text-[#0b141a] outline-none" />
      <div className="mt-4 flex gap-2">
        <button onClick={checkAnswer} className="flex-1 rounded-full bg-[#00a884] px-4 py-3 font-semibold text-[#081114]">Check</button>
        <button onClick={nextWord} className="flex-1 rounded-full bg-[#202c33] px-4 py-3 font-semibold text-white">Next</button>
      </div>
    </div>
  );
}
