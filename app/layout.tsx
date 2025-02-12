import type { Metadata } from "next";
import "./globals.css";

let title = "DeepSeek R1 Code Generator – DeepBolt";
let description = "DeepSeek R1 code generator and DeepSeek V3 code generator";
let url = "https://deepbolt.xyz/";
let ogimage = "/images/og-image.svg";
let sitename = "deepbolt.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: '32x32' }
    ],
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <main className="flex-1">
          {children}
        </main>
        <footer className="py-4 text-center text-sm text-gray-500">
          Powered by <a href="https://www.deepseek.com/" className="underline hover:text-gray-700" rel="dofollow">Deepseek R1</a>
        </footer>
      </body>
    </html>
  );
}
