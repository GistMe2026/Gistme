'use client';

import { Camera, FileText, FileUp, MapPin, Mic, Phone, Users } from 'lucide-react';

const items = [
  { label: 'Document', icon: FileText },
  { label: 'Camera', icon: Camera },
  { label: 'Gallery', icon: FileUp },
  { label: 'Audio', icon: Mic },
  { label: 'Location', icon: MapPin },
  { label: 'Contact', icon: Users },
  { label: 'Poll', icon: Phone },
];

export function AttachmentMenu({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute bottom-20 left-4 z-20 w-56 rounded-2xl bg-[#202c33] p-2 text-white shadow-soft">
      <div className="mb-2 flex items-center justify-between px-2 py-1 text-sm font-medium">
        <span>Attach</span>
        <button onClick={onClose} className="text-[#aebac1]">✕</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => {
              onSelect(label);
              onClose();
            }}
            className="flex flex-col items-center gap-2 rounded-xl bg-[#111b21] px-2 py-3 text-xs text-[#dfe8eb] hover:bg-[#2a3940]"
          >
            <Icon size={18} className="text-[#00a884]" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
