import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연락 | 바이브코딩",
  description: "연락처 및 링크",
};

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-black dark:text-zinc-50">연락</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        포트폴리오 관련 문의는 아래 링크를 통해 연락해주세요.
      </p>
      <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300">
        <li>
          이메일: <a href="mailto:you@example.com" className="underline">you@example.com</a>
        </li>
        <li>
          GitHub: <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer" className="underline">github.com/yourname</a>
        </li>
        <li>
          LinkedIn: <a href="https://www.linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer" className="underline">linkedin.com/in/yourname</a>
        </li>
      </ul>
    </div>
  );
}