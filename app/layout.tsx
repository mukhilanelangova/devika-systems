import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ── Titles ──────────────────────────────────────────────────────────────────
  title: {
    default: "DEVIKA SYSTEMS LTD | Micro MSP & Managed IT Services",
    template: "%s | DEVIKA SYSTEMS LTD",
  },

  // ── Description ─────────────────────────────────────────────────────────────
  description:
    "DEVIKA SYSTEMS LTD is a UK-based Micro MSP delivering end-to-end managed IT services — cloud infrastructure management, endpoint security, 24/7 monitoring, helpdesk support, and proactive IT maintenance for small and medium-sized businesses.",

  // ── Keywords (expanded) ─────────────────────────────────────────────────────
  keywords: [
    "Devika Systems Ltd",
    "Devika Systems Limited",
    "devikasystems.co.uk",
    "Devika Systems IT",
    "Devika Systems managed IT",
    "Micro MSP UK",
    "Managed IT Services UK",
    "Managed Service Provider",
    "IT Support for Small Business",
    "Cloud Management Services",
    "Endpoint Security Management",
    "IT Infrastructure Management",
    "24/7 IT Monitoring",
    "Helpdesk IT Support",
    "Proactive IT Maintenance",
    "Business IT Solutions",
    "Cybersecurity Services",
    "Remote IT Support",
    "SMB IT Services",
    "Microsoft 365 Management",
    "Azure Cloud Support",
    "IT Outsourcing UK",
    "Network Security",
    "Backup and Disaster Recovery",
  ],

  // ── Authorship ───────────────────────────────────────────────────────────────
  authors: [{ name: "DEVIKA SYSTEMS LTD", url: "https://devikasystems.co.uk" }],
  creator: "DEVIKA SYSTEMS LTD",
  publisher: "DEVIKA SYSTEMS LTD",

  // ── Canonical base ───────────────────────────────────────────────────────────
  metadataBase: new URL("https://devikasystems.co.uk"),
  alternates: {
    canonical: "https://devikasystems.co.uk",
  },

  // ── Open Graph ───────────────────────────────────────────────────────────────
  openGraph: {
    title: "DEVIKA SYSTEMS LTD | Micro MSP & Managed IT Services",
    description:
      "UK-based Micro MSP delivering managed IT, cloud infrastructure, endpoint security, and 24/7 monitoring for growing businesses. Reliable IT support you can count on.",
    url: "https://devikasystems.co.uk",
    siteName: "DEVIKA SYSTEMS LTD",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.jpg", // 1200×630 — place in /public
        width: 1200,
        height: 630,
        alt: "DEVIKA SYSTEMS LTD – Micro MSP & Managed IT Services",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "DEVIKA SYSTEMS LTD | Micro MSP & Managed IT Services",
    description:
      "Managed IT, cloud, endpoint security, and 24/7 monitoring for UK businesses — by DEVIKA SYSTEMS LTD.",
    images: ["/og-image.jpg"], // use same 1200×630 OG image for best results
    creator: "@DevikaSystems", // update to your real handle if you have one
  },

  // ── Robots ────────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // ── Icons ─────────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },

  // ── Web App Manifest ──────────────────────────────────────────────────────────
  manifest: "/favicon_io/site.webmanifest",

  // ── Misc ──────────────────────────────────────────────────────────────────────
  category: "technology",
  classification: "Managed IT Services / Technology",
  referrer: "origin-when-cross-origin",
};

// ── JSON-LD Structured Data ────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DEVIKA SYSTEMS LTD",
  url: "https://devikasystems.co.uk",
  logo: "https://devikasystems.co.uk/logo.png",
  description:
    "UK-based Micro MSP providing managed IT services, cloud management, endpoint security, 24/7 monitoring, and helpdesk support for small and medium-sized businesses.",
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  serviceType: [
    "Managed IT Services",
    "Cloud Management",
    "Endpoint Security",
    "IT Monitoring",
    "Helpdesk Support",
    "Backup and Disaster Recovery",
  ],
  sameAs: [
    // Add your real social/directory profiles here, e.g.:
    // "https://www.linkedin.com/company/devika-systems",
    // "https://twitter.com/DevikaSystems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className="dark">
      <head>
        {/* Favicons */}
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

        {/* Theme colour for browser chrome */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
