"use client";

import { useRef } from "react";
import { ArrowDownLeft, ArrowUpRight, ImageIcon, Plus, X } from "lucide-react";
import { Button, Field, TextArea, TextInput } from "@/components/ui/Controls";

export function AvatarField({ label = "Avatar", value, onChange, hint }) {
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

function MessageImageField({ value, onChange }) {
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
    <>
      <Button
        type="button"
        variant="secondary"
        className="h-8 px-2 text-xs"
        aria-label="Attach image"
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon className="h-3.5 w-3.5" />
        {value ? "Replace" : "Photo"}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />
    </>
  );
}

function MessageRow({
  message,
  index,
  total,
  onChange,
  onRemove,
  onMove,
  showReaction,
  showCall,
}) {
  const out = message.side === "out";
  const isCall = message.type === "call";

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(index, "side", out ? "in" : "out")}
          className={`inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold transition ${
            out
              ? "bg-zinc-900 text-white"
              : "border border-zinc-300 bg-white text-zinc-700"
          }`}
          title="Toggle who sent this"
        >
          {out ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownLeft className="h-3.5 w-3.5" />
          )}
          {out ? "Outgoing" : "Incoming"}
        </button>

        {showCall ? (
          <div className="flex overflow-hidden rounded-full border border-zinc-300 text-xs">
            <button
              type="button"
              className={`px-2.5 py-1.5 transition ${
                isCall ? "text-zinc-500 hover:bg-zinc-100" : "bg-zinc-900 text-white"
              }`}
              onClick={() => onChange(index, "type", "text")}
            >
              Text
            </button>
            <button
              type="button"
              className={`px-2.5 py-1.5 transition ${
                isCall ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-100"
              }`}
              onClick={() => onChange(index, "type", "call")}
            >
              Call
            </button>
          </div>
        ) : null}

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            aria-label="Move up"
            disabled={index === 0}
            className="rounded-md px-1.5 py-1 text-xs text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:opacity-30"
            onClick={() => onMove(index, -1)}
          >
            ↑
          </button>
          <button
            type="button"
            aria-label="Move down"
            disabled={index === total - 1}
            className="rounded-md px-1.5 py-1 text-xs text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:opacity-30"
            onClick={() => onMove(index, 1)}
          >
            ↓
          </button>
          <button
            type="button"
            aria-label="Remove message"
            className="rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
            onClick={() => onRemove(index)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isCall ? (
        <>
          <TextInput
            value={message.callTitle || ""}
            onChange={(event) => onChange(index, "callTitle", event.target.value)}
            placeholder="Voice call"
            aria-label="Call label"
          />
          <TextInput
            value={message.callSub || ""}
            onChange={(event) => onChange(index, "callSub", event.target.value)}
            placeholder="1 min"
            aria-label="Call detail"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange(index, "callMissed", !message.callMissed)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                message.callMissed
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              Missed
            </button>
            <TextInput
              value={message.time}
              onChange={(event) => onChange(index, "time", event.target.value)}
              placeholder="3:51 PM"
              aria-label="Message time"
            />
          </div>
        </>
      ) : (
        <>
          <TextArea
            value={message.text}
            onChange={(event) => onChange(index, "text", event.target.value)}
            placeholder="Message…"
            className="min-h-16"
          />

          <div className={`grid gap-2 ${showReaction ? "grid-cols-2" : ""}`}>
            <TextInput
              value={message.time}
              onChange={(event) => onChange(index, "time", event.target.value)}
              placeholder="9:41"
              aria-label="Message time"
            />
            {showReaction ? (
              <TextInput
                value={message.reaction || ""}
                onChange={(event) =>
                  onChange(index, "reaction", event.target.value)
                }
                placeholder="Reaction (emoji)"
                aria-label="Message reaction"
              />
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <MessageImageField
              value={message.image || ""}
              onChange={(value) => onChange(index, "image", value)}
            />
            {message.image ? (
              <button
                type="button"
                className="text-xs text-zinc-500 underline"
                onClick={() => onChange(index, "image", "")}
              >
                Remove photo
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export function MessageListEditor({
  messages,
  onChange,
  onAdd,
  onRemove,
  onMove,
  showReaction = true,
  showCall = false,
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        Messages
      </span>

      {messages.map((message, index) => (
        <MessageRow
          key={index}
          message={message}
          index={index}
          total={messages.length}
          onChange={onChange}
          onRemove={onRemove}
          onMove={onMove}
          showReaction={showReaction}
          showCall={showCall}
        />
      ))}

      <Button type="button" variant="secondary" onClick={onAdd}>
        <Plus className="h-4 w-4" />
        Add message
      </Button>
    </div>
  );
}
