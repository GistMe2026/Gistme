'use client';

import { useMemo, useState } from 'react';
import { Search, Users, Wifi } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { StateRoom } from '@/components/forum/StateRoom';

export function StateForum() {
  const states = useStore((state) => state.states);
  const joinForum = useStore((state) => state.joinForum);
  const leaveForum = useStore((state) => state.leaveForum);
  const [search, setSearch] = useState('');
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);

  const filtered = useMemo(
    () => states.filter((state) => state.name.toLowerCase().includes(search.toLowerCase())),
    [search, states],
  );

  const joined = states.filter((state) => state.joined);

  if (selectedStateId) {
    return <StateRoom stateId={selectedStateId} onBack={() => setSelectedStateId(null)} />;
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-[#111b21] p-5 text-white">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Naija State Forums</h2>
      </div>

      <div className="mb-5 flex items-center gap-3 rounded-2xl bg-[#202c33] px-3 py-2 text-[#aebac1]">
        <Search size={18} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search states" className="w-full border-0 bg-transparent text-sm text-white placeholder:text-[#8696a0] outline-none" />
      </div>

      <div className="mb-6">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#aebac1]">My States</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {joined.map((state) => (
            <button key={state.id} onClick={() => setSelectedStateId(state.id)} className="min-w-[140px] rounded-2xl bg-[#202c33] p-3 text-left shadow-sm">
              <p className="text-sm font-semibold">{state.name}</p>
              <p className="mt-1 text-[11px] text-[#aebac1]">{state.capital}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((state) => (
          <div key={state.id} className="overflow-hidden rounded-3xl bg-[#202c33] shadow-soft">
            <div className={`h-28 bg-gradient-to-r ${state.gradient}`} style={{ backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,0,0,0.15)), url(${state.image})`, backgroundSize: 'cover' }} />
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{state.name}</h3>
                  <p className="text-xs text-[#aebac1]">Capital: {state.capital}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#aebac1]">
                  <Wifi size={12} className="text-[#00a884]" /> {state.online}
                </div>
              </div>

              <p className="text-sm text-[#dfe8eb]">{state.slogan}</p>

              <div className="mt-4 flex items-center justify-between text-xs text-[#aebac1]">
                <span className="flex items-center gap-1"><Users size={12} /> {state.members.toLocaleString()} members</span>
                <button
                  onClick={() => {
                    if (state.joined) leaveForum(state.id); else { joinForum(state.id); setSelectedStateId(state.id); }
                  }}
                  className={`rounded-full px-3 py-1.5 font-medium ${state.joined ? 'bg-[#111b21] text-[#dfe8eb]' : 'bg-[#00a884] text-[#081114]'}`}
                >
                  {state.joined ? 'Joined' : 'Join'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
