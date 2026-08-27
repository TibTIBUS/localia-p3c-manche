import type { Metadata } from "next";
import { ArrowLeft, Droplets } from "lucide-react";

import { business } from "./business";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
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
          <p className="section-kicker">Erreur 404</p>
          <h1>Cette page n’existe pas.</h1>
          <p>
            Le lien que vous avez suivi ne correspond à aucune page du site. Revenez à l’accueil
            pour retrouver nos prestations, ou appelez-nous directement.
          </p>
          <p>
            <a href={`tel:${business.phoneHref}`}>{business.phone}</a> —{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>
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
