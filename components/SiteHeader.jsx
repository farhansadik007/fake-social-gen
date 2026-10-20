import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-zinc-900"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-zinc-900 text-xs font-bold text-white">
            FS
          </span>
          Fake Social Gen
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/#posts"
            className="rounded-lg px-3 py-1.5 font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            Posts
          </Link>
          <Link
            href="/#chats"
            className="rounded-lg px-3 py-1.5 font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            Chats
          </Link>
        </nav>
      </div>
    </header>
  );
}
