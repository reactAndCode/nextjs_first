import { NextResponse } from "next/server";
import { guestbook, addEntry } from "@/data/guestbook";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(guestbook, { status: 200 });
  }
  const { data, error } = await supabase
    .from("guestbook")
    .select("id,name,message,created_at")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const result = (data || []).map((row: any) => ({
    id: String(row.id),
    name: row.name,
    message: row.message,
    createdAt: new Date(row.created_at).toISOString(),
  }));
  return NextResponse.json(result, { status: 200 });
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

  const supabase = getSupabase();
  if (!supabase) {
    const entry = addEntry(name, message);
    return NextResponse.json(entry, { status: 201 });
  }
  const { data, error } = await supabase
    .from("guestbook")
    .insert([{ name, message }])
    .select("id,name,message,created_at")
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const entry = {
    id: String(data.id),
    name: data.name,
    message: data.message,
    createdAt: new Date(data.created_at).toISOString(),
  };
  return NextResponse.json(entry, { status: 201 });
}