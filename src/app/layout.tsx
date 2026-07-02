import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ViewTransitions } from "next-view-transitions";
import ReactLenis from "lenis/react";

const space_mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Preplit - practice interviews out loud",
  description:
    "Preplit runs real mock interviews with you: it asks questions, listens, pushes back, and gives you a clear report at the end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${space_mono.className} duration-300 antialiased`}>
          <ReactLenis root>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <QueryProvider>
                {children}
                <Toaster />
              </QueryProvider>
            </ThemeProvider>
          </ReactLenis>
        </body>
      </html>
    </ViewTransitions>
  );
}
