export const postPlatforms = [
  {
    id: "x",
    name: "X",
    description:
      "Compose posts with verification badges, view counts, and a dark mode variant.",
    href: "/x",
    available: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    description:
      "Square feed posts with captions, comment previews, and a dark mode variant.",
    href: "/instagram",
    available: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description:
      "Professional feed posts with headlines, reactions, and comment threads.",
    href: "/linkedin",
    available: true,
  },
  {
    id: "tiktok",
    name: "TikTok",
    description:
      "Vertical video screens and comment sheets, with a switcher between them.",
    href: "/tiktok",
    available: true,
  },
  {
    id: "facebook",
    name: "Facebook",
    description:
      "Feed posts with the reaction stack, comments, and share counts.",
    href: "/facebook",
    available: true,
  },
  {
    id: "threads",
    name: "Threads",
    description: "Minimal text posts with reply previews and repost counts.",
    href: "/threads",
    available: true,
  },
  {
    id: "reddit",
    name: "Reddit",
    description:
      "Subreddit posts with vote pills, comment threads, and nested replies.",
    href: "/reddit",
    available: true,
  },
  {
    id: "discord",
    name: "Discord",
    description:
      "Channel conversations with role colours, reactions, and quote replies.",
    href: "/discord",
    available: true,
  },
];

export const chatPlatforms = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    description:
      "Green header, doodle wallpaper, bubble tails, and read receipts.",
    href: "/chats/whatsapp",
    available: true,
  },
  {
    id: "imessage",
    name: "iMessage",
    description:
      "Blue and grey bubbles with grouped runs and delivery receipts.",
    href: "/chats/imessage",
    available: true,
  },
  {
    id: "telegram",
    name: "Telegram",
    description:
      "Blue gradient wallpaper, green outgoing bubbles, and delivery ticks.",
    href: "/chats/telegram",
    available: true,
  },
  {
    id: "messenger",
    name: "Messenger",
    description:
      "Gradient blue bubbles, message reactions, and a seen marker.",
    href: "/chats/messenger",
    available: true,
  },
  {
    id: "instagram-dm",
    name: "Instagram DMs",
    description:
      "Story-ring avatar, blue outgoing bubbles, and reaction chips.",
    href: "/chats/instagram-dm",
    available: true,
  },
  {
    id: "discord-dm",
    name: "Discord DMs",
    description:
      "Compact message rows with coloured usernames and a DM composer.",
    href: "/chats/discord-dm",
    available: true,
  },
];

export const platforms = [...postPlatforms, ...chatPlatforms];
