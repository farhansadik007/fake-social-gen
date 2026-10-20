import TTVideoLayer from "./TTVideoLayer";

export default function TTVideoCard({ ref, ...props }) {
  return (
    <div
      ref={ref}
      id="tt-video-card"
      className="relative aspect-9/16 w-90 overflow-hidden rounded-2xl bg-black font-sans select-none"
    >
      <TTVideoLayer {...props} />
    </div>
  );
}
