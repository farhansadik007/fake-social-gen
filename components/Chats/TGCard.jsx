import {
  ArrowLeft,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Smile,
} from "lucide-react";
import {
  ChatBubble,
  ChatAvatar,
  ChatFrame,
  ChatStatusBar,
  groupMessages,
} from "./ChatKit";

const THEMES = {
  light: {
    bg: "#7FA9C4",
    wallpaper:
      "linear-gradient(155deg, #6E9FBE 0%, #8FB6CF 38%, #A9C9D9 62%, #6E9FBE 100%)",
    header: "#527DA3",
    headerText: "#FFFFFF",
    headerSub: "rgba(255,255,255,0.78)",
    text: "#000000",
    sub: "#8A8A8E",
    inBg: "#FFFFFF",
    inText: "#000000",
    outBg: "#EFFDDE",
    outText: "#000000",
    inMeta: "#A0A0A5",
    outMeta: "#7FA87A",
    tick: "#4FAE4E",
    chipBg: "rgba(0,0,0,0.22)",
    chipText: "#FFFFFF",
    reactionBg: "#FFFFFF",
    reactionText: "#000000",
    composerBg: "#F5F6F7",
    field: "#FFFFFF",
    fieldText: "#9A9A9E",
    icon: "#6D7A85",
  },
  dark: {
    bg: "#17212B",
    wallpaper:
      "linear-gradient(155deg, #0E1621 0%, #17212B 45%, #1B2A36 100%)",
    header: "#17212B",
    headerText: "#FFFFFF",
    headerSub: "#7D8E9B",
    text: "#FFFFFF",
    sub: "#7D8E9B",
    inBg: "#182533",
    inText: "#FFFFFF",
    outBg: "#2B5278",
    outText: "#FFFFFF",
    inMeta: "#6D7E8B",
    outMeta: "#7FA0BE",
    tick: "#62B15E",
    chipBg: "rgba(0,0,0,0.35)",
    chipText: "#C6D2DA",
    reactionBg: "#182533",
    reactionText: "#FFFFFF",
    composerBg: "#17212B",
    field: "#242F3D",
    fieldText: "#7D8E9B",
    icon: "#7D8E9B",
  },
};

export default function TGCard({
  ref,
  contactName,
  contactAvatar,
  contactStatus,
  dateLabel,
  messages,
  composerText,
  dark,
}) {
  const theme = dark ? THEMES.dark : THEMES.light;
  const grouped = groupMessages(messages);

  return (
    <ChatFrame
      ref={ref}
      id="tg-card"
      background={theme.bg}
      dark={dark}
      className="font-sans"
    >
      <div style={{ background: theme.header }}>
        <ChatStatusBar color={theme.headerText} />
      </div>

      {/* Chat header */}
      <div
        className="flex h-14 shrink-0 items-center gap-2.5 px-3"
        style={{ background: theme.header, color: theme.headerText }}
      >
        <ArrowLeft className="h-5 w-5 shrink-0" strokeWidth={2.25} />

        <ChatAvatar src={contactAvatar} size={38} />

        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[15px] font-semibold">{contactName}</p>
          <p className="truncate text-[12px]" style={{ color: theme.headerSub }}>
            {contactStatus}
          </p>
        </div>

        <Search className="h-5 w-5 shrink-0" strokeWidth={1.9} />
        <Phone className="h-5 w-5 shrink-0" strokeWidth={1.9} />
        <MoreVertical className="h-5 w-5 shrink-0" strokeWidth={2} />
      </div>

      {/* Messages */}
      <div
        className="flex flex-1 flex-col gap-0.5 px-3 pt-1"
        style={{ background: theme.wallpaper }}
      >
        <div className="flex justify-center py-2">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ background: theme.chipBg, color: theme.chipText }}
          >
            {dateLabel}
          </span>
        </div>

        {grouped.map(({ message, position }, index) => {
          const next = grouped[index + 1];
          const nextPosition = next?.position;
          const gap =
            nextPosition === "middle" || nextPosition === "last"
              ? "mt-0.5"
              : "mt-2";
          const isLastOfRun = position === "single" || position === "last";

          return (
            <div key={index} className={index === 0 ? "" : gap}>
              <ChatBubble
                side={message.side}
                text={message.text}
                time={message.time}
                ticks={message.side === "out" ? 3 : 0}
                image={message.image}
                theme={theme}
                position={position}
                radius={12}
                smallRadius={12}
                tail={isLastOfRun}
                maxWidth="max-w-[78%]"
              />
            </div>
          );
        })}

        <div className="h-2" />
      </div>

      {/* Composer */}
      <div
        className="flex shrink-0 items-center gap-3 px-3 py-2"
        style={{ background: theme.composerBg, color: theme.icon }}
      >
        <Paperclip className="h-5 w-5 shrink-0" strokeWidth={1.75} />

        <div
          className="flex h-9 flex-1 items-center rounded-full px-3"
          style={{ background: theme.field, color: theme.fieldText }}
        >
          <span className="text-[15px]">{composerText || "Message"}</span>
        </div>

        <Smile className="h-5 w-5 shrink-0" strokeWidth={1.75} />
        <Mic className="h-5 w-5 shrink-0" strokeWidth={1.75} />
      </div>
    </ChatFrame>
  );
}
