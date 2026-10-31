'use client';

import { ArrowDownLeft, ArrowUpRight, PhoneMissed, Video } from 'lucide-react';

const calls = [
  { name: 'Aisha Bello', time: 'Today, 09:42', type: 'incoming', medium: 'voice' },
  { name: 'Musa Ibrahim', time: 'Yesterday, 18:05', type: 'outgoing', medium: 'video' },
  { name: 'Mira Danjuma', time: 'Yesterday, 14:30', type: 'missed', medium: 'voice' },
  { name: 'Kaduna Crew', time: 'Mon, 20:12', type: 'incoming', medium: 'video' },
  { name: 'Bisi Salami', time: 'Sun, 11:56', type: 'outgoing', medium: 'voice' },
];

export function CallLog() {
  return (
    <div className="h-full w-full overflow-y-auto bg-[#111b21] p-5 text-white">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#aebac1]">Recent</p>
          <h2 className="text-2xl font-semibold">Calls</h2>
        </div>
        <button className="rounded-full bg-[#00a884] px-3 py-2 text-sm font-semibold text-[#081114]">New call</button>
      </div>

      <div className="space-y-3">
        {calls.map((call) => {
          const color = call.type === 'incoming' ? '#00a884' : call.type === 'outgoing' ? '#36a0ff' : '#f15c6d';
          const Icon = call.type === 'incoming' ? ArrowDownLeft : call.type === 'outgoing' ? ArrowUpRight : PhoneMissed;
          return (
            <div key={call.name + call.time} className="flex items-center justify-between rounded-2xl bg-[#202c33] p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2" style={{ backgroundColor: `${color}22`, color }}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="font-medium">{call.name}</p>
                  <p className="text-xs text-[#aebac1]">{call.time}</p>
                </div>
              </div>
              <div className="text-[#dfe8eb]">{call.medium === 'video' ? <Video size={18} /> : <PhoneMissed size={18} />}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
