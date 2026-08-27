/**
 * Fiche d'identité de l'entreprise.
 * Toutes les informations affichées sur le site sont centralisées ici.
 */

export const business = {
  name: "P3C Manche",
  legalName: "SARL P3C",
  tagline: "Plomberie · Chauffage · Énergies renouvelables",
  manager: "Frédéric Déron",
  foundedYear: 2006,
  siren: "491 446 605",
  phone: "07 60 31 08 14",
  phoneHref: "+33760310814",
  email: "p3c.deron@laposte.net",
  city: "Périers",
  postalCode: "50190",
  department: "Manche",
  departmentCode: "50",
  region: "Normandie",
  area: "Périers, Lessay, Coutances, Carentan, La Haye et le centre Manche",
  url: "https://p3c-manche.fr",
} as const;

/** Adresses de l'entreprise référencées à Périers (50190). */
export const addresses = [
  {
    label: "Siège / atelier",
    street: "Le Bethelin — Route de Pirou",
    primary: true,
  },
  { label: "Adresse référencée", street: "5 rue de Saint-Lô", primary: false },
  { label: "Adresse référencée", street: "10 rue du Clos Rouen", primary: false },
] as const;

export const primaryAddress = addresses[0];

/** Qualifications et labels détenus par l'entreprise. */
export const certifications = [
  {
    code: "RGE",
    title: "RGE",
    subtitle: "Reconnu Garant de l’Environnement",
    copy: "La mention qui ouvre l’accès, sous conditions, aux aides publiques à la rénovation énergétique (MaPrimeRénov’, CEE, éco-PTZ).",
  },
  {
    code: "QualiPAC",
    title: "QualiPAC",
    subtitle: "Pompes à chaleur",
    copy: "Dimensionnement, installation et mise en service des pompes à chaleur air/eau et air/air selon un référentiel contrôlé.",
  },
  {
    code: "QualiBois",
    title: "QualiBois",
    subtitle: "Poêles & chaudières bois",
    copy: "Installation d’appareils de chauffage au bois et aux granulés : poêles, inserts et chaudières automatiques.",
  },
  {
    code: "Qualigaz",
    title: "Qualigaz",
    subtitle: "Installations gaz",
    copy: "Réalisation et attestation de conformité des installations gaz domestiques, dans le respect des normes en vigueur.",
  },
] as const;
