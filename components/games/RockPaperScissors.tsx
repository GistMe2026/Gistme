'use client';

import { useMemo, useState } from 'react';

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function TicTacToe() {
  const [board, setBoard] = useState<Array<'X' | 'O' | null>>(
    Array(9).fill(null),
  );
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winningCells, setWinningCells] = useState<number[]>([]);

  const winner = useMemo(() => {
    for (const line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinningCells(line);
        return board[a];
      }
    }
    setWinningCells([]);
    return null;
  }, [board]);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const nextBoard = [...board];
    nextBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);

    const hasWinner = winningLines.some(([a, b, c]) => nextBoard[a] && nextBoard[a] === nextBoard[b] && nextBoard[a] === nextBoard[c]);
    if (hasWinner) {
      const value = xIsNext ? 'X' : 'O';
      setScores((prev) => ({ ...prev, [value]: prev[value] + 1 }));
      return;
    }

    setXIsNext(!xIsNext);
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinningCells([]);
    setXIsNext(true);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tic Tac Toe</h3>
        <button onClick={resetBoard} className="rounded-full bg-[#00a884] px-3 py-1.5 text-xs font-bold text-[#081114]">Reset</button>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm">
        <div>Score X: <span className="font-bold">{scores.X}</span></div>
        <div>Score O: <span className="font-bold">{scores.O}</span></div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`grid h-16 place-items-center rounded-2xl text-3xl font-bold ${winningCells.includes(index) ? 'bg-[#d9fdd3] text-[#008069]' : 'bg-[#111b21] text-white'}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-sm font-medium">
        {winner ? `Winner: ${winner}` : `Next: ${xIsNext ? 'X' : 'O'}`}
      </p>
    </div>
  );
}
