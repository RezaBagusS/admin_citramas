import './globals.css';
import { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: "Admin Panel - Citramas",
  description:
    "Admin Panel - Citramas",
  generator: "Next.js",
  applicationName: "Admin Panel - Citramas",
  keywords: [
    "Citramas",
  ],
  metadataBase: new URL("http://citramas-foundation.com/admin-panel/"),
  creator: "Reza Bagus Saputra",
  alternates: {
    canonical: "http://citramas-foundation.com/admin-panel/",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
