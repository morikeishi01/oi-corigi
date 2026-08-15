import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "お買い物 — Oi Corigi",
  description: "家族のための予算管理アプリ",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "お買い物",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="max-w-lg mx-auto min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
        {children}
      </body>
    </html>
  );
}