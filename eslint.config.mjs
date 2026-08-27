import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  { ignores: ["dist/**", ".next/**", ".sites-runtime/**", ".wrangler/**", "vendor/**"] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // La navigation interne passe volontairement par des <a> et non par
      // next/link : le site est exporté en statique puis servi sous un
      // sous-chemin, et seul le href du HTML est réécrit après le build.
      // next/link garderait la route non préfixée côté client.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default config;
