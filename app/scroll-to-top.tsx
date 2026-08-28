"use client";

import { useEffect } from "react";

/**
 * Ouvre toujours la page en haut, sur le hero.
 *
 * Deux comportements du navigateur faisaient rouvrir le site au milieu ou en
 * bas de page, et tous deux disparaissent en navigation privée, faute
 * d'historique :
 *
 * - la restauration automatique du défilement (`history.scrollRestoration`
 *   vaut "auto" par défaut) : en revenant sur le site, on retombait là où on
 *   s'était arrêté ;
 * - une ancre restée dans l'URL (`#contact`, par exemple, héritée d'un appui
 *   sur la barre fixe du bas) : le navigateur saute alors à cette section à
 *   chaque ouverture.
 *
 * La navigation interne n'est pas affectée : les liens `#services`,
 * `#contact`… fonctionnent au clic comme avant, seul le chargement initial
 * est ramené en haut.
 */
export function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    // Le navigateur peut replacer la page après l'hydratation : un seul appel
    // laissait un résidu de quelques dizaines de pixels. On répète donc le
    // retour en haut sur les frames suivantes — mais on s'arrête dès que le
    // visiteur touche à la page, pour ne jamais contrarier son geste.
    let userActed = false;
    const stop = () => {
      userActed = true;
    };
    const interactions = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    interactions.forEach((event) =>
      window.addEventListener(event, stop, { passive: true, once: true }),
    );

    // `behavior: "instant"` court-circuite le `scroll-behavior: smooth` du
    // CSS : on veut être en haut d'emblée, pas voir la page y remonter.
    const toTop = () => {
      if (!userActed) window.scrollTo({ top: 0, behavior: "instant" });
    };

    toTop();
    const frame = requestAnimationFrame(toTop);
    const timer = setTimeout(toTop, 150);
    window.addEventListener("load", toTop);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("load", toTop);
      interactions.forEach((event) => window.removeEventListener(event, stop));
    };
  }, []);

  return null;
}
