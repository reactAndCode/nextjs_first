import Link from "next/link";

export default function NavBar() {
  return (
    <header className="border-b border-black/10 dark:border-white/[.145] bg-white dark:bg-black">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-black dark:text-zinc-50">
          바이브코딩 포트폴리오
        </Link>
        <div className="flex gap-4">
          <Link href="/projects" className="text-zinc-700 dark:text-zinc-300 hover:underline">
            프로젝트
          </Link>
          <Link href="/labs" className="text-zinc-700 dark:text-zinc-300 hover:underline">
            API실습
          </Link>
          <Link href="/about" className="text-zinc-700 dark:text-zinc-300 hover:underline">
            소개
          </Link>
          <Link href="/contact" className="text-zinc-700 dark:text-zinc-300 hover:underline">
            연락
          </Link>
        </div>
      </nav>
    </header>
  );
}