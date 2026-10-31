'use client';

import { useEffect, useState } from 'react';
import { Clock3, Eye, X } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatusViewer({
  items,
  index,
  onClose,
}: {
  items: Array<{ user: string; avatar: string; text?: string; color?: string; image?: string; type: 'text' | 'image' | 'video'; time: string }>;
  index: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(index);
  const current = items[currentIndex] ?? items[0];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (currentIndex < items.length - 1) setCurrentIndex((prev) => prev + 1);
      else onClose();
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [currentIndex, items, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-[#02070a]">
      <div className="absolute inset-x-4 top-4 flex gap-2">
        {items.map((item, idx) => (
          <div key={`${item.user}-${idx}`} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-[#00a884] transition-all duration-500"
              style={{ width: idx === currentIndex ? '100%' : idx < currentIndex ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 top-8 flex items-center justify-between px-4 text-white">
        <div className="flex items-center gap-3">
          <img src={current.avatar} alt={current.user} className="h-10 w-10 rounded-full" />
          <div>
            <p className="font-semibold">{current.user}</p>
            <p className="text-[10px] text-white/70">{current.time}</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-full bg-white/10 p-2"><X size={18} /></button>
      </div>

      <motion.div
        key={current.user + currentIndex}
        initial={{ opacity: 0.2, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full items-center justify-center px-6 pt-20"
      >
        {current.image ? (
          <img src={current.image} alt={current.user} className="max-h-[72vh] max-w-[90vw] rounded-2xl object-cover shadow-soft" />
        ) : (
          <div className="grid place-items-center rounded-3xl px-8 py-12 text-center shadow-soft" style={{ background: current.color ?? '#00a884', minHeight: '220px', minWidth: '300px' }}>
            <p className="text-3xl font-semibold text-white">{current.text}</p>
          </div>
        )}
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-black/30 px-4 py-3 text-white backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm"><Eye size={16}/> 32 views</div>
        <div className="flex items-center gap-2 text-sm"><Clock3 size={16}/> {current.time}</div>
      </div>
    </div>
  );
}
