"use client";

import { useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import MSCard from "./MSCard";
import { AvatarField, MessageListEditor } from "./ChatEditor";
import { usePngExport } from "./usePngExport";
import { Button, Field, TextInput, Toggle } from "@/components/ui/Controls";

const createDefaultChat = () => ({
  contactName: "Priya Raman",
  contactAvatar: "",
  contactStatus: "Active now",
  dateLabel: "Today 10:02 AM",
  composerText: "Aa",
  seenLabel: "Seen",
  messages: [
    { side: "in", text: "did you see the email from legal", time: "10:02" },
    { side: "out", text: "unfortunately yes", time: "10:03" },
    {
      side: "out",
      text: "we are not allowed to call it a launch anymore",
      time: "10:03",
    },
    { side: "in", text: "what are we calling it", time: "10:04" },
    {
      side: "out",
      text: "a staged availability event",
      time: "10:04",
      reaction: "â™¥",
    },
    { side: "in", text: "I hate it here", time: "10:05" },
  ],
  dark: false,
});

export default function MSTools() {
  const [chat, setChat] = useState(createDefaultChat);
  const { cardRef, exporting, download } = usePngExport({
    background: chat.dark ? "#000000" : "#FFFFFF",
    filename: "messenger-chat",
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
        { side: "out", text: "", time: "10:10", image: "", reaction: "" },
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
            Messenger Chat Generator
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Build a fake Messenger conversation and export it as a PNG.
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
              placeholder="Priya Raman"
            />
          </Field>

          <AvatarField
            label="Contact avatar"
            value={chat.contactAvatar}
            onChange={(value) => update("contactAvatar", value)}
          />

          <Field label="Status" hint='"Active now", "Active 2h ago".'>
            <TextInput
              value={chat.contactStatus}
              onChange={(event) => update("contactStatus", event.target.value)}
              placeholder="Active now"
            />
          </Field>

          <Field label="Date label">
            <TextInput
              value={chat.dateLabel}
              onChange={(event) => update("dateLabel", event.target.value)}
              placeholder="Today 10:02 AM"
            />
          </Field>

          <Field label="Seen label" hint="Leave empty to hide.">
            <TextInput
              value={chat.seenLabel}
              onChange={(event) => update("seenLabel", event.target.value)}
              placeholder="Seen"
            />
          </Field>

          <Field label="Composer placeholder">
            <TextInput
              value={chat.composerText}
              onChange={(event) => update("composerText", event.target.value)}
              placeholder="Aa"
            />
          </Field>
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
          description="Messenger dark theme"
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
          style={{ backgroundColor: chat.dark ? "#18181B" : "#F2F4F5" }}
        >
          <div className="mx-auto w-fit">
            <MSCard ref={cardRef} {...chat} />
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
