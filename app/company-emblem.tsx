/**
 * Reprise vectorielle du logo P3C Manche fourni par l'entreprise :
 * médaillon bleu pétrole, clés croisées, goutte d'eau, flamme et motifs
 * latéraux, avec un double liseré ivoire. Le dessin reste volontairement en
 * SVG afin d'être parfaitement net du favicon à l'affichage grand format.
 *
 * Palette relevée sur le visuel d'origine :
 * - médaillon : #1a3441
 * - ivoire : #eff1d9
 */

function Wrenches({ color }: { color: string }) {
  const wrench = (
    <g fill={color}>
      <rect x="-7" y="-24" width="5" height="15" rx="2" />
      <rect x="2" y="-24" width="5" height="15" rx="2" />
      <path d="M -7,-9 L 7,-9 L 2.6,-4 L -2.6,-4 Z" />
      <rect x="-2.6" y="-4" width="5.2" height="29" rx="2.6" />
      <circle cx="0" cy="20.2" r="1.25" fill="#1a3441" />
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

/** Marque simplifiée : en-tête, pied de page et favicon. */
export function CompanyMark({ className }: { className?: string }) {
  const cream = "#eff1d9";
  const petrol = "#1a3441";
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill={petrol} />
      <circle cx="32" cy="32" r="28.5" fill="none" stroke={cream} strokeWidth="1.35" />
      <circle cx="32" cy="32" r="26.2" fill="none" stroke={cream} strokeOpacity="0.7" strokeWidth="0.55" />
      <g transform="translate(32,35)">
        <Wrenches color={cream} />
      </g>
      <Droplet color={cream} transform="translate(32,15)" />
    </svg>
  );
}

/** Médaillon complet, fidèle à l'identité visuelle fournie. */
export function CompanyEmblem({ className }: { className?: string }) {
  const cream = "#eff1d9";
  const petrol = "#1a3441";
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill={petrol} />
      <circle cx="32" cy="32" r="28.7" fill="none" stroke={cream} strokeWidth="1.2" />
      <circle cx="32" cy="32" r="26.1" fill="none" stroke={cream} strokeOpacity="0.72" strokeWidth="0.55" />
      <FourPetal color={cream} transform="translate(11,33)" />
      <FourPetal color={cream} transform="translate(53,33)" />
      <g transform="translate(32,34)">
        <Wrenches color={cream} />
      </g>
      <Droplet color={cream} transform="translate(32,15)" />
      <Flame color={cream} transform="translate(32,49)" />
    </svg>
  );
}
