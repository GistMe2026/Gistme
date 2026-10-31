'use client';

import { useState } from 'react';
import { ImagePlus, Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { StatusViewer } from '@/components/status/StatusViewer';
import { AddStatus } from '@/components/status/AddStatus';

export function StatusList() {
  const statuses = useStore((state) => state.statuses);
  const currentUser = useStore((state) => state.currentUser);
  const [selected, setSelected] = useState<number | null>(0);
  const [showAdd, setShowAdd] = useState(false);

  const recentUpdates = statuses.filter((item) => item.user !== 'You' && !item.viewed);
  const viewedUpdates = statuses.filter((item) => item.user !== 'You' && item.viewed);

  return (
    <div className="h-full w-full overflow-y-auto bg-[#111b21] p-5 text-white">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#aebac1]">Updates</p>
          <h2 className="text-2xl font-semibold">Status</h2>
        </div>
        <button onClick={() => setShowAdd(true)} className="rounded-full bg-[#00a884] p-3 text-white">
          <Plus size={18} />
        </button>
      </div>

      <div className="mb-6 rounded-2xl bg-[#202c33] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={currentUser.avatar} alt="Your status" className="h-12 w-12 rounded-full object-cover" />
              <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#00a884] text-xs font-bold text-[#081114]">+</span>
            </div>
            <div>
              <p className="font-semibold">My Status</p>
              <p className="text-sm text-[#aebac1]">Tap to add an update</p>
            </div>
          </div>
          <button onClick={() => setShowAdd(true)} className="rounded-full border border-white/10 p-2 text-[#dfe8eb]">
            <ImagePlus size={18} />
          </button>
        </div>
      </div>

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#aebac1]">Recent Updates</h3>
          <span className="text-xs text-[#00a884]">{recentUpdates.length}</span>
        </div>
        <div className="space-y-3">
          {recentUpdates.map((status, index) => (
            <button key={status.id} onClick={() => setSelected(index)} className="flex w-full items-center gap-3 rounded-2xl bg-[#202c33] p-3 text-left">
              <div className="rounded-full border-2 border-[#00a884] p-0.5">
                <img src={status.avatar} alt={status.user} className="h-12 w-12 rounded-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{status.user}</p>
                  <span className="text-[10px] text-[#aebac1]">{status.time}</span>
                </div>
                <p className="truncate text-sm text-[#c3ced5]">{status.text ?? 'Photo update'}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#aebac1]">Viewed</h3>
          <span className="text-xs text-[#aebac1]">{viewedUpdates.length}</span>
        </div>
        <div className="space-y-3">
          {viewedUpdates.map((status) => (
            <div key={status.id} className="flex items-center gap-3 rounded-2xl bg-[#202c33] p-3 opacity-80">
              <img src={status.avatar} alt={status.user} className="h-12 w-12 rounded-full object-cover grayscale" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[#dfe8eb]">{status.user}</p>
                  <span className="text-[10px] text-[#aebac1]">{status.time}</span>
                </div>
                <p className="truncate text-sm text-[#b5c2ca]">{status.text ?? 'Viewed update'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selected !== null && recentUpdates[selected] && <StatusViewer items={recentUpdates} index={selected} onClose={() => setSelected(null)} />}
      {showAdd && <AddStatus onClose={() => setShowAdd(false)} />}
    </div>
  );
}
