// app/layout.tsx
import ToggleDarkMode from "./components/ToggleDarkMode";
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Weather Dashboard",
  description:
    "Real-time weather forecasts and insights for any location worldwide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-gray-800">
        {/* Animated background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Weather Dashboard
                    </h1>
                    <p className="text-xs text-gray-500 hidden sm:block">
                      Real-time weather insights
                    </p>
                  </div>
                </div>

                <a
                  href="https://github.com/YOUR_USERNAME/nextjs-weather-dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-auto bg-white/60 backdrop-blur-sm border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="dark:bg-gray-600">
                    Weather data provided by Open-Meteo
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Built with Next.js</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                    <span>Open-Meteo API</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    <span>Tailwind CSS</span>
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
