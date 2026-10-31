'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Circle, Square, X } from 'lucide-react';

export function VideoRecorder({
  onSend,
}: {
  onSend: (blobUrl: string, duration: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const formatTime = (value: number) => `00:${String(value).padStart(2, '0')}`;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setOpen(true);
      setSeconds(0);
    } catch (error) {
      console.error('Camera access error', error);
    }
  };

  useEffect(() => {
    if (!open || !isRecording) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [open, isRecording]);

  const startRecording = async () => {
    if (!streamRef.current) return;
    const recorder = new MediaRecorder(streamRef.current);
    recorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      onSend(url, formatTime(seconds));
      streamRef.current?.getTracks().forEach((track) => track.stop());
      setOpen(false);
      setIsRecording(false);
      setSeconds(0);
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <>
      <button onClick={startCamera} className="rounded-full bg-[#dfe8eb] p-2 text-[#008069]">
        <Camera size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-[#111b21] p-4 text-white shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-lg font-semibold">Video message</span>
              <button onClick={() => setOpen(false)} className="rounded-full bg-white/5 p-2">
                <X size={18} />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#000]">
              <video ref={videoRef} autoPlay muted className="h-[420px] w-full object-cover" />
              <div className="absolute left-4 top-4 rounded-full bg-black/40 px-2 py-1 text-xs font-medium">
                {formatTime(seconds)}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold ${
                  isRecording ? 'bg-[#f15c6d] text-white' : 'bg-[#00a884] text-[#081114]'
                }`}
              >
                {isRecording ? <Square size={16} /> : <Circle size={16} className="fill-current" />}
                {isRecording ? 'Stop' : 'Record'}
              </button>
              <button onClick={() => setOpen(false)} className="rounded-full border border-white/20 px-4 py-2 text-sm text-[#dfe8eb]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
