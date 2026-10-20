import { formatRDRelativeTime } from "@/lib/formatRDDate";
import { formatRDNumber } from "@/lib/formatRDNumber";
import {
  ArrowBigDown,
  ArrowBigUp,
  Award,
  ChevronDown,
  MessageSquare,
  MoreHorizontal,
  Search,
  Share,
} from "lucide-react";

const CARD_STYLES = {
  light: {
    surface: "bg-white text-[#0f1a1c] border-[#e5ebee]",
    secondary: "text-[#576f76]",
    hover: "hover:bg-[#f2f4f5]",
    divider: "border-[#e5ebee]",
    pill: "border-[#d6d9db]",
    badge: "bg-black/[0.05]",
    thread: "border-[#e5ebee]",
  },
  dark: {
    surface: "bg-[#0f1a1c] text-[#e8eaea] border-[#202a2d]",
    secondary: "text-[#82959b]",
    hover: "hover:bg-[#1a282d]",
    divider: "border-[#202a2d]",
    pill: "border-[#3c4c52]",
    badge: "bg-white/10",
    thread: "border-[#3c4c52]",
  },
};

function VotePill({ score, vote, style, size = "md" }) {
  const filled =
    vote === "up"
      ? "border-[#d93a00] bg-[#d93a00] text-white"
      : vote === "down"
        ? "border-[#6a5cff] bg-[#6a5cff] text-white"
        : style.pill;

  const icon = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";

  return (
    <span
      className={`flex shrink-0 items-center rounded-full border ${
        size === "sm" ? "h-7 px-2" : "h-8 px-2.5"
      } ${filled}`}
    >
      <ArrowBigUp
        className={icon}
        strokeWidth={1.75}
        fill={vote === "up" ? "currentColor" : "none"}
      />
      <span
        className={`min-w-[1.25rem] text-center font-bold tabular-nums ${
          size === "sm" ? "text-[12px]" : "text-[13px]"
        }`}
      >
        {formatRDNumber(score)}
      </span>
      <ArrowBigDown
        className={icon}
        strokeWidth={1.75}
        fill={vote === "down" ? "currentColor" : "none"}
      />
    </span>
  );
}

function CommentButton({ icon: Icon, label, style }) {
  return (
    <span
      className={`flex h-7 items-center gap-1 rounded-full px-2 text-[12px] font-semibold ${style.secondary} ${style.hover}`}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
      {label}
    </span>
  );
}

function CommentActions({ score, style }) {
  return (
    <div className="mt-1.5 flex items-center gap-1">
      <VotePill score={score} vote="none" style={style} size="sm" />
      <CommentButton icon={MessageSquare} label="Reply" style={style} />
      <CommentButton icon={Award} label="Award" style={style} />
      <CommentButton icon={Share} label="Share" style={style} />
      <MoreHorizontal className={`h-4 w-4 ${style.secondary}`} />
    </div>
  );
}

function Comment({ comment, style, nested = false }) {
  return (
    <div className="flex gap-2">
      <img
        src={comment.avatar || "/default-avatar-x.png"}
        alt={comment.name}
        className={`shrink-0 rounded-full object-cover ${
          nested ? "h-6 w-6" : "h-8 w-8"
        }`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-[12px]">
          <span className="font-semibold">{comment.name}</span>
          <span className={style.secondary}>·</span>
          <span className={style.secondary}>{comment.time}</span>
        </div>

        <p className="mt-1 text-[14px] leading-[1.5]">{comment.text}</p>

        <CommentActions score={comment.score} style={style} />

        {comment.replies?.length > 0 && (
          <div
            className={`mt-2.5 ml-1 flex flex-col gap-3.5 border-l-2 pl-3 ${style.thread}`}
          >
            {comment.replies.map((reply, index) => (
              <Comment key={index} comment={reply} style={style} nested />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RDCard({
  ref,
  subreddit,
  communityIcon,
  author,
  userFlair,
  title,
  flair,
  flairColor,
  text,
  seeMore,
  media,
  score,
  vote,
  commentCount,
  shareCount,
  comments,
  createdAt,
  dark,
}) {
  const style = dark ? CARD_STYLES.dark : CARD_STYLES.light;

  return (
    <div
      ref={ref}
      id="rd-card"
      style={{
        fontFamily:
          'var(--font-reddit-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
      className={`w-150 overflow-hidden rounded-2xl border ${style.surface}`}
    >
      <div className="px-4 pt-3 pb-3">
        {/* Community and author */}
        <div className="flex items-start gap-2">
          <img
            src={communityIcon || "/default-avatar-x.png"}
            alt={subreddit}
            className="mt-0.5 h-6 w-6 shrink-0 rounded-full object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[12px]">
              <span className="shrink-0 font-bold">r/{subreddit}</span>
              <span className={`shrink-0 ${style.secondary}`}>·</span>
              <span className={`shrink-0 ${style.secondary}`}>
                {formatRDRelativeTime(createdAt)}
              </span>
            </div>

            <div className="mt-0.5 flex items-center gap-1.5 text-[12px]">
              <span className={`shrink-0 ${style.secondary}`}>u/{author}</span>
              {userFlair ? (
                <span
                  className={`flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-medium ${style.badge} ${style.secondary}`}
                >
                  <Award className="h-3 w-3" strokeWidth={2} />
                  {userFlair}
                </span>
              ) : null}
            </div>
          </div>

          <MoreHorizontal
            className={`h-5 w-5 shrink-0 ${style.secondary}`}
            strokeWidth={2}
          />
        </div>

        {/* Optional post flair */}
        {flair ? (
          <span
            className="mt-2.5 inline-flex rounded-full px-2 py-0.5 text-[12px] font-semibold text-white"
            style={{ backgroundColor: flairColor || "#0079d3" }}
          >
            {flair}
          </span>
        ) : null}

        {/* Title */}
        <h3 className="mt-2 text-[20px] leading-[1.3] font-semibold">{title}</h3>

        {/* Body */}
        {text ? (
          <p className="mt-1.5 text-[14px] leading-[1.5]">
            <span className={seeMore ? "line-clamp-3" : "whitespace-pre-wrap"}>
              {text}
            </span>
          </p>
        ) : null}

        {/* Media */}
        {media ? (
          <div
            className={`mt-2.5 overflow-hidden rounded-xl border ${style.divider}`}
          >
            <img
              src={media}
              alt=""
              className="aspect-square w-full object-cover"
            />
          </div>
        ) : null}

        {/* Vote and actions */}
        <div className="mt-3 flex items-center gap-1.5">
          <VotePill score={score} vote={vote} style={style} />

          <span
            className={`flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-[13px] font-bold ${style.pill} ${style.secondary}`}
          >
            <MessageSquare className="h-[18px] w-[18px]" strokeWidth={2} />
            {formatRDNumber(commentCount)}
          </span>

          <span
            className={`flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-[13px] font-bold ${style.pill} ${style.secondary}`}
          >
            <Share className="h-[18px] w-[18px]" strokeWidth={2} />
            {formatRDNumber(shareCount)}
          </span>
        </div>

        {/* Join the conversation */}
        <div
          className={`mt-2.5 flex h-10 items-center rounded-full border px-4 text-[13px] ${style.pill} ${style.secondary}`}
        >
          Join the conversation
        </div>
      </div>

      {/* Comments */}
      {comments.length > 0 && (
        <div className={`border-t px-4 pt-3 pb-4 ${style.divider}`}>
          <div className="flex items-center gap-1">
            <span className={`text-[12px] ${style.secondary}`}>Sort by:</span>
            <span
              className={`flex h-7 items-center gap-1 rounded-full px-2 text-[12px] font-semibold ${style.hover}`}
            >
              Best
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>

            <span
              className={`ml-auto flex h-8 items-center gap-1.5 rounded-full border px-3 text-[12px] ${style.pill} ${style.secondary}`}
            >
              <Search className="h-4 w-4" strokeWidth={2} />
              Search Comments
            </span>
          </div>

          <div className="flex flex-col gap-4 pt-3">
            {comments.map((comment, index) => (
              <Comment key={index} comment={comment} style={style} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
