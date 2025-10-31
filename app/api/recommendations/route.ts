import { NextResponse } from "next/server";
import { getRandomMessages } from "@/data/recommendations";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("count");
  const parsed = raw ? Number(raw) : NaN;
  const count = Number.isFinite(parsed) && parsed > 0 ? Math.min(50, Math.round(parsed)) : 20;

  const supabase = getSupabase();
  if (!supabase) {
    const messages = getRandomMessages(count);
    return NextResponse.json({ messages }, { status: 200 });
  }
  const { data, error } = await supabase
    .from("quotes")
    .select("text,active")
    .eq("active", true);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const all = (data || []).map((q: any) => q.text);
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  const messages = shuffled.slice(0, Math.min(count, shuffled.length));
  // Fallback to static if DB has no quotes
  if (messages.length === 0) {
    return NextResponse.json({ messages: getRandomMessages(count) }, { status: 200 });
  }
  return NextResponse.json({ messages }, { status: 200 });
}