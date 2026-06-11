import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import DemoBanner from "@/components/layout/DemoBanner";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "Perruquería Canina Realejo — Peluquería canina en positivo",
    template: "%s | Perruquería Canina Realejo",
  },
  description:
    "Peluquería canina en Granada. Sin prisas. Sin miedo. Sin estrés. Productos veganos. Baños, cortes y tratamientos dermatológicos para tu perro en el barrio del Realejo.",
  keywords: [
    "peluquería canina Granada",
    "peluquería perro Realejo",
    "baño perro Granada",
    "corte perro",
    "grooming Granada",
    "peluquería canina en positivo",
    "productos veganos perros",
  ],
  authors: [{ name: "Por 2 Duros", url: "https://por2duros.com" }],
  creator: "Por 2 Duros",
  publisher: "Por 2 Duros",

  // NOINDEX para demo
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://perruqueria-realejo-demo.vercel.app",
    title: "Perruquería Canina Realejo — Peluquería canina en positivo",
    description:
      "Peluquería canina en Granada. Sin prisas. Sin miedo. Sin estrés. Productos veganos.",
    siteName: "Perruquería Canina Realejo",
    images: [
      {
        url: "/header.png",
        width: 1200,
        height: 630,
        alt: "Perruquería Canina Realejo",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Perruquería Canina Realejo — Peluquería canina en positivo",
    description:
      "Peluquería canina en Granada. Sin prisas. Sin miedo. Sin estrés. Productos veganos.",
    images: ["/header.png"],
  },

  // Schema.org LocalBusiness
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Perruquería Canina Realejo",
      description:
        "Peluquería canina en positivo. Sin prisas. Sin miedo. Sin estrés. Productos veganos.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "C. Molinos 47, Local",
        addressLocality: "Granada",
        postalCode: "18009",
        addressCountry: "ES",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 37.1769,
        longitude: -3.5968,
      },
      telephone: "+34600000000",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "17:45",
      },
      priceRange: "€€",
    }),
  },

  // Icons
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <DemoBanner />
        <Footer />
      </body>
    </html>
  );
}
