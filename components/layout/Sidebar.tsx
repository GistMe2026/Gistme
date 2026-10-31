import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MessageStatus = 'sent' | 'delivered' | 'read';
export type ChatMessageType = 'text' | 'image' | 'video' | 'document' | 'audio' | 'voice';

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  type: ChatMessageType;
  content: string;
  time: string;
  status: MessageStatus;
  fileName?: string;
  size?: string;
  duration?: string;
  url?: string;
};

export type Chat = {
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
};

export type StatusItem = {
  id: string;
  user: string;
  avatar: string;
  text?: string;
  color?: string;
  image?: string;
  type: 'text' | 'image' | 'video';
  time: string;
  viewed: boolean;
};

export type StateForum = {
  id: string;
  name: string;
  capital: string;
  slogan: string;
  members: number;
  online: number;
  gradient: string;
  image: string;
  joined: boolean;
};

export type PollOption = {
  label: string;
  votes: number;
};

export type ForumMessage = {
  id: string;
  user: string;
  avatar: string;
  type: 'text' | 'image' | 'poll';
  text?: string;
  time: string;
  poll?: {
    question: string;
    options: PollOption[];
  };
};

export type GameRoom = {
  id: string;
  name: string;
  game: string;
  maxPlayers: number;
  players: { id: string; name: string; avatar: string }[];
  status: 'Waiting' | 'Playing';
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  state: string;
};

export type UseStoreState = {
  currentUser: User;
  chats: Chat[];
  messagesByChat: Record<string, ChatMessage[]>;
  statuses: StatusItem[];
  states: StateForum[];
  stateMessages: Record<string, ForumMessage[]>;
  gameRooms: GameRoom[];
  setCurrentUser: (user: User) => void;
  addChatMessage: (chatId: string, message: ChatMessage) => void;
  addStatus: (status: StatusItem) => void;
  addStateMessage: (stateId: string, message: ForumMessage) => void;
  joinForum: (id: string) => void;
  leaveForum: (id: string) => void;
  createGameRoom: (room: GameRoom) => void;
};

const avatarBase = 'https://ui-avatars.com/api/?name=';

const seededChats: Chat[] = [
  { id: 'chat-1', name: 'Aisha Bello', avatar: `${avatarBase}Aisha+Bello`, lastMessage: 'The food for the party is ready.', time: '09:42', unread: 2, pinned: true, muted: false, online: true, group: false },
  { id: 'chat-2', name: 'Musa Ibrahim', avatar: `${avatarBase}Musa+Ibrahim`, lastMessage: 'I am on my way to Minna.', time: '08:15', unread: 0, pinned: false, muted: false, online: false, group: false },
  { id: 'chat-3', name: 'Mira Danjuma', avatar: `${avatarBase}Mira+Danjuma`, lastMessage: 'Please send the contract copy.', time: 'Yesterday', unread: 1, pinned: false, muted: true, online: true, group: false },
  { id: 'chat-4', name: 'Kaduna Crew', avatar: `${avatarBase}Kaduna+Crew`, lastMessage: 'Next meetup is Friday night.', time: 'Mon', unread: 5, pinned: false, muted: false, online: true, group: true },
  { id: 'chat-5', name: 'Tunde Akin', avatar: `${avatarBase}Tunde+Akin`, lastMessage: 'That price is fair.', time: 'Sun', unread: 0, pinned: false, muted: false, online: true, group: false },
  { id: 'chat-6', name: 'Abdullahi Sani', avatar: `${avatarBase}Abdullahi+Sani`, lastMessage: 'Let us review the budget.', time: 'Sat', unread: 1, pinned: false, muted: true, online: false, group: false },
  { id: 'chat-7', name: 'Nneka Okafor', avatar: `${avatarBase}Nneka+Okafor`, lastMessage: 'I saw the new apartment.', time: 'Fri', unread: 0, pinned: false, muted: false, online: true, group: false },
  { id: 'chat-8', name: 'Lagos Business', avatar: `${avatarBase}Lagos+Business`, lastMessage: 'Invoice sent successfully', time: 'Thu', unread: 0, pinned: true, muted: false, online: true, group: true },
  { id: 'chat-9', name: 'Bisi Salami', avatar: `${avatarBase}Bisi+Salami`, lastMessage: 'Let me know when you reach.', time: 'Wed', unread: 2, pinned: false, muted: false, online: false, group: false },
  { id: 'chat-10', name: 'Kola Adeyemi', avatar: `${avatarBase}Kola+Adeyemi`, lastMessage: 'The market closed early today.', time: 'Tue', unread: 0, pinned: false, muted: false, online: true, group: false },
  { id: 'chat-11', name: 'Rivers Update', avatar: `${avatarBase}Rivers+Update`, lastMessage: 'Festival volunteers are full.', time: 'Mon', unread: 3, pinned: false, muted: false, online: true, group: true },
  { id: 'chat-12', name: 'Efe Okon', avatar: `${avatarBase}Efe+Okon`, lastMessage: 'I can help with the design.', time: '11:20', unread: 0, pinned: false, muted: true, online: true, group: false },
  { id: 'chat-13', name: 'Zainab Sule', avatar: `${avatarBase}Zainab+Sule`, lastMessage: 'The wedding photos are out.', time: 'Yesterday', unread: 0, pinned: false, muted: false, online: false, group: false },
  { id: 'chat-14', name: 'Maiduguri Youth', avatar: `${avatarBase}Maiduguri+Youth`, lastMessage: 'Training starts tomorrow.', time: 'Sun', unread: 4, pinned: false, muted: false, online: true, group: true },
  { id: 'chat-15', name: 'Ifeanyi Eze', avatar: `${avatarBase}Ifeanyi+Eze`, lastMessage: 'Bro, I need the route map.', time: 'Sat', unread: 0, pinned: false, muted: false, online: false, group: false },
  { id: 'chat-16', name: 'Grace Yaro', avatar: `${avatarBase}Grace+Yaro`, lastMessage: 'Let us submit before noon.', time: 'Fri', unread: 1, pinned: false, muted: false, online: true, group: false },
  { id: 'chat-17', name: 'Oluwaseun Ajayi', avatar: `${avatarBase}Oluwaseun+Ajayi`, lastMessage: 'The final pitch deck is ready.', time: 'Thu', unread: 0, pinned: false, muted: false, online: true, group: false },
  { id: 'chat-18', name: 'Kano Market', avatar: `${avatarBase}Kano+Market`, lastMessage: 'Tomato prices are falling.', time: 'Mon', unread: 2, pinned: false, muted: false, online: true, group: true },
  { id: 'chat-19', name: 'Chiamaka Obi', avatar: `${avatarBase}Chiamaka+Obi`, lastMessage: 'I sent the voice note already.', time: 'Tue', unread: 0, pinned: true, muted: true, online: false, group: false },
  { id: 'chat-20', name: 'Ayo Osagie', avatar: `${avatarBase}Ayo+Osagie`, lastMessage: 'Do you still need the driver?', time: 'Mon', unread: 0, pinned: false, muted: false, online: false, group: false },
];

const defaultMessages: Record<string, ChatMessage[]> = {
  'chat-1': [
    { id: 'm1', senderId: 'you', senderName: 'You', type: 'text', content: 'Good evening, I am already packing the suya boxes.', time: '09:33', status: 'read' },
    { id: 'm2', senderId: 'aisha', senderName: 'Aisha Bello', type: 'text', content: 'Excellent. Please add two extra bottles of zobo.', time: '09:37', status: 'sent' },
    { id: 'm3', senderId: 'you', senderName: 'You', type: 'text', content: 'Done. I will be there by 10:00.', time: '09:42', status: 'read' },
  ],
  'chat-2': [
    { id: 'm4', senderId: 'musa', senderName: 'Musa Ibrahim', type: 'text', content: 'I am on my way to Minna.', time: '08:15', status: 'sent' },
  ],
  'chat-3': [
    { id: 'm5', senderId: 'you', senderName: 'You', type: 'text', content: 'Please share the final budget version.', time: 'Yesterday', status: 'read' },
    { id: 'm6', senderId: 'mira', senderName: 'Mira Danjuma', type: 'document', content: 'budget-final-v2.pdf', fileName: 'budget-final-v2.pdf', size: '2.4 MB', time: 'Yesterday', status: 'delivered' },
  ],
  'chat-4': [
    { id: 'm7', senderId: 'kaduna', senderName: 'Kaduna Crew', type: 'text', content: 'Next meetup is Friday night.', time: 'Mon', status: 'read' },
  ],
  'chat-5': [
    { id: 'm8', senderId: 'tunde', senderName: 'Tunde Akin', type: 'text', content: 'That price is fair.', time: 'Sun', status: 'sent' },
  ],
  'chat-6': [
    { id: 'm9', senderId: 'abdullahi', senderName: 'Abdullahi Sani', type: 'text', content: 'Let us review the budget.', time: 'Sat', status: 'sent' },
  ],
  'chat-7': [
    { id: 'm10', senderId: 'nneka', senderName: 'Nneka Okafor', type: 'text', content: 'I saw the new apartment.', time: 'Fri', status: 'sent' },
  ],
  'chat-8': [
    { id: 'm11', senderId: 'lagos', senderName: 'Lagos Business', type: 'text', content: 'Invoice sent successfully', time: 'Thu', status: 'read' },
  ],
  'chat-9': [
    { id: 'm12', senderId: 'bisi', senderName: 'Bisi Salami', type: 'text', content: 'Let me know when you reach.', time: 'Wed', status: 'sent' },
  ],
  'chat-10': [
    { id: 'm13', senderId: 'kola', senderName: 'Kola Adeyemi', type: 'text', content: 'The market closed early today.', time: 'Tue', status: 'sent' },
  ],
  'chat-11': [
    { id: 'm14', senderId: 'rivers', senderName: 'Rivers Update', type: 'text', content: 'Festival volunteers are full.', time: 'Mon', status: 'read' },
  ],
  'chat-12': [
    { id: 'm15', senderId: 'efe', senderName: 'Efe Okon', type: 'text', content: 'I can help with the design.', time: '11:20', status: 'sent' },
  ],
  'chat-13': [
    { id: 'm16', senderId: 'zainab', senderName: 'Zainab Sule', type: 'text', content: 'The wedding photos are out.', time: 'Yesterday', status: 'sent' },
  ],
  'chat-14': [
    { id: 'm17', senderId: 'maiduguri', senderName: 'Maiduguri Youth', type: 'text', content: 'Training starts tomorrow.', time: 'Sun', status: 'read' },
  ],
  'chat-15': [
    { id: 'm18', senderId: 'ifeanyi', senderName: 'Ifeanyi Eze', type: 'text', content: 'Bro, I need the route map.', time: 'Sat', status: 'sent' },
  ],
  'chat-16': [
    { id: 'm19', senderId: 'grace', senderName: 'Grace Yaro', type: 'text', content: 'Let us submit before noon.', time: 'Fri', status: 'sent' },
  ],
  'chat-17': [
    { id: 'm20', senderId: 'oluwaseun', senderName: 'Oluwaseun Ajayi', type: 'text', content: 'The final pitch deck is ready.', time: 'Thu', status: 'sent' },
  ],
  'chat-18': [
    { id: 'm21', senderId: 'kano', senderName: 'Kano Market', type: 'text', content: 'Tomato prices are falling.', time: 'Mon', status: 'read' },
  ],
  'chat-19': [
    { id: 'm22', senderId: 'you', senderName: 'You', type: 'voice', content: 'https://example.com/audio.mp3', time: 'Tue', status: 'read', duration: '00:26' },
    { id: 'm23', senderId: 'chiamaka', senderName: 'Chiamaka Obi', type: 'text', content: 'I sent the voice note already.', time: 'Tue', status: 'sent' },
  ],
  'chat-20': [
    { id: 'm24', senderId: 'ayo', senderName: 'Ayo Osagie', type: 'text', content: 'Do you still need the driver?', time: 'Mon', status: 'sent' },
  ],
};

const defaultStatuses: StatusItem[] = [
  { id: 'status-1', user: 'You', avatar: `${avatarBase}You`, type: 'text', text: 'Weekend vibes', color: '#f59e0b', time: 'Just now', viewed: false },
  { id: 'status-2', user: 'Aisha Bello', avatar: `${avatarBase}Aisha+Bello`, type: 'image', image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=900&q=80', time: '2 mins ago', viewed: false },
  { id: 'status-3', user: 'Musa Ibrahim', avatar: `${avatarBase}Musa+Ibrahim`, type: 'text', text: 'On my way to Minna', color: '#2dd4bf', time: '12 mins ago', viewed: true },
  { id: 'status-4', user: 'Nneka Okafor', avatar: `${avatarBase}Nneka+Okafor`, type: 'image', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80', time: '1 hour ago', viewed: true },
  { id: 'status-5', user: 'Tunde Akin', avatar: `${avatarBase}Tunde+Akin`, type: 'video', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80', time: '3 hours ago', viewed: true },
];

const stateEntries: Array<Omit<StateForum, 'joined'>> = [
  { id: 'state-1', name: 'Lagos', capital: 'Ikeja', slogan: 'Center of excellence', members: 12830, online: 832, gradient: 'from-emerald-600 to-teal-700', image: 'https://images.unsplash.com/photo-1587731557332-9d653d9cd5b7?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-2', name: 'Kano', capital: 'Kano', slogan: 'Commercial heartbeat', members: 9324, online: 601, gradient: 'from-amber-500 to-orange-700', image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-3', name: 'Rivers', capital: 'Port Harcourt', slogan: 'Treasure base', members: 7045, online: 510, gradient: 'from-cyan-500 to-sky-700', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-4', name: 'Niger', capital: 'Minna', slogan: 'The power state', members: 6612, online: 424, gradient: 'from-violet-500 to-indigo-700', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-5', name: 'Abia', capital: 'Umuahia', slogan: 'God’s own state', members: 5487, online: 377, gradient: 'from-fuchsia-500 to-pink-700', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-6', name: 'Kaduna', capital: 'Kaduna', slogan: 'Pride of the north', members: 8401, online: 584, gradient: 'from-rose-500 to-red-700', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-7', name: 'Ogun', capital: 'Abeokuta', slogan: 'Gateway state', members: 6823, online: 468, gradient: 'from-lime-500 to-emerald-700', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-8', name: 'Enugu', capital: 'Enugu', slogan: 'Coal city', members: 4765, online: 315, gradient: 'from-green-500 to-lime-700', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-9', name: 'Delta', capital: 'Asaba', slogan: 'Big heart', members: 8112, online: 522, gradient: 'from-sky-500 to-cyan-700', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-10', name: 'Kwara', capital: 'Ilorin', slogan: 'State of harmony', members: 4460, online: 298, gradient: 'from-orange-500 to-amber-700', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-11', name: 'Bauchi', capital: 'Bauchi', slogan: 'Pearl of tourism', members: 5054, online: 361, gradient: 'from-yellow-500 to-amber-700', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-12', name: 'Anambra', capital: 'Awka', slogan: 'Light of the nation', members: 5944, online: 440, gradient: 'from-violet-500 to-purple-700', image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-13', name: 'Adamawa', capital: 'Yola', slogan: 'Land of beauty', members: 4878, online: 334, gradient: 'from-red-500 to-rose-700', image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-14', name: 'Akwa Ibom', capital: 'Uyo', slogan: 'Land of promise', members: 6280, online: 417, gradient: 'from-indigo-500 to-blue-700', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-15', name: 'Bayelsa', capital: 'Yenagoa', slogan: 'Glory of the sun', members: 3921, online: 279, gradient: 'from-emerald-500 to-green-700', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-16', name: 'Benue', capital: 'Makurdi', slogan: 'Food basket', members: 7221, online: 485, gradient: 'from-orange-500 to-red-700', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-17', name: 'Borno', capital: 'Maiduguri', slogan: 'Home of peace', members: 5632, online: 402, gradient: 'from-yellow-500 to-orange-700', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-18', name: 'Cross River', capital: 'Calabar', slogan: 'Paradise state', members: 5508, online: 390, gradient: 'from-green-500 to-teal-700', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-19', name: 'Ebonyi', capital: 'Abakaliki', slogan: 'Salt of the nation', members: 4613, online: 309, gradient: 'from-slate-500 to-zinc-700', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-20', name: 'Edo', capital: 'Benin City', slogan: 'Heart beat of Nigeria', members: 6790, online: 471, gradient: 'from-red-500 to-orange-700', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-21', name: 'Ekiti', capital: 'Ado Ekiti', slogan: 'Land of honour', members: 4501, online: 289, gradient: 'from-emerald-500 to-green-700', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-22', name: 'Gombe', capital: 'Gombe', slogan: 'Jewel in the savannah', members: 5140, online: 334, gradient: 'from-yellow-500 to-lime-700', image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-23', name: 'Imo', capital: 'Owerri', slogan: 'Eastern heartland', members: 6112, online: 420, gradient: 'from-cyan-500 to-violet-700', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-24', name: 'Jigawa', capital: 'Dutse', slogan: 'Crown of the north', members: 4899, online: 315, gradient: 'from-amber-500 to-yellow-700', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-25', name: 'Kebbi', capital: 'Birnin Kebbi', slogan: 'Seat of the caliphate', members: 4632, online: 291, gradient: 'from-orange-500 to-red-700', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-26', name: 'Kogi', capital: 'Lokoja', slogan: 'Confluence state', members: 5574, online: 388, gradient: 'from-teal-500 to-emerald-700', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-27', name: 'Katsina', capital: 'Katsina', slogan: 'Home of hospitality', members: 6101, online: 398, gradient: 'from-orange-500 to-yellow-700', image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-28', name: 'Nasarawa', capital: 'Lafia', slogan: 'The home of peace', members: 4371, online: 279, gradient: 'from-violet-500 to-indigo-700', image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-29', name: 'Ondo', capital: 'Akure', slogan: 'Sunshine state', members: 5408, online: 358, gradient: 'from-yellow-500 to-amber-700', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-30', name: 'Osun', capital: 'Osogbo', slogan: 'Land of virtue', members: 5216, online: 334, gradient: 'from-fuchsia-500 to-pink-700', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-31', name: 'Oyo', capital: 'Ibadan', slogan: 'Pace setter', members: 8203, online: 546, gradient: 'from-red-500 to-rose-700', image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-32', name: 'Plateau', capital: 'Jos', slogan: 'Home of peace and tourism', members: 5989, online: 405, gradient: 'from-sky-500 to-cyan-700', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-33', name: 'Sokoto', capital: 'Sokoto', slogan: 'Seat of the caliphate', members: 5044, online: 317, gradient: 'from-amber-500 to-orange-700', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-34', name: 'Taraba', capital: 'Jalingo', slogan: 'Nature’s gift', members: 3916, online: 261, gradient: 'from-green-500 to-lime-700', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-35', name: 'Yobe', capital: 'Damaturu', slogan: 'Pride of the north-east', members: 4120, online: 287, gradient: 'from-yellow-500 to-lime-700', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80' },
  { id: 'state-36', name: 'FCT', capital: 'Abuja', slogan: 'Centre of unity', members: 9109, online: 612, gradient: 'from-emerald-500 to-cyan-700', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
];

const defaultStates: StateForum[] = stateEntries.map((entry, index) => ({ ...entry, joined: index < 4 }));

const defaultStateMessages: Record<string, ForumMessage[]> = {
  'state-1': [
    { id: 's1', user: 'Aisha', avatar: `${avatarBase}Aisha`, type: 'text', text: 'How is the traffic from Lekki to Ikeja this morning?', time: '09:15' },
    { id: 's2', user: 'Tunde', avatar: `${avatarBase}Tunde`, type: 'text', text: 'Smooth if you leave before 7:30. Too much traffic after that.', time: '09:17' },
    { id: 's3', user: 'Mariam', avatar: `${avatarBase}Mariam`, type: 'poll', poll: { question: 'Which area is best for this weekend meetup?', options: [{ label: 'Victoria Island', votes: 42 }, { label: 'Yaba', votes: 31 }, { label: 'Surulere', votes: 21 }, { label: 'Lekki', votes: 19 }] }, time: '09:18' },
  ],
  'state-4': [
    { id: 'n1', user: 'Sadiq', avatar: `${avatarBase}Sadiq`, type: 'text', text: 'How Kontagora road today?', time: '08:14' },
    { id: 'n2', user: 'Aminu', avatar: `${avatarBase}Aminu`, type: 'text', text: 'Not too bad. The potholes are still there near the market though.', time: '08:17' },
    { id: 'n3', user: 'Hauwa', avatar: `${avatarBase}Hauwa`, type: 'text', text: 'Minna market prices are steady for yam and rice today.', time: '08:19' },
    { id: 'n4', user: 'Aisha', avatar: `${avatarBase}Aisha`, type: 'poll', poll: { question: 'Should we arrange a town clean-up this Saturday?', options: [{ label: 'Yes', votes: 58 }, { label: 'No', votes: 17 }, { label: 'Maybe', votes: 22 }] }, time: '08:21' },
  ],
  'state-2': [
    { id: 'k1', user: 'Ali', avatar: `${avatarBase}Ali`, type: 'text', text: 'The night market in Dala is lively again this week.', time: '07:33' },
  ],
  'state-3': [
    { id: 'r1', user: 'Chika', avatar: `${avatarBase}Chika`, type: 'text', text: 'Port Harcourt traffic is rough after 6 pm!', time: '18:08' },
  ],
};

const defaultGameRooms: GameRoom[] = [
  { id: 'room-1', name: 'Bros TicTacToe', game: 'Tic Tac Toe', maxPlayers: 2, players: [{ id: 'p1', name: 'You', avatar: `${avatarBase}You` }, { id: 'p2', name: 'Musa', avatar: `${avatarBase}Musa` }], status: 'Waiting' },
  { id: 'room-2', name: 'Night RPS', game: 'Rock Paper Scissors', maxPlayers: 2, players: [{ id: 'p3', name: 'Ada', avatar: `${avatarBase}Ada` }, { id: 'p4', name: 'You', avatar: `${avatarBase}You` }], status: 'Playing' },
  { id: 'room-3', name: 'Trivia Clash', game: 'Trivia Battle', maxPlayers: 2, players: [{ id: 'p5', name: 'Kola', avatar: `${avatarBase}Kola` }, { id: 'p6', name: 'You', avatar: `${avatarBase}You` }], status: 'Waiting' },
];

export const useStore = create<UseStoreState>()(
  persist(
    (set) => ({
      currentUser: {
        id: 'you',
        name: 'You',
        avatar: `${avatarBase}You`,
        state: 'Niger',
      },
      chats: seededChats,
      messagesByChat: defaultMessages,
      statuses: defaultStatuses,
      states: defaultStates,
      stateMessages: defaultStateMessages,
      gameRooms: defaultGameRooms,
      setCurrentUser: (user) => set({ currentUser: user }),
      addChatMessage: (chatId, message) =>
        set((state) => ({
          messagesByChat: {
            ...state.messagesByChat,
            [chatId]: [...(state.messagesByChat[chatId] ?? []), message],
          },
        })),
      addStatus: (status) => set((state) => ({ statuses: [status, ...state.statuses] })),
      addStateMessage: (stateId, message) =>
        set((state) => ({
          stateMessages: {
            ...state.stateMessages,
            [stateId]: [...(state.stateMessages[stateId] ?? []), message],
          },
        })),
      joinForum: (id) =>
        set((state) => ({
          states: state.states.map((item) => (item.id === id ? { ...item, joined: true, members: item.members + 1 } : item)),
        })),
      leaveForum: (id) =>
        set((state) => ({
          states: state.states.map((item) => (item.id === id ? { ...item, joined: false, members: Math.max(0, item.members - 1) } : item)),
        })),
      createGameRoom: (room) => set((state) => ({ gameRooms: [room, ...state.gameRooms] })),
    }),
    {
      name: 'gistme-store',
    },
  ),
);
