import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-background font-sans">
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="mx-auto mb-6 flex items-center justify-center">
          <div className="relative h-20 w-20">
            <Image src="/globe.svg" alt="Hero" fill className="object-contain dark:invert" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">My Vibe Coding Hello World </h1>
        <p className="mt-3 text-muted-foreground">내 코딩 결과물 포트폴리오 웹앱</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild variant="default">
            <Link href="/projects">프로젝트 보기</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/about">소개 보기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
