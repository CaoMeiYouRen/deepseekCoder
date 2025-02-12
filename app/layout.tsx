import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

let url = "https://deepbolt.xyz/";
let ogimage = "/public/image/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: 'DeepSeek R1 Code Generator',
  description: 'DeepSeek R1 code generator. An AI code generator that helps you build applications faster.',
  keywords: 'AI code generator, DeepSeek R1, code assistant, app development, AI programming',
  alternates: {
    canonical: 'https://deepbolt.xyz'
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
  },
  openGraph: {
    images: [ogimage],
    title: 'DeepSeek R1 Code Generator',
    description: 'TDeepSeek R1 code generator',
    url: url,
    siteName: 'DeepSeek R1 Code Generator',
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title: 'DeepSeek R1 Code Generator',
    description: 'DeepSeek R1 code generator',
  },
  robots: {
    index: true,
    follow: true,
  }
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
        
        {/* Google Analytics 追踪代码 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-99C6XX3HNE" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-99C6XX3HNE');
          `}
        </Script>
      </body>
    </html>
  );
}
