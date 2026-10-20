import {
  ArrowLeft,
  Camera,
  Heart,
  ImageIcon,
  Info,
  Mic,
  Phone,
  Plus,
  Smile,
  Video,
} from "lucide-react";
import {
  ChatBubble,
  ChatAvatar,
  ChatFrame,
  ChatStatusBar,
  groupMessages,
} from "./ChatKit";

const RING =
  "conic-gradient(from 200deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)";

const THEMES = {
  light: {
    bg: "#FFFFFF",
    header: "#FFFFFF",
    headerText: "#000000",
    headerSub: "#8E8E8E",
    line: "#EFEFEF",
    text: "#000000",
    sub: "#8E8E8E",
    inBg: "#EFEFEF",
    inText: "#000000",
    outBg: "#3797F0",
    outText: "#FFFFFF",
    inMeta: "#8E8E8E",
    outMeta: "rgba(255,255,255,0.78)",
    tick: "#FFFFFF",
    chipBg: "transparent",
    reactionBg: "#EFEFEF",
    reactionText: "#000000",
    composerBg: "#FFFFFF",
    field: "#EFEFEF",
    fieldText: "#8E8E8E",
    icon: "#000000",
    ringInner: "#FFFFFF",
  },
  dark: {
    bg: "#000000",
    header: "#000000",
    headerText: "#F5F5F5",
    headerSub: "#A8A8A8",
    line: "#262626",
    text: "#F5F5F5",
    sub: "#A8A8A8",
    inBg: "#262626",
    inText: "#F5F5F5",
    outBg: "#3797F0",
    outText: "#FFFFFF",
    inMeta: "#A8A8A8",
    outMeta: "rgba(255,255,255,0.78)",
    tick: "#FFFFFF",
    chipBg: "transparent",
    reactionBg: "#262626",
    reactionText: "#F5F5F5",
    composerBg: "#000000",
    field: "#262626",
    fieldText: "#8E8E8E",
    icon: "#F5F5F5",
    ringInner: "#000000",
  },
};

export default function IGDMCard({
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
      id="igdm-card"
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

        <span
          className="grid shrink-0 place-items-center rounded-full p-[2px]"
          style={{ background: RING }}
        >
          <span
            className="grid place-items-center rounded-full p-[1.5px]"
            style={{ background: theme.ringInner }}
          >
            <ChatAvatar src={contactAvatar} size={30} />
          </span>
        </span>

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
                radius={20}
                smallRadius={20}
                tail={isLastOfRun}
                maxWidth="max-w-[76%]"
              />
            </div>
          );
        })}

        {seenLabel ? (
          <div
            className="flex items-center justify-end gap-1.5 pt-1.5 text-[11px]"
            style={{ color: theme.sub }}
          >
            <ChatAvatar src={contactAvatar} size={14} />
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
          style={{ background: "#3797F0", color: "#FFFFFF" }}
        >
          <Camera className="h-4 w-4" strokeWidth={2} />
        </span>

        <div
          className="flex h-9 flex-1 items-center gap-2 rounded-full px-3"
          style={{ background: theme.field, color: theme.fieldText }}
        >
          <span className="flex-1 truncate text-[15px]">
            {composerText || "Message..."}
          </span>
          <Mic className="h-4 w-4 shrink-0" strokeWidth={2} />
          <ImageIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
          <Smile className="h-4 w-4 shrink-0" strokeWidth={2} />
          <Plus className="h-4 w-4 shrink-0" strokeWidth={2} />
        </div>

        <Heart
          className="h-6 w-6 shrink-0"
          strokeWidth={2}
          style={{ color: theme.icon }}
        />
      </div>
    </ChatFrame>
  );
}
