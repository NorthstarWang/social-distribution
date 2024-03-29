import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { AuthProvider } from "@/components/authentication/auth-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(inter.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Theme>
              <AuthProvider>
                <div className="relative flex min-h-screen flex-col overflow-hidden">
                  <SiteHeader />
                  <div className="flex-1 overflow-hidden h-[calc(100vh-4.125rem)]">
                    {children}
                  </div>
                </div>
              </AuthProvider>
            </Theme>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
