/**
 * Reprise vectorielle de l'enseigne peinte sur la devanture de l'entreprise :
 * médaillon marine, clés à molette croisées, goutte d'eau, flamme et motifs
 * floraux, liseré doré. Redessinée en SVG (pas une photo) pour rester nette
 * du favicon à une grande taille.
 *
 * `CompanyMark` est la version simplifiée (en-tête, pied de page, favicon) :
 * clés croisées + goutte, sans les détails qui se brouilleraient en petit.
 * `CompanyEmblem` est la version complète, utilisée une fois, en plus grand.
 */

function Wrenches({ color }: { color: string }) {
  const wrench = (
    <g fill={color}>
      <rect x="-7" y="-24" width="5" height="15" rx="2" />
      <rect x="2" y="-24" width="5" height="15" rx="2" />
      <path d="M -7,-9 L 7,-9 L 2.6,-4 L -2.6,-4 Z" />
      <rect x="-2.6" y="-4" width="5.2" height="29" rx="2.6" />
    </g>
  );
  return (
    <>
      <g transform="rotate(45)">{wrench}</g>
      <g transform="rotate(-45)">{wrench}</g>
    </>
  );
}

function Droplet({ color, transform }: { color: string; transform?: string }) {
  return (
    <path
      transform={transform}
      fill={color}
      d="M 0,-8 C 3,-3.4 6,0.6 6,4.6 C 6,8.8 3.3,12 0,12 C -3.3,12 -6,8.8 -6,4.6 C -6,0.6 -3,-3.4 0,-8 Z"
    />
  );
}

function Flame({ color, transform }: { color: string; transform?: string }) {
  return (
    <path
      transform={transform}
      fill={color}
      d="M 0,-13 C 4.5,-8.4 6.4,-4 5.2,-0.4 C 6.6,-1.6 7.4,-3.4 7.6,-5.4 C 9.6,-1.6 9.4,4.4 5.4,8 C 1.8,11.2 -3.4,11.2 -6.6,8 C -9.6,5 -9.6,0.4 -6.8,-3 C -6.6,-0.8 -5.6,0.6 -4.4,1.4 C -5.2,-2.2 -3.8,-6 0,-13 Z"
    />
  );
}

function FourPetal({ color, transform }: { color: string; transform?: string }) {
  const petal = "M 0,-5.4 C 1.7,-3.2 2.3,-1.3 2.3,0 C 2.3,1.9 1.3,3.2 0,3.6 C -1.3,3.2 -2.3,1.9 -2.3,0 C -2.3,-1.3 -1.7,-3.2 0,-5.4 Z";
  return (
    <g fill={color} transform={transform}>
      <path d={petal} />
      <path d={petal} transform="rotate(90)" />
      <path d={petal} transform="rotate(180)" />
      <path d={petal} transform="rotate(270)" />
    </g>
  );
}

/** Marque simplifiée : en-tête, pied de page et favicon (voir public/favicon.svg). */
export function CompanyMark({ className }: { className?: string }) {
  const gold = "#f4c95d";
  const navy = "#061a2d";
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill={navy} />
      <circle cx="32" cy="32" r="28.5" fill="none" stroke={gold} strokeWidth="1.4" />
      <g transform="translate(32,35)">
        <Wrenches color={gold} />
      </g>
      <Droplet color={gold} transform="translate(32,15)" />
    </svg>
  );
}

/** Médaillon complet, repris tel qu'il figure sur la devanture. */
export function CompanyEmblem({ className }: { className?: string }) {
  const gold = "#f4c95d";
  const navy = "#061a2d";
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill={navy} />
      <circle cx="32" cy="32" r="28.5" fill="none" stroke={gold} strokeWidth="1.3" />
      <circle cx="32" cy="32" r="25.5" fill="none" stroke={gold} strokeWidth="0.6" />
      <FourPetal color={gold} transform="translate(11,33)" />
      <FourPetal color={gold} transform="translate(53,33)" />
      <g transform="translate(32,34)">
        <Wrenches color={gold} />
      </g>
      <Droplet color={gold} transform="translate(32,15)" />
      <Flame color={gold} transform="translate(32,49)" />
    </svg>
  );
}
