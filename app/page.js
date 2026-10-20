import Link from "next/link";
import { postPlatforms, chatPlatforms } from "@/lib/platforms";

function PlatformCard({ platform }) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">{platform.name}</h3>
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

function PlatformSection({ id, title, blurb, items }) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            {title}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">{blurb}</p>
        </div>
        <span className="shrink-0 text-sm text-zinc-400">
          {items.length} platforms
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </div>
    </section>
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
          Build believable social media posts and chat screenshots, then export
          them as high-resolution PNGs. Pick a platform to get started.
        </p>
      </section>

      <PlatformSection
        id="posts"
        title="Social posts"
        blurb="Feed posts, videos, and comment threads."
        items={postPlatforms}
      />

      <PlatformSection
        id="chats"
        title="Chats"
        blurb="One-to-one message threads in phone proportions."
        items={chatPlatforms}
      />
    </main>
  );
}
