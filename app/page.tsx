'use client';

import { useMemo, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { MainPanel } from '@/components/layout/MainPanel';
import { useStore } from '@/store/useStore';

export default function Home() {
  const chats = useStore((state) => state.chats);
  const [activeTab, setActiveTab] = useState<'chats' | 'status' | 'state' | 'gaming' | 'calls'>('chats');
  const [selectedChatId, setSelectedChatId] = useState<string>(chats[0]?.id ?? 'chat-1');

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.id === selectedChatId) ?? chats[0],
    [selectedChatId, chats],
  );

  return (
    <main className="h-screen bg-[#0b141a] text-white">
      <div className="mx-auto flex h-full max-w-[1700px] overflow-hidden border-x border-white/5 bg-[#0b141a]">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedChat={selectedChat}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        />
        <MainPanel
          activeTab={activeTab}
          chatId={selectedChatId}
          setActiveTab={setActiveTab}
        />
      </div>
    </main>
  );
}
