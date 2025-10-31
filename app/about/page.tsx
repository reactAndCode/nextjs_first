import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 | 바이브코딩",
  description: "개발자 소개와 기술 스택",
};

export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-black dark:text-zinc-50">소개</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        안녕하세요. 바이브코딩 포트폴리오입니다. 이 웹앱은 Next.js와 Tailwind를 기반으로
        코딩 결과물을 정리하고 공유하기 위한 목적의 뼈대 프로젝트입니다.
      </p>
      <p className="text-zinc-700 dark:text-zinc-300">
        기술 스택: Next.js, React, TypeScript, Tailwind CSS
      </p>
    </div>
  );
}