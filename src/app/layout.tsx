import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { QueryProviders } from "@/components/query-provider";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jira Clone",
  description:
    "A clone of Jira, a popular project management tool, built with Next.js, React Query, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen")}>
        <QueryProviders>
          <Toaster />
          {children}
        </QueryProviders>
      </body>
    </html>
  );
}
