import { formatIGDate } from "@/lib/formatIGDate";
import { formatIGNumber } from "@/lib/formatIGNumber";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  PlusCircle,
  Send,
  Smile,
} from "lucide-react";

const CARD_STYLES = {
  light: {
    surface: "bg-white text-black border-gray-200",
    secondary: "text-gray-500",
    icon: "text-black",
  },
  dark: {
    surface: "bg-black text-white border-gray-800",
    secondary: "text-zinc-400",
    icon: "text-white",
  },
};

function IGVerifiedBadge({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${className}`}>
      <path
        fill="#0095F6"
        d="M12 0.8 9.86 3.5a1.5 1.5 0 0 1-.84.44L5.5 4.42l-.5 3.16c-.08.47-.36.88-.77 1.14L1.8 10.28l1.43 2.74c.25.47.25 1.04 0 1.51L1.8 17.27l2.43 1.56c.41.26.69.67.77 1.14l.5 3.16 3.52.48c.34.05.69.2.84.44L12 27.2l2.14-2.7a1.5 1.5 0 0 1 .84-.44l3.52-.48.5-3.16a1.68 1.68 0 0 1 .77-1.14l2.43-1.56-1.43-2.74a1.68 1.68 0 0 1 0-1.51l1.43-2.74-2.43-1.56a1.68 1.68 0 0 1-.77-1.14l-.5-3.16-3.52-.48a1.5 1.5 0 0 1-.84-.44ZM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2Z"
      />
    </svg>
  );
}

export default function IGCard({
  ref,
  username,
  avatar,
  verified,
  location,
  media,
  caption,
  liked,
  likes,
  commentCount,
  comments,
  createdAt,
  dark,
}) {
  const style = dark ? CARD_STYLES.dark : CARD_STYLES.light;

  return (
    <div
      ref={ref}
      id="ig-card"
      className={`w-137.5 rounded-2xl border font-sans ${style.surface}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 p-3">
        <img
          src={avatar || "/default-avatar-x.png"}
          alt={username}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">{username}</span>
            {verified && <IGVerifiedBadge />}
          </div>
          {location ? (
            <span className={`text-xs ${style.secondary}`}>{location}</span>
          ) : null}
        </div>

        <MoreHorizontal
          className={`ml-auto h-5 w-5 shrink-0 ${style.secondary}`}
        />
      </div>

      {/* Media */}
      <div className="px-3">
        <div
          className={`overflow-hidden rounded-lg ${dark ? "bg-zinc-900" : "bg-zinc-100"}`}
        >
          {media ? (
            <img
              src={media}
              alt=""
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div
              className={`grid aspect-square w-full place-items-center text-xs tracking-wide uppercase ${
                dark ? "text-zinc-600" : "text-zinc-400"
              }`}
            >
              Upload an image
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 px-3 pt-3">
        <Heart
          className={`h-6 w-6 ${liked ? "text-[#FF3040]" : style.icon}`}
          fill={liked ? "#FF3040" : "none"}
          strokeWidth={1.75}
        />
        <MessageCircle
          className={`h-6 w-6 -scale-x-100 ${style.icon}`}
          strokeWidth={1.75}
        />
        <Send className={`h-6 w-6 ${style.icon}`} strokeWidth={1.75} />
        <Bookmark className={`ml-auto h-6 w-6 ${style.icon}`} strokeWidth={1.75} />
      </div>

      {/* Likes */}
      <p className="px-3 pt-2.5 text-sm font-semibold">
        {formatIGNumber(likes)} likes
      </p>

      {/* Caption */}
      {caption ? (
        <p className="px-3 pt-1.5 text-sm leading-snug">
          <span className="font-semibold">{username}</span>{" "}
          <span className="whitespace-pre-wrap">{caption}</span>
        </p>
      ) : null}

      {/* Comments */}
      {commentCount > 0 ? (
        <p className={`px-3 pt-1.5 text-sm ${style.secondary}`}>
          View all {formatIGNumber(commentCount)} comments
        </p>
      ) : null}

      {comments.map((comment, index) => (
        <p key={index} className="px-3 pt-1.5 text-sm leading-snug">
          <span className="font-semibold">{comment.username}</span>{" "}
          <span>{comment.text}</span>
        </p>
      ))}

      {/* Timestamp */}
      <p className={`px-3 pt-2.5 text-[11px] tracking-wide ${style.secondary}`}>
        {formatIGDate(createdAt)}
      </p>

      {/* Add comment row */}
      <div
        className={`mt-2.5 flex items-center gap-3 border-t px-3 py-2.5 ${dark ? "border-gray-800" : "border-gray-100"}`}
      >
        <span className={`text-sm ${style.secondary}`}>Add a comment…</span>
        <div className={`ml-auto flex items-center gap-3 ${style.secondary}`}>
          <Smile className="h-5 w-5" strokeWidth={1.75} />
          <span className="text-base leading-none">❤️</span>
          <PlusCircle className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}
