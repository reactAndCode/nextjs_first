import type { GuestbookEntry } from "@/types/guestbook";

// Ensure a single in-memory store across route modules during dev
const g = globalThis as any;
if (!g.__guestbookStore) {
  g.__guestbookStore = { guestbook: [] as GuestbookEntry[], counter: 0 };
}
const store = g.__guestbookStore as { guestbook: GuestbookEntry[]; counter: number };

export const guestbook: GuestbookEntry[] = store.guestbook;

export function addEntry(name: string, message: string): GuestbookEntry {
  const entry: GuestbookEntry = {
    id: String(++store.counter),
    name,
    message,
    createdAt: new Date().toISOString(),
  };
  // 새 항목을 앞에 추가하여 최신순
  guestbook.unshift(entry);
  return entry;
}

export function removeEntry(id: string): boolean {
  const index = guestbook.findIndex((e) => e.id === id);
  if (index === -1) return false;
  guestbook.splice(index, 1);
  return true;
}