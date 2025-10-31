import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "hello-nextjs",
    title: "Hello Next.js",
    description: "Next.js 포트폴리오 시작 프로젝트",
    tags: ["nextjs", "tailwind"],
    repoUrl: "https://github.com/example/hello-nextjs",
    imageUrl: "/projects/hello-nextjs.svg",
  },
  {
    slug: "awesome-widget",
    title: "Awesome Widget",
    description: "리액트 컴포넌트 예제",
    tags: ["react"],
    repoUrl: "https://github.com/example/awesome-widget",
    demoUrl: "https://example.com/awesome-widget",
    imageUrl: "/projects/awesome-widget.svg",
  },
];