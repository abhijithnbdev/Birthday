import "./globals.css";
import type { Metadata } from "next";
import { AudioProvider } from "@/components/AudioProvider";

export const metadata: Metadata = {
  title: "Birthday Website",
  description: "Happy Birthday Ammu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}