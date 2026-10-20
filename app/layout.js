import { Geist, Geist_Mono, Reddit_Sans } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const redditSans = Reddit_Sans({
  variable: "--font-reddit-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fake Social Gen",
  description:
    "Generate realistic fake social media posts and export them as high-resolution PNGs.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${redditSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 font-sans text-zinc-900">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
