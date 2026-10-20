import Link from "next/link";
import { chatPlatforms } from "@/lib/platforms";

export const metadata = {
  title: "Chat Generators — Fake Social Gen",
  description:
    "Build fake chat screenshots for WhatsApp, iMessage, Telegram, Messenger, Instagram DMs, and Discord DMs.",
};

export default function ChatsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
      <section className="max-w-2xl">
        <Link
          href="/"
          className="text-sm text-zinc-500 transition hover:text-zinc-900"
        >
          ← All platforms
        </Link>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Chats
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          One-to-one message threads in phone proportions. Fill in the
          conversation, then export it as a high-resolution PNG.
        </p>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chatPlatforms.map((platform) => (
          <Link
            key={platform.id}
            href={platform.href}
            className="group rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">
                {platform.name}
              </h2>
              <span className="text-sm text-zinc-400 transition group-hover:text-zinc-900">
                Open →
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">{platform.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
