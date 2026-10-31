'use client';

import { Bell, ChevronDown, Gamepad2, MessageSquareText, PhoneCall, Search, Sparkles, UserRound } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ChatList } from '@/components/layout/ChatList';

const tabs = [
  { id: 'chats', label: 'Chats', icon: MessageSquareText },
  { id: 'status', label: 'Status', icon: Sparkles },
  { id: 'state', label: 'State Forum', icon: UserRound },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'calls', label: 'Calls', icon: PhoneCall },
] as const;

export function Sidebar({
  activeTab,
  setActiveTab,
  selectedChatId,
  setSelectedChatId,
}: {
  activeTab: 'chats' | 'status' | 'state' | 'gaming' | 'calls';
  setActiveTab: (tab: 'chats' | 'status' | 'state' | 'gaming' | 'calls') => void;
  selectedChatId: string;
  setSelectedChatId: (chatId: string) => void;
}) {
  const currentUser = useStore((state) => state.currentUser);
  const chats = useStore((state) => state.chats);

  return (
    <aside className="flex w-full max-w-[420px] flex-col border-r border-white/10 bg-[#111b21]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#202c33] p-4">
        <div className="flex items-center gap-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-white">{currentUser.name}</p>
            <p className="text-[10px] text-whatsapp-muted">{currentUser.state}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[#dfe8eb]">
          <Bell size={18} className="opacity-80" />
          <ChevronDown size={18} className="opacity-80" />
        </div>
      </div>

      <div className="border-b border-white/10 bg-[#111b21] p-3">
        <div className="flex items-center gap-2 rounded-full bg-[#202c33] px-3 py-2 text-[#aebac1]">
          <Search size={16} />
          <input
            placeholder="Search or start new chat"
            className="w-full border-0 bg-transparent text-sm text-white placeholder:text-[#8696a0] outline-none"
          />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 text-[11px]">
          {['All', 'Unread', 'Groups'].map((chip) => (
            <button
              key={chip}
              className={`rounded-full px-3 py-1.5 ${chip === 'All' ? 'bg-[#00a884] text-[#081114]' : 'bg-[#202c33] text-white/80'}`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/10 bg-[#111b21] p-3 text-sm">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as 'chats' | 'status' | 'state' | 'gaming' | 'calls')}
            className={`flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium ${
              activeTab === id ? 'bg-[#00a884] text-[#081114]' : 'bg-[#202c33] text-[#dfe8eb]'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <ChatList chats={chats} selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} />
      </div>
    </aside>
  );
}
