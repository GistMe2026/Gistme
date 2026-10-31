'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, BellDot, Image as ImageIcon, Send, Users } from 'lucide-react';
import { useStore } from '@/store/useStore';

const filters = ['General', 'News', 'Events', 'Market', 'Jobs', 'Gist'];

export function StateRoom({ stateId, onBack }: { stateId: string; onBack: () => void }) {
  const states = useStore((state) => state.states);
  const stateMessages = useStore((state) => state.stateMessages);
  const addStateMessage = useStore((state) => state.addStateMessage);
  const [filter, setFilter] = useState('General');
  const [draft, setDraft] = useState('');

  const selected = states.find((item) => item.id === stateId) ?? states[0];
  const messages = useMemo(() => stateMessages[stateId] ?? [], [stateId, stateMessages]);

  const sendMessage = () => {
    if (!draft.trim()) return;
    addStateMessage(stateId, {
      id: `forum-${Date.now()}`,
      user: 'You',
      avatar: `https://ui-avatars.com/api/?name=You`,
      type: 'text',
      text: draft,
      time: 'now',
    });
    setDraft('');
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#111b21] text-white">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#202c33] px-4 py-3">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="rounded-full bg-white/5 p-2"><ArrowLeft size={18} /></button>
          <div>
            <h3 className="font-semibold">{selected.name} Forum</h3>
            <p className="text-[11px] text-[#aebac1]">{selected.members.toLocaleString()} members</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full bg-white/5 p-2"><BellDot size={16} /></button>
          <button className="rounded-full bg-white/5 p-2"><Users size={16} /></button>
        </div>
      </header>

      <div className="border-b border-white/10 bg-[#fef3c7] px-4 py-3 text-sm text-[#3c2d09]">
        <span className="font-semibold">Pinned:</span> Town hall meeting this Saturday in {selected.capital}. Bring your ideas.
      </div>

      <div className="flex items-center justify-between border-b border-white/10 bg-[#111b21] px-4 py-3">
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <img key={idx} src={`https://ui-avatars.com/api/?name=User+${idx}`} alt="member" className="h-8 w-8 rounded-full border-2 border-[#111b21] -ml-2 first:ml-0" />
          ))}
        </div>
        <button className="rounded-full bg-[#00a884] px-3 py-1.5 text-xs font-semibold text-[#081114]">Invite</button>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-white/10 bg-[#111b21] px-3 py-2">
        {filters.map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-3 py-1.5 text-xs ${filter === item ? 'bg-[#00a884] text-[#081114]' : 'bg-[#202c33] text-[#dfe8eb]'}`}>
            {item}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-[#efeae2] p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.user === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[78%] rounded-2xl p-3 ${message.user === 'You' ? 'bg-[#d9fdd3] text-[#0b141a]' : 'bg-white text-[#0b141a]'}`}>
              <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#6b7a83]">
                <img src={message.avatar} alt={message.user} className="h-6 w-6 rounded-full" />
                <span>{message.user}</span>
              </div>
              {message.type === 'text' && <p className="text-sm leading-6">{message.text}</p>}
              {message.type === 'poll' && (
                <div className="space-y-2">
                  <p className="font-medium">{message.poll?.question}</p>
                  {message.poll?.options.map((option) => (
                    <div key={option.label} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-[#0b141a]">
                        <span>{option.label}</span>
                        <span>{option.votes}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#dfe8eb]">
                        <div className="h-full rounded-full bg-[#00a884]" style={{ width: `${option.votes}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-2 text-[10px] opacity-70">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-black/10 bg-[#f0f2f5] p-3">
        <div className="flex items-center gap-2">
          <button className="rounded-full bg-[#dfe8eb] p-2 text-[#008069]"><ImageIcon size={18} /></button>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Share with the state forum" className="flex-1 rounded-full border border-[#dfe8eb] bg-white px-4 py-3 text-sm text-[#0b141a] outline-none placeholder:text-[#8696a0]" />
          <button onClick={sendMessage} className="rounded-full bg-[#00a884] p-3 text-[#081114]"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
}
