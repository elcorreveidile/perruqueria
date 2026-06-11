import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { SITE } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nombre} — Peluquería canina en positivo en Granada`,
    template: `%s · ${SITE.nombre}`,
  },
  description:
    "Peluquería canina en positivo en el Realejo, Granada. Sin prisas, sin miedo, sin estrés. Baños, cortes y tratamientos con productos veganos.",
  // DEMO: el sitio no debe indexarse hasta el paso a producción.
  robots: { index: false, follow: false },
  openGraph: {
    title: `${SITE.nombre} — Peluquería canina en positivo`,
    description: "Sin prisas. Sin miedo. Sin estrés. Peluquería canina con productos veganos en el Realejo, Granada.",
    locale: "es_ES",
    type: "website",
    siteName: SITE.nombre,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  additionalType: "https://schema.org/PetGrooming",
  name: SITE.nombre,
  slogan: "Peluquería canina en positivo",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Molinos 47, Local",
    addressLocality: "Granada",
    postalCode: "18009",
    addressCountry: "ES",
  },
  areaServed: "Granada",
  url: SITE.url,
  sameAs: [SITE.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${nunito.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <DemoBanner />
      </body>
    </html>
  );
}
