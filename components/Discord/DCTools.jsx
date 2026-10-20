"use client";

import { useRef, useState } from "react";
import { Download, ImageIcon, Plus, RotateCcw, X } from "lucide-react";
import DCCard from "./DCCard";
import { Button, Field, TextArea, TextInput, Toggle } from "@/components/ui/Controls";

const createDefaultThread = () => ({
  channel: "general",
  topic: "Team-wide announcements, reminders, and general chatter",
  avatar: "",
  messages: [
    {
      name: "Maya Chen",
      color: "#f47fff",
      avatar: "",
      time: "Today at 9:14 AM",
      bot: false,
      text: "morning all — deploy is green, staging is stable, and I only broke it twice",
      reply: null,
      reactions: [
        { emoji: "🔥", count: 12, me: true },
        { emoji: "😂", count: 4, me: false },
      ],
    },
    {
      name: "deploy-bot",
      color: "#5865F2",
      avatar: "",
      time: "Today at 9:16 AM",
      bot: true,
      text: "Build #4821 deployed to production in 3m 12s. No regressions detected.",
      reply: null,
      reactions: [{ emoji: "✅", count: 9, me: false }],
    },
    {
      name: "Sam Okafor",
      color: "#3ba55c",
      avatar: "",
      time: "Today at 9:21 AM",
      bot: false,
      text: "twice is a personal best, congrats",
      reply: {
        name: "Maya Chen",
        text: "I only broke it twice",
        avatar: "",
      },
      reactions: [],
    },
  ],
  dark: true,
});

const DEFAULT_COLORS = ["#f47fff", "#3ba55c", "#faa61a", "#eb459e", "#5865F2"];

function ImageField({ label, hint, value, onChange }) {
  const fileInputRef = useRef(null);

  function onFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex items-center gap-2">
        {value ? (
          <img
            src={value}
            alt=""
            className="h-10 w-10 shrink-0 rounded-full border border-zinc-200 object-cover"
          />
        ) : null}
        <TextInput
          value={value.startsWith("data:") ? "" : value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://… or upload"
        />
        <Button
          type="button"
          variant="secondary"
          aria-label={`Upload ${label}`}
          className="shrink-0 px-3"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFile}
        />
      </div>
    </Field>
  );
}

export default function DCTools() {
  const [thread, setThread] = useState(createDefaultThread);
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef(null);

  const update = (key, value) => setThread((prev) => ({ ...prev, [key]: value }));

  const updateMessage = (index, key, value) =>
    setThread((prev) => ({
      ...prev,
      messages: prev.messages.map((message, i) =>
        i === index ? { ...message, [key]: value } : message,
      ),
    }));

  const updateReply = (index, key, value) =>
    setThread((prev) => ({
      ...prev,
      messages: prev.messages.map((message, i) =>
        i === index
          ? { ...message, reply: { ...message.reply, [key]: value } }
          : message,
      ),
    }));

  const updateReaction = (messageIndex, reactionIndex, key, value) =>
    setThread((prev) => ({
      ...prev,
      messages: prev.messages.map((message, i) =>
        i === messageIndex
          ? {
              ...message,
              reactions: message.reactions.map((reaction, j) =>
                j === reactionIndex
                  ? { ...reaction, [key]: value }
                  : reaction,
              ),
            }
          : message,
      ),
    }));

  function addMessage() {
    setThread((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          name: "",
          color: DEFAULT_COLORS[prev.messages.length % DEFAULT_COLORS.length],
          avatar: "",
          time: "Today at 9:30 AM",
          bot: false,
          text: "",
          reply: null,
          reactions: [],
        },
      ],
    }));
  }

  function removeMessage(index) {
    setThread((prev) => ({
      ...prev,
      messages: prev.messages.filter((_, i) => i !== index),
    }));
  }

  function toggleReply(index) {
    setThread((prev) => ({
      ...prev,
      messages: prev.messages.map((message, i) =>
        i === index
          ? {
              ...message,
              reply: message.reply
                ? null
                : { name: "", text: "", avatar: "" },
            }
          : message,
      ),
    }));
  }

  function addReaction(index) {
    setThread((prev) => ({
      ...prev,
      messages: prev.messages.map((message, i) =>
        i === index
          ? {
              ...message,
              reactions: [
                ...message.reactions,
                { emoji: "🔥", count: 1, me: false },
              ],
            }
          : message,
      ),
    }));
  }

  function removeReaction(messageIndex, reactionIndex) {
    setThread((prev) => ({
      ...prev,
      messages: prev.messages.map((message, i) =>
        i === messageIndex
          ? {
              ...message,
              reactions: message.reactions.filter((_, j) => j !== reactionIndex),
            }
          : message,
      ),
    }));
  }

  async function download() {
    if (!cardRef.current) return;
    setExporting(true);

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: thread.dark ? "#1E1F22" : "#F2F3F5",
      });

      const link = document.createElement("a");
      link.download = `discord-chat-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
      alert(
        "Could not export the image. If you used an image URL, try uploading the file instead — external hosts often block export.",
      );
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row">
      <section className="flex w-full flex-col gap-8 lg:max-w-md">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Discord Chat Generator
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Build a channel conversation and export it as a high-resolution PNG.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Channel
          </h2>

          <Field label="Channel name" hint="Shown after the # prefix.">
            <TextInput
              value={thread.channel}
              onChange={(event) => update("channel", event.target.value)}
              placeholder="general"
            />
          </Field>

          <Field label="Topic">
            <TextInput
              value={thread.topic}
              onChange={(event) => update("topic", event.target.value)}
              placeholder="What this channel is about"
            />
          </Field>

          <ImageField
            label="Default avatar"
            hint="Used for every message without its own photo."
            value={thread.avatar}
            onChange={(value) => update("avatar", value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            Messages
          </span>

          {thread.messages.map((message, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-3"
            >
              <div className="flex items-center gap-2">
                <TextInput
                  value={message.name}
                  onChange={(event) =>
                    updateMessage(index, "name", event.target.value)
                  }
                  placeholder="Username"
                />
                <input
                  type="color"
                  value={message.color}
                  onChange={(event) =>
                    updateMessage(index, "color", event.target.value)
                  }
                  aria-label="Username colour"
                  className="h-10 w-10 shrink-0 cursor-pointer rounded-md border border-zinc-300 bg-white p-1"
                />
                <button
                  type="button"
                  aria-label="Remove message"
                  className="shrink-0 rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                  onClick={() => removeMessage(index)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <TextInput
                value={message.text}
                onChange={(event) =>
                  updateMessage(index, "text", event.target.value)
                }
                placeholder="Message…"
              />

              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  value={message.time}
                  onChange={(event) =>
                    updateMessage(index, "time", event.target.value)
                  }
                  placeholder="Today at 9:14 AM"
                  aria-label="Message time"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleReply(index)}
                    className={`flex-1 rounded-md border px-2 text-xs font-medium transition ${
                      message.reply
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => updateMessage(index, "bot", !message.bot)}
                    className={`flex-1 rounded-md border px-2 text-xs font-medium transition ${
                      message.bot
                        ? "border-[#5865F2] bg-[#5865F2] text-white"
                        : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    Bot
                  </button>
                </div>
              </div>

              {message.reply ? (
                <div className="ml-3 flex flex-col gap-2 rounded-md border border-zinc-200 bg-zinc-50 p-2">
                  <TextInput
                    value={message.reply.name}
                    onChange={(event) =>
                      updateReply(index, "name", event.target.value)
                    }
                    placeholder="Replying to…"
                  />
                  <TextInput
                    value={message.reply.text}
                    onChange={(event) =>
                      updateReply(index, "text", event.target.value)
                    }
                    placeholder="Quoted message…"
                  />
                </div>
              ) : null}

              {message.reactions.map((reaction, reactionIndex) => (
                <div key={reactionIndex} className="flex items-center gap-2">
                  <TextInput
                    value={reaction.emoji}
                    onChange={(event) =>
                      updateReaction(
                        index,
                        reactionIndex,
                        "emoji",
                        event.target.value,
                      )
                    }
                    className="w-14 text-center"
                    aria-label="Reaction emoji"
                  />
                  <TextInput
                    type="number"
                    min="1"
                    value={reaction.count}
                    onChange={(event) =>
                      updateReaction(
                        index,
                        reactionIndex,
                        "count",
                        Number(event.target.value),
                      )
                    }
                    className="w-20"
                    aria-label="Reaction count"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateReaction(
                        index,
                        reactionIndex,
                        "me",
                        !reaction.me,
                      )
                    }
                    className={`flex-1 rounded-md border px-2 py-2 text-xs font-medium transition ${
                      reaction.me
                        ? "border-[#5865F2] bg-[#5865F2] text-white"
                        : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    You
                  </button>
                  <button
                    type="button"
                    aria-label="Remove reaction"
                    className="shrink-0 rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                    onClick={() => removeReaction(index, reactionIndex)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="h-8 px-2 text-xs"
                  onClick={() => addReaction(index)}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Reaction
                </Button>
              </div>
            </div>
          ))}

          <Button type="button" variant="secondary" onClick={addMessage}>
            <Plus className="h-4 w-4" />
            Add message
          </Button>
        </div>

        <Toggle
          label="Dark mode"
          description="Discord's signature dark theme"
          checked={thread.dark}
          onChange={(checked) => update("dark", checked)}
        />
      </section>

      <section className="flex-1 lg:sticky lg:top-24 lg:self-start">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Preview
          </h2>
        </div>

        <div
          className="overflow-x-auto rounded-2xl border border-dashed border-zinc-300 p-6"
          style={{ backgroundColor: thread.dark ? "#1E1F22" : "#F2F3F5" }}
        >
          <div className="w-fit">
            <DCCard ref={cardRef} {...thread} />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <Button
            type="button"
            className="flex-1"
            onClick={download}
            disabled={exporting}
          >
            <Download className="h-4 w-4" />
            {exporting ? "Exporting…" : "Download PNG"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setThread(createDefaultThread())}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </section>
    </div>
  );
}
