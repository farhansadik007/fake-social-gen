import TTVideoLayer from "./TTVideoLayer";
import TTCommentsCard from "./TTCommentsCard";

/**
 * The comment sheet docked over a still-visible video — TikTok's signature
 * overlay. The sheet covers the lower 48% of the 9:16 frame, so the video
 * layer drops its bottom meta and lifts its action rail above the sheet.
 */
export default function TTOverlayCard({ ref, ...props }) {
  return (
    <div
      ref={ref}
      id="tt-overlay-card"
      className="relative aspect-9/16 w-90 overflow-hidden rounded-2xl bg-black font-sans select-none"
    >
      <TTVideoLayer {...props} overlay />

      <div className="absolute inset-x-0 bottom-0 h-[48%]">
        <TTCommentsCard {...props} sheet />
      </div>
    </div>
  );
}
