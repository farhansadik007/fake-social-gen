import Link from "next/link";
import { platforms } from "@/lib/platforms";

export default function SiteHeader() {
  const available = platforms.filter((platform) => platform.available);

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

        <nav className="flex items-center gap-4 text-sm text-zinc-500">
          {available.map((platform) => (
            <Link
              key={platform.id}
              href={platform.href}
              className="transition hover:text-zinc-900"
            >
              {platform.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
