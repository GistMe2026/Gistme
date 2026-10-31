'use client';

import { useState } from 'react';

export function LudoDice() {
  const [diceValue, setDiceValue] = useState(1);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [opponentPosition, setOpponentPosition] = useState(0);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    const value = Math.floor(Math.random() * 6) + 1;
    setTimeout(() => {
      setDiceValue(value);
      setPlayerPosition((prev) => Math.min(prev + value, 20));
      setOpponentPosition((prev) => Math.min(prev + Math.floor(Math.random() * 6) + 1, 20));
      setRolling(false);
    }, 500);
  };

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Ludo Dice</h3>
      <div className="mb-4 flex items-center justify-between text-sm">
        <span>You: {playerPosition}/{20}</span>
        <span>CPU: {opponentPosition}/{20}</span>
      </div>
      <div className="mb-4 grid place-items-center">
        <div className={`grid h-20 w-20 place-items-center rounded-2xl bg-[#111b21] text-4xl text-white shadow-soft ${rolling ? 'animate-spin' : ''}`}>
          {diceValue}
        </div>
      </div>
      <button onClick={rollDice} className="w-full rounded-full bg-[#00a884] px-4 py-3 font-semibold text-[#081114]">
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
}
