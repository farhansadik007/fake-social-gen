import Link from "next/link";
import { platforms } from "@/lib/platforms";

function PlatformCard({ platform }) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">{platform.name}</h2>
        {platform.available ? (
          <span className="text-sm text-zinc-400 transition group-hover:text-zinc-900">
            Open →
          </span>
        ) : (
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500">
            Coming soon
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-zinc-500">{platform.description}</p>
    </>
  );

  if (!platform.available) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white/60 p-5 opacity-70">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={platform.href}
      className="group rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      {content}
    </Link>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Fake Social Gen
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Build believable social media posts, then export them as
          high-resolution PNGs. Pick a platform to get started.
        </p>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </section>
    </main>
  );
}
