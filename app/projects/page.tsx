import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로젝트 | 바이브코딩",
  description: "코딩 결과물 프로젝트 목록",
};

export default function ProjectsPage() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}