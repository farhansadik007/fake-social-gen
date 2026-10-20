import { BatteryFull, Signal, Wifi } from "lucide-react";

/**
 * Shared building blocks for the chat cards.
 *
 * Each chat app supplies its own theme tokens (bubble colours, surfaces) and
 * its own header/composer markup. Only the geometry lives here, so the apps
 * stay visually distinct instead of collapsing into one recoloured shell.
 */

export function ChatFrame({
  ref,
  id,
  background,
  dark,
  width = "w-[390px]",
  className = "",
  children,
}) {
  return (
    <div
      ref={ref}
      id={id}
      className={`flex min-h-[620px] flex-col overflow-hidden rounded-[26px] border ${width} ${className}`}
      style={{
        background,
        borderColor: dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
      }}
    >
      {children}
    </div>
  );
}

export function ChatStatusBar({ color = "#000", time = "9:41" }) {
  return (
    <div
      className="flex h-11 shrink-0 items-center justify-between px-6 pt-1"
      style={{ color }}
    >
      <span className="text-[13px] font-semibold tabular-nums">{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" strokeWidth={2.5} />
        <Wifi className="h-4 w-4" strokeWidth={2.5} />
        <BatteryFull className="h-5 w-5" strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function ChatDateChip({ label, theme, variant = "pill" }) {
  if (variant === "text") {
    return (
      <div
        className="py-2 text-center text-[11px] font-medium"
        style={{ color: theme.sub }}
      >
        {label}
      </div>
    );
  }

  return (
    <div className="flex justify-center py-2">
      <span
        className="rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase"
        style={{ background: theme.chipBg, color: theme.sub }}
      >
        {label}
      </span>
    </div>
  );
}

export function ChatAvatar({ src, size = 40, className = "", style }) {
  return (
    <img
      src={src || "/default-avatar-x.png"}
      alt=""
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={{ width: size, height: size, ...style }}
    />
  );
}

function Tail({ side, color, top }) {
  return (
    <svg
      viewBox="0 0 9 14"
      width="7"
      height="11"
      aria-hidden="true"
      className="absolute"
      style={{
        fill: color,
        [side === "in" ? "left" : "right"]: -6,
        [top ? "top" : "bottom"]: 0,
        transform: side === "out" ? "scaleX(-1)" : undefined,
      }}
    >
      <path d="M9 0C9 8 5.5 12.5 0 14C4 14 9 10 9 0Z" />
    </svg>
  );
}

function Ticks({ count, color, readColor }) {
  if (!count) return null;

  const stroke = count >= 3 ? readColor : color;
  const d =
    count >= 2
      ? "M1.5 6.5l3 3 8-8M7.5 6.5l3 3 8-8"
      : "M2 6.5l3.5 3.5L12 3";

  return (
    <svg viewBox="0 0 17 12" width="15" height="11" aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function radiiFor(position, radius, smallRadius, out) {
  const r = radius;
  const s = smallRadius;

  if (position === "single") return [r, r, r, r];

  if (out) {
    if (position === "first") return [r, r, s, r];
    if (position === "middle") return [r, s, s, r];
    return [r, s, r, r];
  }

  if (position === "first") return [r, r, r, s];
  if (position === "middle") return [s, r, r, s];
  return [s, r, r, r];
}

export function ChatBubble({
  side = "in",
  text,
  time,
  ticks = 0,
  image,
  reaction,
  theme,
  tail = false,
  tailTop = false,
  position = "single",
  maxWidth = "max-w-[78%]",
  radius = 18,
  smallRadius = 6,
  timeBelow = false,
  fontSize = 15,
  shadow,
}) {
  const out = side === "out";
  const background = out ? theme.outBg : theme.inBg;
  const color = out ? theme.outText : theme.inText;
  const meta = out ? theme.outMeta : theme.inMeta;
  let [tl, tr, br, bl] = radiiFor(position, radius, smallRadius, out);

  // Merge the tail into the bubble by squaring the corner it grows from.
  if (tail) {
    if (tailTop) {
      if (out) tr = 3;
      else tl = 3;
    } else if (out) {
      br = 3;
    } else {
      bl = 3;
    }
  }

  return (
    <div
      className={`flex ${reaction ? "pb-3" : ""} ${
        out ? "justify-end pl-10" : "justify-start pr-10"
      }`}
    >
      <div className={`relative ${maxWidth}`}>
        {tail ? <Tail side={side} color={background} top={tailTop} /> : null}

        <div
          className="relative overflow-hidden"
          style={{
            background,
            color,
            boxShadow: shadow,
            borderTopLeftRadius: tl,
            borderTopRightRadius: tr,
            borderBottomRightRadius: br,
            borderBottomLeftRadius: bl,
          }}
        >
          {image ? (
            <img
              src={image}
              alt=""
              className="block max-h-64 w-full object-cover"
            />
          ) : null}

          <div className="flex items-end gap-2 px-3 pt-1.5 pb-1">
            {text ? (
              <p
                className="leading-[1.35] whitespace-pre-wrap"
                style={{ fontSize }}
              >
                {text}
              </p>
            ) : null}

            {timeBelow ? null : (
              <span
                className="mb-px ml-auto flex shrink-0 items-center gap-1 text-[11px] tabular-nums"
                style={{ color: meta }}
              >
                {time}
                <Ticks count={ticks} color={meta} readColor={theme.tick} />
              </span>
            )}
          </div>

          {timeBelow ? (
            <div className="flex justify-end px-3 pt-0 pb-1">
              <span
                className="flex items-center gap-1 text-[11px] tabular-nums"
                style={{ color: meta }}
              >
                {time}
                <Ticks count={ticks} color={meta} readColor={theme.tick} />
              </span>
            </div>
          ) : null}
        </div>

        {reaction ? (
          <span
            className={`absolute -bottom-2.5 flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[12px] leading-none ${
              out ? "right-3" : "left-3"
            }`}
            style={{ background: theme.reactionBg, color: theme.reactionText }}
          >
            {reaction}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Splits a flat message list into runs so consecutive bubbles can be grouped. */
export function groupMessages(messages) {
  return messages.map((message, index) => {
    const prev = messages[index - 1];
    const next = messages[index + 1];
    const samePrev = prev && prev.side === message.side && !message.separate;
    const sameNext = next && next.side === message.side && !next.separate;

    let position = "single";
    if (samePrev && sameNext) position = "middle";
    else if (samePrev) position = "last";
    else if (sameNext) position = "first";

    return { message, position };
  });
}
