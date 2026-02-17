import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DEVIKA SYSTEMS LTD | Micro MSP & Managed IT Services",
    template: "%s | DEVIKA SYSTEMS LTD",
  },
  description:
    "DEVIKA SYSTEMS LTD is a Micro MSP providing managed IT services, cloud management, endpoint security, monitoring, and reliable IT support for modern businesses.",

  keywords: [
    "DEVIKA SYSTEMS LTD",
    "Micro MSP",
    "Managed IT Services",
    "IT Support",
    "Cloud Management",
    "Endpoint Management",
    "IT Infrastructure",
    "Managed Service Provider",
    "Business IT Support",
    "Cloud & Security Services",
  ],

  authors: [{ name: "DEVIKA SYSTEMS LTD" }],
  creator: "DEVIKA SYSTEMS LTD",
  publisher: "DEVIKA SYSTEMS LTD",

  metadataBase: new URL("https://devikasystems.co.uk"),

  openGraph: {
    title: "DEVIKA SYSTEMS LTD | Micro MSP & Managed IT Services",
    description:
      "Reliable Micro MSP delivering managed IT, cloud infrastructure, monitoring, and security services for growing businesses.",
    url: "https://devikasystems.co.uk",
    siteName: "DEVIKA SYSTEMS LTD",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.jpg", // place in public folder
        width: 1200,
        height: 630,
        alt: "DEVIKA SYSTEMS LTD",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DEVIKA SYSTEMS LTD | Micro MSP",
    description:
      "Managed IT, cloud, security, and monitoring services by DEVIKA SYSTEMS LTD.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
