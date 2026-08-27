import type { NextConfig } from "next";

/**
 * Le site est publié en HTML statique sur GitHub Pages : `output: "export"`
 * pré-rend chaque route.
 *
 * `basePath` n'est volontairement pas utilisé : l'activer fait échouer le
 * pré-rendu de vinext (toutes les pages sont ignorées). Le préfixe de
 * sous-chemin est appliqué autrement — `base` de Vite pour les assets,
 * `scripts/apply-basepath.mjs` pour les liens de page.
 */
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
