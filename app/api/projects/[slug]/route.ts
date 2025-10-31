import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Params {
  params: { slug: string };
}

export async function GET(_req: Request, { params }: Params) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project, { status: 200 });
}