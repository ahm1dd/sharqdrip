import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BnsDrip",
  description: "Premium streetwear",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black antialiased min-h-screen overflow-hidden md:overflow-auto flex items-center justify-center md:block">
        {/* 9:16 portrait on mobile, full-screen on desktop */}
        <div
          className="no-scrollbar aspect-[9/16] h-[min(100vh,177.78vw)] md:aspect-auto md:w-full md:h-screen relative overflow-y-auto overflow-x-hidden shadow-2xl shadow-white/5 md:shadow-none"
          style={{ scrollBehavior: "smooth" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
