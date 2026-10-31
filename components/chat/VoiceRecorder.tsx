'use client';

import { useRef, useState } from 'react';
import { Camera, Mic, Paperclip, SendHorizonal, SmilePlus } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { AttachmentMenu } from '@/components/chat/AttachmentMenu';

export function Composer({
  onSend,
  onVoiceStart,
  onSendFile,
  onSendImage,
  onSendVideo,
  onRecordVideo,
}: {
  onSend: (value: string) => void;
  onVoiceStart: () => void;
  onSendFile: (file: File) => void;
  onSendImage: (file: File) => void;
  onSendVideo: (file: File) => void;
  onRecordVideo: () => void;
}) {
  const [value, setValue] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const adjustHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${Math.min(element.scrollHeight, 140)}px`;
  };

  const submit = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
  };

  const handleAttachment = (type: string) => {
    const normalized = type.toLowerCase();
    if (normalized === 'document') fileInputRef.current?.click();
    if (normalized === 'gallery') imageInputRef.current?.click();
    if (normalized === 'camera') onRecordVideo();
    if (normalized === 'audio') onVoiceStart();
    if (normalized === 'poll') {
      onSend('📊 Poll created');
    }
  };

  return (
    <div className="relative w-full">
      {showEmoji && (
        <div className="absolute bottom-20 right-4 z-20 overflow-hidden rounded-2xl shadow-soft">
          <EmojiPicker onEmojiClick={(emoji) => setValue((prev) => `${prev}${emoji.emoji}`)} theme="light" />
        </div>
      )}

      <AttachmentMenu open={showAttachment} onClose={() => setShowAttachment(false)} onSelect={handleAttachment} />

      <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && onSendFile(e.target.files[0])} />
      <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onSendImage(e.target.files[0])} />

      <div className="flex items-end gap-2">
        <button onClick={() => setShowEmoji((prev) => !prev)} className="rounded-full bg-[#dfe8eb] p-2 text-[#008069]">
          <SmilePlus size={20} />
        </button>

        <button onClick={() => setShowAttachment(true)} className="rounded-full bg-[#dfe8eb] p-2 text-[#008069]">
          <Paperclip size={20} />
        </button>

        <button onClick={onRecordVideo} className="rounded-full bg-[#dfe8eb] p-2 text-[#008069]">
          <Camera size={20} />
        </button>

        <button onClick={onVoiceStart} className="rounded-full bg-[#dfe8eb] p-2 text-[#008069]">
          <Mic size={20} />
        </button>

        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight(e.target);
          }}
          rows={1}
          placeholder="Type a message"
          className="max-h-[140px] min-h-[44px] flex-1 resize-none rounded-full border border-[#dfe8eb] bg-white px-4 py-3 text-sm text-[#0b141a] outline-none placeholder:text-[#8696a0]"
        />

        <button
          onClick={submit}
          className="rounded-full bg-[#00a884] p-3 text-white shadow-sm transition hover:scale-[1.02]"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
}
