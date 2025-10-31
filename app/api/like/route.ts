import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getLikeCount, incrementLike, decrementLike } from "@/data/like";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeTargetFrom(url: string): string {
  const { searchParams } = new URL(url);
  const t = (searchParams.get("target") || "default").trim();
  return t || "default";
}

export async function GET(request: Request) {
  const target = normalizeTargetFrom(request.url);
  const supabase = getSupabase();
  let count = 0;
  if (!supabase) {
    count = getLikeCount(target);
  } else {
    const { data, error } = await supabase
      .from("likes")
      .select("count")
      .eq("target", target)
      .maybeSingle();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    count = data?.count ?? 0;
  }
  const cookieStore = await cookies();
  const liked = cookieStore.get(`liked-${target}`)?.value === "1";
  return NextResponse.json({ target, count, liked }, { status: 200 });
}

export async function POST(request: Request) {
  const target = normalizeTargetFrom(request.url);
  const supabase = getSupabase();
  let count = 0;
  if (!supabase) {
    count = incrementLike(target);
  } else {
    const { data, error } = await supabase.rpc("increment_like", { like_target: target });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    count = Number(data ?? 0);
  }
  const res = NextResponse.json({ target, count, liked: true }, { status: 200 });
  res.cookies.set(`liked-${target}`, "1", {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  return res;
}

export async function DELETE(request: Request) {
  const target = normalizeTargetFrom(request.url);
  const supabase = getSupabase();
  let count = 0;
  if (!supabase) {
    count = decrementLike(target);
  } else {
    const { data, error } = await supabase.rpc("decrement_like", { like_target: target });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    count = Number(data ?? 0);
  }
  const res = NextResponse.json({ target, count, liked: false }, { status: 200 });
  // clear the like cookie for this target
  res.cookies.set(`liked-${target}`, "", { path: "/", httpOnly: true, maxAge: 0 });
  return res;
}