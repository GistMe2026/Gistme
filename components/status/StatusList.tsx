'use client';

import { useState } from 'react';
import { Search, Video, Phone, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { Composer } from '@/components/chat/Composer';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { useStore } from '@/store/useStore';
import { VoiceRecorder } from '@/components/chat/VoiceRecorder';
import { VideoRecorder } from '@/components/chat/VideoRecorder';

export function ChatWindow({ chat }: { chat?: { id: string; name: string; avatar: string; online: boolean; group?: boolean } }) {
  const messages = useStore((state) => state.messagesByChat[chat?.id ?? 'chat-1'] ?? []);
  const addChatMessage = useStore((state) => state.addChatMessage);
  const [isTyping, setIsTyping] = useState(true);

  const handleSend = (text: string) => {
    if (!chat) return;
    addChatMessage(chat.id, {
      id: `msg-${Date.now()}`,
      senderId: 'you',
      senderName: 'You',
      type: 'text',
      content: text,
      time: 'Now',
      status: 'sent',
    });
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1200);
  };

  const sendMedia = (
    type: 'image' | 'document' | 'video' | 'audio' | 'voice',
    content: string,
    fileName?: string,
    size?: string,
    duration?: string,
  ) => {
    if (!chat) return;
    addChatMessage(chat.id, {
      id: `msg-${Date.now()}`,
      senderId: 'you',
      senderName: 'You',
      type,
      content,
      time: 'Now',
      status: 'sent',
      fileName,
      size,
      duration,
    });
  };

  const handleVoiceSend = (url: string, duration: string) => {
    sendMedia('voice', url, 'voice-note.webm', '0.5 MB', duration);
  };

  const handleVideoSend = (url: string, duration: string) => {
    sendMedia('video', url, 'video-message.mp4', '2.2 MB', duration);
  };

  const handleFileSend = (file: File) => {
    sendMedia('document', URL.createObjectURL(file), file.name, `${(file.size / 1024 / 1024).toFixed(1)} MB`);
  };

  const handleImageSend = (file: File) => {
    sendMedia('image', URL.createObjectURL(file), file.name, `${(file.size / 1024 / 1024).toFixed(1)} MB`);
  };

  const handleVideoFileSend = (file: File) => {
    sendMedia('video', URL.createObjectURL(file), file.name, `${(file.size / 1024 / 1024).toFixed(1)} MB`);
  };

  return (
    <section className="flex h-full w-full flex-col bg-[#efeae2]">
      <header className="flex items-center justify-between border-b border-black/10 bg-[#202c33] px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <img src={chat?.avatar ?? 'https://ui-avatars.com/api/?name=You'} alt={chat?.name ?? 'Chat'} className="h-11 w-11 rounded-full object-cover" />
          <div>
            <h2 className="text-base font-semibold">{chat?.name ?? 'Your chat'}</h2>
            <p className="text-[11px] text-[#aebac1]">{chat?.online ? 'online' : 'last seen recently'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#dfe8eb]">
          <button className="rounded-full bg-white/5 p-2"><Video size={18} /></button>
          <button className="rounded-full bg-white/5 p-2"><Phone size={18} /></button>
          <button className="rounded-full bg-white/5 p-2"><Search size={18} /></button>
          <button className="rounded-full bg-white/5 p-2"><MoreVertical size={18} /></button>
        </div>
      </header>

      <div className="whatsapp-pattern relative flex-1 overflow-y-auto px-5 py-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            type={message.type}
            content={message.content}
            time={message.time}
            status={message.status}
            fileName={message.fileName}
            size={message.size}
            duration={message.duration}
            isOwn={message.senderId === 'you'}
          />
        ))}

        {isTyping && (
          <div className="my-3 flex justify-start">
            <div className="rounded-2xl bg-white px-3 py-2 shadow-sm">
              <div className="flex items-center gap-1.5">
                {['0', '1', '2'].map((dot) => (
                  <span
                    key={dot}
                    className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#8696a0]"
                    style={{ animationDelay: `${Number(dot) * 120}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative border-t border-black/10 bg-[#f0f2f5] p-3">
        <div className="flex items-center gap-2">
          <Composer
            onSend={handleSend}
            onVoiceStart={() => {}}
            onSendFile={handleFileSend}
            onSendImage={handleImageSend}
            onSendVideo={handleVideoFileSend}
            onRecordVideo={() => {}}
          />
          <VoiceRecorder onSend={handleVoiceSend} />
          <VideoRecorder onSend={handleVideoSend} />
        </div>
      </div>
    </section>
  );
}
