import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/9] bg-muted">
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            No Image
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {project.tags && project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs rounded-md bg-muted text-muted-foreground px-2 py-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4">
          <Button asChild variant="outline" size="sm">
            <Link href={`/projects/${project.slug}`}>자세히 보기</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}