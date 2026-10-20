"use client";

import { useRef, useState } from "react";
import { Download, ImageIcon, Plus, RotateCcw, X } from "lucide-react";
import RDCard from "./RDCard";
import { Button, Field, TextArea, TextInput, Toggle } from "@/components/ui/Controls";

const createDefaultPost = () => ({
  subreddit: "AskReddit",
  communityIcon: "",
  author: "quietstorm_92",
  userFlair: "Top 1% Poster",
  title: "What's a small thing that instantly makes you distrust someone?",
  flair: "",
  flairColor: "#0079d3",
  text: "Saw this on another sub and the answers were gold, so I'm curious what you all think.",
  seeMore: false,
  media: "",
  score: 12400,
  vote: "up",
  commentCount: 1842,
  shareCount: 31,
  comments: [
    {
      name: "notmyfirstrodeo",
      text: "Being rude to service workers. It tells you exactly how they treat people who can't do anything for them.",
      score: 4120,
      time: "3h",
      avatar: "",
      replies: [
        {
          name: "lurker1987",
          text: "This is always the answer. Never fails.",
          score: 312,
          time: "2h",
          avatar: "",
        },
      ],
    },
    {
      name: "midnight_snack",
      text: "Overpromising and never delivering. One missed deadline is fine, a pattern is a personality.",
      score: 860,
      time: "2h",
      avatar: "",
      replies: [],
    },
  ],
  createdAt: new Date().toISOString(),
  dark: true,
});

const VOTES = [
  { id: "up", label: "Upvoted" },
  { id: "none", label: "No vote" },
  { id: "down", label: "Downvoted" },
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

export default function RDTools() {
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

  const updateReply = (commentIndex, replyIndex, key, value) =>
    setPostData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment, i) =>
        i === commentIndex
          ? {
              ...comment,
              replies: comment.replies.map((reply, j) =>
                j === replyIndex ? { ...reply, [key]: value } : reply,
              ),
            }
          : comment,
      ),
    }));

  function addComment() {
    setPostData((prev) => ({
      ...prev,
      comments: [
        ...prev.comments,
        { name: "", text: "", score: 0, time: "1h", avatar: "", replies: [] },
      ],
    }));
  }

  function removeComment(index) {
    setPostData((prev) => ({
      ...prev,
      comments: prev.comments.filter((_, i) => i !== index),
    }));
  }

  function addReply(commentIndex) {
    setPostData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment, i) =>
        i === commentIndex
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { name: "", text: "", score: 0, time: "1h", avatar: "" },
              ],
            }
          : comment,
      ),
    }));
  }

  function removeReply(commentIndex, replyIndex) {
    setPostData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment, i) =>
        i === commentIndex
          ? {
              ...comment,
              replies: comment.replies.filter((_, j) => j !== replyIndex),
            }
          : comment,
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
        backgroundColor: postData.dark ? "#0A1113" : "#F2F4F5",
      });

      const link = document.createElement("a");
      link.download = `reddit-post-${Date.now()}.png`;
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
            Reddit Post Generator
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Build a subreddit post and export it as a high-resolution PNG.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Community
          </h2>

          <Field label="Subreddit" hint="Shown after the r/ prefix.">
            <TextInput
              value={postData.subreddit}
              onChange={(event) => update("subreddit", event.target.value)}
              placeholder="AskReddit"
            />
          </Field>

          <ImageField
            label="Community icon"
            value={postData.communityIcon}
            onChange={(value) => update("communityIcon", value)}
          />

          <Field label="Author">
            <TextInput
              value={postData.author}
              onChange={(event) => update("author", event.target.value)}
              placeholder="quietstorm_92"
            />
          </Field>

          <Field label="User flair" hint="Badge next to the author name.">
            <TextInput
              value={postData.userFlair}
              onChange={(event) => update("userFlair", event.target.value)}
              placeholder="Top 1% Poster"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Post
          </h2>

          <Field label="Title">
            <TextArea
              value={postData.title}
              onChange={(event) => update("title", event.target.value)}
              placeholder="What's on your mind?"
              className="min-h-16"
            />
          </Field>

          <div className="grid grid-cols-[1fr_3.5rem] items-end gap-2">
            <Field label="Flair" hint="Leave empty to hide the chip.">
              <TextInput
                value={postData.flair}
                onChange={(event) => update("flair", event.target.value)}
                placeholder="Discussion"
              />
            </Field>
            <input
              type="color"
              value={postData.flairColor}
              onChange={(event) => update("flairColor", event.target.value)}
              aria-label="Flair colour"
              className="h-10 w-full cursor-pointer rounded-lg border border-zinc-300 bg-white p-1"
            />
          </div>

          <Field label="Body" hint="Leave empty for a title-only post.">
            <TextArea
              value={postData.text}
              onChange={(event) => update("text", event.target.value)}
              placeholder="Optional body text…"
            />
          </Field>

          <Toggle
            label="Truncate body"
            description="Collapse the body to 3 lines"
            checked={postData.seeMore}
            onChange={(checked) => update("seeMore", checked)}
          />

          <ImageField
            label="Photo"
            hint="Shown under the body text."
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
            Votes
          </h2>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Score">
              <TextInput
                type="number"
                value={postData.score}
                onChange={(event) => update("score", Number(event.target.value))}
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

          <Field label="Vote state">
            <div className="flex flex-wrap gap-2">
              {VOTES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => update("vote", option.id)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    postData.vote === option.id
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </Field>
        </div>

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
                  placeholder="Username"
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

              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  type="number"
                  value={comment.score}
                  onChange={(event) =>
                    updateComment(index, "score", Number(event.target.value))
                  }
                  placeholder="Score"
                  aria-label="Comment score"
                />
                <TextInput
                  value={comment.time}
                  onChange={(event) =>
                    updateComment(index, "time", event.target.value)
                  }
                  placeholder="3h"
                  aria-label="Comment age"
                />
              </div>

              {comment.replies.map((reply, replyIndex) => (
                <div
                  key={replyIndex}
                  className="ml-3 flex flex-col gap-2 rounded-md border border-zinc-200 bg-zinc-50 p-2"
                >
                  <div className="flex items-center gap-2">
                    <TextInput
                      value={reply.name}
                      onChange={(event) =>
                        updateReply(index, replyIndex, "name", event.target.value)
                      }
                      placeholder="Reply author"
                    />
                    <button
                      type="button"
                      aria-label="Remove reply"
                      className="shrink-0 rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-700"
                      onClick={() => removeReply(index, replyIndex)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <TextInput
                    value={reply.text}
                    onChange={(event) =>
                      updateReply(index, replyIndex, "text", event.target.value)
                    }
                    placeholder="Reply…"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <TextInput
                      type="number"
                      value={reply.score}
                      onChange={(event) =>
                        updateReply(
                          index,
                          replyIndex,
                          "score",
                          Number(event.target.value),
                        )
                      }
                      placeholder="Score"
                      aria-label="Reply score"
                    />
                    <TextInput
                      value={reply.time}
                      onChange={(event) =>
                        updateReply(index, replyIndex, "time", event.target.value)
                      }
                      placeholder="2h"
                      aria-label="Reply age"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="secondary"
                className="h-8 px-2 text-xs"
                onClick={() => addReply(index)}
              >
                <Plus className="h-3.5 w-3.5" />
                Add reply
              </Button>
            </div>
          ))}

          <Button type="button" variant="secondary" onClick={addComment}>
            <Plus className="h-4 w-4" />
            Add comment
          </Button>
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
          style={{ backgroundColor: postData.dark ? "#0A1113" : "#F2F4F5" }}
        >
          <div className="w-fit">
            <RDCard ref={cardRef} {...postData} />
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
