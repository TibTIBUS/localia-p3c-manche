# P3C Manche — site vitrine

Site vitrine de la **SARL P3C** (nom commercial *P3C Manche*), entreprise de plomberie,
sanitaire, chauffage et énergies renouvelables installée à Périers (50190), dans la Manche.

Construit à partir du template [`localia-template-plombier`](https://github.com/TibTIBUS/localia-template-plombier).

## Contenu du site

- une page d'accueil : prestations, rénovation énergétique, qualifications, présentation de
  l'entreprise, zone d'intervention, FAQ et contact ;
- une page `/mentions-legales` ;
- une page 404 ;
- un `robots.txt` statique (`public/robots.txt`).

Le référencement local s'appuie sur des données structurées `schema.org`
(`Plumber` + `HVACBusiness` avec adresse, SIREN et qualifications, et `FAQPage`).

## Où modifier les informations

Toutes les données de l'entreprise sont centralisées dans **`app/business.ts`** :
nom, gérant, SIREN, téléphone, courriel, adresses, zone d'intervention, qualifications.

Le reste du contenu éditorial (prestations, FAQ) se trouve en haut de `app/page.tsx`.

## Déploiement

Le site est publié en **HTML statique sur GitHub Pages** :
<https://tibtibus.github.io/localia-p3c-manche/>

`.github/workflows/deploy.yml` build et publie à chaque push sur `main`.

### Démonstration ou production

`deployment` dans `app/business.ts` pilote les deux modes :

| | `mode: "demo"` (actuel) | `mode: "prod"` |
| --- | --- | --- |
| Hébergement | GitHub Pages, sous-chemin | domaine dédié, racine |
| `url` | l'URL github.io | le domaine de l'entreprise |
| `basePath` | `/localia-p3c-manche` | `""` |
| Indexation | `noindex` + `robots.txt` bloquant | à rouvrir |

Le mode démo est volontairement non indexable : une copie provisoire ne doit
pas faire doublon avec le futur site de l'entreprise dans Google.

Pour passer en production : mettre `mode` à `"prod"`, renseigner `url`, vider
`basePath`, remplacer `public/robots.txt` par une version autorisant
l'indexation, et rétablir un `sitemap.xml`.

### Le préfixe de sous-chemin

GitHub Pages sert un site de projet depuis `/<nom-du-depot>/`. L'option Next
`basePath` serait la réponse normale, mais **vinext ne sait pas pré-rendre avec
`basePath`** : l'activer fait ignorer toutes les pages à l'export. Le préfixe
est donc appliqué en deux endroits :

- `base` de Vite dans `vite.config.ts` → assets et chunks chargés dynamiquement ;
- `scripts/apply-basepath.mjs`, lancé en `postbuild` → liens de page dans le HTML.

Ce script est idempotent et échoue le build s'il reste un chemin non préfixé ou
préfixé deux fois. C'est aussi pourquoi la navigation interne utilise des `<a>`
et non `next/link` : seul le HTML est réécrit, `next/link` garderait la route
non préfixée côté client. La règle ESLint correspondante est désactivée avec
ce motif dans `eslint.config.mjs`.

## À compléter avant mise en ligne

- Nom de domaine définitif : voir « Démonstration ou production » ci-dessus.
- Photos : les visuels actuels proviennent de Pexels (libres de droits). Les remplacer par
  des photos de chantiers réels de l'entreprise renforcera nettement la page.
- Horaires d'ouverture précis, coordonnées de l'assureur (RC pro / décennale), organisme
  de médiation de la consommation et hébergeur : ces mentions sont annoncées
  « communiquées sur demande » dans `/mentions-legales` et gagnent à être détaillées.
- Avis clients : aucune section d'avis n'a été ajoutée, afin de ne pas publier de
  témoignages inventés. À brancher sur de vrais avis Google le moment venu.

## Démarrage

```bash
npm install
npm run dev     # serveur de développement
npm run build   # build de production (vinext)
npm run lint    # ESLint
```

## Points hérités du template

- `npm run lint` s'appuie sur un `eslint.config.mjs` ajouté ici : le template n'en fournissait
  pas et la commande échouait. Il reste deux avertissements `no-img-element` (les photos
  distantes sont servies par de simples balises `<img>`, comme dans le template).
- `app/robots.ts` et `app/sitemap.ts` ont été retirés : vinext les ignore en mode
  `output: "export"` (aucun fichier généré), ce qui donnait une fausse impression de
  couverture SEO. Leur contenu reste récupérable dans l'historique git.
- `npx tsc --noEmit` signale deux erreurs dans `worker/index.ts` (`Fetcher`, `D1Database`) :
  les types Cloudflare Workers ne sont pas déclarés dans le template. Sans effet sur le
  build ni sur le déploiement.
- Les scripts de `scripts/` ont reçu le bit d'exécution, sans lequel `npm run build`
  s'arrêtait sur `Permission denied`.
