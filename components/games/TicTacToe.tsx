'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, SendHorizonal } from 'lucide-react';
import { TicTacToe } from '@/components/games/TicTacToe';
import { RockPaperScissors } from '@/components/games/RockPaperScissors';
import { LudoDice } from '@/components/games/LudoDice';
import { TriviaBattle } from '@/components/games/TriviaBattle';
import { WordScramble } from '@/components/games/WordScramble';

export function GameRoom({ room, onBack }: { room: { name: string; game: string; players: { name: string; avatar: string }[]; maxPlayers: number }; onBack: () => void }) {
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([
    { user: 'Ada', text: 'Ready to play. Tap your move.' },
    { user: 'You', text: 'Let’s do it.' },
  ]);

  const renderGame = useMemo(() => {
    switch (room.game) {
      case 'Tic Tac Toe':
        return <TicTacToe />;
      case 'Rock Paper Scissors':
        return <RockPaperScissors />;
      case 'Ludo Dice':
        return <LudoDice />;
      case 'Trivia Battle':
        return <TriviaBattle />;
      case 'Word Scramble':
        return <WordScramble />;
      default:
        return <TicTacToe />;
    }
  }, [room.game]);

  return (
    <div className="flex h-full w-full flex-col bg-[#111b21] text-white">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#202c33] px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="rounded-full bg-white/5 p-2"><ArrowLeft size={18} /></button>
          <div>
            <h3 className="font-semibold">{room.name}</h3>
            <p className="text-[11px] text-[#aebac1]">{room.game}</p>
          </div>
        </div>
        <button className="rounded-full bg-[#f15c6d] px-3 py-1.5 text-xs font-semibold text-white">Leave</button>
      </header>

      <div className="flex-1 overflow-y-auto bg-[#efeae2] p-4 text-[#0b141a]">
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">{renderGame}</div>

        <div className="rounded-2xl bg-[#202c33] p-4 text-white shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold">In-game chat</h4>
            <span className="text-[11px] text-[#aebac1]">{room.players.length}/{room.maxPlayers}</span>
          </div>
          <div className="space-y-2">
            {messages.map((message, index) => (
              <div key={index} className="rounded-xl bg-white/5 px-3 py-2 text-sm">
                <span className="font-semibold text-[#00a884]">{message.user}</span>: {message.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 bg-[#f0f2f5] p-3">
        <div className="flex items-center gap-2">
          <input value={chat} onChange={(e) => setChat(e.target.value)} placeholder="Message in game room" className="flex-1 rounded-full border border-[#dfe8eb] bg-white px-4 py-3 text-sm text-[#0b141a] outline-none placeholder:text-[#8696a0]" />
          <button onClick={() => { if (chat.trim()) { setMessages((prev) => [...prev, { user: 'You', text: chat }]); setChat(''); } }} className="rounded-full bg-[#00a884] p-3 text-[#081114]"><SendHorizonal size={18} /></button>
        </div>
      </div>
    </div>
  );
}
