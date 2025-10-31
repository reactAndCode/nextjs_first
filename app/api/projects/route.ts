import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const tag = (searchParams.get("tag") || "").toLowerCase();

  let result = projects;

  if (q) {
    result = result.filter((p) => {
      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));
      return inTitle || inDesc || inTags;
    });
  }

  if (tag) {
    result = result.filter((p) => (p.tags || []).map((t) => t.toLowerCase()).includes(tag));
  }

  return NextResponse.json(result, { status: 200 });
}