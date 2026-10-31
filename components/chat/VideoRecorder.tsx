'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, X } from 'lucide-react';

export function VoiceRecorder({
  onSend,
}: {
  onSend: (url: string, duration: string) => void;
}) {
  const [active, setActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [dragX, setDragX] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setActive(false);
  };

  useEffect(() => {
    if (!active) return;
    timerRef.current = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [active]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const formatted = `00:${String(seconds).padStart(2, '0')}`;
        onSend(url, formatted);
        streamRef.current?.getTracks().forEach((track) => track.stop());
        setSeconds(0);
        setDragX(0);
      };

      recorder.start();
      setActive(true);
      setSeconds(0);
    } catch (error) {
      console.error('Voice recorder error', error);
    }
  };

  const formatTime = (value: number) => `00:${String(value).padStart(2, '0')}`;

  return (
    <div className="flex items-center gap-2">
      {active && (
        <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-center bg-[#111b21]/80 p-4 backdrop-blur-sm">
          <div className="relative w-[320px] rounded-3xl bg-[#1e2a30] p-4 text-white shadow-soft">
            <div className="mb-2 flex items-center justify-between text-sm text-[#dfe8eb]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 animate-pulse rounded-full bg-[#f15c6d]" />
                Recording
              </div>
              <span>{formatTime(seconds)}</span>
            </div>

            <div className="mb-3 flex h-12 items-end justify-center gap-1">
              {[22, 24, 32, 18, 44, 28, 36, 16, 24, 46, 27, 38].map((height, index) => (
                <span
                  key={index}
                  className="w-1.5 rounded-full bg-[#00a884]"
                  style={{ height: `${height}px`, animationDelay: `${index * 90}ms`, animation: 'waveFloat 1s ease-in-out infinite' }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-[#dfe8eb]">
              <span>Slide to cancel</span>
              <button
                onClick={stopRecording}
                className="rounded-full bg-[#00a884] px-3 py-1.5 font-medium text-white"
              >
                Send
              </button>
            </div>

            <div
              className="absolute left-2 top-1/2 h-12 -translate-y-1/2 rounded-full bg-white/10 px-3"
              style={{ transform: `translate(${dragX}px, -50%)` }}
              onPointerMove={(event) => {
                const delta = event.clientX - (event.currentTarget as HTMLElement).getBoundingClientRect().left;
                if (delta < 0) setDragX(delta);
              }}
            >
              <div className="flex h-full items-center gap-2 text-xs text-[#f3f7f8]">
                <X size={14} />
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onPointerDown={startRecording}
        onPointerUp={stopRecording}
        onPointerLeave={stopRecording}
        className={`rounded-full p-3 ${active ? 'bg-[#f15c6d] text-white' : 'bg-[#dfe8eb] text-[#008069]'}`}
      >
        <Mic size={18} />
      </button>
    </div>
  );
}
