"use client";

import { useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import WACard from "./WACard";
import { AvatarField, MessageListEditor } from "./ChatEditor";
import { usePngExport } from "./usePngExport";
import { Button, Field, TextInput, Toggle } from "@/components/ui/Controls";

const createDefaultChat = () => ({
  contactName: "Leo Fischer",
  contactAvatar: "",
  contactStatus: "",
  dateLabel: "Today",
  composerText: "Message",
  readReceipts: true,
  messages: [
    {
      type: "text",
      side: "in",
      text: "are we still on for friday",
      time: "3:51 PM",
    },
    {
      type: "text",
      side: "out",
      text: "yes but I might be a bit late",
      time: "4:32 PM",
    },
    { type: "text", side: "in", text: "how late is a bit late", time: "5:38 PM" },
    {
      type: "text",
      side: "in",
      text: "ok I'll book the table for eight",
      time: "5:50 PM",
    },
    {
      type: "text",
      side: "out",
      text: "perfect, I'll bring the wine",
      time: "6:08 PM",
    },
    {
      type: "call",
      side: "in",
      callTitle: "Missed voice call",
      callSub: "Tap to call back",
      callMissed: true,
      time: "6:25 PM",
    },
    {
      type: "call",
      side: "in",
      callTitle: "Voice call",
      callSub: "1 min",
      time: "6:25 PM",
    },
    {
      type: "call",
      side: "out",
      callTitle: "Voice call",
      callSub: "1 min",
      time: "6:30 PM",
    },
    {
      type: "text",
      side: "in",
      text: "you still have my jacket by the way",
      time: "6:37 PM",
    },
  ],
  dark: false,
});

export default function WATools() {
  const [chat, setChat] = useState(createDefaultChat);
  const { cardRef, exporting, download } = usePngExport({
    background: chat.dark ? "#0B141A" : "#EFEAE2",
    filename: "whatsapp-chat",
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
        {
          type: "text",
          side: "out",
          text: "",
          time: "9:41 PM",
          image: "",
          reaction: "",
        },
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
            WhatsApp Chat Generator
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Build a fake WhatsApp conversation and export it as a PNG.
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
              placeholder="Sam Okafor"
            />
          </Field>

          <AvatarField
            label="Contact avatar"
            value={chat.contactAvatar}
            onChange={(value) => update("contactAvatar", value)}
          />

          <Field
            label="Status"
            hint='The line under the name â€” "online", "last seen today at 9:12 AM".'
          >
            <TextInput
              value={chat.contactStatus}
              onChange={(event) => update("contactStatus", event.target.value)}
              placeholder="online"
            />
          </Field>

          <Field label="Date label">
            <TextInput
              value={chat.dateLabel}
              onChange={(event) => update("dateLabel", event.target.value)}
              placeholder="Today"
            />
          </Field>

          <Field label="Composer placeholder">
            <TextInput
              value={chat.composerText}
              onChange={(event) => update("composerText", event.target.value)}
              placeholder="Message"
            />
          </Field>
        </div>

        <MessageListEditor
          messages={chat.messages}
          onChange={updateMessage}
          onAdd={addMessage}
          onRemove={removeMessage}
          onMove={moveMessage}
          showReaction={false}
          showCall
        />

        <div className="flex flex-col gap-3">
          <Toggle
            label="Blue ticks"
            description="Mark outgoing messages as read"
            checked={chat.readReceipts}
            onChange={(checked) => update("readReceipts", checked)}
          />
          <Toggle
            label="Dark mode"
            description="WhatsApp dark theme"
            checked={chat.dark}
            onChange={(checked) => update("dark", checked)}
          />
        </div>
      </section>

      <section className="flex-1 lg:sticky lg:top-24 lg:self-start">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Preview
          </h2>
        </div>

        <div
          className="overflow-x-auto rounded-2xl border border-dashed border-zinc-300 p-6"
          style={{ backgroundColor: chat.dark ? "#0B0B0C" : "#F2F4F5" }}
        >
          <div className="mx-auto w-fit">
            <WACard ref={cardRef} {...chat} />
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


