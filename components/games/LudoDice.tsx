'use client';

import { useState } from 'react';

const choices = ['rock', 'paper', 'scissors'] as const;
const emojiMap = { rock: '🪨', paper: '📄', scissors: '✂️' };

export function RockPaperScissors() {
  const [player, setPlayer] = useState<(typeof choices)[number] | null>(null);
  const [opponent, setOpponent] = useState<(typeof choices)[number] | null>(null);
  const [score, setScore] = useState({ player: 0, opponent: 0, round: 0 });
  const [result, setResult] = useState<string>('Choose your move');

  const choose = (move: (typeof choices)[number]) => {
    const cpu = choices[Math.floor(Math.random() * choices.length)];
    setPlayer(move);
    setOpponent(cpu);

    if (move === cpu) {
      setResult('Draw!');
      return;
    }

    const wins = (move === 'rock' && cpu === 'scissors') || (move === 'paper' && cpu === 'rock') || (move === 'scissors' && cpu === 'paper');
    if (wins) {
      setResult('You Win!');
      setScore((prev) => ({ ...prev, player: prev.player + 1, round: prev.round + 1 }));
    } else {
      setResult('You Lose!');
      setScore((prev) => ({ ...prev, opponent: prev.opponent + 1, round: prev.round + 1 }));
    }
  };

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Rock Paper Scissors</h3>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span>You: {score.player}</span>
        <span>CPU: {score.opponent}</span>
      </div>
      <div className="mb-4 flex justify-between rounded-2xl bg-[#111b21] p-3 text-xl text-white">
        <div>{player ? emojiMap[player] : '❔'}</div>
        <div>{opponent ? emojiMap[opponent] : '❔'}</div>
      </div>
      <div className="mb-4 text-center text-sm font-medium">{result}</div>
      <div className="grid grid-cols-3 gap-2">
        {choices.map((choice) => (
          <button key={choice} onClick={() => choose(choice)} className="rounded-2xl bg-[#111b21] px-3 py-3 text-lg font-semibold text-white capitalize">
            {emojiMap[choice]} {choice}
          </button>
        ))}
      </div>
    </div>
  );
}
