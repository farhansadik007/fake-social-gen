"use client";

import { useRef, useState } from "react";
import { Download, ImageIcon, Layers, MessageCircle, Plus, RotateCcw, X } from "lucide-react";
import TTVideoCard from "./TTVideoCard";
import TTCommentsCard from "./TTCommentsCard";
import TTOverlayCard from "./TTOverlayCard";
import { Button, Field, TextArea, TextInput, Toggle } from "@/components/ui/Controls";

const createDefaultPost = () => ({
  view: "video",
  username: "jane.doe",
  verified: false,
  avatar: "",
  video: "",
  caption: "pov: you finally fixed the bug at 3am ðŸ›âœ¨ #devlife #coding",
  music: "original sound - jane.doe",
  liked: false,
  likes: 128400,
  commentCount: 1842,
  saves: 9420,
  shares: 3110,
  dark: false,
  createdAt: new Date().toISOString(),
  comments: [
    {
      name: "marcus.dev",
      text: "the 3am fix is always the real one ðŸ˜­",
      likes: 2400,
      liked: true,
      createdAt: new Date().toISOString(),
      avatar: "",
    },
    {
      name: "priya.builds",
      text: "why is this so accurate",
      likes: 891,
      liked: false,
      createdAt: new Date().toISOString(),
      avatar: "",
    },
    {
      name: "alex.codes",
      text: "saved for my next all-nighter",
      likes: 46,
      liked: false,
      createdAt: new Date().toISOString(),
      avatar: "",
    },
  ],
});

const VIEWS = [
  { id: "video", label: "Video", icon: null },
  { id: "comments", label: "Comments", icon: MessageCircle },
  { id: "overlay", label: "Overlay", icon: Layers },
];

function toLocalInputValue(iso) {
  const date = new Date(iso);
  const pad = (value) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function ImageField({ label, hint, value, onChange, round = "rounded-md" }) {
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
            className={`h-10 w-10 shrink-0 border border-zinc-200 object-cover ${round}`}
          />
        ) : null}
        <TextInput
          value={value.startsWith("data:") ? "" : value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://â€¦ or upload"
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

export default function TTTools() {
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
      comments: [
        ...prev.comments,
        {
          name: "",
          text: "",
          likes: 0,
          liked: false,
          createdAt: new Date().toISOString(),
          avatar: "",
        },
      ],
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
        backgroundColor:
          postData.view === "comments"
            ? postData.dark
              ? "#161823"
              : "#ffffff"
            : "#000000",
      });

      const link = document.createElement("a");
      link.download = `tiktok-${postData.view}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
      alert(
        "Could not export the image. If you used an image URL, try uploading the file instead â€” external hosts often block export.",
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
            TikTok Generator
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Build a video screen, a comment sheet, or comments layered over the
            video â€” then export a high-resolution PNG.
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
            round="rounded-full"
          />

          <Toggle
            label="Verified"
            description="Show the teal check badge"
            checked={postData.verified}
            onChange={(checked) => update("verified", checked)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Video screen
          </h2>

          <ImageField
            label="Video frame"
            hint="A poster image for the 9:16 video."
            value={postData.video}
            onChange={(value) => update("video", value)}
          />

          <Field label="Caption">
            <TextArea
              value={postData.caption}
              onChange={(event) => update("caption", event.target.value)}
              placeholder="Say somethingâ€¦"
            />
          </Field>

          <Field label="Sound" hint="Shown next to the music note.">
            <TextInput
              value={postData.music}
              onChange={(event) => update("music", event.target.value)}
              placeholder="original sound - jane.doe"
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
            <Field label="Comments">
              <TextInput
                type="number"
                min="0"
                value={postData.commentCount}
                onChange={(event) =>
                  update("commentCount", Number(event.target.value))
                }
              />
            </Field>
            <Field label="Saves">
              <TextInput
                type="number"
                min="0"
                value={postData.saves}
                onChange={(event) => update("saves", Number(event.target.value))}
              />
            </Field>
            <Field label="Shares">
              <TextInput
                type="number"
                min="0"
                value={postData.shares}
                onChange={(event) => update("shares", Number(event.target.value))}
              />
            </Field>
          </div>

          <Toggle
            label="Liked"
            description="Fill the heart red"
            checked={postData.liked}
            onChange={(checked) => update("liked", checked)}
          />

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
            Comments
          </h2>

          {postData.comments.map((comment, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-3"
            >
              <div className="flex items-center gap-2">
                <TextInput
                  value={comment.name}
                  onChange={(event) =>
                    updateComment(index, "name", event.target.value)
                  }
                  placeholder="username"
                />
                <TextInput
                  type="number"
                  min="0"
                  className="w-24 shrink-0"
                  value={comment.likes}
                  onChange={(event) =>
                    updateComment(index, "likes", Number(event.target.value))
                  }
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
                placeholder="Commentâ€¦"
              />
            </div>
          ))}

          <Button type="button" variant="secondary" onClick={addComment}>
            <Plus className="h-4 w-4" />
            Add comment
          </Button>
        </div>

        <Toggle
          label="Dark mode"
          description="Applies to the comment sheet"
          checked={postData.dark}
          onChange={(checked) => update("dark", checked)}
        />
      </section>

      <section className="flex-1 lg:sticky lg:top-24 lg:self-start">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Preview
          </h2>

          {/* View switcher */}
          <div className="flex rounded-lg border border-zinc-300 bg-white p-0.5">
            {VIEWS.map((view) => {
              const Icon = view.icon;
              const active = postData.view === view.id;

              return (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => update("view", view.id)}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {view.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-dashed border-zinc-300 bg-zinc-100/70 p-6">
          <div className="mx-auto w-fit">
            {postData.view === "video" && (
              <TTVideoCard ref={cardRef} {...postData} />
            )}
            {postData.view === "comments" && (
              <TTCommentsCard ref={cardRef} {...postData} />
            )}
            {postData.view === "overlay" && (
              <TTOverlayCard ref={cardRef} {...postData} />
            )}
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
