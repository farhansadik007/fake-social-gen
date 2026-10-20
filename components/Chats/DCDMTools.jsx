"use client";

import { useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import DCDMCard from "./DCDMCard";
import { AvatarField, MessageListEditor } from "./ChatEditor";
import { usePngExport } from "./usePngExport";
import { Button, Field, TextInput, Toggle } from "@/components/ui/Controls";

const createDefaultChat = () => ({
  contactName: "nadia",
  contactAvatar: "",
  contactStatus: "",
  dateLabel: "October 20, 2026",
  myName: "alex",
  myColor: "#5865F2",
  messages: [
    { side: "in", text: "hey, you around", time: "Today at 9:12 AM" },
    { side: "in", text: "need a second opinion on something", time: "Today at 9:12 AM" },
    { side: "out", text: "yeah whats up", time: "Today at 9:13 AM" },
    {
      side: "in",
      text: "is it weird to reply to a two week old message",
      time: "Today at 9:14 AM",
    },
    { side: "out", text: "depends on the message", time: "Today at 9:14 AM" },
    {
      side: "in",
      text: "it said let me know if you ever want to grab coffee",
      time: "Today at 9:15 AM",
    },
    { side: "out", text: "thats a trap", time: "Today at 9:15 AM" },
    { side: "in", text: "thought so", time: "Today at 9:16 AM" },
  ],
  dark: true,
});

export default function DCDMTools() {
  const [chat, setChat] = useState(createDefaultChat);
  const { cardRef, exporting, download } = usePngExport({
    background: chat.dark ? "#313338" : "#FFFFFF",
    filename: "discord-dm",
  });

  const update = (key, value) => setChat((prev) => ({ ...prev, [key]: value }));

  const updateMessage = (index, key, value) =>
    setChat((prev) => ({
      ...prev,
      messages: prev.messages.map((message, i) =>
        i === index ? { ...message, [key]: value } : message,
      ),
    }));

  function addMessage() {
    setChat((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        { side: "out", text: "", time: "Today at 9:41 AM", image: "", reaction: "" },
      ],
    }));
  }

  function removeMessage(index) {
    setChat((prev) => ({
      ...prev,
      messages: prev.messages.filter((_, i) => i !== index),
    }));
  }

  function moveMessage(index, direction) {
    setChat((prev) => {
      const next = [...prev.messages];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...prev, messages: next };
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row">
      <section className="flex w-full flex-col gap-8 lg:max-w-md">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Discord DM Generator
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Build a fake Discord direct message thread and export it as a PNG.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Conversation
          </h2>

          <Field label="Contact name">
            <TextInput
              value={chat.contactName}
              onChange={(event) => update("contactName", event.target.value)}
              placeholder="nadia"
            />
          </Field>

          <AvatarField
            label="Contact avatar"
            value={chat.contactAvatar}
            onChange={(value) => update("contactAvatar", value)}
          />

          <Field label="Header status" hint="Optional â€” leave empty to hide.">
            <TextInput
              value={chat.contactStatus}
              onChange={(event) => update("contactStatus", event.target.value)}
              placeholder="Viewing your DM"
            />
          </Field>

          <Field label="Date divider">
            <TextInput
              value={chat.dateLabel}
              onChange={(event) => update("dateLabel", event.target.value)}
              placeholder="October 20, 2026"
            />
          </Field>

          <div className="grid grid-cols-[1fr_3.5rem] items-end gap-2">
            <Field label="Your name" hint="Shown on outgoing messages.">
              <TextInput
                value={chat.myName}
                onChange={(event) => update("myName", event.target.value)}
                placeholder="alex"
              />
            </Field>
            <input
              type="color"
              value={chat.myColor}
              onChange={(event) => update("myColor", event.target.value)}
              aria-label="Your name colour"
              className="h-10 w-full cursor-pointer rounded-lg border border-zinc-300 bg-white p-1"
            />
          </div>
        </div>

        <MessageListEditor
          messages={chat.messages}
          onChange={updateMessage}
          onAdd={addMessage}
          onRemove={removeMessage}
          onMove={moveMessage}
        />

        <Toggle
          label="Dark mode"
          description="Discord dark theme"
          checked={chat.dark}
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
          style={{ backgroundColor: chat.dark ? "#1E1F22" : "#F2F4F5" }}
        >
          <div className="mx-auto w-fit">
            <DCDMCard ref={cardRef} {...chat} />
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
            {exporting ? "Exportingâ€¦" : "Download PNG"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setChat(createDefaultChat())}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </section>
    </div>
  );
}
