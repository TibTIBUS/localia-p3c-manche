/**
 * Préfixe par `deployment.basePath` les chemins absolus que vinext émet encore
 * à la racine dans l'export statique.
 *
 * GitHub Pages sert un site de projet depuis un sous-chemin
 * (`/<nom-du-depot>/`). Deux couches doivent en tenir compte :
 *
 * - les assets et les chunks chargés dynamiquement, réglés par la `base` de
 *   Vite dans `vite.config.ts` ;
 * - les liens de page (`/`, `/mentions-legales`) écrits par vinext, que
 *   l'option Next `basePath` traiterait normalement — mais l'activer casse le
 *   pré-rendu de vinext, d'où cette réécriture après coup.
 *
 * Le script est idempotent : un chemin déjà préfixé est laissé tel quel.
 * Sans effet quand `basePath` est vide (déploiement sur un domaine dédié).
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = "dist/client";

// `app/business.ts` reste la source unique de vérité. On y lit `basePath` par
// simple lecture de texte plutôt que par import, pour que ce script reste un
// .mjs exécutable sans transpilation ni option Node expérimentale.
const businessSource = await readFile("app/business.ts", "utf8");
const match = businessSource.match(/basePath:\s*"([^"]*)"/);

if (!match) {
  console.error("apply-basepath: `basePath` introuvable dans app/business.ts.");
  process.exit(1);
}

const basePath = match[1];

if (!basePath) {
  console.log("apply-basepath: basePath vide, rien à réécrire.");
  process.exit(0);
}

const alreadyPrefixed = `${basePath.slice(1)}/`;
const prefix = (rest) => (rest.startsWith(alreadyPrefixed) ? null : `${basePath}/${rest}`);

const pages = (await readdir(outDir)).filter((entry) => entry.endsWith(".html"));

if (pages.length === 0) {
  console.error(`apply-basepath: aucun HTML dans ${outDir}/ — le build a-t-il tourné ?`);
  process.exit(1);
}

// On ne touche qu'aux chemins absolus internes, jamais aux URL externes.
const rules = [
  // href="/…" et src="/…"
  [
    /\b(href|src)="\/(?!\/)([^"]*)"/g,
    (match, attr, rest) => {
      const next = prefix(rest);
      return next ? `${attr}="${next}"` : match;
    },
  ],
  // import("/assets/…") du script d'amorçage inline
  [
    /\bimport\("\/(?!\/)([^"]*)"\)/g,
    (match, rest) => {
      const next = prefix(rest);
      return next ? `import("${next}")` : match;
    },
  ],
  // \"/assets/…\" échappé dans la charge utile RSC sérialisée en JSON
  [
    /\\"\/(?!\/)([^"\\]*)\\"/g,
    (match, rest) => {
      const next = prefix(rest);
      return next ? `\\"${next}\\"` : match;
    },
  ],
];

let rewritten = 0;
for (const page of pages) {
  const path = join(outDir, page);
  const before = await readFile(path, "utf8");
  let after = before;
  for (const [pattern, replacement] of rules) {
    after = after.replace(pattern, (...args) => {
      const next = replacement(...args);
      if (next !== args[0]) rewritten += 1;
      return next;
    });
  }

  // Garde-fous : un chemin oublié casserait la page en silence une fois en
  // ligne, un chemin préfixé deux fois aussi. Mieux vaut échouer ici.
  const missing = after.match(new RegExp(`["'(]\\\\?/(assets|favicon)[^"')]*`, "g"));
  if (missing) {
    console.error(`apply-basepath: chemins non préfixés dans ${page} : ${missing.join(", ")}`);
    process.exit(1);
  }
  const doubled = after.includes(`${basePath}${basePath}/`);
  if (doubled) {
    console.error(`apply-basepath: chemins préfixés deux fois dans ${page}.`);
    process.exit(1);
  }

  if (after !== before) await writeFile(path, after);
}

console.log(
  `apply-basepath: ${rewritten} chemins préfixés par ${basePath} dans ${pages.length} page(s).`,
);
