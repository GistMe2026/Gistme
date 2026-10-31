'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const palette = ['#f59e0b', '#22c55e', '#0ea5e9', '#8b5cf6', '#ec4899', '#ef4444', '#14b8a6', '#f97316'];

export function AddStatus({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'text' | 'media'>('text');
  const [color, setColor] = useState('#f59e0b');
  const [text, setText] = useState('My Naija energy today 💃🏾');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-[#202c33] p-4 text-white shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Add status</h3>
          <button onClick={onClose} className="rounded-full bg-white/5 p-2"><X size={18} /></button>
        </div>

        <div className="mb-4 flex gap-2 rounded-full bg-[#111b21] p-1">
          <button className={`flex-1 rounded-full px-3 py-2 ${tab === 'text' ? 'bg-[#00a884] text-[#081114]' : 'text-[#dfe8eb]'}`} onClick={() => setTab('text')}>Text</button>
          <button className={`flex-1 rounded-full px-3 py-2 ${tab === 'media' ? 'bg-[#00a884] text-[#081114]' : 'text-[#dfe8eb]'}`} onClick={() => setTab('media')}>Photo/Video</button>
        </div>

        {tab === 'text' ? (
          <div className="space-y-4">
            <textarea value={text} onChange={(e) => setText(e.target.value)} className="h-32 w-full rounded-2xl border border-white/10 bg-[#111b21] p-3 text-white outline-none" />
            <div>
              <p className="mb-2 text-sm text-[#aebac1]">Background color</p>
              <div className="flex flex-wrap gap-2">
                {palette.map((swatch) => (
                  <button key={swatch} onClick={() => setColor(swatch)} className="h-8 w-8 rounded-full border-2 border-white" style={{ background: swatch, borderColor: color === swatch ? '#fff' : 'transparent' }} />
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6 text-center text-2xl font-semibold" style={{ background: color }}>{text}</div>
            <button onClick={onClose} className="w-full rounded-full bg-[#00a884] px-4 py-3 font-semibold text-[#081114]">Share status</button>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block rounded-2xl border border-dashed border-white/20 bg-[#111b21] p-8 text-center text-[#dfe8eb]">
              <input type="file" className="hidden" accept="image/*,video/*" />
              Upload photo or video
            </label>
            <button onClick={onClose} className="w-full rounded-full bg-[#00a884] px-4 py-3 font-semibold text-[#081114]">Upload</button>
          </div>
        )}
      </div>
    </div>
  );
}
