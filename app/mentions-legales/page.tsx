import type { Metadata } from "next";
import { ArrowLeft, Droplets } from "lucide-react";

import { addresses, business, isDemo, primaryAddress } from "../business";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales de ${business.legalName} (${business.name}), entreprise de plomberie et de chauffage à ${business.city}.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: !isDemo, follow: !isDemo },
};

export default function MentionsLegales() {
  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="/" aria-label="Retour à l’accueil">
            <span className="brand-mark" aria-hidden="true">
              <Droplets size={22} strokeWidth={2.3} />
            </span>
            <span>
              <strong>{business.name}</strong>
              <small>Plomberie &amp; chauffage</small>
            </span>
          </a>
          <a className="button button-dark legal-back" href="/">
            <ArrowLeft size={18} aria-hidden="true" />
            Retour<span className="legal-back-long">&nbsp;à l’accueil</span>
          </a>
        </div>
      </header>

      <main className="section legal-page">
        <div className="shell legal-shell">
          <p className="section-kicker">Informations légales</p>
          <h1>Mentions légales</h1>

          <h2>Éditeur du site</h2>
          <p>
            {business.legalName}, exerçant sous le nom commercial {business.name}, société à
            responsabilité limitée immatriculée sous le numéro SIREN {business.siren}, créée en{" "}
            {business.foundedYear}.
          </p>
          <p>
            Représentant légal : {business.manager}, gérant.
            <br />
            Activité : plomberie, sanitaire, chauffage et énergies renouvelables.
          </p>

          <h2>Coordonnées</h2>
          <p>
            Adresse principale : {primaryAddress.street}, {business.postalCode} {business.city},{" "}
            {business.department}, France.
          </p>
          <p>Autres adresses référencées de l’entreprise :</p>
          <ul>
            {addresses
              .filter((address) => !address.primary)
              .map((address) => (
                <li key={address.street}>
                  {address.street}, {business.postalCode} {business.city}
                </li>
              ))}
          </ul>
          <p>
            Téléphone : <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
            <br />
            Courriel : <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>

          <h2>Qualifications professionnelles</h2>
          <p>
            L’entreprise est titulaire de la qualification RGE (Reconnu Garant de l’Environnement)
            et des mentions QualiPAC, QualiBois et Qualigaz. La validité de ces qualifications peut
            être vérifiée auprès des organismes qui les délivrent.
          </p>

          <h2>Assurance professionnelle</h2>
          <p>
            L’entreprise est couverte par une assurance de responsabilité civile professionnelle et
            une garantie décennale. Les références du contrat et les coordonnées de l’assureur
            figurent sur nos devis et factures.
          </p>

          <h2>Hébergement</h2>
          <p>
            Ce site est hébergé par le prestataire d’hébergement retenu par l’entreprise. Ses
            coordonnées complètes sont communiquées sur simple demande à l’adresse courriel
            ci-dessus.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes et l’identité visuelle de ce site sont la propriété de {business.legalName}.
            Les photographies d’illustration proviennent de banques d’images libres de droits
            (Pexels) et restent la propriété de leurs auteurs respectifs.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Ce site ne dépose aucun cookie de mesure d’audience ou de publicité et ne comporte pas
            de formulaire de collecte. Les contacts se font par téléphone ou par courriel. Les
            informations que vous nous transmettez à cette occasion sont utilisées uniquement pour
            répondre à votre demande et établir un devis, et ne sont jamais cédées à des tiers.
          </p>
          <p>
            Conformément au règlement (UE) 2016/679 (RGPD), vous disposez d’un droit d’accès, de
            rectification et de suppression des données vous concernant. Pour l’exercer, écrivez à{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>.
          </p>

          <h2>Médiation de la consommation</h2>
          <p>
            En cas de litige non résolu directement avec l’entreprise, le consommateur peut recourir
            gratuitement au médiateur de la consommation dont relève l’entreprise. Ses coordonnées
            sont indiquées sur nos devis et communiquées sur demande.
          </p>
        </div>
      </main>

      <footer className="footer">
        <div className="shell footer-bottom">
          <span>
            © {new Date().getFullYear()} {business.legalName} — SIREN {business.siren}
          </span>
          <span>
            <a href="/">Retour à l’accueil</a>
          </span>
        </div>
      </footer>
    </>
  );
}
