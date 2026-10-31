'use client';

import { MessageCircleMore, Pin, Volume2 } from 'lucide-react';

export function ChatList({
  chats,
  selectedChatId,
  setSelectedChatId,
}: {
  chats: Array<{
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    pinned: boolean;
    muted: boolean;
    online: boolean;
    group: boolean;
  }>;
  selectedChatId: string;
  setSelectedChatId: (id: string) => void;
}) {
  return (
    <div className="space-y-1 p-1">
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => setSelectedChatId(chat.id)}
          className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
            selectedChatId === chat.id ? 'bg-[#202c33]' : 'hover:bg-white/5'
          }`}
        >
          <div className="relative">
            <img src={chat.avatar} alt={chat.name} className="h-12 w-12 rounded-full object-cover" />
            {chat.online && (
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#111b21] bg-[#00a884]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="truncate font-semibold text-white">{chat.name}</span>
                {chat.pinned && <Pin size={12} className="text-[#8696a0]" />}
                {chat.group && <MessageCircleMore size={12} className="text-[#8696a0]" />}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#8696a0]">
                {chat.muted && <Volume2 size={12} className="opacity-70" />}
                <span>{chat.time}</span>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="truncate text-sm text-[#d5dfe6]">{chat.lastMessage}</p>
              {chat.unread > 0 && (
                <span className="inline-flex min-w-[20px] items-center justify-center rounded-full bg-[#00a884] px-1.5 py-0.5 text-[10px] font-bold text-[#081114]">
                  {chat.unread}
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
