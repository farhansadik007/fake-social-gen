import {
  ArrowLeft,
  Camera,
  ChevronDown,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  PhoneMissed,
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

const SHADOW_LIGHT = "0 1px 0.5px rgba(11,20,26,0.13)";
const SHADOW_DARK = "0 1px 0.5px rgba(0,0,0,0.42)";

const THEMES = {
  light: {
    bg: "#EFEAE2",
    wallpaper: "#EFEAE2",
    wallpaperImage: "url('/chats/whatsapp-bg.png')",
    shadow: SHADOW_LIGHT,
    header: "#FFFFFF",
    headerText: "#111B21",
    headerSub: "#667781",
    text: "#111B21",
    sub: "#667781",
    inBg: "#FFFFFF",
    inText: "#111B21",
    outBg: "#D9FDD3",
    outText: "#111B21",
    inMeta: "#667781",
    outMeta: "#667781",
    tick: "#53BDEB",
    chipBg: "rgba(255,255,255,0.92)",
    chipText: "#54656F",
    reactionBg: "#FFFFFF",
    reactionText: "#111B21",
    composerBg: "#FFFFFF",
    field: "#FFFFFF",
    fieldBorder: "#E4E7E9",
    fieldText: "#5B6B72",
    icon: "#54656F",
    mic: "#00A884",
    callIconBg: "#F0F2F5",
    callIconBgOut: "rgba(255,255,255,0.65)",
    missed: "#EA4335",
  },
  dark: {
    bg: "#0B141A",
    wallpaper: "#0B141A",
    wallpaperImage: "url('/chats/whatsapp-bg-dark.jpg')",
    shadow: SHADOW_DARK,
    header: "#1F2C34",
    headerText: "#E9EDEF",
    headerSub: "#8696A0",
    text: "#E9EDEF",
    sub: "#8696A0",
    inBg: "#202C33",
    inText: "#E9EDEF",
    outBg: "#005C4B",
    outText: "#E9EDEF",
    inMeta: "#8696A0",
    outMeta: "#8696A0",
    tick: "#53BDEB",
    chipBg: "rgba(32,44,51,0.92)",
    chipText: "#8696A0",
    reactionBg: "#202C33",
    reactionText: "#E9EDEF",
    composerBg: "#1F2C34",
    field: "#2A3942",
    fieldBorder: "#2A3942",
    fieldText: "#8696A0",
    icon: "#8696A0",
    mic: "#00A884",
    callIconBg: "#2A3942",
    callIconBgOut: "rgba(0,0,0,0.22)",
    missed: "#F15C6D",
  },
};

function CallBubble({ message, theme, tail }) {
  const out = message.side === "out";
  const missed = Boolean(message.callMissed);

  return (
    <div className={`flex ${out ? "justify-end pl-10" : "justify-start pr-10"}`}>
      <div className="relative max-w-[80%]">
        {tail ? (
          <svg
            viewBox="0 0 9 14"
            width="7"
            height="11"
            aria-hidden="true"
            className="absolute top-0"
            style={{
              fill: out ? theme.outBg : theme.inBg,
              [out ? "right" : "left"]: -6,
              transform: out ? "scaleX(-1)" : undefined,
            }}
          >
            <path d="M9 0C9 8 5.5 12.5 0 14C4 14 9 10 9 0Z" />
          </svg>
        ) : null}

        <div
          className="flex items-start gap-3 px-2.5 py-2"
          style={{
            background: out ? theme.outBg : theme.inBg,
            color: out ? theme.outText : theme.inText,
            boxShadow: theme.shadow,
            borderTopLeftRadius: out ? 16 : 3,
            borderTopRightRadius: out ? 3 : 16,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
            style={{
              background: out ? theme.callIconBgOut : theme.callIconBg,
              color: missed ? theme.missed : theme.icon,
            }}
          >
            {missed ? (
              <PhoneMissed className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Phone className="h-5 w-5" strokeWidth={2} />
            )}
          </span>

          <div className="min-w-0 pt-0.5">
            <p className="text-[16px] leading-snug">{message.callTitle}</p>
            <div className="mt-0.5 flex items-end gap-2">
              <p className="text-[14px]" style={{ color: theme.sub }}>
                {message.callSub}
              </p>
              <span
                className="ml-auto shrink-0 text-[12px] tabular-nums"
                style={{ color: theme.inMeta }}
              >
                {message.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WACard({
  ref,
  contactName,
  contactAvatar,
  contactStatus,
  dateLabel,
  messages,
  composerText,
  readReceipts = true,
  dark,
}) {
  const theme = dark ? THEMES.dark : THEMES.light;
  const grouped = groupMessages(messages);

  return (
    <ChatFrame
      ref={ref}
      id="wa-card"
      background={theme.bg}
      dark={dark}
      className="font-sans"
    >
      <div style={{ background: theme.header }}>
        <ChatStatusBar color={theme.headerText} />
      </div>

      {/* Chat header */}
      <div
        className="flex h-16 shrink-0 items-center gap-3 px-2"
        style={{ background: theme.header, color: theme.headerText }}
      >
        <ArrowLeft className="h-6 w-6 shrink-0" strokeWidth={2} />

        <ChatAvatar src={contactAvatar} size={44} />

        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[19px] font-medium">{contactName}</p>
          {contactStatus ? (
            <p
              className="truncate text-[13px]"
              style={{ color: theme.headerSub }}
            >
              {contactStatus}
            </p>
          ) : null}
        </div>

        <Video className="h-6 w-6 shrink-0" strokeWidth={1.75} />
        <Phone className="h-6 w-6 shrink-0" strokeWidth={1.75} />
        <MoreVertical className="h-5 w-5 shrink-0" strokeWidth={2.5} />
      </div>

      {/* Messages */}
      <div
        className="relative flex flex-1 flex-col"
        style={{ backgroundColor: theme.wallpaper }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: theme.wallpaperImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative flex flex-1 flex-col gap-0.5 px-2.5 pt-1">
          <div className="flex justify-center py-2">
            <span
              className="rounded-full px-3 py-1 text-[12.5px] font-medium shadow-sm"
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

            return (
              <div key={index} className={index === 0 ? "" : gap}>
                {message.type === "call" ? (
                  <CallBubble
                    message={message}
                    theme={theme}
                    tail={position === "first" || position === "single"}
                  />
                ) : (
                  <ChatBubble
                    side={message.side}
                    text={message.text}
                    time={message.time}
                    ticks={message.side === "out" ? (readReceipts ? 3 : 2) : 0}
                    image={message.image}
                    theme={theme}
                    position={position}
                    radius={16}
                    smallRadius={16}
                    shadow={theme.shadow}
                    fontSize={16}
                    tail={position === "first" || position === "single"}
                    tailTop
                    maxWidth="max-w-[80%]"
                  />
                )}
              </div>
            );
          })}

          <div className="h-2" />
        </div>

        <span
          className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full shadow-md"
          style={{ background: theme.chipBg, color: theme.chipText }}
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
        </span>
      </div>

      {/* Composer */}
      <div
        className="flex shrink-0 items-center gap-2 px-2 py-2"
        style={{ background: theme.composerBg }}
      >
        <div
          className="flex h-[52px] flex-1 items-center gap-2.5 rounded-3xl border px-4"
          style={{
            background: theme.field,
            borderColor: theme.fieldBorder,
            color: theme.fieldText,
          }}
        >
          <Smile className="h-6 w-6 shrink-0" strokeWidth={1.75} />
          <span className="flex-1 truncate text-[16px]">
            {composerText || "Message"}
          </span>
          <Paperclip className="h-6 w-6 shrink-0" strokeWidth={1.75} />
          <Camera className="h-6 w-6 shrink-0" strokeWidth={1.75} />
        </div>

        <span
          className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full text-white"
          style={{ background: theme.mic }}
        >
          <Mic className="h-6 w-6" strokeWidth={2} />
        </span>
      </div>
    </ChatFrame>
  );
}
