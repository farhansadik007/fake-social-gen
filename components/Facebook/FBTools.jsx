"use client";

import { useRef, useState } from "react";
import { Download, ImageIcon, Plus, RotateCcw, X } from "lucide-react";
import FBCard, { ReactionChip } from "./FBCard";
import { Button, Field, TextArea, TextInput, Toggle } from "@/components/ui/Controls";

const createDefaultPost = () => ({
  name: "Jane Doe",
  avatar: "",
  verified: false,
  text: "Six years ago I quit my job to build something of my own. Today we crossed 10,000 customers ðŸŽ‰\n\nTo everyone who took a chance on us â€” thank you. This is just the start.",
  seeMore: false,
  media: "",
  reactions: 4820,
  reaction: "like",
  commentCount: 312,
  shareCount: 47,
  comments: [
    { name: "Marcus Reid", text: "Well deserved â€” congrats to the whole team!", likes: 24, time: "2h", avatar: "" },
    { name: "Priya Nair", text: "So proud of you both â¤ï¸", likes: 0, time: "1h", avatar: "" },
  ],
  createdAt: new Date().toISOString(),
  dark: false,
});

const REACTIONS = [
  { id: "like", label: "Like" },
  { id: "love", label: "Love" },
  { id: "haha", label: "Haha" },
  { id: "wow", label: "Wow" },
  { id: "sad", label: "Sad" },
  { id: "angry", label: "Angry" },
];

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

export default function FBTools() {
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
      comments: [...prev.comments, { name: "", text: "", time: "1h", avatar: "" }],
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
        backgroundColor: postData.dark ? "#18191A" : "#F0F2F5",
      });

      const link = document.createElement("a");
      link.download = `facebook-post-${Date.now()}.png`;
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
            Facebook Post Generator
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Build a feed post and export it as a high-resolution PNG.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Profile
          </h2>

          <Field label="Name">
            <TextInput
              value={postData.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Jane Doe"
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
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Post
          </h2>

          <Field label="Text">
            <TextArea
              value={postData.text}
              onChange={(event) => update("text", event.target.value)}
              placeholder="What's on your mind?"
            />
          </Field>

          <Toggle
            label="Show â€œSee moreâ€"
            description="Truncate the body to 3 lines"
            checked={postData.seeMore}
            onChange={(checked) => update("seeMore", checked)}
          />

          <ImageField
            label="Photo"
            hint="Shown full-width under the text."
            value={postData.media}
            onChange={(value) => update("media", value)}
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
            Engagement
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Reactions">
              <TextInput
                type="number"
                min="0"
                value={postData.reactions}
                onChange={(event) =>
                  update("reactions", Number(event.target.value))
                }
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
            <Field label="Shares">
              <TextInput
                type="number"
                min="0"
                value={postData.shareCount}
                onChange={(event) =>
                  update("shareCount", Number(event.target.value))
                }
              />
            </Field>
          </div>

          <Field label="Leading reaction" hint="Drives the Like button state.">
            <div className="flex flex-wrap gap-2">
              {REACTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => update("reaction", option.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
                    postData.reaction === option.id
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  <ReactionChip id={option.id} size={17} ring={false} />
                  {option.label}
                </button>
              ))}
            </div>
          </Field>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
              Comments
            </span>

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
                    placeholder="Name"
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
                <div className="grid grid-cols-2 gap-2">
                  <TextInput
                    type="number"
                    min="0"
                    value={comment.likes ?? 0}
                    onChange={(event) =>
                      updateComment(index, "likes", Number(event.target.value))
                    }
                    placeholder="Likes"
                    aria-label="Comment likes"
                  />
                  <TextInput
                    value={comment.time ?? ""}
                    onChange={(event) =>
                      updateComment(index, "time", event.target.value)
                    }
                    placeholder="2h"
                    aria-label="Comment age"
                  />
                </div>
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

        <div
          className="overflow-x-auto rounded-2xl border border-dashed border-zinc-300 p-6"
          style={{ backgroundColor: postData.dark ? "#18191A" : "#F0F2F5" }}
        >
          <div className="mx-auto w-fit">
            <FBCard ref={cardRef} {...postData} />
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
