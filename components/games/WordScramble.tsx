'use client';

import { useEffect, useState } from 'react';

const questions = [
  { q: 'What is the capital of Lagos State?', options: ['Ikeja', 'Ikoyi', 'Surulere', 'Yaba'], answer: 'Ikeja', fact: 'Lagos State was officially created in 1967.' },
  { q: 'Which river is the longest in Nigeria?', options: ['Benue', 'Niger', 'Cross', 'Anambra'], answer: 'Niger', fact: 'The Niger River flows through multiple countries in West Africa.' },
  { q: 'Which city is known as the “Coal City”?', options: ['Kaduna', 'Enugu', 'Ibadan', 'Abeokuta'], answer: 'Enugu', fact: 'Enugu was once famous for coal mining.' },
  { q: 'What is the national currency of Nigeria?', options: ['Naira', 'Kobo', 'Dollar', 'Rand'], answer: 'Naira', fact: 'The naira is divided into 100 kobo.' },
  { q: 'Which Nigerian state is called “The Centre of Excellence”?', options: ['Kaduna', 'Lagos', 'Rivers', 'Ogun'], answer: 'Lagos', fact: 'Lagos is often described as the commercial hub of Nigeria.' },
];

export function TriviaBattle() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      const timer = setTimeout(() => nextQuestion(), 700);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
      setSelected(null);
      setTimeLeft(15);
    }
  };

  const current = questions[index];

  const handleChoice = (option: string) => {
    setSelected(option);
    if (option === current.answer) setScore((prev) => prev + 1);
    setTimeout(() => nextQuestion(), 1200);
  };

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Trivia Battle</h3>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span>Question {index + 1}/{questions.length}</span>
        <span>Time {timeLeft}s</span>
      </div>
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-[#dfe8eb]">
        <div className="h-full rounded-full bg-[#00a884]" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
      </div>
      <p className="mb-4 text-base font-medium">{current.q}</p>
      <div className="space-y-2">
        {current.options.map((option) => (
          <button
            key={option}
            onClick={() => handleChoice(option)}
            className={`w-full rounded-2xl px-3 py-3 text-left text-sm ${selected === option ? (option === current.answer ? 'bg-[#00a884] text-[#081114]' : 'bg-[#f15c6d] text-white') : 'bg-[#111b21] text-white'}`}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-sm font-medium">Score: {score}</p>
    </div>
  );
}
