import { formatXDate } from "@/lib/formatXDate";
import { formatXNumber } from "@/lib/formatXNumber";
import {
  MoreHorizontal,
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Upload,
} from "lucide-react";
export default function XCard({
  ref,
  name,
  handle,
  avatar,
  verified,
  affiliation,
  createdAt,
  dark,
  text,
  replies,
  retweets,
  likes,
  views,
}) {
  return (
    <div
      ref={ref}
      id="x-card"
      className={`w-137.5 p-4 rounded-2xl font-sans ${
        dark
          ? "bg-black text-white"
          : "bg-white text-black border border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={avatar || "/default-avatar-x.png"}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold">{name}</span>
              {verified && (
                <svg viewBox="0 0 22 22" className="w-4.5 h-4.5 fill-[#1d9bf0]">
                  <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568-.54.353-.972.851-1.246 1.44-.607-.223-1.264-.27-1.897-.14-.634.132-1.218.437-1.687.882-.445.469-.75 1.053-.882 1.687-.13.633-.083 1.29.14 1.897-.586.274-1.084.705-1.439 1.246-.354.541-.551 1.17-.569 1.816.018.646.215 1.274.57 1.815.354.54.852.972 1.438 1.246-.223.607-.27 1.264-.14 1.897.132.634.437 1.218.882 1.687.47.446 1.053.75 1.687.883.633.13 1.29.082 1.897-.14.274.586.705 1.084 1.246 1.438.54.354 1.168.551 1.814.569.646-.018 1.274-.215 1.815-.57.54-.354.972-.852 1.246-1.438.607.223 1.264.27 1.897.14.634-.132 1.218-.437 1.687-.883.446-.469.75-1.053.883-1.687.13-.633.082-1.29-.14-1.897.586-.274 1.084-.705 1.438-1.246.354-.54.551-1.169.569-1.815zM9.662 14.85l-3.429-3.428 1.293-1.293 2.136 2.136 4.567-4.567 1.293 1.293-5.86 5.86z" />
                </svg>
              )}

              {affiliation && (
                <img
                  src={affiliation}
                  alt=""
                  className="w-4 h-4 rounded-sm object-cover"
                />
              )}
            </div>
            <span className="text-gray-500 text-sm">@{handle}</span>
          </div>
        </div>

        <MoreHorizontal className="w-5 h-5 text-gray-500" />
      </div>

      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-normal">
        {text}
      </p>

      <p className="text-sm mt-3 text-gray-500">
        {formatXDate(createdAt)} ·{" "}
        <span className={`font-bold ${dark ? "text-white" : "text-black"}`}>
          {views}
        </span>{" "}
        Views
      </p>

      <div
        className={`flex items-center justify-between mt-3 pt-3 border-t ${dark ? "border-gray-800" : "border-gray-100"}`}
      >
        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <MessageCircle className="w-[18px] h-[18px]" />
          <span>{formatXNumber(replies)}</span>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <Repeat2 className="w-[18px] h-[18px]" />
          <span>{formatXNumber(retweets)}</span>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <Heart className="w-[18px] h-[18px]" />
          <span>{formatXNumber(likes)}</span>
        </div>

        <Bookmark className="w-4.5 h-4.5 text-gray-500" />
        <Upload className="w-4.5 h-4.5 text-gray-500" />
      </div>
    </div>
  );
}
