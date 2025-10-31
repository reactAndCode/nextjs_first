import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

export const dynamic = "force-dynamic"; // disable static optimization for fresh data
export const revalidate = 0; // no cache

export async function GET() {
  const profile = {
    name: "reactAndCode",
    role: "Frontend & Full‑stack Developer",
    bio: "Next.js, React, TypeScript로 빠르게 제품을 만드는 개발자입니다.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    links: {
      github: "https://github.com/reactAndCode",
    },
    projects: projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      tags: p.tags,
      repoUrl: p.repoUrl,
      demoUrl: p.demoUrl,
      imageUrl: p.imageUrl,
    })),
  };

  return NextResponse.json(profile, { status: 200 });
}