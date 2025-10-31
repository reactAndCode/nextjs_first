import { NextResponse } from "next/server";
import { guestbook, addEntry } from "@/data/guestbook";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(guestbook, { status: 200 });
}

export async function POST(request: Request) {
  let body: any = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !message) {
    return NextResponse.json({ error: "name과 message는 필수입니다." }, { status: 400 });
  }
  if (name.length > 50) {
    return NextResponse.json({ error: "name은 최대 50자입니다." }, { status: 400 });
  }
  if (message.length > 500) {
    return NextResponse.json({ error: "message는 최대 500자입니다." }, { status: 400 });
  }

  const entry = addEntry(name, message);
  return NextResponse.json(entry, { status: 201 });
}