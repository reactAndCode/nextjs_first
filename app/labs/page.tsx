"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { GuestbookEntry } from "@/types/guestbook";

const tabs = [
  { key: "guestbook", label: "방명록" },
  { key: "like", label: "좋아요" },
  { key: "random", label: "랜덤 추천" },
] as const;

type TabKey = typeof tabs[number]["key"];

export default function LabsPage() {
  const [active, setActive] = useState<TabKey>("guestbook");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-black dark:text-zinc-50">API 실습</h1>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <Button
            key={t.key}
            variant={active === t.key ? "default" : "secondary"}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      {active === "guestbook" && <GuestbookTab />}
      {active === "like" && <LikeTab />}
      {active === "random" && <RandomTab />}
    </div>
  );
}

function GuestbookTab() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch("/api/guestbook", { cache: "no-store" });
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !message.trim()) {
      setError("이름과 메세지를 모두 입력해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "등록 중 오류가 발생했습니다.");
      } else {
        setName("");
        setMessage("");
        await load();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id: string) => {
    const ok = typeof window !== "undefined" ? window.confirm("정말 삭제하시겠어요?") : true;
    if (!ok) return;
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/guestbook/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "삭제 중 오류가 발생했습니다.");
      } else {
        await load();
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-4">
        <h2 className="text-lg font-semibold text-black dark:text-zinc-50">방명록 남기기</h2>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
          />
          <textarea
            placeholder="메세지"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[100px] rounded-md border border-border bg-background px-3 py-2 text-foreground"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={submitting}>
            {submitting ? "등록 중..." : "등록"}
          </Button>
        </form>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold text-black dark:text-zinc-50">최근 방명록</h2>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="mt-4 space-y-3">
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">아직 방명록이 없습니다.</p>
          ) : (
            entries.map((e) => (
              <div key={e.id} className="rounded-md border border-border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm text-zinc-700 dark:text-zinc-300">{e.name}</div>
                    <div className="text-foreground">{e.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(e.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => onDelete(e.id)}
                    disabled={deletingId === e.id}
                  >
                    {deletingId === e.id ? "삭제 중..." : "삭제"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

function LikeTab() {
  const [target, setTarget] = useState("labs-default");
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const NEWJEANS_IMAGES = [
    { name: "Minji", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Minji%20%28NewJeans%29%20220812.jpg?width=600" },
    { name: "Hanni", src: "https://commons.wikimedia.org/wiki/Special:FilePath/NewJeans%20Hanni%20OLENS%203.jpg?width=600" },
    { name: "Danielle", src: "https://commons.wikimedia.org/wiki/Special:FilePath/2023%20MMA%20NewJeans%20Danielle%201.jpg?width=600" },
    { name: "Haerin", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Haerin%20%28NewJeans%29%20220813.jpg?width=600" },
    { name: "Hyein", src: "https://commons.wikimedia.org/wiki/Special:FilePath/20230905%20Hyein%20%28NewJeans%29.jpg?width=600" },
  ] as const;

  const [image] = useState(() => {
    const list = NEWJEANS_IMAGES;
    return list[Math.floor(Math.random() * list.length)];
  });

  const load = async (t: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/like?target=${encodeURIComponent(t)}`, { cache: "no-store" });
      const data = await res.json();
      setCount(data.count ?? 0);
      setLiked(Boolean(data.liked));
    } catch (e) {
      setError("상태를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const onLike = async () => {
    setError(null);
    try {
      const method = liked ? "DELETE" : "POST";
      const res = await fetch(`/api/like?target=${encodeURIComponent(target)}`, { method });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error || "좋아요 처리 중 오류가 발생했습니다.");
      } else {
        const data = await res.json();
        setCount(typeof data.count === "number" ? data.count : liked ? Math.max(0, count - 1) : count + 1);
        setLiked(Boolean(data.liked));
      }
    } catch (e) {
      setError("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <Card className="overflow-hidden max-w-md mx-auto">
      <div className="relative aspect-square bg-muted">
        <img
          src={image?.src}
          alt={image ? `NewJeans ${image.name}` : "NewJeans"}
          className="absolute inset-0 h-full w-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant={liked ? "default" : "secondary"} onClick={onLike} disabled={loading}>
              {liked ? "❤️ 좋아요 됨" : "🤍 좋아요"}
            </Button>
            <span className="text-sm text-muted-foreground">좋아요 {count.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-44 rounded-md border border-border bg-background px-2 py-1 text-foreground"
              placeholder="타겟 키 (예: poll-123)"
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </Card>
  );
}

function RandomTab() {
  type ImageItem = { name: string; src: string };
  const AESPA_FILES = [
    { name: "Karina", file: "Aespa Karina 카리나 20240618 04 (cropped).png" },
    { name: "Winter", file: "Winter for Eternal Return × aespa collaboration BTS photoshoot.jpg" },
    { name: "Giselle", file: "250111 aespa Giselle 02.jpg" },
    { name: "Ningning", file: "Aespa's Ningning 3.png" },
  ] as const;

  const AESPA_IMAGES: ImageItem[] = AESPA_FILES.map(({ name, file }) => ({
    name,
    src: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=256`,
  }));

  const [items, setItems] = useState<{ text: string; image: ImageItem }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/recommendations?count=20`, { cache: "no-store" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "추천을 불러오는 중 오류가 발생했습니다.");
      }
      const data = await res.json();
      const messages: string[] = Array.isArray(data.messages) ? data.messages : [];
      const assigned = messages.map((text) => ({
        text,
        image: AESPA_IMAGES[Math.floor(Math.random() * AESPA_IMAGES.length)],
      }));
      setItems(assigned);
    } catch (e: any) {
      setError(e?.message || "추천을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black dark:text-zinc-50">오늘의 위로 추천</h2>
        <Button variant="secondary" onClick={load} disabled={loading}>
          {loading ? "불러오는 중..." : "다시 추천"}
        </Button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-4 space-y-3">
        {items.length === 0 && !loading ? (
          <p className="text-sm text-muted-foreground">추천 문구가 없습니다.</p>
        ) : (
          items.map((it, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <img
                src={it.image.src}
                alt={`aespa ${it.image.name}`}
                className="h-12 w-12 rounded-full object-cover border border-border"
                referrerPolicy="no-referrer"
              />
              <span className="text-foreground">{it.text}</span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}