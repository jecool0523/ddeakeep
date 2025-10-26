import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AccessibilityProvider from "@/components/accessibility-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ddeakeep",
  description: "Connecting citizens with government services and community resources",
  generator: "v0.app",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AccessibilityProvider>{children}</AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
