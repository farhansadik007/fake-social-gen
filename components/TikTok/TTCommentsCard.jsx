import { formatTTNumber } from "@/lib/formatTTNumber";
import { formatTTTime } from "@/lib/formatTTTime";
import { ArrowDownUp, AtSign, Heart, Smile, X } from "lucide-react";

const CARD_STYLES = {
  light: {
    surface: "bg-white text-black",
    secondary: "text-black/50",
    field: "bg-black/[0.06] text-black/50",
    divider: "border-black/[0.08]",
    icon: "text-black/50",
    handle: "bg-black/20",
  },
  dark: {
    surface: "bg-[#161823] text-white",
    secondary: "text-white/50",
    field: "bg-white/10 text-white/50",
    divider: "border-white/10",
    icon: "text-white/50",
    handle: "bg-white/30",
  },
};

export default function TTCommentsCard({
  ref,
  username,
  avatar,
  commentCount,
  comments,
  createdAt,
  dark,
  sheet = false,
}) {
  const style = dark ? CARD_STYLES.dark : CARD_STYLES.light;

  return (
    <div
      ref={ref}
      id="tt-comments-card"
      className={`flex flex-col overflow-hidden font-sans ${
        sheet
          ? "h-full w-full rounded-t-2xl"
          : "w-90 rounded-2xl"
      } ${style.surface}`}
    >
      {/* Drag handle — only present when docked over the video */}
      {sheet && (
        <div className="flex justify-center pt-2">
          <span className={`h-1 w-9 rounded-full ${style.handle}`} />
        </div>
      )}

      {/* Sheet header */}
      <div
        className={`relative flex items-center justify-center border-b px-4 py-3 ${style.divider}`}
      >
        <span className="text-[15px] font-semibold">
          {formatTTNumber(commentCount)} Comments
        </span>
        <ArrowDownUp
          className={`absolute left-4 h-5 w-5 ${style.icon}`}
          strokeWidth={2}
        />
        <X className={`absolute right-4 h-5 w-5 ${style.icon}`} strokeWidth={2} />
      </div>

      {/* Comment list */}
      <div
        className={`flex flex-col gap-4 overflow-hidden px-4 py-3 ${
          sheet ? "min-h-0 flex-1" : ""
        }`}
      >
        {comments.map((comment, index) => (
          <div key={index} className="flex gap-3">
            <img
              src={comment.avatar || "/default-avatar-x.png"}
              alt={comment.name}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className={`truncate text-[13px] font-semibold ${style.secondary}`}>
                {comment.name}
              </p>
              <p className="mt-0.5 text-[15px] leading-snug break-words">
                {comment.text}
              </p>
              <div
                className={`mt-1.5 flex items-center gap-4 text-[13px] ${style.secondary}`}
              >
                <span>{formatTTTime(comment.createdAt)}</span>
                <span className="font-medium">Reply</span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-1 pt-1">
              <Heart
                className={`h-5 w-5 ${comment.liked ? "text-[#FE2C55]" : style.icon}`}
                fill={comment.liked ? "#FE2C55" : "none"}
                strokeWidth={2}
              />
              <span className={`text-xs ${style.secondary}`}>
                {formatTTNumber(comment.likes)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* "See more" affordance */}
      <div
        className={`mx-4 mb-3 rounded-lg px-3 py-2 text-[13px] ${style.field}`}
      >
        See more comments
      </div>

      {/* Input bar */}
      <div
        className={`flex items-center gap-2 border-t px-4 py-3 ${style.divider}`}
      >
        <img
          src={avatar || "/default-avatar-x.png"}
          alt={username}
          className="h-8 w-8 shrink-0 rounded-full object-cover"
        />
        <div
          className={`flex h-10 flex-1 items-center gap-2 rounded-lg px-3 ${style.field}`}
        >
          <span className="flex-1 text-sm">Add comment...</span>
          <Smile className="h-5 w-5 shrink-0" strokeWidth={1.75} />
        </div>
        <AtSign className={`h-5 w-5 shrink-0 ${style.icon}`} strokeWidth={2} />
      </div>
    </div>
  );
}
