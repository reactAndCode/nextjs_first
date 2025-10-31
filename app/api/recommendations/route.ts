import { NextResponse } from "next/server";
import { getRandomMessages } from "@/data/recommendations";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("count");
  const parsed = raw ? Number(raw) : NaN;
  const count = Number.isFinite(parsed) && parsed > 0 ? Math.min(50, Math.round(parsed)) : 20;

  const messages = getRandomMessages(count);
  return NextResponse.json({ messages }, { status: 200 });
}