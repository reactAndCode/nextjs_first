import { projects } from "@/data/projects";
import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/card";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  return {
    title: project ? `${project.title} | 프로젝트` : "프로젝트 상세",
  };
}

export default function ProjectDetail({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <div className="py-10 text-zinc-700 dark:text-zinc-300">존재하지 않는 프로젝트입니다.</div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="relative aspect-[16/9] bg-muted">
          {project.imageUrl ? (
            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
          ) : null}
        </div>
      </Card>
      <h1 className="text-2xl font-bold text-black dark:text-zinc-50">{project.title}</h1>
      <p className="text-zinc-700 dark:text-zinc-300">{project.description}</p>
      {project.tags && project.tags.length > 0 && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          태그: {project.tags.join(", ")}
        </p>
      )}
      <div className="flex gap-4">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-zinc-800 dark:text-zinc-200"
          >
            소스 코드
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-zinc-800 dark:text-zinc-200"
          >
            데모
          </a>
        )}
      </div>
    </div>
  );
}