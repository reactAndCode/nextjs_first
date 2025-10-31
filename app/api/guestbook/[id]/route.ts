import { NextResponse } from "next/server";
import { removeEntry } from "@/data/guestbook";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Params { params: Promise<{ id: string }> }

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "id 파라미터가 필요합니다." }, { status: 400 });
  }

  const ok = removeEntry(id);
  if (!ok) {
    return NextResponse.json({ error: "해당 방명록을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}