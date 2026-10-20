import { formatTHNumber } from "@/lib/formatTHNumber";
import { formatTHTime } from "@/lib/formatTHTime";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
} from "lucide-react";

const CARD_STYLES = {
  light: {
    surface: "bg-white text-black border-gray-200",
    secondary: "text-gray-500",
    icon: "text-black",
    divider: "border-gray-100",
  },
  dark: {
    surface: "bg-black text-white border-gray-800",
    secondary: "text-gray-400",
    icon: "text-white",
    divider: "border-gray-800",
  },
};

function THVerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0">
      <circle cx="12" cy="12" r="11" fill="#0095F6" />
      <path
        d="M7 12.4 10.4 15.8 17 9.2"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function THCard({
  ref,
  name,
  handle,
  avatar,
  verified,
  text,
  media,
  liked,
  likes,
  replies,
  reposts,
  comments,
  createdAt,
  dark,
}) {
  const style = dark ? CARD_STYLES.dark : CARD_STYLES.light;

  return (
    <div
      ref={ref}
      id="th-card"
      className={`w-137.5 rounded-2xl border font-sans ${style.surface}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 p-4 pb-0">
        <img
          src={avatar || "/default-avatar-x.png"}
          alt={name}
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate text-[15px] font-semibold">{name}</span>
            {verified && <THVerifiedBadge />}
          </div>
          <p className={`truncate text-[13px] ${style.secondary}`}>
            @{handle} · {formatTHTime(createdAt)}
          </p>
        </div>
        <MoreHorizontal className={`h-5 w-5 shrink-0 ${style.secondary}`} />
      </div>

      {/* Body */}
      <div className="px-4 pt-2.5">
        <p className="whitespace-pre-wrap text-[15px] leading-[1.45]">{text}</p>
      </div>

      {/* Media */}
      {media ? (
        <div className="px-4 pt-3">
          <div
            className={`overflow-hidden rounded-xl ${dark ? "bg-zinc-900" : "bg-zinc-100"}`}
          >
            <img
              src={media}
              alt=""
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      {/* Actions */}
      <div className="flex items-center gap-5 px-4 pt-3">
        <button
          type="button"
          className={`flex items-center gap-1.5 transition ${liked ? "text-[#FF3040]" : style.icon}`}
        >
          <Heart
            className="h-[22px] w-[22px]"
            fill={liked ? "#FF3040" : "none"}
            strokeWidth={1.75}
          />
          <span className="text-sm">{formatTHNumber(likes)}</span>
        </button>

        <button
          type="button"
          className={`flex items-center gap-1.5 transition ${style.icon}`}
        >
          <MessageCircle className="h-[22px] w-[22px]" strokeWidth={1.75} />
          <span className="text-sm">{formatTHNumber(replies)}</span>
        </button>

        <button
          type="button"
          className={`flex items-center gap-1.5 transition ${style.icon}`}
        >
          <Repeat2 className="h-[22px] w-[22px]" strokeWidth={1.75} />
          <span className="text-sm">{formatTHNumber(reposts)}</span>
        </button>

        <Send className={`ml-auto h-[22px] w-[22px] ${style.icon}`} strokeWidth={1.75} />
      </div>

      {/* Reply previews */}
      {comments.length > 0 && (
        <div className={`mt-3 flex flex-col gap-3 border-t px-4 pt-3 pb-4 ${style.divider}`}>
          {comments.map((comment, index) => (
            <div key={index} className="flex gap-2.5">
              <img
                src={comment.avatar || "/default-avatar-x.png"}
                alt={comment.name}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-semibold">
                    {comment.name}
                  </span>
                  <span className={`shrink-0 text-[13px] ${style.secondary}`}>
                    {comment.time}
                  </span>
                </div>
                <p className="text-[15px] leading-snug break-words">
                  {comment.text}
                </p>
                <div
                  className={`mt-1.5 flex items-center gap-4 text-[13px] ${style.secondary}`}
                >
                  <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" strokeWidth={2} />
                    {formatTHNumber(comment.likes)}
                  </span>
                  <span>Reply</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
