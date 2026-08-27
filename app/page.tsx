import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bath,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Droplets,
  Flame,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  Thermometer,
  Wind,
  Wrench,
} from "lucide-react";

import { addresses, business, certifications } from "./business";

const services = [
  {
    icon: Droplets,
    title: "Plomberie générale",
    copy: "Recherche de fuite, robinetterie, alimentation et évacuation, débouchage, remplacement de canalisations.",
  },
  {
    icon: Bath,
    title: "Sanitaire & salle de bains",
    copy: "Installation et rénovation complète : douche, baignoire, WC, vasque et adaptation des accès.",
  },
  {
    icon: Flame,
    title: "Chauffage",
    copy: "Installation, remplacement et entretien de vos émetteurs et de votre production de chaleur.",
  },
  {
    icon: Wind,
    title: "Pompes à chaleur",
    copy: "Pompes à chaleur air/eau et air/air, dimensionnées pour votre logement — qualification QualiPAC.",
  },
  {
    icon: Leaf,
    title: "Granulés & bois",
    copy: "Poêles et chaudières à granulés ou à bûches, installés sous qualification QualiBois.",
  },
  {
    icon: Thermometer,
    title: "Gaz & eau chaude",
    copy: "Chaudières gaz (qualification Qualigaz) et chauffe-eau thermodynamiques pour l’eau chaude sanitaire.",
  },
];

const renewables = [
  {
    icon: Wind,
    title: "Pompe à chaleur",
    copy: "Air/eau ou air/air, en remplacement d’une chaudière fioul ou gaz ancienne.",
  },
  {
    icon: Leaf,
    title: "Granulés & bûches",
    copy: "Poêle d’appoint ou chaudière automatique assurant tout le chauffage du logement.",
  },
  {
    icon: Thermometer,
    title: "Chauffe-eau thermodynamique",
    copy: "L’eau chaude sanitaire produite à partir des calories de l’air, en remplacement d’un cumulus électrique.",
  },
];

const faqs = [
  {
    question: "Dans quelles communes intervenez-vous ?",
    answer: `Basés à ${business.city} (${business.postalCode}), nous intervenons dans le centre de la ${business.department} : ${business.area}. Pour une commune voisine, appelez-nous : nous vous dirons tout de suite si nous pouvons nous déplacer.`,
  },
  {
    question: "Vos qualifications donnent-elles droit aux aides à la rénovation ?",
    answer:
      "Nous sommes qualifiés RGE (Reconnu Garant de l’Environnement), avec les mentions QualiPAC, QualiBois et Qualigaz. Faire appel à une entreprise RGE est l’une des conditions pour bénéficier des aides publiques à la rénovation énergétique (MaPrimeRénov’, CEE, éco-PTZ). L’attribution et le montant de ces aides dépendent ensuite de votre situation et des critères en vigueur au moment des travaux.",
  },
  {
    question: "Réalisez-vous des devis ?",
    answer:
      "Oui. Nous nous déplaçons pour voir l’installation existante, comprendre votre besoin et vous remettre un devis écrit détaillé avant tout engagement.",
  },
  {
    question: "Intervenez-vous en dépannage ?",
    answer:
      "Oui, en plomberie comme en chauffage. Appelez-nous et décrivez la situation : nous vous indiquons le délai réaliste d’intervention et les premiers gestes à effectuer en attendant.",
  },
  {
    question: "Quel type de chauffage choisir pour ma maison ?",
    answer:
      "Cela dépend de l’isolation, de la surface, du système existant et de votre budget. C’est précisément le rôle de la visite technique : nous comparons avec vous les solutions envisageables (pompe à chaleur, granulés, gaz) plutôt que d’appliquer une réponse toute faite.",
  },
];

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["Plumber", "HVACBusiness"],
    name: business.name,
    legalName: business.legalName,
    founder: business.manager,
    foundingDate: String(business.foundedYear),
    identifier: { "@type": "PropertyValue", name: "SIREN", value: business.siren.replace(/\s/g, "") },
    telephone: business.phone,
    email: business.email,
    url: business.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: addresses[0].street,
      postalCode: business.postalCode,
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${business.department} (${business.departmentCode})`,
    },
    knowsAbout: [
      "Plomberie",
      "Chauffage",
      "Pompe à chaleur",
      "Chaudière à granulés",
      "Chauffe-eau thermodynamique",
    ],
    hasCredential: certifications.map((certification) => ({
      "@type": "EducationalOccupationalCredential",
      name: certification.title,
      description: certification.subtitle,
    })),
    priceRange: "€€",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="top-ribbon">
        <span className="top-dot" aria-hidden="true" />
        <span>Entreprise qualifiée RGE</span>
        <span className="top-separator" aria-hidden="true" />
        <span className="top-detail">QualiPAC · QualiBois · Qualigaz</span>
      </div>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#accueil" aria-label="Retour en haut de page">
            <span className="brand-mark" aria-hidden="true">
              <Droplets size={22} strokeWidth={2.3} />
            </span>
            <span>
              <strong>{business.name}</strong>
              <small>Plomberie &amp; chauffage</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Navigation principale">
            <a href="#services">Prestations</a>
            <a href="#renovation">Rénovation énergétique</a>
            <a href="#qualifications">Qualifications</a>
            <a href="#entreprise">L’entreprise</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="header-call" href={`tel:${business.phoneHref}`}>
            <Phone size={18} aria-hidden="true" />
            <span>
              <small>Appeler maintenant</small>
              <strong>{business.phone}</strong>
            </span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-grid" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <MapPin size={16} aria-hidden="true" />
                {business.city} ({business.postalCode}) • centre {business.department}
              </div>

              <h1>
                Plomberie, chauffage
                <span>et énergies renouvelables.</span>
                Dans la Manche depuis {business.foundedYear}.
              </h1>

              <p className="hero-lead">
                {business.name} installe, remplace et dépanne vos équipements de plomberie et de
                chauffage. Qualifiés RGE, nous accompagnons aussi le passage à la pompe à chaleur,
                aux granulés ou au chauffe-eau thermodynamique.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href={`tel:${business.phoneHref}`}>
                  <Phone size={19} aria-hidden="true" />
                  Appeler le {business.phone}
                </a>
                <a className="button button-ghost" href="#contact">
                  Demander un devis
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>

              <ul className="hero-benefits" aria-label="Points forts de l’entreprise">
                <li>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  Artisan qualifié RGE
                </li>
                <li>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  Plus de {new Date().getFullYear() - business.foundedYear} ans d’activité
                </li>
                <li>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  Devis écrit avant travaux
                </li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="photo-frame">
                <img
                  src="https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Installation de raccords de canalisation par un plombier"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="availability-card">
                  <span className="availability-icon" aria-hidden="true">
                    <Clock3 size={20} />
                  </span>
                  <span>
                    <small>Du lundi au vendredi</small>
                    <strong>Dépannage &amp; installation</strong>
                  </span>
                </div>
              </div>

              <div className="badge-card" aria-label="Qualifications de l’entreprise">
                <div className="badge-card-label">
                  <Award size={15} aria-hidden="true" />
                  Qualifications
                </div>
                <ul>
                  {certifications.map((certification) => (
                    <li key={certification.code}>
                      <strong>{certification.title}</strong>
                      <small>{certification.subtitle}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="conversion-strip" aria-label="Repères sur l’entreprise">
          <div className="shell conversion-grid">
            <div>
              <span>01</span>
              <CalendarCheck size={21} aria-hidden="true" />
              <p>
                <strong>Depuis {business.foundedYear}</strong> au service des particuliers du centre
                Manche.
              </p>
            </div>
            <div>
              <span>02</span>
              <ShieldCheck size={21} aria-hidden="true" />
              <p>
                <strong>Qualifié RGE</strong> avec les mentions QualiPAC, QualiBois et Qualigaz.
              </p>
            </div>
            <div>
              <span>03</span>
              <Wrench size={21} aria-hidden="true" />
              <p>
                <strong>Un seul interlocuteur</strong> de l’étude au dépannage, {business.manager}.
              </p>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="shell">
            <div className="section-heading split-heading">
              <div>
                <p className="section-kicker">Nos prestations</p>
                <h2>De la fuite d’eau au remplacement complet du chauffage.</h2>
              </div>
              <p>
                Nous travaillons chez les particuliers du centre Manche, aussi bien sur de petites
                interventions que sur des chantiers de rénovation énergétique complets.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article className="service-card" key={service.title}>
                    <div className="service-card-top">
                      <span className="service-icon" aria-hidden="true">
                        <Icon size={25} strokeWidth={1.8} />
                      </span>
                      <span className="service-number">0{index + 1}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section visibility-section" id="renovation">
          <div className="shell visibility-grid">
            <div className="visibility-photo">
              <img
                src="https://images.pexels.com/photos/7859953/pexels-photo-7859953.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Technicien intervenant sur une installation de chauffage"
                loading="lazy"
              />
              <div className="photo-caption">
                <Leaf size={20} aria-hidden="true" />
                <span>
                  <strong>Rénovation énergétique</strong>
                  Pompes à chaleur, granulés, thermodynamique
                </span>
              </div>
            </div>

            <div className="visibility-copy">
              <p className="section-kicker section-kicker-light">Énergies renouvelables</p>
              <h2>Remplacer un chauffage ancien, sans se tromper de solution.</h2>
              <p className="visibility-lead">
                Chaudière fioul en fin de vie, convecteurs électriques trop coûteux, cumulus à bout
                de souffle : plusieurs solutions existent, et elles ne conviennent pas toutes au
                même logement. Nous venons voir l’installation avant de vous proposer quoi que ce
                soit.
              </p>

              <div className="feature-list">
                {renewables.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title}>
                      <span>
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <p>
                        <strong>{item.title}</strong>
                        {item.copy}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="seo-note">
                <strong>Aides à la rénovation :</strong>
                <span>
                  notre qualification RGE est l’une des conditions d’accès aux dispositifs publics
                  (MaPrimeRénov’, CEE, éco-PTZ). Leur attribution dépend de votre situation et des
                  règles en vigueur au moment des travaux.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section certifications-section" id="qualifications">
          <div className="shell">
            <div className="section-heading split-heading">
              <div>
                <p className="section-kicker">Labels &amp; certifications</p>
                <h2>Des qualifications vérifiables, pas des promesses.</h2>
              </div>
              <p>
                Chaque mention correspond à un référentiel technique précis et à des contrôles
                réguliers sur nos chantiers.
              </p>
            </div>

            <div className="certifications-grid">
              {certifications.map((certification) => (
                <article className="certification-card" key={certification.code}>
                  <span className="certification-badge" aria-hidden="true">
                    <Award size={20} strokeWidth={1.9} />
                  </span>
                  <h3>{certification.title}</h3>
                  <p className="certification-subtitle">{certification.subtitle}</p>
                  <p>{certification.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section company-section" id="entreprise">
          <div className="shell company-layout">
            <div className="company-copy">
              <p className="section-kicker">L’entreprise</p>
              <h2>{business.legalName}, dirigée par {business.manager}.</h2>
              <p>
                Créée en {business.foundedYear}, {business.name} est une entreprise de plomberie et
                de chauffage installée à {business.city}, dans la {business.department}. Nous
                intervenons chez les particuliers, en neuf comme en rénovation, avec le même
                interlocuteur du premier rendez-vous à la mise en service.
              </p>
              <p>
                Au fil des années, l’activité s’est élargie aux énergies renouvelables : pompes à
                chaleur, poêles et chaudières à granulés ou à bûches, chauffe-eau thermodynamiques.
                Les qualifications RGE, QualiPAC, QualiBois et Qualigaz encadrent ces installations.
              </p>

              <dl className="company-facts">
                <div>
                  <dt>Raison sociale</dt>
                  <dd>{business.legalName}</dd>
                </div>
                <div>
                  <dt>Gérant</dt>
                  <dd>{business.manager}</dd>
                </div>
                <div>
                  <dt>Création</dt>
                  <dd>{business.foundedYear}</dd>
                </div>
                <div>
                  <dt>SIREN</dt>
                  <dd>{business.siren}</dd>
                </div>
              </dl>
            </div>

            <aside className="company-area">
              <h3>
                <MapPin size={18} aria-hidden="true" />
                Zone d’intervention
              </h3>
              <p>
                Basés à {business.city} ({business.postalCode}), nous rayonnons sur le centre de la{" "}
                {business.department} : {business.area}.
              </p>
              <ul className="address-list">
                {addresses.map((address) => (
                  <li key={address.street}>
                    <strong>{address.street}</strong>
                    <small>
                      {business.postalCode} {business.city} — {address.label}
                    </small>
                  </li>
                ))}
              </ul>
              <a className="button button-dark button-full" href="#contact">
                Nous contacter
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </aside>
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell faq-layout">
            <div className="faq-intro">
              <p className="section-kicker">Questions fréquentes</p>
              <h2>Les réponses aux questions qu’on nous pose le plus souvent.</h2>
              <p>
                Une question qui ne figure pas ici ? Appelez-nous, nous répondrons directement au
                téléphone.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>
                    {faq.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-card">
            <div className="contact-copy">
              <p className="section-kicker section-kicker-light">Contact</p>
              <h2>Parlons de votre projet ou de votre panne.</h2>
              <p>
                Décrivez-nous votre installation et votre besoin : nous vous indiquons ce qui est
                possible, sous quel délai, et nous établissons un devis écrit avant toute
                intervention.
              </p>
              <div className="contact-checks">
                <span>
                  <CheckCircle2 size={16} aria-hidden="true" /> Plomberie &amp; sanitaire
                </span>
                <span>
                  <CheckCircle2 size={16} aria-hidden="true" /> Chauffage
                </span>
                <span>
                  <CheckCircle2 size={16} aria-hidden="true" /> Pompes à chaleur
                </span>
                <span>
                  <CheckCircle2 size={16} aria-hidden="true" /> Granulés &amp; bois
                </span>
              </div>
            </div>

            <div className="contact-actions-card">
              <span className="contact-card-label">{business.name}</span>
              <a className="contact-phone" href={`tel:${business.phoneHref}`}>
                <span aria-hidden="true">
                  <Phone size={24} />
                </span>
                <span>
                  <small>Appeler l’entreprise</small>
                  <strong>{business.phone}</strong>
                </span>
              </a>
              <a
                className="button button-primary button-full"
                href={`mailto:${business.email}?subject=${encodeURIComponent("Demande de devis")}`}
              >
                Écrire à {business.email}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <p>
                <MapPin size={15} aria-hidden="true" /> {addresses[0].street}, {business.postalCode}{" "}
                {business.city}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-top">
          <div className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true">
              <Droplets size={22} />
            </span>
            <span>
              <strong>{business.name}</strong>
              <small>Plomberie &amp; chauffage</small>
            </span>
          </div>
          <p>
            {business.legalName} — plomberie, sanitaire, chauffage et énergies renouvelables à{" "}
            {business.city} ({business.postalCode}) et dans le centre {business.department}.
            Entreprise qualifiée RGE, QualiPAC, QualiBois et Qualigaz.
          </p>
          <div className="footer-links">
            <a href="#services">Prestations</a>
            <a href="#qualifications">Qualifications</a>
            <a href="#contact">Contact</a>
            <Link href="/mentions-legales">Mentions légales</Link>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>
            © {new Date().getFullYear()} {business.legalName} — SIREN {business.siren}
          </span>
          <span>
            Photos libres :{" "}
            <a
              href="https://www.pexels.com/photo/plumber-installs-pipe-fittings-6419128/"
              target="_blank"
              rel="noreferrer"
            >
              Pexels
            </a>
          </span>
          <span>
            <Link href="/mentions-legales">Mentions légales</Link>
          </span>
        </div>
      </footer>

      <div className="mobile-contact-bar" aria-label="Actions de contact rapides">
        <a href={`tel:${business.phoneHref}`}>
          <Phone size={18} aria-hidden="true" />
          Appeler
        </a>
        <a href="#contact">
          Demander un devis
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
