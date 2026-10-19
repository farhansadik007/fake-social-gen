"use client";

import { useRef, useState } from "react";
import { Download, ImageIcon, RotateCcw } from "lucide-react";
import XCard from "./XCard";
import { Button, Field, TextArea, TextInput, Toggle } from "@/components/ui/Controls";

const createDefaultPost = () => ({
  name: "Jane Doe",
  handle: "janedoe",
  avatar: "",
  verified: false,
  affiliation: "",
  createdAt: new Date().toISOString(),
  dark: false,
  text: "Just shipped a thing. It's fake, but the vibes are real.",
  replies: 12,
  retweets: 48,
  likes: 312,
  views: 8400,
});

const MAX_LENGTH = 280;

function toLocalInputValue(iso) {
  const date = new Date(iso);
  const pad = (value) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function XTools() {
  const [postData, setPostData] = useState(createDefaultPost);
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef(null);
  const fileInputRef = useRef(null);

  const update = (key, value) =>
    setPostData((prev) => ({ ...prev, [key]: value }));

  function onAvatarFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => update("avatar", reader.result);
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  async function download() {
    if (!cardRef.current) return;
    setExporting(true);

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: postData.dark ? "#000000" : "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `x-post-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
      alert(
        "Could not export the image. If you used an avatar URL, try uploading the image instead — external hosts often block export.",
      );
    } finally {
      setExporting(false);
    }
  }

  const overLimit = postData.text.length > MAX_LENGTH;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row">
      <section className="flex w-full flex-col gap-8 lg:max-w-md">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">X Post Generator</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Fill in the details and export a high-resolution PNG.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Profile
          </h2>

          <Field label="Display name">
            <TextInput
              value={postData.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Jane Doe"
            />
          </Field>

          <Field label="Handle">
            <TextInput
              value={postData.handle}
              onChange={(event) =>
                update("handle", event.target.value.replace(/^@+/, ""))
              }
              placeholder="janedoe"
            />
          </Field>

          <Field label="Avatar" hint="Upload a file or paste an image URL.">
            <div className="flex items-center gap-2">
              <img
                src={postData.avatar || "/default-avatar-x.png"}
                alt=""
                className="h-10 w-10 shrink-0 rounded-full border border-zinc-200 object-cover"
              />
              <TextInput
                value={postData.avatar}
                onChange={(event) => update("avatar", event.target.value)}
                placeholder="https://…"
              />
              <Button
                type="button"
                variant="secondary"
                aria-label="Upload avatar"
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
                onChange={onAvatarFile}
              />
            </div>
          </Field>

          <Toggle
            label="Verified"
            description="Show the blue check badge"
            checked={postData.verified}
            onChange={(checked) => update("verified", checked)}
          />

          <Field
            label="Affiliation"
            hint="Small badge shown next to the name (optional)."
          >
            <TextInput
              value={postData.affiliation}
              onChange={(event) => update("affiliation", event.target.value)}
              placeholder="https://…"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Content
          </h2>

          <Field
            label="Post text"
            hint={`${postData.text.length} / ${MAX_LENGTH} characters`}
          >
            <TextArea
              value={postData.text}
              onChange={(event) => update("text", event.target.value)}
              placeholder="What's happening?"
            />
          </Field>
          {overLimit ? (
            <p className="-mt-2 text-xs text-amber-600">
              X limits posts to {MAX_LENGTH} characters, but you can still export
              this.
            </p>
          ) : null}

          <Field label="Posted at">
            <TextInput
              type="datetime-local"
              value={toLocalInputValue(postData.createdAt)}
              onChange={(event) => {
                if (!event.target.value) return;
                update("createdAt", new Date(event.target.value).toISOString());
              }}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Engagement
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Replies">
              <TextInput
                type="number"
                min="0"
                value={postData.replies}
                onChange={(event) =>
                  update("replies", Number(event.target.value))
                }
              />
            </Field>
            <Field label="Reposts">
              <TextInput
                type="number"
                min="0"
                value={postData.retweets}
                onChange={(event) =>
                  update("retweets", Number(event.target.value))
                }
              />
            </Field>
            <Field label="Likes">
              <TextInput
                type="number"
                min="0"
                value={postData.likes}
                onChange={(event) =>
                  update("likes", Number(event.target.value))
                }
              />
            </Field>
            <Field label="Views">
              <TextInput
                type="number"
                min="0"
                value={postData.views}
                onChange={(event) =>
                  update("views", Number(event.target.value))
                }
              />
            </Field>
          </div>
        </div>

        <Toggle
          label="Dark mode"
          description="Export a dark theme version"
          checked={postData.dark}
          onChange={(checked) => update("dark", checked)}
        />
      </section>

      <section className="flex-1 lg:sticky lg:top-24 lg:self-start">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Preview
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-dashed border-zinc-300 bg-zinc-100/70 p-6">
          <div className="w-fit">
            <XCard ref={cardRef} {...postData} />
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
            onClick={() => setPostData(createDefaultPost())}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </section>
    </div>
  );
}
