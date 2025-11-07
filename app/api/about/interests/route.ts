import { NextResponse } from "next/server";
import { aboutInterests } from "@/data/aboutInterests";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = getSupabase();
  
  if (!supabase) {
    // Fallback to static interests data
    return NextResponse.json(aboutInterests, { status: 200 });
  }

  const { data, error } = await supabase
    .from("about_interests")
    .select("id,title,description,icon,color,display_order,active,created_at")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const interests = (data || []).map((row: any) => ({
    id: String(row.id),
    title: row.title,
    description: row.description,
    icon: row.icon,
    color: row.color,
    display_order: row.display_order,
    active: row.active,
    createdAt: new Date(row.created_at).toISOString(),
  }));

  return NextResponse.json(interests, { status: 200 });
}