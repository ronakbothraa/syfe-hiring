
import "./globals.css";
import { Inter } from "next/font/google";

const InterSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${InterSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
