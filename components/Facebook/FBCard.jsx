import { formatFBDate } from "@/lib/formatFBDate";
import { formatFBNumber } from "@/lib/formatFBNumber";
import {
  Camera,
  ChevronDown,
  Globe2,
  MessageCircle,
  MoreHorizontal,
  Smile,
  ThumbsUp,
} from "lucide-react";

// Facebook's real reaction artwork (243×243 PNGs in /public/facebook).
const REACTION_SRC = {
  like: "/facebook/like.png",
  love: "/facebook/love.png",
  haha: "/facebook/haha.png",
  wow: "/facebook/wow.png",
  sad: "/facebook/sad.png",
  angry: "/facebook/angry.png",
};

const CARD_STYLES = {
  light: {
    surface:
      "bg-white text-[#050505] border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
    ring: "#ffffff",
    secondary: "text-[#65676B]",
    action: "text-[#65676B] hover:bg-black/[0.05]",
    divider: "border-[#ced0d4]",
    bubble: "bg-[#f0f2f5] text-[#050505]",
    field: "bg-[#f0f2f5] text-[#65676B]",
    badge: "bg-white",
    like: "#0866FF",
  },
  dark: {
    surface: "bg-[#242526] text-[#e4e6eb] border-black/40",
    ring: "#242526",
    secondary: "text-[#b0b3b8]",
    action: "text-[#b0b3b8] hover:bg-white/10",
    divider: "border-[#3e4042]",
    bubble: "bg-[#3a3b3c] text-[#e4e6eb]",
    field: "bg-[#3a3b3c] text-[#b0b3b8]",
    badge: "bg-[#3a3b3c]",
    like: "#4599FF",
  },
};

const REACTIONS = [
  { id: "like", label: "Like" },
  { id: "love", label: "Love" },
  { id: "haha", label: "Haha" },
  { id: "wow", label: "Wow" },
  { id: "sad", label: "Sad" },
  { id: "angry", label: "Angry" },
];

export function ReactionChip({ id, size = 18, ring = true, ringColor = "#fff" }) {
  const src = REACTION_SRC[id] ?? REACTION_SRC.like;

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      draggable={false}
      className="block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        boxShadow: ring ? `0 0 0 2px ${ringColor}` : undefined,
      }}
    />
  );
}

/** Facebook's share arrow — a curved tail pointing right. */
function FBShareIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M13 5.5 20.5 11 13 16.5V13c-5.2 0-8 1.9-9 5 .4-6.3 3.6-9.7 9-10V5.5Z" />
    </svg>
  );
}

function FBVerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0">
      <circle cx="12" cy="12" r="11" fill="#0866FF" />
      <path
        d="M7 12.4 10.4 15.8 17 9.2"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function FBCard({
  ref,
  name,
  avatar,
  verified,
  text,
  seeMore,
  media,
  reactions,
  reaction,
  commentCount,
  shareCount,
  comments,
  createdAt,
  dark,
}) {
  const style = dark ? CARD_STYLES.dark : CARD_STYLES.light;
  const reacted = reaction !== "like";
  const leading = REACTIONS.find((r) => r.id === reaction) ?? REACTIONS[0];

  const stacked = [
    ...REACTIONS.filter((r) => r.id === reaction),
    ...REACTIONS.filter((r) => r.id !== reaction).slice(0, 2),
  ];

  return (
    <div
      ref={ref}
      id="fb-card"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
      className={`w-125 overflow-hidden rounded-lg border font-sans ${style.surface}`}
    >
      {/* Header */}
      <div className="flex items-start gap-2.5 px-4 pt-3">
        <img
          src={avatar || "/default-avatar-x.png"}
          alt={name}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate text-[15px] font-semibold leading-tight">
              {name}
            </span>
            {verified && <FBVerifiedBadge />}
          </div>
          <div
            className={`mt-0.5 flex items-center gap-1 text-[13px] ${style.secondary}`}
          >
            <span>{formatFBDate(createdAt)}</span>
            <span>·</span>
            <Globe2 className="h-3 w-3" strokeWidth={2} />
          </div>
        </div>

        <MoreHorizontal className={`h-5 w-5 shrink-0 ${style.secondary}`} />
      </div>

      {/* Body */}
      <div className="px-4 pt-2">
        <p className="text-[15px] leading-[1.3333]">
          <span className={seeMore ? "line-clamp-3" : "whitespace-pre-wrap"}>
            {text}
          </span>
          {seeMore && <span> …See more</span>}
        </p>
      </div>

      {/* Media runs edge to edge */}
      {media ? (
        <div className="mt-3">
          <img src={media} alt="" className="aspect-square w-full object-cover" />
        </div>
      ) : null}

      {/* Reaction + counts */}
      <div
        className={`flex items-center justify-between px-4 pt-2.5 pb-2 text-[15px] ${style.secondary}`}
      >
        <span className="flex items-center gap-1.5">
          <span className="flex -space-x-1">
            {stacked.map((r) => (
              <ReactionChip
                key={r.id}
                id={r.id}
                size={18}
                ringColor={style.ring}
              />
            ))}
          </span>
          <span>{formatFBNumber(reactions)}</span>
        </span>

        <span>
          {commentCount > 0 && `${formatFBNumber(commentCount)} comments`}
          {commentCount > 0 && shareCount > 0 && " · "}
          {shareCount > 0 && `${formatFBNumber(shareCount)} shares`}
        </span>
      </div>

      {/* Like / Comment / Share — full-bleed hairline, FB-style */}
      <div className={`border-t ${style.divider}`}>
        <div className="flex items-center gap-1 px-2 py-1">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-[15px] font-semibold transition"
            style={{ color: reacted ? undefined : style.like }}
          >
            {reacted ? (
              <ReactionChip id={reaction} size={20} ring={false} />
            ) : (
              <ThumbsUp
                className="h-5 w-5 shrink-0"
                strokeWidth={2}
                fill="currentColor"
              />
            )}
            <span>{reacted ? leading.label : "Like"}</span>
          </button>

          <button
            type="button"
            className={`flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-[15px] font-semibold transition ${style.action}`}
          >
            <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={2} />
            <span>Comment</span>
          </button>

          <button
            type="button"
            className={`flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-[15px] font-semibold transition ${style.action}`}
          >
            <FBShareIcon className="h-5 w-5 shrink-0" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments */}
      {comments.length > 0 && (
        <div className={`border-t px-4 pt-1 pb-3 ${style.divider}`}>
          <div
            className={`flex items-center gap-1 pt-2.5 text-[13px] font-semibold ${style.secondary}`}
          >
            <span>Most relevant</span>
            <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
          </div>

          {comments.map((comment, index) => (
            <div key={index} className="flex gap-2 pt-3">
              <img
                src={comment.avatar || "/default-avatar-x.png"}
                alt={comment.name}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div
                  className={`relative w-fit max-w-full rounded-[18px] px-3 py-2 ${
                    comment.likes > 0 ? "pr-9" : ""
                  } ${style.bubble}`}
                >
                  <p className="text-[13px] font-semibold leading-tight">
                    {comment.name}
                  </p>
                  <p className="mt-0.5 text-[15px] leading-[1.3333]">
                    {comment.text}
                  </p>

                  {comment.likes > 0 && (
                    <span
                      className={`absolute -right-1.5 -bottom-2 flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.2)] ring-1 ring-black/10 ${style.badge} ${style.secondary}`}
                    >
                      <ReactionChip id="like" size={13} ring={false} />
                      {formatFBNumber(comment.likes)}
                    </span>
                  )}
                </div>

                <div
                  className={`mt-2 flex items-center gap-4 pl-3 text-[12px] ${style.secondary}`}
                >
                  <span className="font-semibold">Like</span>
                  <span className="font-semibold">Reply</span>
                  <span>{comment.time}</span>
                </div>
              </div>
            </div>
          ))}

          {comments.length > 1 && (
            <p
              className={`pt-3 text-[13px] font-semibold ${style.secondary}`}
            >
              View more comments
            </p>
          )}
        </div>
      )}

      {/* Comment composer */}
      <div className={`border-t px-4 py-3 ${style.divider}`}>
        <div className="flex items-center gap-2">
          <img
            src={avatar || "/default-avatar-x.png"}
            alt=""
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
          <div
            className={`flex h-9 flex-1 items-center gap-2.5 rounded-full px-3.5 ${style.field}`}
          >
            <span className="flex-1 text-[15px]">Write a comment…</span>
            <span className="rounded border border-current px-1 text-[11px] font-bold leading-[14px]">
              GIF
            </span>
            <Smile className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            <Camera className="h-5 w-5 shrink-0" strokeWidth={1.75} />
          </div>
        </div>
      </div>
    </div>
  );
}
