import {
  Gift,
  Phone,
  Pin,
  Plus,
  Search,
  Smile,
  Sticker,
  UserPlus,
  Video,
} from "lucide-react";
import { ChatFrame, ChatAvatar } from "./ChatKit";

const THEMES = {
  light: {
    bg: "#FFFFFF",
    surface: "#FFFFFF",
    header: "#FFFFFF",
    text: "#060607",
    headerBorder: "#e3e5e8",
    divider: "#e3e5e8",
    secondary: "#5c5e66",
    field: "#ebedef",
    fieldText: "#5c5e66",
    plus: "#b5bac1",
    plusText: "#FFFFFF",
  },
  dark: {
    bg: "#313338",
    surface: "#313338",
    header: "#313338",
    text: "#dbdee1",
    headerBorder: "#26282c",
    divider: "#3f4147",
    secondary: "#949ba4",
    field: "#383a40",
    fieldText: "#949ba4",
    plus: "#b5bac1",
    plusText: "#313338",
  },
};

export default function DCDMCard({
  ref,
  contactName,
  contactAvatar,
  contactStatus,
  dateLabel,
  myName = "You",
  myColor = "#5865F2",
  messages,
  dark,
}) {
  const theme = dark ? THEMES.dark : THEMES.light;

  return (
    <ChatFrame
      ref={ref}
      id="dcdm-card"
      background={theme.bg}
      dark={dark}
      className="font-sans"
    >
      {/* DM header */}
      <div
        className="flex h-12 shrink-0 items-center gap-2 border-b px-4"
        style={{
          background: theme.header,
          borderColor: theme.headerBorder,
          color: theme.text,
        }}
      >
        <ChatAvatar src={contactAvatar} size={24} />

        <span className="shrink-0 text-[15px] font-bold">{contactName}</span>

        {contactStatus ? (
          <span className="truncate text-[12px]" style={{ color: theme.secondary }}>
            {contactStatus}
          </span>
        ) : null}

        <div
          className="ml-auto flex shrink-0 items-center gap-4"
          style={{ color: theme.secondary }}
        >
          <Phone className="h-5 w-5" strokeWidth={2} />
          <Video className="h-5 w-5" strokeWidth={2} />
          <Pin className="h-5 w-5" strokeWidth={2} />
          <UserPlus className="h-5 w-5" strokeWidth={2} />
          <Search className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 pb-2">
          <span
            className="h-px flex-1"
            style={{ background: theme.divider }}
          />
          <span className="text-[11px] font-semibold" style={{ color: theme.secondary }}>
            {dateLabel}
          </span>
          <span
            className="h-px flex-1"
            style={{ background: theme.divider }}
          />
        </div>

        {messages.map((message, index) => {
          const out = message.side === "out";
          const previous = messages[index - 1];
          const grouped = previous && previous.side === message.side;
          const name = out ? myName : contactName;

          return (
            <div
              key={index}
              className={`flex gap-3 ${grouped ? "mt-0.5" : "mt-3"}`}
            >
              <div className="w-10 shrink-0">
                {grouped ? null : (
                  <ChatAvatar
                    src={out ? "" : contactAvatar}
                    size={40}
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                {grouped ? null : (
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-[15px] font-semibold"
                      style={{ color: out ? myColor : theme.text }}
                    >
                      {name}
                    </span>
                    <span className="text-[12px]" style={{ color: theme.secondary }}>
                      {message.time}
                    </span>
                  </div>
                )}

                <p className="text-[15px] leading-[1.375] whitespace-pre-wrap">
                  {message.text}
                </p>

                {message.image ? (
                  <img
                    src={message.image}
                    alt=""
                    className="mt-2 max-h-56 rounded-lg object-cover"
                  />
                ) : null}

                {message.reaction ? (
                  <span
                    className="mt-1.5 inline-flex items-center rounded-lg border px-2 py-0.5 text-[13px]"
                    style={{
                      background: theme.field,
                      borderColor: theme.divider,
                    }}
                  >
                    {message.reaction}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <div className="shrink-0 px-4 pt-2 pb-4">
        <div
          className="flex h-11 items-center gap-3 rounded-lg px-4"
          style={{ background: theme.field, color: theme.fieldText }}
        >
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
            style={{ background: theme.plus, color: theme.plusText }}
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
          </span>

          <span className="flex-1 truncate text-[15px]">
            Message @{contactName}
          </span>

          <Gift className="h-6 w-6 shrink-0" strokeWidth={1.75} />
          <span className="shrink-0 rounded border border-current px-1 text-[10px] font-bold leading-[14px]">
            GIF
          </span>
          <Sticker className="h-6 w-6 shrink-0" strokeWidth={1.75} />
          <Smile className="h-6 w-6 shrink-0" strokeWidth={1.75} />
        </div>
      </div>
    </ChatFrame>
  );
}
