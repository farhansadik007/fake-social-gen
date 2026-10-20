import { formatLIRelativeTime } from "@/lib/formatLIDate";
import { formatLINumber } from "@/lib/formatLINumber";
import {
  Globe2,
  MessageSquare,
  MoreHorizontal,
  Repeat2,
  Send,
  ThumbsUp,
} from "lucide-react";

const CARD_STYLES = {
  light: {
    surface: "bg-white text-black border-gray-200",
    secondary: "text-black/60",
    tertiary: "text-black/50",
    action: "text-black/75 hover:bg-black/5",
    activeAction: "text-[#0A66C2] hover:bg-[#0A66C2]/10",
    divider: "border-black/10",
    commentSurface: "bg-black/[0.04]",
  },
  dark: {
    surface: "bg-[#1d2226] text-white border-black/40",
    secondary: "text-white/60",
    tertiary: "text-white/50",
    action: "text-white/75 hover:bg-white/10",
    activeAction: "text-[#70b5f9] hover:bg-[#70b5f9]/15",
    divider: "border-white/15",
    commentSurface: "bg-white/10",
  },
};

// LinkedIn's five core reactions, in their canonical order.
const REACTIONS = [
  { id: "like", emoji: "👍", bg: "#0A66C2" },
  { id: "celebrate", emoji: "👏", bg: "#6dae4f" },
  { id: "support", emoji: "🙌", bg: "#7f66c7" },
  { id: "love", emoji: "❤️", bg: "#df704d" },
  { id: "insightful", emoji: "💡", bg: "#e6a14a" },
];

function ReactionStack({ active }) {
  const leading = REACTIONS.filter((r) => r.id === active);
  const rest = REACTIONS.filter((r) => r.id !== active).slice(0, leading.length ? 3 : 4);
  const shown = [...leading, ...rest];

  return (
    <span className="flex -space-x-1">
      {shown.map((reaction) => (
        <span
          key={reaction.id}
          className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] leading-none ring-1 ring-white"
          style={{ backgroundColor: reaction.bg }}
        >
          {reaction.emoji}
        </span>
      ))}
    </span>
  );
}

function ActionButton({ icon: Icon, label, active = false, style }) {
  return (
    <button
      type="button"
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-semibold transition ${
        active ? style.activeAction : style.action
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
      <span>{label}</span>
    </button>
  );
}

export default function LICard({
  ref,
  name,
  headline,
  avatar,
  degree,
  isPage,
  text,
  seeMore,
  media,
  reactions,
  reaction,
  commentCount,
  repostCount,
  comments,
  createdAt,
  dark,
}) {
  const style = dark ? CARD_STYLES.dark : CARD_STYLES.light;

  return (
    <div
      ref={ref}
      id="li-card"
      className={`w-137.5 overflow-hidden rounded-lg border font-sans ${style.surface}`}
    >
      {/* Header */}
      <div className="flex gap-2 p-3 pb-0">
        <img
          src={avatar || "/default-avatar-x.png"}
          alt={name}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate text-sm font-semibold">{name}</span>
            {degree ? (
              <span className={`shrink-0 text-xs font-medium ${style.tertiary}`}>
                · {degree}
              </span>
            ) : null}
          </div>
          {headline ? (
            <p className={`truncate text-xs ${style.secondary}`}>{headline}</p>
          ) : null}
          <div className={`flex items-center gap-1 text-xs ${style.tertiary}`}>
            <span>{formatLIRelativeTime(createdAt)}</span>
            <span>·</span>
            <Globe2 className="h-3 w-3" strokeWidth={2} />
          </div>
        </div>

        {!isPage && (
          <button
            type="button"
            className={`h-fit shrink-0 rounded-full border px-3 py-1 text-sm font-semibold transition ${
              dark
                ? "border-[#70b5f9] text-[#70b5f9] hover:bg-[#70b5f9]/10"
                : "border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/10"
            }`}
          >
            + Follow
          </button>
        )}
        <MoreHorizontal
          className={`h-5 w-5 shrink-0 ${style.tertiary}`}
        />
      </div>

      {/* Body */}
      <div className="px-3 pt-2">
        <p className="text-sm leading-[1.4]">
          <span className={seeMore ? "line-clamp-3" : "whitespace-pre-wrap"}>
            {text}
          </span>
          {seeMore && (
            <span className={`cursor-pointer ${style.secondary}`}>…see more</span>
          )}
        </p>
      </div>

      {/* Media */}
      {media ? (
        <div className="mt-3">
          <img src={media} alt="" className="aspect-square w-full object-cover" />
        </div>
      ) : null}

      {/* Reaction summary */}
      <div
        className={`mx-3 mt-2 flex items-center justify-between pb-1 text-xs ${style.secondary}`}
      >
        <span className="flex items-center gap-1.5">
          <ReactionStack active={reaction} />
          <span>{formatLINumber(reactions)}</span>
        </span>
        <span>
          {commentCount > 0 && `${formatLINumber(commentCount)} comments`}
          {commentCount > 0 && repostCount > 0 && " · "}
          {repostCount > 0 && `${formatLINumber(repostCount)} reposts`}
        </span>
      </div>

      {/* Action bar — Like / Comment / Repost / Send */}
      <div className={`mx-3 border-t ${style.divider}`}>
        <div className="flex items-center gap-1 py-0.5">
          <ActionButton
            icon={ThumbsUp}
            label="Like"
            active={reaction === "like"}
            style={style}
          />
          <ActionButton icon={MessageSquare} label="Comment" style={style} />
          <ActionButton icon={Repeat2} label="Repost" style={style} />
          <ActionButton icon={Send} label="Send" style={style} />
        </div>
      </div>

      {/* Comments */}
      {comments.length > 0 && (
        <div className={`mx-3 border-t pb-3 ${style.divider}`}>
          {comments.map((comment, index) => (
            <div key={index} className="flex gap-2 pt-3">
              <img
                src={comment.avatar || "/default-avatar-x.png"}
                alt={comment.name}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className={`rounded-lg px-3 py-2 ${style.commentSurface}`}>
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-xs font-semibold">
                      {comment.name}
                    </span>
                  </div>
                  {comment.headline ? (
                    <p className={`truncate text-[11px] ${style.tertiary}`}>
                      {comment.headline}
                    </p>
                  ) : null}
                  <p className="mt-1 text-sm leading-snug">{comment.text}</p>
                </div>
                <div
                  className={`mt-1 flex items-center gap-3 pl-3 text-xs font-semibold ${style.tertiary}`}
                >
                  <span>Like</span>
                  <span>Reply</span>
                  <span className="font-normal">{comment.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
