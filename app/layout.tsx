import type { Metadata } from "next";

import { business } from "./business";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: `${business.name} — Plombier chauffagiste RGE à ${business.city} (${business.departmentCode})`,
    template: `%s — ${business.name}`,
  },
  description: `${business.legalName} (${business.manager}) : plomberie, sanitaire, chauffage et énergies renouvelables à ${business.city} et dans le centre ${business.department}. Entreprise qualifiée RGE, QualiPAC, QualiBois et Qualigaz depuis ${business.foundedYear}.`,
  keywords: [
    `plombier ${business.city}`,
    `chauffagiste ${business.city}`,
    `pompe à chaleur ${business.department}`,
    "chaudière à granulés Manche",
    "chauffe-eau thermodynamique",
    "artisan RGE Manche",
    "QualiPAC QualiBois Qualigaz",
  ],
  authors: [{ name: business.legalName }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: business.url,
    siteName: business.name,
    title: `${business.name} — Plomberie, chauffage et énergies renouvelables`,
    description: `Plombier chauffagiste qualifié RGE à ${business.city} (${business.postalCode}). Pompes à chaleur, granulés, gaz et chauffe-eau thermodynamiques.`,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
