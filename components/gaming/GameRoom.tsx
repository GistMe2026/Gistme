'use client';

import { useMemo, useState } from 'react';
import { Plus, Search, Trophy } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { GameRoom } from '@/components/gaming/GameRoom';

const gameOptions = [
  { label: 'Tic Tac Toe', icon: '✖️' },
  { label: 'Rock Paper Scissors', icon: '🪨' },
  { label: 'Ludo Dice', icon: '🎲' },
  { label: 'Trivia Battle', icon: '❓' },
  { label: 'Word Scramble', icon: '🔤' },
];

export function GamingLobby() {
  const gameRooms = useStore((state) => state.gameRooms);
  const createGameRoom = useStore((state) => state.createGameRoom);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [name, setName] = useState('Bros Arena');
  const [game, setGame] = useState('Tic Tac Toe');
  const [maxPlayers, setMaxPlayers] = useState(2);

  const leaderboard = useMemo(
    () => [
      { rank: 1, name: 'Aisha', wins: 24, rate: '92%' },
      { rank: 2, name: 'Musa', wins: 21, rate: '88%' },
      { rank: 3, name: 'Tunde', wins: 18, rate: '81%' },
      { rank: 4, name: 'You', wins: 14, rate: '71%' },
    ],
    [],
  );

  if (selectedRoomId) {
    const room = gameRooms.find((item) => item.id === selectedRoomId);
    if (room) return <GameRoom room={room} onBack={() => setSelectedRoomId(null)} />;
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-[#111b21] p-5 text-white">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#aebac1]">Naija Play</p>
          <h2 className="text-2xl font-semibold">Gaming Lobby</h2>
        </div>
        <div className="rounded-full bg-[#00a884] px-3 py-1.5 text-sm font-bold text-[#081114]">Rank #4</div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-[#202c33] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#aebac1]">My wins</p>
          <p className="mt-2 text-3xl font-semibold">14</p>
        </div>
        <div className="rounded-2xl bg-[#202c33] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#aebac1]">Current streak</p>
          <p className="mt-2 text-3xl font-semibold">3</p>
        </div>
        <div className="rounded-2xl bg-[#202c33] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#aebac1]">Trophies</p>
          <p className="mt-2 text-3xl font-semibold">6</p>
        </div>
      </div>

      <div className="mb-6 flex gap-3">
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-full bg-[#00a884] px-4 py-2.5 font-semibold text-[#081114]"><Plus size={16} /> Create Room</button>
        <button className="flex items-center gap-2 rounded-full bg-[#202c33] px-4 py-2.5 font-semibold text-white"><Search size={16} /> Join Random</button>
      </div>

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#aebac1]">Active rooms</h3>
          <span className="text-xs text-[#00a884]">{gameRooms.length}</span>
        </div>
        <div className="space-y-3">
          {gameRooms.map((room) => (
            <div key={room.id} className="flex items-center justify-between gap-3 rounded-2xl bg-[#202c33] p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#111b21] text-xl">{gameOptions.find((option) => option.label === room.game)?.icon ?? '🎮'}</div>
                <div>
                  <h4 className="font-semibold">{room.name}</h4>
                  <p className="text-xs text-[#aebac1]">{room.game} • {room.players.length}/{room.maxPlayers}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${room.status === 'Playing' ? 'bg-[#00a884]/15 text-[#5ef5c7]' : 'bg-[#f5c542]/15 text-[#f7d870]'}`}>
                  {room.status}
                </span>
                <button onClick={() => setSelectedRoomId(room.id)} className="rounded-full bg-[#00a884] px-3 py-1.5 text-xs font-bold text-[#081114]">Join</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#aebac1]">Leaderboard</h3>
          <Trophy size={14} className="text-[#f5c542]" />
        </div>
        <div className="overflow-hidden rounded-2xl bg-[#202c33]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111b21] text-[#aebac1]">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Wins</th>
                <th className="px-4 py-3">Win rate</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="border-t border-white/5">
                  <td className="px-4 py-3">#{entry.rank}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={`https://ui-avatars.com/api/?name=${entry.name}`} alt={entry.name} className="h-8 w-8 rounded-full" />
                      {entry.name}
                    </div>
                  </td>
                  <td className="px-4 py-3">{entry.wins}</td>
                  <td className="px-4 py-3">{entry.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#202c33] p-5 text-white shadow-soft">
            <h3 className="mb-4 text-xl font-semibold">Create game room</h3>
            <div className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Room name" className="w-full rounded-xl border border-white/10 bg-[#111b21] p-3 text-white outline-none" />
              <select value={game} onChange={(e) => setGame(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#111b21] p-3 text-white outline-none">
                {gameOptions.map((option) => (
                  <option key={option.label} value={option.label}>{option.label}</option>
                ))}
              </select>
              <select value={maxPlayers} onChange={(e) => setMaxPlayers(Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-[#111b21] p-3 text-white outline-none">
                {[2, 3, 4].map((count) => (
                  <option key={count} value={count}>{count} players</option>
                ))}
              </select>
              <div className="space-y-2">
                <p className="text-sm text-[#aebac1]">Invite friends</p>
                <div className="flex flex-wrap gap-2">
                  {['Ada', 'Musa', 'Tunde', 'Nneka', 'Kola'].map((friend) => (
                    <button key={friend} className="rounded-full bg-[#111b21] px-3 py-1.5 text-sm text-[#dfe8eb]">{friend}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowCreate(false)} className="flex-1 rounded-full bg-white/5 px-4 py-3 text-white">Cancel</button>
                <button onClick={() => {
                  createGameRoom({
                    id: `room-${Date.now()}`,
                    name,
                    game,
                    maxPlayers,
                    status: 'Waiting',
                    players: [{ id: 'you', name: 'You', avatar: 'https://ui-avatars.com/api/?name=You' }, { id: 'friend', name: 'Ada', avatar: 'https://ui-avatars.com/api/?name=Ada' }],
                  });
                  setShowCreate(false);
                }} className="flex-1 rounded-full bg-[#00a884] px-4 py-3 font-semibold text-[#081114]">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
