import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getLikeCount, incrementLike, decrementLike } from "@/data/like";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeTargetFrom(url: string): string {
  const { searchParams } = new URL(url);
  const t = (searchParams.get("target") || "default").trim();
  return t || "default";
}

export async function GET(request: Request) {
  const target = normalizeTargetFrom(request.url);
  const count = getLikeCount(target);
  const cookieStore = await cookies();
  const liked = cookieStore.get(`liked-${target}`)?.value === "1";
  return NextResponse.json({ target, count, liked }, { status: 200 });
}

export async function POST(request: Request) {
  const target = normalizeTargetFrom(request.url);
  const count = incrementLike(target);
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
  const count = decrementLike(target);
  const res = NextResponse.json({ target, count, liked: false }, { status: 200 });
  // clear the like cookie for this target
  res.cookies.set(`liked-${target}`, "", { path: "/", httpOnly: true, maxAge: 0 });
  return res;
}