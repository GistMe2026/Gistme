'use client';

import { Download, Image as ImageIcon, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function MessageBubble({
  type,
  content,
  time,
  status,
  fileName,
  size,
  duration,
  isOwn,
}: {
  type: 'text' | 'image' | 'video' | 'document' | 'audio' | 'voice';
  content: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  fileName?: string;
  size?: string;
  duration?: string;
  isOwn?: boolean;
}) {
  const bubbleBase = isOwn ? 'ml-auto bg-[#d9fdd3] text-[#0b141a]' : 'mr-auto bg-white text-[#0b141a]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`my-3 flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[75%] rounded-2xl px-3 py-2 shadow-sm ${bubbleBase}`}>
        {type === 'text' && <p className="text-[15px] leading-6">{content}</p>}

        {type === 'image' && (
          <div className="overflow-hidden rounded-xl">
            <img src={content} alt="Shared media" className="max-h-72 w-full object-cover" />
          </div>
        )}

        {type === 'document' && (
          <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white/50 p-2">
            <div className="rounded-lg bg-[#00a884] p-2 text-white">
              <ImageIcon size={18} />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-medium">{fileName ?? content}</p>
              <p className="text-[11px] opacity-70">{size ?? 'Unknown size'}</p>
            </div>
            <button className="rounded-lg bg-[#e9f8f5] p-2 text-[#008069]">
              <Download size={15} />
            </button>
          </div>
        )}

        {(type === 'audio' || type === 'voice') && (
          <div className="min-w-[220px] rounded-xl bg-white/20 p-2">
            <div className="flex items-center gap-3">
              <button className="rounded-full bg-[#008069] p-2 text-white">
                {isOwn ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <div className="flex flex-1 items-end gap-[3px]">
                {[20, 34, 42, 28, 50, 36, 44, 21, 30, 46].map((height, index) => (
                  <span
                    key={index}
                    className={`block w-1.5 rounded-full ${isOwn ? 'bg-[#008069]' : 'bg-[#0b141a]'}`}
                    style={{ height: `${height}px`, animationDelay: `${index * 80}ms`, animation: 'waveFloat 1.1s ease-in-out infinite' }}
                  />
                ))}
              </div>
              <div className="text-right text-[11px] font-medium">
                <div>{duration ?? '00:22'}</div>
                <div className="opacity-70">1.0x</div>
              </div>
            </div>
          </div>
        )}

        {type === 'video' && (
          <div className="overflow-hidden rounded-xl">
            <img src={content} alt="Video preview" className="max-h-64 w-full object-cover" />
            <div className="flex items-center justify-between bg-black/10 px-2 py-1 text-[11px]">
              <span>Video</span>
              <span>{duration ?? '00:15'}</span>
            </div>
          </div>
        )}

        <div className="mt-2 flex items-center justify-end gap-1 text-[10px] opacity-70">
          <span>{time}</span>
          {isOwn && (
            <span className="text-base font-bold">
              {status === 'sent' ? '✓' : status === 'delivered' ? '✓✓' : '✓✓'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
