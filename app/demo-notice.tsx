"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Mail, X } from "lucide-react";

import { business, isDemo, outreach } from "./business";

const DISMISS_KEY = "p3c-demo-notice-dismissed";
const DELAY_MS = 12_000;
const SCROLL_RATIO = 0.4;

/**
 * Bandeau adressé au prospect (pas à ses futurs clients) : ce site est une
 * démonstration temporaire, pas la version définitive. N'apparaît qu'en mode
 * démo (voir `deployment` dans app/business.ts) et jamais en production.
 *
 * Volontairement discret et différé — pas de compte à rebours ni de blocage
 * de la page à l'arrivée : on laisse d'abord le visiteur découvrir le site.
 */
export function DemoNotice() {
  // L'élément est présent dans le DOM dès le chargement (invisible), y
  // compris quand la bannière a déjà été fermée précédemment : le scroll ne
  // fait ensuite que basculer la classe `.is-visible`. Sur mobile, insérer un
  // nouvel élément `position: fixed` pendant un scroll en cours (au moment
  // précis où le seuil de 40% est franchi) faisait "rebondir" Safari — la
  // page semblait revenir en arrière toute seule. En gardant l'élément déjà
  // présent, le scroll ne déclenche plus qu'une transition d'opacité, sans
  // insertion ni recalcul de mise en page pendant le geste.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDemo) return;

    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      // Stockage indisponible (navigation privée, etc.) : on affiche quand même.
    }
    if (dismissed) return;

    let shown = false;
    let ticking = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setVisible(true);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const ratio = scrollTop / (scrollHeight - clientHeight || 1);
        if (ratio >= SCROLL_RATIO) show();
      });
    };

    const timer = setTimeout(show, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!isDemo) return null;

  const firstName = business.manager.split(" ")[0];
  const subject = encodeURIComponent(`${business.name} — le site vous plaît ?`);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Rien à faire si le stockage est bloqué : la bannière reviendra au
      // prochain chargement, sans conséquence.
    }
  };

  return (
    <div
      className={`demo-notice${visible ? " is-visible" : ""}`}
      role="dialog"
      aria-label="À propos de cette démonstration"
      aria-hidden={!visible}
    >
      <button className="demo-notice-close" onClick={dismiss} aria-label="Fermer ce message">
        <X size={16} />
      </button>
      <p className="demo-notice-title">👋 Bonjour {firstName},</p>
      <p className="demo-notice-body">
        Ce site a été conçu à titre de démonstration, spécialement pour {business.name}. Il n’a pas
        vocation à rester en ligne sous cette forme — dites-moi si vous souhaitez qu’on le mette en
        place pour de bon, avec votre propre nom de domaine.
      </p>
      <div className="demo-notice-actions">
        <a className="button button-primary" href={`mailto:${outreach.email}?subject=${subject}`}>
          <Mail size={17} aria-hidden="true" />
          Écrire à {outreach.contactName}
        </a>
        {outreach.phone && (
          <a
            className="button button-ghost"
            href={`https://wa.me/${outreach.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
      {outreach.offersUrl && (
        <a className="demo-notice-offers" href={outreach.offersUrl} target="_blank" rel="noreferrer">
          Découvrir les offres Localia
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
