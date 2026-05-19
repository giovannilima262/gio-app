import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chief of Staff AI — AI-Powered Email Assistant",
  description: "Your AI-powered email chief of staff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-white text-gray-900 antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
