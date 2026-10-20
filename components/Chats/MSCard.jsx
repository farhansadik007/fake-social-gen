import {
  ArrowLeft,
  ImageIcon,
  Info,
  Phone,
  Plus,
  ThumbsUp,
  Video,
} from "lucide-react";
import {
  ChatBubble,
  ChatAvatar,
  ChatFrame,
  ChatStatusBar,
  groupMessages,
} from "./ChatKit";

const OUT_BUBBLE =
  "linear-gradient(180deg, #0A84FF 0%, #0068E1 100%)";

const THEMES = {
  light: {
    bg: "#FFFFFF",
    header: "#FFFFFF",
    headerText: "#050505",
    headerSub: "#65676B",
    line: "#E5E7EB",
    text: "#050505",
    sub: "#65676B",
    inBg: "#F0F0F0",
    inText: "#050505",
    outBg: OUT_BUBBLE,
    outText: "#FFFFFF",
    inMeta: "#8A8D91",
    outMeta: "rgba(255,255,255,0.72)",
    tick: "#FFFFFF",
    chipBg: "transparent",
    reactionBg: "#F0F0F0",
    reactionText: "#050505",
    composerBg: "#FFFFFF",
    field: "#F0F0F0",
    fieldText: "#8A8D91",
    icon: "#0084FF",
    plus: "#F0F0F0",
    plusText: "#050505",
  },
  dark: {
    bg: "#000000",
    header: "#000000",
    headerText: "#E4E6EB",
    headerSub: "#B0B3B8",
    line: "#1C1C1C",
    text: "#E4E6EB",
    sub: "#B0B3B8",
    inBg: "#303030",
    inText: "#E4E6EB",
    outBg: OUT_BUBBLE,
    outText: "#FFFFFF",
    inMeta: "#9BA0A5",
    outMeta: "rgba(255,255,255,0.72)",
    tick: "#FFFFFF",
    chipBg: "transparent",
    reactionBg: "#303030",
    reactionText: "#E4E6EB",
    composerBg: "#000000",
    field: "#303030",
    fieldText: "#9BA0A5",
    icon: "#0084FF",
    plus: "#303030",
    plusText: "#E4E6EB",
  },
};

export default function MSCard({
  ref,
  contactName,
  contactAvatar,
  contactStatus,
  dateLabel,
  messages,
  composerText,
  seenLabel,
  dark,
}) {
  const theme = dark ? THEMES.dark : THEMES.light;
  const grouped = groupMessages(messages);

  return (
    <ChatFrame
      ref={ref}
      id="ms-card"
      background={theme.bg}
      dark={dark}
      className="font-sans"
    >
      <ChatStatusBar color={theme.headerText} />

      {/* Chat header */}
      <div
        className="flex h-14 shrink-0 items-center gap-2 border-b px-3"
        style={{
          background: theme.header,
          color: theme.headerText,
          borderColor: theme.line,
        }}
      >
        <ArrowLeft className="h-5 w-5 shrink-0" strokeWidth={2.25} />

        <ChatAvatar src={contactAvatar} size={32} />

        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[15px] font-semibold">{contactName}</p>
          <p className="truncate text-[12px]" style={{ color: theme.headerSub }}>
            {contactStatus}
          </p>
        </div>

        <Phone className="h-5 w-5 shrink-0" strokeWidth={1.9} />
        <Video className="h-5 w-5 shrink-0" strokeWidth={1.9} />
        <Info className="h-5 w-5 shrink-0" strokeWidth={1.9} />
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-0.5 px-3 pt-1">
        <div
          className="py-2 text-center text-[11px] font-medium"
          style={{ color: theme.sub }}
        >
          {dateLabel}
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
                image={message.image}
                reaction={message.reaction}
                theme={theme}
                position={position}
                radius={18}
                smallRadius={18}
                tail={isLastOfRun}
                maxWidth="max-w-[76%]"
              />
            </div>
          );
        })}

        {seenLabel ? (
          <div
            className="pt-1.5 text-right text-[11px] font-medium"
            style={{ color: theme.sub }}
          >
            {seenLabel}
          </div>
        ) : null}

        <div className="h-2" />
      </div>

      {/* Composer */}
      <div
        className="flex shrink-0 items-center gap-2 px-3 py-2"
        style={{ background: theme.composerBg }}
      >
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
          style={{ background: theme.plus, color: theme.plusText }}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </span>

        <ImageIcon
          className="h-6 w-6 shrink-0"
          strokeWidth={1.9}
          style={{ color: theme.icon }}
        />

        <div
          className="flex h-9 flex-1 items-center rounded-full px-3"
          style={{ background: theme.field, color: theme.fieldText }}
        >
          <span className="text-[15px]">{composerText || "Aa"}</span>
        </div>

        <ThumbsUp
          className="h-6 w-6 shrink-0"
          strokeWidth={2}
          style={{ color: theme.icon }}
        />
      </div>
    </ChatFrame>
  );
}
