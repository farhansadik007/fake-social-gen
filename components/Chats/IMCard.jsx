import { ChevronLeft, Mic, Plus, Video } from "lucide-react";
import {
  ChatBubble,
  ChatFrame,
  ChatStatusBar,
  ChatAvatar,
  groupMessages,
} from "./ChatKit";

const THEMES = {
  light: {
    bg: "#FFFFFF",
    text: "#000000",
    sub: "#8E8E93",
    line: "#E5E5EA",
    inBg: "#E9E9EB",
    inText: "#000000",
    outBg: "#0B84FF",
    outText: "#FFFFFF",
    inMeta: "#8A8A8E",
    outMeta: "rgba(255,255,255,0.72)",
    chipBg: "transparent",
    tick: "#0B84FF",
    reactionBg: "#E9E9EB",
    reactionText: "#000000",
    bar: "#F7F7F8",
    field: "#E9E9EB",
    fieldText: "#8A8A8E",
    button: "#E9E9EB",
    buttonText: "#000000",
    send: "#0B84FF",
  },
  dark: {
    bg: "#000000",
    text: "#FFFFFF",
    sub: "#8E8E93",
    line: "#1F1F21",
    inBg: "#26252A",
    inText: "#FFFFFF",
    outBg: "#0B84FF",
    outText: "#FFFFFF",
    inMeta: "#98989E",
    outMeta: "rgba(255,255,255,0.72)",
    chipBg: "transparent",
    tick: "#0B84FF",
    reactionBg: "#26252A",
    reactionText: "#FFFFFF",
    bar: "#0B0B0C",
    field: "#1C1C1E",
    fieldText: "#8A8A8E",
    button: "#1C1C1E",
    buttonText: "#FFFFFF",
    send: "#0B84FF",
  },
};

export default function IMCard({
  ref,
  contactName,
  contactAvatar,
  contactStatus,
  dateLabel,
  messages,
  receipt,
  dark,
}) {
  const theme = dark ? THEMES.dark : THEMES.light;
  const grouped = groupMessages(messages);

  return (
    <ChatFrame
      ref={ref}
      id="im-card"
      background={theme.bg}
      dark={dark}
      className="font-sans"
    >
      <ChatStatusBar color={theme.text} />

      {/* Contact header */}
      <div
        className="flex shrink-0 items-start justify-between px-4 pb-2"
        style={{ color: theme.text }}
      >
        <ChevronLeft className="mt-1 h-6 w-6" strokeWidth={2.25} />

        <div className="flex flex-col items-center gap-1">
          <ChatAvatar src={contactAvatar} size={44} />
          <span className="text-[11px] font-medium" style={{ color: theme.sub }}>
            {contactName}
            {contactStatus ? ` · ${contactStatus}` : ""}
          </span>
        </div>

        <Video className="mt-1 h-6 w-6" strokeWidth={1.75} />
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-0.5 px-4 pt-1">
        <div
          className="pb-2 text-center text-[11px] font-medium"
          style={{ color: theme.sub }}
        >
          {dateLabel}
        </div>

        {grouped.map(({ message, position }, index) => {
          const next = grouped[index + 1];
          const nextPosition = next?.position;
          const isLastOfRun =
            position === "single" || position === "last" || !next;
          const gap =
            nextPosition === "middle" || nextPosition === "last" ? "mt-0.5" : "mt-2";

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
                smallRadius={6}
                tail={isLastOfRun}
                maxWidth="max-w-[74%]"
              />
            </div>
          );
        })}

        {receipt ? (
          <div
            className="pt-1.5 text-right text-[10px] font-medium"
            style={{ color: theme.sub }}
          >
            {receipt}
          </div>
        ) : null}
      </div>

      {/* Composer */}
      <div className="shrink-0 px-3 pt-2 pb-4">
        <div className="flex items-center gap-2">
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
            style={{ background: theme.button, color: theme.buttonText }}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </span>

          <div
            className="flex h-9 flex-1 items-center gap-2 rounded-full border px-3"
            style={{
              background: theme.bar,
              borderColor: theme.line,
              color: theme.fieldText,
            }}
          >
            <span className="text-[15px]">iMessage</span>
            <Mic className="ml-auto h-4 w-4" strokeWidth={2} />
          </div>

          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
            style={{ background: theme.send, color: "#FFFFFF" }}
          >
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path
                d="M8 13V3M8 3L4 7M8 3l4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </ChatFrame>
  );
}
