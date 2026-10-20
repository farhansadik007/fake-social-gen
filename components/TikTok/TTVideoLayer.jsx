import { formatTTNumber } from "@/lib/formatTTNumber";
import { Bookmark, CornerUpRight, Heart, MessageCircle, Music, Plus, Search } from "lucide-react";

function TTVerifiedBadge({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`}>
      <circle cx="12" cy="12" r="11" fill="#20d5ec" />
      <path
        d="M7 12.4 10.4 15.8 17 9.2"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function RailButton({ icon: Icon, count, liked = false, compact = false }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <Icon
        className={`${compact ? "h-7 w-7" : "h-8 w-8"} text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]`}
        fill={liked ? "#FE2C55" : "none"}
        stroke={liked ? "#FE2C55" : "#ffffff"}
        strokeWidth={2}
      />
      {count !== undefined && (
        <span
          className={`font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${
            compact ? "text-xs" : "text-[13px]"
          }`}
        >
          {count}
        </span>
      )}
    </div>
  );
}

/**
 * The video layer alone — background, top tabs, action rail, and bottom meta.
 * Rendered inside a fixed 9:16 frame by TTVideoCard and TTOverlayCard.
 *
 * When `overlay` is true the comment sheet will cover the lower part of the
 * frame, so the bottom meta is dropped and the rail sits above the sheet.
 */
export default function TTVideoLayer({
  username,
  verified,
  avatar,
  video,
  caption,
  music,
  liked,
  likes,
  commentCount,
  saves,
  shares,
  overlay = false,
}) {
  return (
    <div className="absolute inset-0">
      {/* Background */}
      {video ? (
        <img
          src={video}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
      )}

      {/* Legibility gradients */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Top tabs */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-center gap-6 px-4 pt-4">
        <span className="text-[15px] text-white/70 drop-shadow">Following</span>
        <span className="relative text-[15px] font-semibold text-white drop-shadow">
          For You
          <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-white" />
        </span>
        <Search className="absolute right-4 h-6 w-6 text-white drop-shadow" />
      </div>

      {/* Right action rail */}
      <div
        className={`absolute right-3 flex flex-col items-center ${
          overlay
            ? "bottom-[calc(52%+12px)] gap-3"
            : "bottom-24 gap-4"
        }`}
      >
        <div className="relative mb-1">
          <img
            src={avatar || "/default-avatar-x.png"}
            alt={username}
            className={`rounded-full border-2 border-white object-cover ${
              overlay ? "h-10 w-10" : "h-12 w-12"
            }`}
          />
          <span
            className={`absolute -bottom-2 left-1/2 grid -translate-x-1/2 place-items-center rounded-full bg-[#FE2C55] ring-2 ring-black/30 ${
              overlay ? "h-4 w-4" : "h-5 w-5"
            }`}
          >
            <Plus
              className={overlay ? "h-3 w-3" : "h-3.5 w-3.5"}
              strokeWidth={3}
            />
          </span>
        </div>

        <RailButton icon={Heart} count={formatTTNumber(likes)} liked={liked} compact={overlay} />
        <RailButton
          icon={MessageCircle}
          count={formatTTNumber(commentCount)}
          compact={overlay}
        />
        <RailButton icon={Bookmark} count={formatTTNumber(saves)} compact={overlay} />
        <RailButton
          icon={CornerUpRight}
          count={formatTTNumber(shares)}
          compact={overlay}
        />

        {/* Spinning record — hidden in the comment overlay, as on device */}
        {!overlay && (
          <div className="mt-1 grid h-11 w-11 animate-spin place-items-center rounded-full bg-gradient-to-br from-[#2c2c2c] to-[#111] ring-2 ring-white/20 [animation-duration:4s]">
            <Music className="h-4 w-4 text-white/80" />
          </div>
        )}
      </div>

      {/* Bottom-left meta — covered by the sheet in overlay mode */}
      {!overlay && (
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 pr-20 pb-4 pl-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[17px] font-bold text-white drop-shadow">
              @{username}
            </span>
            {verified && <TTVerifiedBadge />}
          </div>

          <p className="text-[15px] leading-snug text-white drop-shadow">
            {caption}
          </p>

          <div className="flex items-center gap-1.5 overflow-hidden">
            <Music className="h-3.5 w-3.5 shrink-0 text-white" />
            <span className="truncate text-[13px] text-white drop-shadow">
              {music}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
