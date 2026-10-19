"use client";

import { useRef, useState } from "react";
import { Download, ImageIcon, Plus, RotateCcw, X } from "lucide-react";
import IGCard from "./IGCard";
import { Button, Field, TextArea, TextInput, Toggle } from "@/components/ui/Controls";

const createDefaultPost = () => ({
  username: "jane.doe",
  avatar: "",
  verified: false,
  location: "Golden Gate Bridge, San Francisco",
  media: "",
  caption: "chasing golden hour 🌅 #35mm",
  liked: false,
  likes: 1284,
  commentCount: 37,
  comments: [
    { username: "alex.frames", text: "this is unreal 😍" },
    { username: "photo.mika", text: "what lens is this?" },
  ],
  createdAt: new Date().toISOString(),
  dark: false,
});

function toLocalInputValue(iso) {
  const date = new Date(iso);
  const pad = (value) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

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
            className="h-10 w-10 shrink-0 rounded-md border border-zinc-200 object-cover"
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

export default function IGTools() {
  const [postData, setPostData] = useState(createDefaultPost);
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef(null);

  const update = (key, value) =>
    setPostData((prev) => ({ ...prev, [key]: value }));

  const updateComment = (index, key, value) =>
    setPostData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment, i) =>
        i === index ? { ...comment, [key]: value } : comment,
      ),
    }));

  function addComment() {
    setPostData((prev) => ({
      ...prev,
      comments: [...prev.comments, { username: "", text: "" }],
    }));
  }

  function removeComment(index) {
    setPostData((prev) => ({
      ...prev,
      comments: prev.comments.filter((_, i) => i !== index),
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
        backgroundColor: postData.dark ? "#000000" : "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `instagram-post-${Date.now()}.png`;
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
            Instagram Post Generator
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Build a feed post and export it as a high-resolution PNG.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Profile
          </h2>

          <Field label="Username">
            <TextInput
              value={postData.username}
              onChange={(event) =>
                update("username", event.target.value.replace(/^@+/, ""))
              }
              placeholder="jane.doe"
            />
          </Field>

          <ImageField
            label="Profile photo"
            value={postData.avatar}
            onChange={(value) => update("avatar", value)}
          />

          <Toggle
            label="Verified"
            description="Show the blue check badge"
            checked={postData.verified}
            onChange={(checked) => update("verified", checked)}
          />

          <Field label="Location" hint="Shown under the username (optional).">
            <TextInput
              value={postData.location}
              onChange={(event) => update("location", event.target.value)}
              placeholder="San Francisco, CA"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Post
          </h2>

          <ImageField
            label="Media"
            hint="Square images work best — feed posts are cropped to 1:1."
            value={postData.media}
            onChange={(value) => update("media", value)}
          />

          <Field label="Caption">
            <TextArea
              value={postData.caption}
              onChange={(event) => update("caption", event.target.value)}
              placeholder="Say something…"
            />
          </Field>

          <Field label="Posted at">
            <TextInput
              type="datetime-local"
              value={toLocalInputValue(postData.createdAt)}
              onChange={(event) => {
                if (!event.target.value) return;
                update(
                  "createdAt",
                  new Date(event.target.value).toISOString(),
                );
              }}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Engagement
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Likes">
              <TextInput
                type="number"
                min="0"
                value={postData.likes}
                onChange={(event) => update("likes", Number(event.target.value))}
              />
            </Field>
            <Field label="Comment count">
              <TextInput
                type="number"
                min="0"
                value={postData.commentCount}
                onChange={(event) =>
                  update("commentCount", Number(event.target.value))
                }
              />
            </Field>
          </div>

          <Toggle
            label="Liked"
            description="Fill the heart in red"
            checked={postData.liked}
            onChange={(checked) => update("liked", checked)}
          />

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
              Comment previews
            </span>

            {postData.comments.map((comment, index) => (
              <div key={index} className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-3">
                <div className="flex items-center gap-2">
                  <TextInput
                    value={comment.username}
                    onChange={(event) =>
                      updateComment(index, "username", event.target.value)
                    }
                    placeholder="username"
                  />
                  <button
                    type="button"
                    aria-label="Remove comment"
                    className="shrink-0 rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                    onClick={() => removeComment(index)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <TextInput
                  value={comment.text}
                  onChange={(event) =>
                    updateComment(index, "text", event.target.value)
                  }
                  placeholder="Comment…"
                />
              </div>
            ))}

            <Button type="button" variant="secondary" onClick={addComment}>
              <Plus className="h-4 w-4" />
              Add comment
            </Button>
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
            <IGCard ref={cardRef} {...postData} />
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
