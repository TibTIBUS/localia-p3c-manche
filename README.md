# P3C Manche — site vitrine

Site vitrine de la **SARL P3C** (nom commercial *P3C Manche*), entreprise de plomberie,
sanitaire, chauffage et énergies renouvelables installée à Périers (50190), dans la Manche.

Construit à partir du template [`localia-template-plombier`](https://github.com/TibTIBUS/localia-template-plombier).

## Contenu du site

- une page d'accueil : prestations, rénovation énergétique, qualifications, présentation de
  l'entreprise, zone d'intervention, FAQ et contact ;
- une page `/mentions-legales` ;
- `robots.txt` et `sitemap.xml` générés par Next.

Le référencement local s'appuie sur des données structurées `schema.org`
(`Plumber` + `HVACBusiness` avec adresse, SIREN et qualifications, et `FAQPage`).

## Où modifier les informations

Toutes les données de l'entreprise sont centralisées dans **`app/business.ts`** :
nom, gérant, SIREN, téléphone, courriel, adresses, zone d'intervention, qualifications.

Le reste du contenu éditorial (prestations, FAQ) se trouve en haut de `app/page.tsx`.

## À compléter avant mise en ligne

- `business.url` dans `app/business.ts` : remplacer par le nom de domaine définitif
  (il sert de base aux URL canoniques, à l'Open Graph et au sitemap).
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
- `npx tsc --noEmit` signale deux erreurs dans `worker/index.ts` (`Fetcher`, `D1Database`) :
  les types Cloudflare Workers ne sont pas déclarés dans le template. Sans effet sur le
  build ni sur le déploiement.
- Les scripts de `scripts/` ont reçu le bit d'exécution, sans lequel `npm run build`
  s'arrêtait sur `Permission denied`.
