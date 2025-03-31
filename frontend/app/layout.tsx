import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SidebarNavigation } from "@/components/sidebar-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DeployHub - Deploy Your Projects with Ease",
  description: "A simple and powerful platform to deploy your static sites and web applications in seconds.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <SidebarNavigation />
              <SidebarInset className="w-full">{children}</SidebarInset>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'