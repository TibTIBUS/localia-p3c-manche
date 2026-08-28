"use client";

import { useEffect } from "react";

/**
 * Masque la barre d'appel fixe du bas quand la section contact est déjà à
 * l'écran.
 *
 * Cette barre occupe la zone où le pouce balaie naturellement, et sa moitié
 * droite est une ancre vers `#contact`. Un balayage bref y est interprété
 * comme un tap : la page repartait alors en défilement doux vers la section
 * contact, ce qui donnait l'impression qu'elle « revenait en arrière toute
 * seule » puis restait bloquée sur cet écran.
 *
 * Une fois la section contact visible, la barre n'apporte plus rien — le
 * téléphone et l'e-mail sont juste là — donc on la retire : la zone du pouce
 * redevient libre exactement là où le blocage se produisait.
 */
export function StickyBarVisibility() {
  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;

    const root = document.documentElement;
    const observer = new IntersectionObserver(
      ([entry]) => root.classList.toggle("contact-in-view", entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      root.classList.remove("contact-in-view");
    };
  }, []);

  return null;
}
