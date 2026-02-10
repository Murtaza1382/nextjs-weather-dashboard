// app/layout.tsx
import "../globals.css";
import React from "react";

export const metadata = {
  title: "Weather Dashboard",
  description:
    "Small weather dashboard built with Next.js + TS + Tailwind + DaisyUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen bg-base-200 text-base-content">
        <div className="min-h-screen flex flex-col items-center p-6">
          <header className="w-full container mx-auto py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Weather Dashboard</h1>
              <div className="flex items-center space-x-4">
                <a
                  className="link"
                  href="https://github.com/YOUR_USERNAME/nextjs-weather-dashboard"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </header>

          <main className="w-full container mx-auto flex-1">{children}</main>

          <footer className="w-full text-center py-6 text-sm text-muted-foreground">
            Built with Next.js · Open-Meteo · DaisyUI
          </footer>
        </div>
      </body>
    </html>
  );
}
