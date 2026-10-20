import {
  Bell,
  Gift,
  Hash,
  Inbox,
  Pin,
  Plus,
  Search,
  Smile,
  Sticker,
  Users,
} from "lucide-react";

const CARD_STYLES = {
  light: {
    surface: "bg-white text-[#060607] border-[#e3e5e8]",
    header: "border-[#e3e5e8]",
    secondary: "text-[#5c5e66]",
    replyLine: "border-[#b9bbbe]",
    divider: "border-[#e3e5e8]",
    chip: "border-[#d4d7dc] bg-[#f2f3f5]",
    chipMe: "border-[#5865F2] bg-[#ebedff]",
    field: "bg-[#ebedef] text-[#5c5e66]",
    plus: "bg-[#b5bac1] text-white",
    defaultName: "#060607",
  },
  dark: {
    surface: "bg-[#313338] text-[#dbdee1] border-[#1e1f22]",
    header: "border-[#26282c]",
    secondary: "text-[#949ba4]",
    replyLine: "border-[#4e5058]",
    divider: "border-[#3f4147]",
    chip: "border-[#3f4147] bg-[#2b2d31]",
    chipMe: "border-[#5865F2] bg-[#3c4076]",
    field: "bg-[#383a40] text-[#949ba4]",
    plus: "bg-[#b5bac1] text-[#313338]",
    defaultName: "#f2f3f5",
  },
};

function ReplyPreview({ reply, style, fallbackAvatar }) {
  return (
    <div className="mb-1 flex items-center gap-1.5">
      <span
        className={`mb-0.5 h-3 w-6 shrink-0 rounded-tl-md border-t-2 border-l-2 ${style.replyLine}`}
      />
      <img
        src={reply.avatar || fallbackAvatar || "/default-avatar-x.png"}
        alt=""
        className="h-4 w-4 shrink-0 rounded-full object-cover"
      />
      <span className="shrink-0 text-[13px] font-medium">{reply.name}</span>
      <span className={`truncate text-[13px] ${style.secondary}`}>
        {reply.text}
      </span>
    </div>
  );
}

function Reactions({ reactions, style }) {
  if (!reactions?.length) return null;

  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {reactions.map((reaction, index) => (
        <span
          key={index}
          className={`flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-[13px] ${
            reaction.me ? style.chipMe : style.chip
          }`}
        >
          <span className="text-[14px] leading-none">{reaction.emoji}</span>
          <span className="font-semibold tabular-nums">{reaction.count}</span>
        </span>
      ))}
    </div>
  );
}

function Message({ message, style, fallbackAvatar }) {
  return (
    <div className="flex gap-4">
      <img
        src={message.avatar || fallbackAvatar || "/default-avatar-x.png"}
        alt={message.name}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        {message.reply ? (
          <ReplyPreview
            reply={message.reply}
            style={style}
            fallbackAvatar={fallbackAvatar}
          />
        ) : null}

        <div className="flex items-baseline gap-2">
          <span
            className="text-[15px] font-semibold"
            style={{ color: message.color || style.defaultName }}
          >
            {message.name}
          </span>
          {message.bot ? (
            <span className="rounded bg-[#5865F2] px-1 py-px text-[10px] font-bold text-white uppercase">
              app
            </span>
          ) : null}
          <span className={`text-[12px] ${style.secondary}`}>
            {message.time}
          </span>
        </div>

        <p className="mt-0.5 text-[15px] leading-[1.375] whitespace-pre-wrap">
          {message.text}
        </p>

        <Reactions reactions={message.reactions} style={style} />
      </div>
    </div>
  );
}

export default function DCCard({ ref, channel, topic, messages, dark, avatar }) {
  const style = dark ? CARD_STYLES.dark : CARD_STYLES.light;

  return (
    <div
      ref={ref}
      id="dc-card"
      className={`w-150 overflow-hidden rounded-xl border font-sans ${style.surface}`}
    >
      {/* Channel header */}
      <div
        className={`flex h-12 items-center justify-between gap-4 border-b px-4 ${style.header}`}
      >
        <div className="flex min-w-0 items-center gap-1.5">
          <Hash className={`h-6 w-6 shrink-0 ${style.secondary}`} strokeWidth={2.5} />
          <span className="shrink-0 text-[15px] font-bold">{channel}</span>
          <span className={`mx-1 h-6 w-px shrink-0 ${style.divider} border-l`} />
          <span className={`truncate text-[13px] ${style.secondary}`}>
            {topic}
          </span>
        </div>

        <div className={`flex shrink-0 items-center gap-4 ${style.secondary}`}>
          <Bell className="h-5 w-5" strokeWidth={2} />
          <Pin className="h-5 w-5" strokeWidth={2} />
          <Users className="h-5 w-5" strokeWidth={2} />
          <Search className="h-5 w-5" strokeWidth={2} />
          <Inbox className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-4 px-4 pt-4 pb-2">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            style={style}
            fallbackAvatar={avatar}
          />
        ))}
      </div>

      {/* Composer */}
      <div className="px-4 pt-2 pb-4">
        <div
          className={`flex h-11 items-center gap-3 rounded-lg px-4 ${style.field}`}
        >
          <span
            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${style.plus}`}
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
          </span>
          <span className="flex-1 truncate text-[15px]">
            Message #{channel}
          </span>
          <Gift className="h-6 w-6 shrink-0" strokeWidth={1.75} />
          <span className="shrink-0 rounded border border-current px-1 text-[10px] font-bold leading-[14px]">
            GIF
          </span>
          <Sticker className="h-6 w-6 shrink-0" strokeWidth={1.75} />
          <Smile className="h-6 w-6 shrink-0" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}
