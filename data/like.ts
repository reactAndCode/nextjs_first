// Global like store for dev to persist across route modules
const g = globalThis as any;
if (!g.__likeStore) {
  g.__likeStore = { counts: {} as Record<string, number> };
}
const store = g.__likeStore as { counts: Record<string, number> };

export function getLikeCount(target: string): number {
  const key = (target || "default").trim() || "default";
  return store.counts[key] ?? 0;
}

export function incrementLike(target: string): number {
  const key = (target || "default").trim() || "default";
  store.counts[key] = (store.counts[key] ?? 0) + 1;
  return store.counts[key];
}

export function decrementLike(target: string): number {
  const key = (target || "default").trim() || "default";
  const current = store.counts[key] ?? 0;
  store.counts[key] = Math.max(0, current - 1);
  return store.counts[key];
}

export function setLikeCount(target: string, value: number): void {
  const key = (target || "default").trim() || "default";
  store.counts[key] = Math.max(0, Math.floor(value || 0));
}