'use client';

import { useStore } from '@/store/useStore';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { StatusList } from '@/components/status/StatusList';
import { StateForum } from '@/components/forum/StateForum';
import { GamingLobby } from '@/components/gaming/GamingLobby';
import { CallLog } from '@/components/calls/CallLog';

export function MainPanel({
  activeTab,
  chatId,
  setActiveTab,
}: {
  activeTab: 'chats' | 'status' | 'state' | 'gaming' | 'calls';
  chatId: string;
  setActiveTab: (tab: 'chats' | 'status' | 'state' | 'gaming' | 'calls') => void;
}) {
  const chats = useStore((state) => state.chats);

  if (activeTab === 'status') {
    return <StatusList />;
  }

  if (activeTab === 'state') {
    return <StateForum />;
  }

  if (activeTab === 'gaming') {
    return <GamingLobby />;
  }

  if (activeTab === 'calls') {
    return <CallLog />;
  }

  const selectedChat = chats.find((chat) => chat.id === chatId) ?? chats[0];

  return <ChatWindow chat={selectedChat} />;
}
