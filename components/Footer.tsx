export default function Footer() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="mt-12 border-t border-black/10 dark:border-white/[.145] bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-zinc-600 dark:text-zinc-400">
        © {year} 바이브코딩. 모든 권리 보유.
      </div>
    </footer>
  );
}